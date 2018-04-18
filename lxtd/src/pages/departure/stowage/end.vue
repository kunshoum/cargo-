/**
 * 马少良
 */
 
<template>
	<div class="Search">
    <el-form  class="demo-form-inline search_form" label-position="top" :model="searchInfo" ref="endForm">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="航班号" class="grid-content" prop="flight_no"
          :rules="{ required: true, message: '请输入航班号', trigger: 'blur' }">
            <el-input size="mini" value="O36887" v-model="searchInfo.flight_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item  label="日期" prop="flight_date"
          :rules="{ required: true, message: '请输入日期', trigger: 'blur' }">
            <el-input size="mini" v-model="searchInfo.flight_date"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="始发站" class="grid-content" prop="departure">
            <el-select size="mini" filterable remote allow-create default-first-option placeholder=""
              clearable
              ref="departure"
              v-model="searchInfo.departure"
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
            <el-select size="mini" filterable allow-create remote default-first-option placeholder=""
              clearable
              v-model="searchInfo.destination"
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
      </el-row>
    </el-form>
    <div class="btn_wrap">
      <el-row>
        <el-col :span="15" :offset="1">
        <div class="grid-content bg-purple">
          <el-button type="primary" size="mini" @click="pullUp">拉上</el-button>
          <el-button type="primary" size="mini" @click="pullDown">拉下</el-button>
          <el-button type="primary" size="mini" @click="toClose">航班关闭</el-button>
          <el-button type="primary" size="mini" @click="print">打印出港出货单</el-button>
          <el-button type="primary" @click="printload" size="mini">打印装载申请单</el-button>
          <sale-Excel :data="excelData"/>
          <el-button type="primary" @click="batches" size="mini">打印分批发运单</el-button>
        </div>
        </el-col>
        <el-col :span="7" :offset="1">
        <div class="grid-content bg-purple" style="float: right;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
        </div>
        </el-col>
      </el-row>
    </div>
    <el-form label-position="left" inline class="sum_info">
      <el-form-item label="货单数:">
        <span>{{sumInfo.orderNumTotal}}</span>
      </el-form-item>
      <el-form-item label="货物件数:">
        <span>{{sumInfo.orderQuantityTotal}}</span>
      </el-form-item>
      <el-form-item label="货物重量:">
        <span>{{sumInfo.orderWeightTotal}}</span>
      </el-form-item>
      <el-form-item label="邮单数:">
        <span>{{sumInfo.mailNumTotal}}</span>
      </el-form-item>
      <el-form-item label="邮单件数:">
        <span>{{sumInfo.mailQuantityTotal}}</span>
      </el-form-item>
      <el-form-item label="邮单重量:">
        <span>{{sumInfo.mailWeightTotal}}</span>
      </el-form-item>
      <el-form-item label="公务货数:">
        <span>{{sumInfo.businessCargoNumTotal}}</span>
      </el-form-item>
      <el-form-item label="公务货件数:">
        <span>{{sumInfo.businessCargoQuantityTotal}}</span>
      </el-form-item>
      <el-form-item label="公务货重量:">
        <span>{{sumInfo.businessCargoWeightTotal}}</span>
      </el-form-item>
    </el-form>
    <div class="end_list">
      <el-table :data="tableData" border style="width: 100%" 
      :height="screenHeight - 420" size="small" @selection-change="getList">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
        <el-table-column sortable prop="warehouse" label="库位"></el-table-column>
        <el-table-column sortable prop="order_no" label="运单号" width="120"></el-table-column>
        <el-table-column sortable prop="batch" label="批次" width="55"></el-table-column>
        <el-table-column sortable prop="quantity" label="件数" width="55"></el-table-column>
        <el-table-column sortable prop="weight" label="重量" width="55"></el-table-column>
        <el-table-column sortable prop="stowage_quantity" label="已配载件数" width="100"></el-table-column>
        <el-table-column sortable prop="stowage_weight" label="已配载重量" width="100"></el-table-column>
        <el-table-column sortable prop="volume" label="体积" width="60"></el-table-column>
        <el-table-column sortable prop="product" label="品名" width="100"></el-table-column>
        <el-table-column sortable prop="flight_departure" label="起始" width="100"></el-table-column>
        <el-table-column sortable prop="flight_destination" label="终到" width="100"></el-table-column>
        <el-table-column sortable prop="good_pull_down" label="订舱类型标志" width="110"></el-table-column>
        <el-table-column sortable prop="booking_no" label="订舱号"></el-table-column>
        <el-table-column sortable prop="cabin" label="舱位" width="55"></el-table-column>
        <el-table-column sortable prop="remark" label="注释"></el-table-column>
      </el-table>
      <el-pagination
        v-if="total > 10"
        @current-change="pageChange"
        @size-change="sizeChange"
        :current-page="searchInfo.currPage"
        :page-size="10"
        :page-sizes="[10, 15, 20]"
        layout="sizes, total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <pull-up :visible="pullUpVisible" :flightInfo="searchInfo" @close="close" @search="search" :status="2"/>
    <pull-down :visible="pullDownVisible" :list="pullDownList" @close="close" @search="search" :status="2"/>
    <end-print :visible="printVisible" :flightInfo="searchInfo" :list="printData" :data="basicPrint" status="end" @close="close"/>
    <end-printload :visible="printloadVisible" :data="printloadData" @close="close"/>
    <end-Batches :visible="BatchesVisible" :detail='printbatches' @close="close"/>
    <div id="excelPrintmodel" style="display:none;">
