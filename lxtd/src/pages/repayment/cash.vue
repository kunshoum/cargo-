<template>
<div class="Search">
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="收款单流水号" class="grid-content break_line"  width="180" prop="params.serial_number">
              <el-input size="mini" v-model="searchInfo.params.serial_number" placeholder="收款单流水号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="结算单位" class="grid-content break_line"  width="180" prop="params.clear_unit">
              <el-input size="mini" v-model="searchInfo.params.clear_unit" placeholder="结算单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款时间" class="grid-content" prop="timeValue">
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
          <el-col :span="4">
            <el-form-item label="是否已结清" class="grid-content" prop="params.is_clear_finish">
              <el-select size="mini" v-model="searchInfo.params.is_clear_finish" placeholder="">
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
          <!-- <el-col :span="6" :offset="1">
            <div class="grid-content bg-purple">
              <el-button type="primary" size="mini" @click="destroy">销账</el-button>
            </div>
          </el-col> -->
          <el-col :span="6" :offset="18">
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="receive_list">
        <el-table :data="tableData" border style="width: 100%" 
          @selection-change="getCancelList" :height="this.screenHeight - 330" 
          v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" size="small" >
          <el-table-column type="selection"></el-table-column>
          <el-table-column fixed type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
          <el-table-column fixed label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看详情" placement="left">
                <el-button type="primary" icon="el-icon-view" size="mini" @click="cashDetail(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column sortable prop="serial_number" label="结算单号"></el-table-column>
          <el-table-column sortable prop="clear_unit" label="结算单位"></el-table-column>
          <el-table-column sortable prop="total_cost" label="应收金额" v-if="this.title === '收款单'"></el-table-column>  
          <el-table-column sortable prop="settlement_cost" label="实收金额" v-if="this.title === '收款单'"></el-table-column>
          <el-table-column sortable prop="total_cost" label="应付金额" v-if="this.title === '付款单'"></el-table-column>  
          <el-table-column sortable prop="settlement_cost" label="实付金额" v-if="this.title === '付款单'"></el-table-column>
          <el-table-column sortable prop="discount" label="优惠金额"></el-table-column>
          <el-table-column sortable prop="difference_cost" label="差额"></el-table-column>
          <el-table-column sortable prop="operator" label="收款人" v-if="this.title === '收款单'"></el-table-column>
          <el-table-column sortable prop="operate_time" label="收款时间" v-if="this.title === '收款单'"></el-table-column>
          <el-table-column sortable prop="operator" label="付款人" v-if="this.title === '付款单'"></el-table-column>
          <el-table-column sortable prop="operate_time" label="付款时间" v-if="this.title === '付款单'"></el-table-column>
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
      <!-- 详情弹出框 -->
      <el-dialog :title="title + '详情'" :visible.sync="cashVisible">
        <el-table :data="cashData" border style="width: 100%" size="small" >
          <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
          <el-table-column prop="serial_number" label="结算单号"></el-table-column>
          <el-table-column prop="clear_unit" label="结算单位"></el-table-column>
           <el-table-column prop="total_cost" label="应收金额" v-if="this.title === '收款单'"></el-table-column>  
          <el-table-column prop="settlement_cost" label="实收金额" v-if="this.title === '收款单'"></el-table-column>
          <el-table-column prop="total_cost" label="应付金额" v-if="this.title === '付款单'"></el-table-column>  
          <el-table-column prop="settlement_cost" label="实付金额" v-if="this.title === '付款单'"></el-table-column>
          <el-table-column prop="difference_cost" label="差额"></el-table-column>
          <el-table-column prop="creator" label="生成人"></el-table-column>
          <el-table-column prop="create_time" label="生成时间"></el-table-column>
        </el-table>
        <el-pagination
          v-if="total"
          @current-change="pageChange"
          :current-page="searchInfo.params.currPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total">
          </el-pagination>
        <div slot="footer" class="dialog-footer" style="text-align:right;">
          <el-button type="primary" size="mini" @click="cancel">取消</el-button>
        </div>
      </el-dialog>
</div>
</template>
<script>
import { mapState } from "vuex"

import { formatTime } from "../../utils/time.js"

import { listReceipt, getReceiptById, updateSaleStatus } from "@/service/index.js"
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      type: "",
      loading: false,
      title: "收款单",
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
          serial_number: "",     //收款单流水号
          clear_unit: "",     //结算单位
          operate_time_start: "",     //收款时间
          operate_time_end: "",     //
          is_clear_finish: "",     //是否结清
          sale_status: "",     //是否已销账
          currPage: 1,
          receive_pay_type: "",
        },
      },
      tableData: [],
      total: "",
      cancelList:[], //列表选中
      cashData:[{},{}], //费用详情表格数据
      cashVisible: false,
    }
  },
  watch: {
    $route() {
      this.load()
    },
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
    load() {
      this.type = this.$route.params.type
      this.searchInfo.params.receive_pay_type = this.type === "recipt" ? 0 : 1
      this.title = this.type === "recipt" ? "收款单" : "付款单"
      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.search()
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    getCancelList(list) {
      this.cancelList = list.map(item => item)
      if (list > 10) {
        this.is_all_select = 1
      } else {
        this.is_all_select = 0
      }
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
        this.searchInfo.params.operate_time_start = this.searchInfo.timeValue[0] || ""
        this.searchInfo.params.operate_time_end = this.searchInfo.timeValue[1] || ""
      } else {
        this.searchInfo.params.operate_time_start = ""
        this.searchInfo.params.operate_time_end = ""
      }
      listReceipt({
        ...this.searchInfo.params,
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
    },
    reset() {
      this.$refs["searchForm"].resetFields()
      this.$refs["date_picker"]._data.userInput = null
    },
    
    cashDetail(row) {
      this.cashVisible = true
      getReceiptById({
        id: row.id
      }).then(res => {
        if(res.data.status === 200) {
          this.cashData = res.data.data[0].settlementList
        }
      })
    },
    cancel() {
      this.cashVisible = false
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
