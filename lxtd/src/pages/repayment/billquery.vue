<template>
  <div class="Search">
    <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="结算单位" class="grid-content" prop="params.clear_unit">
            <el-input size="mini" v-model="searchInfo.params.clear_unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="运单号" class="grid-content" prop="params.order_no">
            <el-input size="mini" v-model="searchInfo.params.order_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开票时间" class="grid-content" prop="timeValue">
            <el-date-picker
              ref="date_picker"
                size="mini"
                v-model="searchInfo.timeValue"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%;"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" width="180">
          <el-form-item label="开票地点" class="grid-content break_line"  width="180" prop="params.billing_location">
            <el-input size="mini" v-model="searchInfo.params.billing_location"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="出发/到达" class="grid-content" prop="params.related_type">
            <el-select size="mini" v-model="searchInfo.params.related_type" placeholder="" @change="showHide">
              <el-option label="出发" :value="0"></el-option>
              <el-option label="到达" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-if="show">
          <el-form-item label="单据类型" class="grid-content" prop="params.order_type">
            <el-select size="mini" v-model="searchInfo.params.order_type" placeholder="">
              <el-option label="主单" value="0"></el-option>
              <el-option label="分单" value="1"></el-option>
              <el-option label="邮件" value="2"></el-option>
              <el-option label="民航快递" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-if="shows">
          <el-form-item label="单据类型" class="grid-content" prop="params.order_type">
            <el-select size="mini" v-model="searchInfo.params.order_type" placeholder="">
              <el-option label="提货主单" value="0"></el-option>
              <el-option label="提货分单" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否已生成结算单" class="grid-content" prop="params.is_clear">
            <el-select size="mini" v-model="searchInfo.params.is_clear" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn_wrap">
      <el-row>
        <el-col :span="6" :offset="1">
          <set-clear :type='type' :array="cancelList" :listData="listData" :isAll="is_all_select" :title="this.title" @open="open"/>
        </el-col>
        <el-col :span="6" :offset="10">
        <div class="grid-content bg-purple">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
        </div>
        </el-col>
      </el-row>
    </div>
    <div class="receive_list">
      <el-table :data="tableData" border style="width: 100%" @selection-change="getCancelList" :height="this.screenHeight - 390"
        v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" size="small" >
        <el-table-column width="60" type="selection"></el-table-column>
        <el-table-column fixed width="60" type="index" :index="indexMethod" label="序号"></el-table-column>
        <el-table-column fixed label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="费用详情" placement="left">
              <el-button type="primary" icon="el-icon-fa-jpy" size="mini" @click="cashDetail(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable prop="order_no" label="运单号"></el-table-column>
        <el-table-column sortable prop="order_type" label="单据类型" :formatter="orderTypr"></el-table-column>
        <el-table-column sortable prop="clear_unit" label="结算单位"></el-table-column>
        <el-table-column sortable prop="total_cost" label="应收金额" v-if="this.title === '收款运单'"></el-table-column>
        <el-table-column sortable prop="total_cost" label="应付金额" v-if="this.title === '付款运单'"></el-table-column>
        <el-table-column sortable prop="billing_time" label="开票日期"></el-table-column>
        <el-table-column sortable prop="billing_location" label="开票地点"></el-table-column>
        <el-table-column sortable prop="is_clear" label="是否已生成结算单" :formatter='isClear'></el-table-column>
      </el-table>
      <el-pagination
        v-if="total"
        @current-change="pageChange"
        @size-change="sizeChange"
        :page-sizes="[10, 15, 20]"
        :current-page="searchInfo.params.currPage"
        :page-size="10"
        layout="sizes,total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 费用详情弹出框 -->
    <el-dialog title="费用详情" :visible.sync="cashVisible" width="1000px">
      <el-table :data="cashData" border style="width: 100%" size="small" show-summary :summary-method="getSummary">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="cost_name" label="费用名称"></el-table-column>
        <el-table-column prop="payee" label="收款单位"></el-table-column>
        <el-table-column prop="payer" label="付款单位"></el-table-column>
        <el-table-column prop="relevance_name" label="关联性"></el-table-column>
        <el-table-column prop="invoice_price" label="费率"></el-table-column>
        <el-table-column prop="invoice_choice_way_name" label="取舍方式"></el-table-column>
        <el-table-column prop="absolute_cost" label="绝对费用"></el-table-column>
        <el-table-column prop="actual_cost" label="实际费用"></el-table-column>
        <el-table-column prop="impact" label="影响应收最低费用" width="160" v-if="this.title === '收款运单'" :formatter="dataImpact"></el-table-column>
        <el-table-column prop="impact" label="影响应付最低费用" width="160" v-if="this.title === '付款运单'" :formatter="dataImpact"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="primary" size="mini" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const { Decimal } = require("../../utils/count.js")

import { mapState } from "vuex"

import SetClear from "./creatSheet.vue" //结算

import { formatTime } from "../../utils/time.js"