<table border="1" cellpadding="10" cellspacing="0">
          <tr>
            <th colspan="2">航班号</th>
            <th colspan="2">飞机号</th>
            <th colspan="2">日期</th>
            <th colspan="2">起飞时间</th>
          </tr>
          <tr>
            <td colspan="2">{{printloadData.flight_no}}</td>
            <td colspan="2">{{printloadData.aircraft_no}}</td>
            <td colspan="2">{{printloadData.currDate}}</td>
            <td colspan="2">{{printloadData.plan_fly_date}}</td>
          </tr>
          <tr>
            <td>申请人</td>
            <td colspan="3">张丹</td>
            <td>确认人</td>
            <td></td>
            <td>制单号</td>
            <td></td>
          </tr>
          <tr>
            <td>到达站</td>
            <td>件数</td>
            <td>重量</td>
            <td>类别</td>
            <td>舱位</td>
            <td>体积</td>
            <td colspan="2">备注（箱板号）</td>
          </tr>
          <tbody id="render">
            <tr style="display:none;">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
      </table>
    </div>
    
	</div>
</template>
<script>
import $ from "@/utils/printArea.js"
import { getOrderListByFlight } from "@/service/stowage.js"
import { printEnd, printEndload, batchBill } from "@/service/index.js"
import { mapState } from "vuex"

import mixin from "./mixin"
import getCityMixin from "@/mixin/getCityMixin"

import PullUp from "./pullUp"
import PullDown from "./cancelBooking"
import EndPrint from "./print"
import EndPrintload from "./printload"
import EndBatches from "./batches"
import SaleExcel from "./exportExcel"

