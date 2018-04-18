<template>
<div class="Search">
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
        <el-row :gutter="10">
          <el-col :span="4" width="180">
            <el-form-item label="单号" class="grid-content break_line"  width="180" prop="params.order_no">
              <el-input size="mini" v-model="searchInfo.params.order_no" placeholder="单号"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
            <el-form-item label="结算单位" class="grid-content" prop="params.clear_unit">
              <el-select size="mini" v-model="searchInfo.params.clear_unit" placeholder="">
                <el-option label="安丰田" value="安丰田"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <div class="btn_wrap">
        <el-row>
          <el-col :span="6" :offset="18">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
          </div>
          </el-col>
        </el-row>
      </div>
      <div class="receive_list">
        <el-table :data="tableData" highlight-current-row border style="width: 100%" @current-change="getCancelList" :height="this.screenHeight - 360"
          v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" size="small" >
          <el-table-column fixed width="60" type="index" :index="indexMethod" label="序号"></el-table-column>
          <el-table-column fixed label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="费用详情" placement="left">
                <el-button type="primary" icon="el-icon-fa-jpy" size="mini" @click="cashDetail(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column sortable prop="order_no" label="运单号"></el-table-column>
          <el-table-column sortable prop="order_type" label="单据类型"></el-table-column>
          <el-table-column sortable prop="clear_unit" label="结算单位"></el-table-column>
          <el-table-column sortable prop="total_cost" label="应收金额"></el-table-column>
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
      <el-table :data="cashData" border style="width: 100%" size="small" show-summary>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="cost_name" label="费用名称"></el-table-column>
        <el-table-column prop="payee" label="收款单位"></el-table-column>
        <el-table-column prop="payer" label="付款单位"></el-table-column>
        <el-table-column prop="relevance_name" label="关联性"></el-table-column>
        <el-table-column prop="invoice_price" label="费率"></el-table-column>
        <el-table-column prop="invoice_choice_way_name" label="取舍方式"></el-table-column>
        <el-table-column prop="absolute_cost" label="绝对费用"></el-table-column>
        <el-table-column prop="actual_cost" label="实际费用"></el-table-column>
        <el-table-column prop="impact" label="影响应收最低费用" width="160" :formatter="dataImpact"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="primary" size="mini" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
      <div class="btn_wrap">
        <el-row>
          <el-col :span="3" :offset="20">
          <div class="grid-content bg-purple" style="margin-top: 30px;">
            <set-clear :array="cancelList" @open="open" :listData='listData' title="确认收款" :isSingle="true"/>
          </div>
          </el-col>
        </el-row>
      </div>
</div>
</template>
<script>
import { mapState } from "vuex"

import SetClear from "./setList.vue" //结算

import { formatTime } from "../../utils/time.js"

import { singleTicketReceipt, listOrder, getCostDetailByOrderNo } from "@/service/index.js"
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      type: "single",
      loading: false,
      title: "单票收款",
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
      searchInfo: {//search
        params: {
          order_no: "", //单号
          clear_unit: "",
          currPage: 1,
        },
      },
      tableData: [],
      total: "",
      cancelList: [],
      listData: [],
      cashData: [],
      cashVisible: false,
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
    pageChange(val) {
      this.searchInfo.params.currPage = val
      this.search()
    },
    sizeChange(size) {
      this.searchInfo.params.pageSize = size
      this.search()
    },
    getCancelList(list) {
      this.cancelList = list
    },
    open() {
      this.listData = [this.cancelList]
    },
    load() {
      // this.type = this.$route.params.type
      // this.searchInfo.params.type = 0 
      this.title = "单票收款"
      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.search()
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    // 点击查询，页面为第一页
    searchHandler() {
      this.searchInfo.params.currPage = 1
      this.search()
    },
    search() {
      listOrder({
        ...this.searchInfo.params,
        receive_pay_type: 0,
        related_type: 0,
      }).then(res => {
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
      // singleTicketReceipt({
      //   receivePaymentOrderList: this.searchInfo.params
      // }).then(res => {
      //   if(res.data.status === 200) {
      //     console.log(res.data)
      //   }
      // })
    },
    reset() {
      this.$refs["searchForm"].resetFields()
      // this.$refs["date_picker"]._data.userInput = null
    },
    // 是否已生成结算单
    isClear(row, colum, columValue) {
      return columValue ? '是' : '否'
    },
    // 运单费用详情
    cashDetail(row) {
      this.cashVisible = true
      getCostDetailByOrderNo({
        related_type: row.related_type,
        receive_pay_type: 0,
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
    // 影响应收最低费用
    dataImpact(row, colum, columValue) {
      return columValue ? '是' : '否'
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