import { listOrder, getCostDetailByOrderNo, countSettlementOrder, } from "@/service/index.js"
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      type: "",
      loading: false,
      show: true,
      shows: false,
      title: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", [start, end])
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit("pick", [start, end])
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit("pick", [start, end])
            },
          },
        ],
      },
      searchInfo: {
        //search
        params: {
          receive_pay_type: "",  //收付款类型
          clear_unit: "", //结算单位
          order_no: "", //单号
          billing_time_start: "",   //开票时间起
          billing_time_end: "",  //开票时间终
          billing_location: "",  //开票地点
          order_type: '0', //单据类型
          currPage: 1,  //分页
          is_clear: "",  //是否结算
          related_type: 0,
        },
      },
      tableData: [],
      total: "",
      cancelList: [], //列表选中
      cashData:[], //费用详情表格数据
      cashVisible: false,
      is_all_select: '',
      receivePaymentOrderList: '',
      // 生成结算单
      listData: [],
    }
  },
  watch: {
    $route() {
      this.load()
    },
  },
  components: {
    SetClear,
  },
  computed: {
    ...mapState(["loadingTime"]),
  },
  mounted() {
    this.load()
  },
  methods: {
    open() {
      this.SettlementOrder()
    },
    pageChange(val) {
      this.searchInfo.params.currPage = val
      this.search()
    },
    sizeChange(size) {
      this.searchInfo.params.pageSize = size
      this.search()
    },
    load() {
      this.type = this.$route.params.type
      this.searchInfo.params.receive_pay_type = this.type === "recipt" ? 0 : 1
      this.title = this.type === "recipt" ? "收款运单" : "付款运单"
      // this.receive_payment_type = this.type === "recipt" ? 0 : 1
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
      this.search()
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    getCancelList(list) {
      this.cancelList = list.map(item => item)
      if(list > 10) {
        this.is_all_select = 1
      }else {
        this.is_all_select = 0
      }
    },
    checkList(a) {
      let o = this.searchInfo.params
      o.receive_pay_type = d.receive_pay_type
      o.clear_unit = d.clear_unit
      o.order_no = d.order_no
      o.billing_time_start = d.billing_time_start
      o.billing_time_end = d.billing_time_end
      o.billing_location = d.billing_location
      o.order_type = d.order_type
      o.currPage = d.currPage
      o.is_clear = d.is_clear
      o.related_type = d.related_type
    },
    // 点击查询，页面为第一页
    searchHandler() {
      this.searchInfo.params.currPage = 1
      this.search()
    },
    // 查询
    search() {
      this.loading = true
      if (this.searchInfo.timeValue) {
        this.searchInfo.params.billing_time_start = this.searchInfo.timeValue[0] || ""
        this.searchInfo.params.billing_time_end = this.searchInfo.timeValue[1] || ""
      } else {
        this.searchInfo.params.billing_time_start = ""
        this.searchInfo.params.billing_time_end = ""
      }
      listOrder({
        ...this.searchInfo.params,
      }).then(res => {
        // console.log(res.data.data[0].list)
        if(res.data.status === 200) {
          setTimeout(() => {
            this.loading = false
            this.tableData = res.data.data[0].list
            this.total = res.data.data[0].total

            this.$nextTick(() => {
              this.tableData = this.tableData.map(item => item)
            })
          },this.loadingTime)
        }
      })
    },
    // 是否已生成结算单
    isClear(row, colum, columValue) {
      return columValue ? '是' : '否'
    },
    showHide() {
      this.search()
      if(this.searchInfo.params.related_type === 0) {
        this.show = true
        this.shows = false
      } else if(this.searchInfo.params.related_type === 3) {
        this.shows = true
        this.show = false
      }
    },
    // 单据类型
    orderTypr(row, colum, columValue) {
      if(this.searchInfo.params.related_type === 0) {
        let orderStyle = ["主单", "分单", "邮件", "民航快递"]
        return orderStyle[columValue]
      }else if(this.searchInfo.params.related_type === 3) {
        setTimeout(() => {
          return columValue ? '提货分单' : '提货主单'
        },this.loadingTime)
      }
    },
    // 影响应收最低费用
    dataImpact(row, colum, columValue) {
      return columValue ? '是' : '否'
    },
    reset() {
      this.$refs["searchForm"].resetFields()
      this.$refs["date_picker"]._data.userInput = null
    },
    // 运单费用详情
    cashDetail(row) {
      this.cashVisible = true
      getCostDetailByOrderNo({
        related_type: row.related_type,
        receive_pay_type: row.receive_pay_type,
        order_no: row.order_no,
        clear_unit: row.clear_unit,
      }).then(res => {
        if(res.data.status === 200) {
          this.cashData = res.data.data
        }
      })
    },
    cancel() {
      this.cashVisible = false
    },
    // 生成结算单
    SettlementOrder() {
      countSettlementOrder({
        is_all_select: 0,
        receive_pay_type: this.type === "recipt" ? 0 : 1,
        receivePaymentOrderList: this.cancelList
      }).then(res => {
        if(res.data.status === 200) {
          this.listData = res.data.data
        }
      })
    },
    // 费用弹出框
    getSummary(param) {
      const { data } = param
      let sumInfo = data.reduce(
        (item1, item2) => {
          let getAbsoluteCost = Decimal.add([item1.absolute_cost || 0, item2.absolute_cost || 0]).toNumber()
          let getActualCost = Decimal.add([item1.actual_cost || 0, item2.actual_cost || 0]).toNumber()
          return {
            absolute_cost: getAbsoluteCost,
            actual_cost: getActualCost,
          }
        },
        {
          absolute_cost: 0,
          actual_cost: 0,
        },
      )
      this.getAbsoluteCost = sumInfo.absolute_cost
      this.getActualCost = sumInfo.actual_cost
      return ["合计", "", "", "", "", "", "", sumInfo.absolute_cost, sumInfo.actual_cost, "", ""]
    },
  },
}
</script>

<style lang="less">
.search_form {
  padding-bottom: 16px;
  border-bottom: 1px solid #d8dce5;
  margin-bottom: 12px;
}
.btn_wrap {
  margin-bottom: 10px;
}
</style>
