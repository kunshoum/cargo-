/**
 * 马少良
 */
<template>
	<el-dialog title="拉上" :visible.sync="visible" width="70%" :before-close="close">
		<el-table :data="pullUpList" border style="width: 100%" max-height="300" size="small" class="pullUpTable">
      <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
      <el-table-column label="运单号">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.order_no"
          @change="getQunatity(scope.row, scope.$index)"
					ref="order_no"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="件数">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.stowage_quantity" 
          @keyup.enter.native="add(scope.$index,scope.row)"
          @input.native="isBeyond(scope.row)"
          @input="countWeight(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="重量">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.stowage_weight" 
          @keyup.enter.native="add(scope.$index,scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope" v-if="scope.$index !== (pullUpList.length - 1)">
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form class="demo-form-inline" label-position="top" :model="uPFlightInfo" ref="uPFlightInfo">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="航班号" class="grid-content" prop="flight_no">
            <el-input size="mini" v-model="uPFlightInfo.flight_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="日期" class="grid-content" prop="flight_date">
            <el-input size="mini" v-model="uPFlightInfo.flight_date"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="始发站" class="grid-content" prop="departure">
            <el-select size="mini" filterable remote default-first-option placeholder=""
              clearable
              ref="departure"
              v-model="uPFlightInfo.departure"
              @focus="getDepartures">
              <el-option
                v-for="(item, index) in departures"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="目的站" class="grid-content" prop="destination">
            <el-select size="mini" filterable remote default-first-option placeholder=""
              clearable
              v-model="uPFlightInfo.destination"
              @focus="getDestination">
              <el-option
                v-for="(item, index) in destinations"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="舱位" class="grid-content" prop="cabin">
            <el-select size="mini" filterable remote allow-create default-first-option placeholder=""
              clearable
              v-model="uPFlightInfo.cabin"
              @focus="cabin">
              <el-option
                v-for="(item, index) in cabins"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="pullUp" size="mini">确认拉上</el-button>
    </span>
	</el-dialog>
</template>

<script>
import { confirmBooking, getQunatity, getCabin } from "@/service/stowage.js"
import getCityMixin from "@/mixin/getCityMixin"
const { Decimal } = require("@/utils/count.js")

export default {
  mixins: [getCityMixin],
  props: ["visible", "flightInfo"],
  data() {
    return {
      pullUpList: [{ order_no: "", stowage_quantity: "", quantity: "", remain_quantity: "" }],
      canAdd: false,
      departures: [],
      destinations: [],
      uPFlightInfo: {
        flight_no: '',
        flight_date: '',
        departure: '',
        destination: '',
        cabin: '',
      },
      cabins: [],
    }
  },
  computed: {
    tableData() {
      return this.list.map(item => {
        return { ...item, stowage_quantity: item.quantity }
      })
    },
  },
  watch: {
    flightInfo() {
      this.load()
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      let item = this.flightInfo
      this.uPFlightInfo = {
        flight_no: item.flight_no,
        flight_date: item.flight_date,
        departure: item.departure,
        destination: item.destination,
        cabin: '',
      }
    },
    close() {
      this.$emit("close")
      this.pullUpList = [{ order_no: "", stowage_quantity: "", quantity: "", remain_quantity: "" }]
    },
    indexMethod(index) {
      if (index === this.pullUpList.length - 1) {
        return "输入"
      } else {
        return index + 1
      }
    },
    add(index, row) {
      if (index == this.pullUpList.length - 1 && this.canAdd) {
        this.pullUpList.push({
          order_no: "",
          stowage_quantity: "",
          stowage_weight: "",
          quantity: "",
          remain_quantity: "",
        })
        this.$nextTick(function() {
          this.$refs["order_no"].focus()
        })
      }
    },
    handleDelete(index) {
      if (this.pullUpList.length > 1) {
        this.pullUpList.splice(index, 1)
      }
    },
    getQunatity(row, index) {
      getQunatity({ order_no: row.order_no }).then(res => {
        if (res.data.status === 200) {
          this.canAdd = true
          let d = res.data.data[0]
          row.stowage_quantity = d.remain_quantity
          row.quantity = d.quantity
          row.remain_quantity = d.remain_quantity
          row.weight = d.weight
          row.stowage_weight = Decimal.add(0,row.remain_quantity).mul(row.weight).div(row.quantity).toNumber().toFixed(2)
        } else {
          this.canAdd = false
          row.order_no = ""
        }
      })
    },
    isBeyond(row) {
      if (row.stowage_quantity > row.remain_quantity) {
        this.canAdd = false
        row.stowage_quantity = row.remain_quantity
        this.countWeight(row)
        this.$notify({
          title: "警告",
          message: "超出剩余可配载件数,请重新输入",
          type: "warning",
        })
      } else {
        this.canAdd = true
      }
    },
    countWeight(row) {
      row.stowage_weight = Decimal.add(0,row.stowage_quantity).mul(row.weight).div(row.quantity).toNumber().toFixed(2)
    },
    confirmParams() {
      let orderIdList = this.pullUpList.map(item => {
        return {
          order_no: item.order_no,
          quantity: item.remain_quantity,
          stowage_quantity: item.stowage_quantity,
          stowage_weight: item.stowage_weight * 1,
          batch: item.batch,
        }
      })
      orderIdList.pop()

      return {
        ...this.uPFlightInfo,
        orderIdList,
        type: 2,
      }
    },
    pullUp() {
      if (this.pullUpList.length <= 1) {
        this.$notify({
          title: "警告",
          message: "请输入要拉上的单据信息",
          type: "warning",
        })
        return
      }

      confirmBooking(this.confirmParams()).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: "拉上成功",
            type: "success",
          })

          this.$store.commit("CHANGE_FLIGHTINGO", this.uPFlightInfo)

          this.close()
          this.$emit("search")
        }
      })
    },
    cabinParmas() {
      return {
        flight_no: this.uPFlightInfo.flight_no,
        plan_fly_date: this.uPFlightInfo.flight_date,
        departure: this.uPFlightInfo.departure,
        destination: this.uPFlightInfo.destination,
      }
    },
    cabin() {
      getCabin(this.cabinParmas()).then(res => {
        if(res.data.status === 200) {
          this.cabins = res.data.data.map(item => {
            return {
              value: item.cabin_name,
              label: item.cabin_name,
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="less">
.pullUpTable {
  margin-bottom: 10px;
}
</style>