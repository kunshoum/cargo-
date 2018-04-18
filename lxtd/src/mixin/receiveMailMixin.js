/** 
* 马少良
*/

import {
  saveRecive,
  editRecive,
  searchReceiver,
  searchOrderNo,
  searchTransferProcess,
} from "@/service"

import { getCity, getSenderReceiver, getAirport, getPackage } from "@/linkQuery"

import { getTime, getDate, formatIptDate, formatIptTime } from "@/utils/time"

export default {
  watch: {
    "$route.params.id"(id) {
      this.edit = id ? true : false
    },
    flightNo(val) {
      this.detailInfo.params.expected_flight_time = this.flightDate
      this.detailInfo.params.expected_flight_no = this.flightNo
    },
    flightDate(val) {
      this.detailInfo.params.expected_flight_time = this.flightDate
      this.detailInfo.params.expected_flight_no = this.flightNo
    },
    sumVolume() {
      this.detailInfo.params.volume = this.sumVolume
    },
    sumWeight() {
      this.detailInfo.params.weight = Math.max(this.sumWeight, this.detailInfo.params.net_weight)
    },
    "detailInfo.params.net_weight"() {
      if (this.detailInfo.params.weight) {
        this.detailInfo.params.weight = Math.max(this.detailInfo.params.weight, this.detailInfo.params.net_weight)
      }
    },
    customList: {
      handler() {
        let contentArr = this.customList.map(item => item.content)
        contentArr.pop()
        this.detailInfo.params.service_record = contentArr.join(";")
      },
      deep: true,
    },
    costAbout(info) {
      this.detailInfo.params.billing_cost = info.billing_cost
      this.detailInfo.params.clear_cost = info.clear_cost
      this.detailInfo.params.should_receive_cost = info.should_receive_cost
      this.detailInfo.params.pay_total_cost = info.pay_total_cost
      this.detailInfo.params.receive_total_cost = info.receive_total_cost
    },
    "$route.params.item"(to, from) {
      if(to === "cost" && from === "detail") {
        this.getCost(this.priceItem)
      }
    },
  },

  methods: {
    queryOrder() {
      searchOrderNo({
        order_three_code: this.detailInfo.params.order_three_code,
        order_num: "",
      }).then(res => {
        if (res.data.status === 200) {
          this.orders = res.data.data.map(item => {
            return { label: item, value: item }
          })
        }
      })
    },
    getOrderNo() {
      if (this.detailInfo.params.order_three_code && this.detailInfo.params.order_num) {
        this.order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num
        this.$store.commit("GET_ORDERNO", this.order_no)
      } else {
        this.order_no = ""
        this.$store.commit("GET_ORDERNO", this.order_no)
      }
    },
    formatNull() {
      let o = this.detailInfo.params
      o.delivery_mode === null ? (o.delivery_mode = 1) : (o.delivery_mode = o.delivery_mode)
      o.air_transit === null ? (o.air_transit = 0) : (o.air_transit = o.air_transit)
      o.is_domestic === null ? (o.is_domestic = 0) : (o.is_domestic = o.is_domestic)
      o.easy_flag === null ? (o.easy_flag = 0) : (o.easy_flag = o.easy_flag)
      o.departure_priority === null ? (o.departure_priority = 0) : (o.departure_priority = o.departure_priority)
      o.payment_method === null ? (o.payment_method = "现金") : (o.payment_method = o.payment_method)
      o.transport_mode === null ? (o.transport_mode = 0) : (o.transport_mode = o.transport_mode)
      o.delivery_payee === null ? (o.delivery_payee = 0) : (o.delivery_payee = o.delivery_payee)
      o.is_put === null ? (o.is_put = 0) : (o.is_put = o.is_put)
      o.pre_arrive_pay === null ? (o.pre_arrive_pay = 0) : (o.pre_arrive_pay = o.pre_arrive_pay)
      o.sign_state === null ? (o.sign_state = 0) : (o.sign_state = o.sign_state)
    },
    popList(d) {
      // 去除最后一条输入用数据
      d.costItemList.pop()
      d.volumeList.pop()
      d.custServiceList.pop()
    },
    getVolumeList() {
      // 获取要传给后台的体积数据
      this.detailInfo.params.volumeList = this.volumeList.map(item => {
        return { ...item, order_no: this.order_no }
      })
      this.detailInfo.params.volumeList.pop()
    },
    getCustomList() {
      // 获取要传给后台的客服数据
      let cust_service_type = this.type === "main" ? 0 : 1
      this.detailInfo.params.custServiceList = this.customList.map(item => {
        return { ...item, order_no: this.order_no, cust_service_type }
      })

      this.detailInfo.params.custServiceList.pop()
    },
    getCostList() {
      // 获取要传给后台的费用数据
      this.detailInfo.params.costItemList = this.costList.map(item => {
        return {
          cost_name: item.cost_name,
          payer: item.payer,
          relevance_id: item.relevance_id,
          invoice_price: item.invoice_price,
          invoice_choice_way: item.invoice_choice_way,
          is_lock: item.is_lock,
          absolute_cost: item.absolute_cost,
          actual_cost: item.actual_cost,
          remark: item.remark,
          is_sys_cost: item.is_sys_cost,
          payee: item.payee,
          related_type: item.related_type,
          impact: item.impact,
        }
      })

      this.detailInfo.params.costItemList.pop()
    },
    getTabInfo() {
      // 获取体积,费用,客服等选项卡数据
      this.getVolumeList()
      this.getCustomList()
      this.getCostList()
    },
    valid() {
      // 校验
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.getTabInfo()
          this.edit && !this.changePage ? this.correspondChange() : this.saveDetail()
        } else {
          return false
        }
      })
    },
    saveDetail() {
      // 保存
      this.detailInfo.params.billing_time = getTime()
      delete this.detailInfo.params.allBindList
      saveRecive({
        ...this.detailInfo.params,
        type: this.orderType,
      }).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: "添加成功",
            type: "success",
          })
          this.toEdit()
        }
      })
    },
    editSuccessTile() {
      let d = this.detailInfo.params
      if(this.orderType === 0) {
        this.$notify({
          title: "警告",
          message: "该主单信息已修改，请及时修改关联的分单",
          type: "warning",
        })
      }
      if(this.orderType === 1 && d.correspond_order_no_state !== 2) {
        this.$notify({
          title: "警告",
          message: "该分单信息已修改，请及时修改关联的主单",
          type: "warning",
        })
      }
    },
    correspondChange() {
      let d = this.detailInfo.params
      // this.orderType 0主单 1分单
      
      if(this.orderType === 1 && d.correspond_order_no_state === 2) {
        this.$confirm('该分单关联的主单已打单，请确定是否修改?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editDetail()
        }).catch(() => {
          return false         
        })
      }else {
        this.editDetail()
      }
    },
    editDetail() {
      // 编辑
      this.detailInfo.params.update_person = this.$getStore("real_name")
      this.detailInfo.params.update_time = getTime()
      delete this.detailInfo.params.allBindList
      if(this.detailInfo.params.state === 2) {
        console.log("已打单")
      }
      
      editRecive({
        ...this.detailInfo.params,
        order_no: this.order_no,
        type: this.orderType,
      }).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: "编辑成功",
            type: "success",
          })
          setTimeout(() => {
            this.editSuccessTile()
          },200)
        }
      })
    },
    toEdit() {
      this.$router.push({ params: { id: this.order_no } })
    },
    toFlight() {
      let o = this.detailInfo.params
      if (o.expected_flight_no === "") {
        this.$store.commit("DEPARTURE", o.departure)
        this.$store.commit("DESTINATION", o.destination)
        this.$router.push({ params: { item: "flight" } })
      }
    },
    toVolume() {
      let o = this.detailInfo.params
      if (o.volume === "") {
        this.$router.push({ params: { item: "volume" } })
      }
    },
    toCustom() {
      this.$router.push({ params: { item: "deparr" }, query: { from: "detailCustom" } })
    },
    toCost() {
      this.$router.push({ params: { item: "cost" } })
    },
    getCitys() {
      if (this.allCitys.length > 0) {
        return
      }

      getCity(this, "").then(res => {
        this.associationPoints = res
        this.allCitys = res
      })
    },
    getDepartures(query) {
      if (this.allDepartures.length > 0) {
        return
      }

      getCity(this, "").then(res => {
        this.departures = res
        this.allDepartures = res
      })
    },
    getDestination(query) {
      getCity(this, "").then(res => {
        // this.destinations = res
      })
    },
    getAssociationPoints(query) {
      getCity(this, "").then(res => {
        this.associationPoints = res
      })
    },
    getSenders() {
      if (this.allSenders.length > 0) {
        return
      }

      getSenderReceiver(this, "").then(res => {
        this.senders = res.map(item => {
          return { value: item.code, label: item.code }
        })

        this.allSenders = res.map(item => {
          return { value: item.code, label: item.code }
        })
      })
    },
    getReceiverBySender() {
      let params = {
        receiver_name: "",
        sender_name: this.detailInfo.params.sender_name,
        destination: this.detailInfo.params.destination,
      }
      return searchReceiver(params).then(res => {
        return res.data.data
      })
    },
    renderReceiverName() {
      this.getReceiverBySender().then(res => {
        this.hadReceiver = true
        this.receiverList = res

        if (!this.receiverList.length) {
          this.detailInfo.params.receiver_name = ""
          this.detailInfo.params.receiver_telephone = ""
          this.detailInfo.params.receiver_address = ""
        }

        this.receivers = res.map(item => {
          return { value: item.receiver_name, label: item.receiver_name }
        })

        this.allReceivers = res.map(item => {
          return { value: item.receiver_name, label: item.receiver_name }
        })

        if (!this.receivers.length) {
          this.detailInfo.params.receiver = ""
        }
        this.$refs["receiver"].focus()
      })
    },
    filterReceiver(name) {
      if (this.receiverList.length) {
        return this.receiverList.filter(item => name === item.receiver_name)[0]
      } else {
        return ""
      }
    },
    getAirports(query) {
      if (this.allAirports.length > 0) {
        return
      }

      getAirport(this, "").then(res => {
        this.departures = res
        this.destinations = res
        this.firstAirports = res
        this.secondAirports = res
        this.allAirports = res
      })
    },
    queryPackage(query) {
      getPackage(this, "")
    },
    transitChange(val) {
      //空运中转
      if (val === 1) {
        this.$refs["second_transfer_process"].focus()
      } else {
        this.detailInfo.params.second_transfer_process = ""
        this.$refs["insurance_value"].focus()
      }
    },
    secondChange() {
      //第二程
      setTimeout(() => {
        this.$refs["insurance_value"].focus()
      }, 500)
    },
    transferProcessParams() {
      let d = this.detailInfo.params
      return {
        flight_no: d.expected_flight_no,
        flight_date: d.expected_flight_time,
        departure: d.departure,
        destination: d.destination,
        is_air_transit_cargo: d.is_air_transit_cargo,
      }
    },
    // 获取第一程,第二程
    getTransferProcess() {
      if(!this.detailInfo.params.expected_flight_no) {
        return
      }
      
      searchTransferProcess(this.transferProcessParams()).then(res => {
        if (res.data.status === 200) {
          let d = this.detailInfo.params
          d.first_transfer_process = res.data.data[0].first_transfer_process
          d.air_transit = res.data.data[0].air_transit
          d.second_transfer_process = res.data.data[0].second_transfer_process
        }
      })
    },
    formatDate() {
      this.detailInfo.params.expected_flight_time = formatIptDate(this.detailInfo.params.expected_flight_time)
      this.$store.commit("PLAN_FLYDATE", this.detailInfo.params.expected_flight_time)
    },
  },
}