export default {
  mixins: [mixin, getCityMixin],
  data() {
    return {
      title: "终舱单",
      tableData: [],
      total: "",
      currPage: 1,
      pageSize: 10,
      sumInfo: {},
      pullUpVisible: false,
      pullDownVisible: false,
      printVisible: false,
      printloadVisible: false,
      BatchesVisible: false,
      list: [],
      pullDownList: [],
      departures: [],
      destinations: [],
      printData: [],
      basicPrint: [],
      printbatches: [],
      printloadData: [],
      excelData: "",
      screenHeight: window.innerHeight,
    }
  },
  computed: {
    ...mapState({
      searchInfo: state => state.flightInfo,
    }),
  },
  components: {
    PullUp,
    PullDown,
    EndPrint,
    EndPrintload,
    EndBatches,
    SaleExcel,
  },
  watch: {
    $route() {
      this.load()
    },
  },
  mounted() {
    $(".ess").hide()
    this.load()
  },
  methods: {
    load() {
      this.$store.commit("ADD_FOOTNAV", {
        name: "终舱单",
        route: "/stowage/end",
        title: "终舱单",
      })

      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.$store.commit("CHANGE_STOWAGESTEP", 3)
      this.search()
    },
    search() {
      this.$refs["endForm"].validate(valid => {
        if (valid) {
          this.searchHandle()
        } else {
          return false
        }
      })
    },
    searchHandle() {
      getOrderListByFlight({ ...this.searchInfo, currPage: this.currPage, pageSize: this.pageSize, type: 2 }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data[0].result.list
          this.total = res.data.data[0].result.total
          this.sumInfo = res.data.data[0]
          
          this.$nextTick(() => {
            // 触发页面重绘,解决第一次渲染时滚动条样式位置不对问题
            this.tableData = this.tableData.map(item => item)
          })
        }
      })
      this.excelPrint()
    },
    reset() {
      this.$refs["endForm"].resetFields()
      this.$store.commit("CHANGE_FLIGHTINGO", {
        flight_no: "",
        flight_date: "",
        departure: "",
        destination: "",
      })
    },
    pullUp() {
      this.pullUpVisible = true
    },
    pullDown() {
      if (!this.list.length) {
        this.$notify({
          title: "警告",
          message: "请选择要拉下单据",
          type: "warning",
        })
        return
      }

      this.pullDownList = this.list.map(item => {
        return {
          ...item,
          pull_down_quantity: item.stowage_quantity,
        }
      })

      this.pullDownVisible = true
    },
    print() {
      //出港出货单
      if (!this.searchInfo.flight_no || !this.searchInfo.flight_date) {
        this.$notify({
          title: "警告",
          message: "请输入航班信息进行打印",
          type: "warning",
        })
        return
      }
      printEnd({ ...this.searchInfo, currPage: this.currPage, type: 2 }).then(res => {
        if (res.data.status === 200) {
          this.printStatus = "end"
          this.printVisible = true
          this.printData = res.data.data[0].StorageInfos
          this.basicPrint = res.data.data[0].storagePrintParams
        }
      })
    },
    printload() {
      //装载申请单
      if (!this.searchInfo.flight_no || !this.searchInfo.flight_date) {
        this.$notify({
          title: "警告",
          message: "请输入航班信息进行打印",
          type: "warning",
        })
        return
      }
      
      printEndload({ ...this.searchInfo }).then(res => {
        if (res.data.status === 200) {
          this.printloadVisible = true
          this.printloadData = res.data.data[0]
        }
      })
    },
    excelPrint() {
      $("#render").html("")
      this.writeExcel()
      this.twiceExcel()
    },
    writeExcel(){
      printEndload({ ...this.searchInfo }).then(res => {
        if (res.data.status === 200) {
          this.printloadData = res.data.data[0]
          for (var i = 0; i < this.printloadData.stowageApplyList.length; i++) {
            for (var j = 0; j < this.printloadData.stowageApplyList[i].length; j++) {
              if (this.printloadData.stowageApplyList[i][j].destination_airport === null) {
                this.printloadData.stowageApplyList[i][j].destination_airport = ""
              }
              if (this.printloadData.stowageApplyList[i][j].quantity === null) {
                this.printloadData.stowageApplyList[i][j].quantity = ""
              }
              if (this.printloadData.stowageApplyList[i][j].weight === null) {
                this.printloadData.stowageApplyList[i][j].weight = ""
              }
              if (this.printloadData.stowageApplyList[i][j].type === null) {
                this.printloadData.stowageApplyList[i][j].type = ""
              }
              if (this.printloadData.stowageApplyList[i][j].cabin === null) {
                this.printloadData.stowageApplyList[i][j].cabin = ""
              }
              if (this.printloadData.stowageApplyList[i][j].volume === null) {
                this.printloadData.stowageApplyList[i][j].volume = ""
              }
              $("#render").append(
                "<tr><td>" +
                  this.printloadData.stowageApplyList[i][j].destination_airport +
                  "</td><td>" +
                  this.printloadData.stowageApplyList[i][j].quantity +
                  "</td><td>" +
                  this.printloadData.stowageApplyList[i][j].weight +
                  "</td><td>" +
                  this.printloadData.stowageApplyList[i][j].type +
                  "</td><td>" +
                  this.printloadData.stowageApplyList[i][j].cabin +
                  "</td><td>" +
                  this.printloadData.stowageApplyList[i][j].volume +
                  '</td><td colspan="2"></td></tr>',
              )
              this.excelData = window.document.getElementById("excelPrintmodel").innerHTML
              if(this.excelData){ 
                console.log(this.excelData)

                $(".ess").show()
              }
            }
          }
        }else{
          $(".ess").hide()
        }
      })
    },
    twiceExcel(){
      this.writeExcel()
    },
    // 打印分批发货单
    batches() {
      if (!this.list.length || this.list.length > 1) {
        this.$message({
          message: "警告！只能选择一条数据",
          type: "warning",
        })
      } else {
        batchBill({ ...this.searchInfo, order_no: this.list[0].order_no, type: 2 }).then(res => {
          if (res.data.status === 200) {
            this.printbatches = res.data.data[0]
            this.BatchesVisible = true
          }
        })
      }
    },
    close() {
      this.pullUpVisible = false
      this.pullDownVisible = false
      this.printVisible = false
      this.BatchesVisible = false
      this.printloadVisible = false
    },
    toClose() {
      this.$router.push({ name: "FlightClose" })
    },
  },
}
</script>
<style lang="less" scoped>
.btn_wrap2 {
  margin: 20px;
}
.sum_info {
  .el-form-item {
    margin-bottom: 10px;
  }
}
</style>
