/**
 * 马少良
 */
 
<template>
  <el-button type="primary" icon="el-icon-printer" size="small" @click="printOrder">打单</el-button>
</template>

<script>
import { searchMainPrint, updatePrintNum } from "../../service"
import getLodop from "../../utils/lodop.js"
const LODOP = getLodop()
import path from "path"

export default {
  props: ["change"],
  data() {
    return {
      type: "",
      order_no: "",
      LODOP: null,
      printData: null,
      obj: "",
      src: "",
    }
  },
  mounted() {
    this.type = this.$route.params.type === "main" ? 0 : 1
    this.src = this.$route.params.type === "main" ? window.location.href.split("#")[0] + 'static/print_main_bg.jpg' : window.location.href.split("#")[0] + 'static/print_sub_bg.jpg'
    this.order_no = this.$route.params.id
  },
  watch: {
    "$route.params.type"() {
      this.type = this.$route.params.type === "main" ? 0 : 1
      this.src = this.$route.params.type === "main" ? path.resolve('/static/print_main_bg.jpg') : path.resolve("/static/print_sub_bg.jpg")
    },
    "$route.params.id"() {
      this.order_no = this.$route.params.id
    }
  },
  methods: {
    createPage() {
      this.LODOP = getLodop()
      this.LODOP.PRINT_INITA(0, 0, 800, 1100, "")
      // 始发站
      this.LODOP.ADD_PRINT_TEXT(45, 99, 78, 30, this.printData.departure)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 13)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 目的站
      this.LODOP.ADD_PRINT_TEXT(45, 278, 83, 33, this.printData.destination)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 13)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 发货人名称
      this.LODOP.ADD_PRINT_TEXT(118, 20, 325, 25, this.printData.sender)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 发货人地址
      this.LODOP.ADD_PRINT_TEXT(142, 20, 325, 25, this.printData.sender_address)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 发货人电话
      this.LODOP.ADD_PRINT_TEXT(167, 20, 325, 20, this.printData.sender_telephone)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 收货人名称
      this.LODOP.ADD_PRINT_TEXT(245, 20, 325, 20, this.printData.receiver)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 11)
      // 收货人地址
      this.LODOP.ADD_PRINT_TEXT(266, 20, 323, 21, this.printData.receiver_address)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 收货人电话
      this.LODOP.ADD_PRINT_TEXT(285, 20, 323, 20, this.printData.receiver_telephone)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)

      // 填开代理人信息
      // this.printData.proxy_person
      this.LODOP.ADD_PRINT_TEXT(285, 580, 200, 20, this.$getStore('unit'))
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)

      // 结算备注
      this.LODOP.ADD_PRINT_TEXT(235, 580, 200, 20, this.printData.clearing_remark)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)

      // // 到达站
      // this.LODOP.ADD_PRINT_TEXT(346, 121, 81, 20, this.printData.destination)
      // this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      // this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 第一承运人
      this.LODOP.ADD_PRINT_TEXT(347, 203, 168, 20, this.printData.flight_no && this.printData.flight_no.slice(0,2))
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)

      // 航班号
      this.LODOP.ADD_PRINT_TEXT(395, 104, 100, 24, this.printData.flight_no)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)

      // 航班日期
      this.LODOP.ADD_PRINT_TEXT(415, 104, 100, 24, this.printData.flight_date)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      
      // 运输声明价值
      this.LODOP.ADD_PRINT_TEXT(420, 426, 135, 25, this.printData.declared_value)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 运输保险价值
      this.LODOP.ADD_PRINT_TEXT(420, 566, 136, 24, this.printData.insurance_value)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 储运注意事项及其他
      this.LODOP.ADD_PRINT_TEXT(465, 31, 587, 31, this.printData.carrier_storage_remark)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 件数
      this.LODOP.ADD_PRINT_TEXT(570, 21, 50, 25, this.printData.quantity)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)

      this.LODOP.ADD_PRINT_TEXT(640, 21, 50, 25, this.printData.quantity)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 毛重
      this.LODOP.ADD_PRINT_TEXT(570, 85, 57, 25, this.printData.net_weight)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)

      this.LODOP.ADD_PRINT_TEXT(640, 85, 57, 25, this.printData.net_weight)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 运价种类
      this.LODOP.ADD_PRINT_TEXT(570, 164, 38, 25, this.printData.price_code)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 商品代号
      this.LODOP.ADD_PRINT_TEXT(570, 207, 39, 25, this.printData.product_code)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 计费重量
      this.LODOP.ADD_PRINT_TEXT(570, 259, 64, 25, this.printData.weight)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 费率
      this.LODOP.ADD_PRINT_TEXT(570, 349, 43, 23, this.printData.rate)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 航空运费
      this.LODOP.ADD_PRINT_TEXT(570, 403, 56, 25, this.printData.flight_cost)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)

      this.LODOP.ADD_PRINT_TEXT(640, 403, 56, 25, this.printData.flight_cost)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 品名
      this.LODOP.ADD_PRINT_TEXT(570, 490, 300, 27, this.printData.product)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 包装
      this.LODOP.ADD_PRINT_TEXT(598, 490, 176, 29, this.printData.packaging)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 体积
      let h = 626
      let list = this.printData.volumnResult.list
      if(list.length) {
        list.forEach((item, index) => {
          this.LODOP.ADD_PRINT_TEXT(h + index*20, 490, 177, 25, item.length + "*" + item.width + "*" + item.height + "CM*" + item.quantity)
          this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
          this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
          this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
        })
      }

      this.LODOP.ADD_PRINT_TEXT(h + list.length * 20, 490, 177, 25, this.printData.volume_str)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)

      // 预付
      this.LODOP.ADD_PRINT_TEXT(750, 36, 69, 20, this.printData.pre_arrive_pay)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 到付
      this.LODOP.ADD_PRINT_TEXT(750, 164, 69, 20, this.printData.flight_cost)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 其他运费
      this.LODOP.ADD_PRINT_TEXT(750, 340, 450, 22, this.printData.other_cost)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 航空运费
      this.LODOP.ADD_PRINT_TEXT(790, 36, 69, 20, this.printData.flight_cost)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 其他费用
      this.LODOP.ADD_PRINT_TEXT(920 , 32, 150, 20, this.printData.other_total_cost)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 总费用
      this.LODOP.ADD_PRINT_TEXT(990, 33, 72, 20, this.printData.total_cost)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      // 填开时间
      this.LODOP.ADD_PRINT_TEXT(980, 341, 100, 20, this.printData.billing_time)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 填开地点
      this.LODOP.ADD_PRINT_TEXT(980, 464, 86, 20, this.printData.billing_location)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)
      // 填开人
      this.LODOP.ADD_PRINT_TEXT(980, 563, 158, 20, this.printData.issuer)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)

      // 托运人或其代理人签字
      this.LODOP.ADD_PRINT_TEXT(920, 563, 158, 20, this.printData.proxy_person)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
      this.LODOP.SET_PRINT_STYLEA(0, "Alignment", 2)

      // 付款方式
      this.LODOP.ADD_PRINT_TEXT(1050, 200, 72, 20, this.printData.payment_method)
      this.LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体")
      this.LODOP.SET_PRINT_STYLEA(0, "FontSize", 10)
    },
    printDesign() {
      this.createPage()

      if(this.$route.params.type === "main") {
        // this.LODOP.ADD_PRINT_SETUP_BKIMG(`<img border='0' src=${this.src}>`)
      }else {
        // this.LODOP.ADD_PRINT_SETUP_BKIMG(`<img border='0' src=${this.src}>`)
      }
      
      // this.LODOP.SET_SHOW_MODE("BKIMG_LEFT", 1)
      // this.LODOP.SET_SHOW_MODE("BKIMG_TOP", 1)
      // this.LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "220mm")
      // this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1)
      this.LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true)
      if (this.LODOP.CVERSION) {
        // 获取打印次数
        let This = this
        this.LODOP.On_Return_Remain = true
        CLODOP.On_Return = function(TaskID, Value) {
          console.log(TaskID)
          console.log(Value)
          if (Value) {
            updatePrintNum({ order_no: This.order_no, print_num: 1, type: This.type }).then(res => {})
          }
        }
        this.LODOP.PREVIEW()
        return
      }
    },
    getPrintData() {
      searchMainPrint({ order_no: this.order_no, type: this.type }).then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.printData = resData.data[0]
          this.printDesign()
        }
      })
    },
    printOrder() {
      if (this.change) {
        this.$confirm("当前对应单号件数曾发生变化,请确认件数,重量及价种已更改准确!", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "info",
        })
          .then(() => {
            this.getPrintData()
          })
          .catch(() => {})
      } else {
        this.getPrintData()
      }
    },
  },
}
</script>