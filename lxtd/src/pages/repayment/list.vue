<template>
<div class="Search">
    <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="结算单位" class="grid-content" prop="params.clear_unit">
            <el-input size="mini" v-model="searchInfo.params.clear_unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生成时间" class="grid-content" prop="timeValue">
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
          <el-form-item label="是否已结算" class="grid-content" prop="params.is_clear">
            <el-select size="mini" v-model="searchInfo.params.is_clear" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
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
        <el-col :span="4">
          <el-form-item label="是否已核账" class="grid-content" prop="params.check_status">
            <el-select size="mini" v-model="searchInfo.params.check_status" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否作废" class="grid-content" prop="params.is_invalid">
            <el-select size="mini" v-model="searchInfo.params.is_invalid" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否已销账" class="grid-content" prop="params.sale_status">
            <el-select size="mini" v-model="searchInfo.params.sale_status" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="未销账" value="0"></el-option>
              <el-option label="已销账" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn_wrap">
      <el-row>
        <el-col :span="12" :offset="1">
          <div class="grid-content bg-purple">
            <el-button type="primary" size="mini" @click="check">核账通过</el-button>
            <el-button type="primary" size="mini" @click="unCheck">核账不通过</el-button>
            <set-clear :type='type' :array="cancelList" :idsList="idsList" @open="open" :isAll="is_all_select" :listData='listData' :title="this.title"/>
            <!-- <set-list :type='type' :array="cancelList" @open="openlist" :isAll="is_all_select" :listData='listData' title="全部结算"/> -->
            <el-button type="primary" size="mini" @click="destroyWrite">销账</el-button>
            <el-button type="primary" size="mini" @click="destroy">作废</el-button>
          </div>
        </el-col>
        <el-col :span="4" :offset="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="receive_list">
      <el-table :data="tableData" border style="width: 100%" 
        @selection-change="getCancelList" :height="this.screenHeight - 390" 
        :row-class-name="tableRowClassName"
        v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" size="small" >
        <el-table-column type="selection"></el-table-column>
        <el-table-column fixed type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
        <el-table-column fixed label="操作" width="140">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="结算单详情" placement="left">
              <el-button type="primary" icon="el-icon-view" size="mini" @click="cashDetail(scope.row)"></el-button>
            </el-tooltip>
            <!-- <el-tooltip class="item" effect="dark" content="账单打印" placement="left">
              <el-button type="primary" @click="print" icon="el-icon-printer" size="mini"></el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column sortable prop="clear_unit" label="结算单位"></el-table-column>
        <el-table-column sortable prop="check_status" label="核账是否通过" :formatter="checkStatus"></el-table-column>
        <el-table-column sortable prop="total_cost" label="应收金额" v-if="this.title === '收款结算单'"></el-table-column>
        <el-table-column sortable prop="settlement_cost" label="实收金额" v-if="this.title === '收款结算单'"></el-table-column>
        <el-table-column sortable prop="total_cost" label="应付金额" v-if="this.title === '付款结算单'"></el-table-column>
        <el-table-column sortable prop="settlement_cost" label="实付金额" v-if="this.title === '付款结算单'"></el-table-column>
        <el-table-column sortable prop="difference_cost" label="差额"></el-table-column>
        <el-table-column sortable prop="create_time" label="生成时间"></el-table-column>
        <el-table-column sortable prop="creator" label="生成人"></el-table-column>
        <el-table-column sortable prop="is_invalid" label="是否作废" :formatter="checkStatus"></el-table-column>
        <el-table-column sortable prop="check_person" label="核账人"></el-table-column>
        <el-table-column sortable prop="check_time" label="核账时间"></el-table-column>
        <el-table-column sortable prop="sale_status" label="是否已销账" :formatter="saleStatus"></el-table-column>
        <el-table-column sortable prop="sale_person" label="销账人"></el-table-column>
        <el-table-column sortable prop="sale_time" label="销账时间"></el-table-column>
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
    <end-print :data="tableData" :visible="printVisible" :flightInfo="searchInfo" :listPrint="listPrint" status="end" @close="close"/>
            
    <!-- 结算单详情弹出框 -->
    <el-dialog title="结算单详情" :visible.sync="cashVisible">
      <el-form label-position="left" inline class="bookingDetail">
				<el-form-item label="结算单号">
					<span>{{detail.serial_number}}</span>
				</el-form-item>
				<el-form-item label="结算单位">
					<span>{{detail.clear_unit}}</span>
				</el-form-item>
        <el-form-item label="总金额">
					<span>{{detail.total_cost}}</span>
				</el-form-item>
				<el-form-item label="结算金额">
					<span>{{detail.settlement_cost}}</span>
				</el-form-item>
        <el-form-item label="差额">
					<span>{{detail.difference_cost}}</span>
				</el-form-item>
				<el-form-item label="核账人">
					<span>{{detail.check_person}}</span>
				</el-form-item>
        <el-form-item label="核账时间">
					<span>{{detail.check_time}}</span>
				</el-form-item>
				<el-form-item label="核账是否通过">
					<span>{{state[detail.check_status]}}</span>
				</el-form-item>
        <el-form-item label="审核不通过原因">
					<span>{{detail.check_fail_reason}}</span>
				</el-form-item>
				<el-form-item label="生成人">
					<span>{{detail.creator}}</span>
				</el-form-item>
        <el-form-item label="生成时间">
					<span>{{detail.create_time}}</span>
				</el-form-item>
				<el-form-item label="是否作废">
					<span>{{state[detail.is_invalid]}}</span>
				</el-form-item>
        <el-form-item label="作废人">
					<span>{{detail.invalid_person}}</span>
				</el-form-item>
				<el-form-item label="作废时间">
					<span>{{detail.invalid_time}}</span>
				</el-form-item>
        <el-form-item label="销账人">
					<span>{{detail.sale_person}}</span>
				</el-form-item>
				<el-form-item label="销账时间">
					<span>{{detail.sale_time}}</span>
				</el-form-item>
        <el-form-item label="是否已销账">
					<span>{{state[detail.sale_status]}}</span>
				</el-form-item>
      </el-form>
      <el-table :data="cashData" border style="width: 100%" size="small" >
        <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
        <el-table-column prop="order_no" label="运单号"></el-table-column>
        <el-table-column prop="order_type" label="单据类型"></el-table-column>
        <el-table-column prop="clear_unit" label="结算单位"></el-table-column>
        <el-table-column prop="total_cost" label="应收费用" v-if="this.title === '收款结算单'"></el-table-column>
        <el-table-column prop="total_cost" label="应付费用" v-if="this.title === '付款结算单'"></el-table-column>
        <el-table-column prop="billing_time" label="开票时间"></el-table-column>
        <el-table-column prop="billing_location" label="开票地点"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="primary" size="mini" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
    <!-- 审核不通过弹出框 -->
    <el-dialog title="核账不通过原因" :visible.sync="checkVisible">
      <el-form :model="checkData">
		    <el-form-item label="" prop='unreply_reason'>
		      <el-input v-model="checkData.check_fail_reason" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>  
      <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="primary" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="unChecklist">确定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { mapState } from "vuex"

import SetClear from "./Settlement.vue" //结算

import SetList from "./setList.vue" //结算

import { formatTime } from "../../utils/time.js"

import EndPrint from "./print"

import {
  listSettlement,
  getSettlementById,
  updateCheckStatus,
  updateInvalidStatus,
  saveReceipt,
  updateSaleStatus,
  financeGetPayMethod,
} from "@/service/index.js"
export default {
  data() {
    return {
      state: ["否", "是"],
      screenHeight: window.innerHeight,
      type: "mutil",
      loading: false,
      printVisible: false,
      title: "收款结算单",
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
          receive_pay_type: "", //收付款类型
          clear_unit: "", //结算单位
          create_time_start: "", // 生成时间
          create_time_end: "",
          is_clear: "", //是否已结算 0否 1是
          check_status: "", //是否已核账 0否 1是
          is_clear_finish: "", //是否已结清  0否 1是
          is_invalid: "", //是否作废
          currPage: 1,
          sale_status: "",
        },
      },
      tableData: [],
      total: "",
      cancelList: [], //列表选中
      cashData: [], //费用详情表格数据
      cashVisible: false,
      checkData: {
        check_fail_reason: "",
      },
      checkVisible: false,
      ids: "",
      is_all_select: "",
      listData: [],
      listPrint: [],
      detail: {},
      idsList: "",
    }
  },
  watch: {
    $route() {
      this.load()
    },
  },
  components: {
    SetClear,
    SetList,
    EndPrint,
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
    financeGet() {
      financeGetPayMethod({
        settlementList: this.cancelList,
      }).then(res => {
        if(res.data.status === 200) {
          this.idsList = res.data.data.map(item => {
            return { value: item.name, label: item.name }
          })
        }
      })
    },
    load() {
      this.type = this.$route.params.type
      this.searchInfo.params.receive_pay_type = this.type === "recipt" ? 0 : 1
      this.title = this.type === "recipt" ? "收款结算单" : "付款结算单"
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
      this.search()
    },
    tableRowClassName({ row }) {
      // console.log()
      if (row.is_offset === 1) {
        return "cancel-row"
      } else if (row.easy_flag === null) {
        return "warning-row"
      } else {
        return "success-row"
      }
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
      this.loading = true
      if (this.searchInfo.timeValue) {
        this.searchInfo.params.create_time_start = this.searchInfo.timeValue[0] || ""
        this.searchInfo.params.create_time_end = this.searchInfo.timeValue[1] || ""
      } else {
        this.searchInfo.params.create_time_start = ""
        this.searchInfo.params.create_time_end = ""
      }
      listSettlement({
        ...this.searchInfo.params,
      }).then(res => {
        if (res.data.status === 200) {
          setTimeout(() => {
            this.loading = false
            this.tableData = res.data.data[0].list
            this.total = res.data.data[0].total
            this.$nextTick(() => {
              this.tableData = this.tableData.map(item => item)
            })
          }, this.loadingTime)
        }
      })
    },
    reset() {
      this.$refs["searchForm"].resetFields()
      this.$refs["date_picker"]._data.userInput = null
    },
    clear() {
      // console.log("结算")
    },
    // 是否为全选
    getCancelList(list) {
      this.cancelList = list.map(item => item)
      if (list > 10) {
        this.is_all_select = 1
      } else {
        this.is_all_select = 0
      }
    },
    // 核账通过
    check() {
      if (!this.cancelList.length) {
        this.$notify({
          title: "警告",
          message: "请选择要核账的数据",
          type: "warning",
        })
        return
      }
      this.$confirm("确定核账吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          updateCheckStatus({
            is_all_select: 0,
            check_status: 1,
            settlementList: this.cancelList,
          }).then(res => {
            if (res.data.status === 200) {
              this.$message({
                message: res.data.message,
                type: "success",
              })
            }
            this.searchHandler()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          })
        })
    },
    // 核账不通过原因
    unChecklist() {
      updateCheckStatus({
        is_all_select: 0,
        check_status: 0,
        check_fail_reason: this.checkData.check_fail_reason,
        settlementList: this.cancelList,
      }).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: res.data.message,
            type: "success",
          })
          this.checkVisible = false
          this.searchHandler()
        }
      })
    },
    checkNo() {
      this.checkData.check_fail_reason = ''
    },
    // 核账不通过按钮
    unCheck() {
      this.checkNo()
      if (!this.cancelList.length) {
        this.$notify({
          title: "警告",
          message: "请选择核账不通过的数据",
          type: "warning",
        })
        return
      } else {
        this.checkVisible = true
      }
    },
    // 结算单详情
    cashDetail(row) {
      // this.search()
      this.cashVisible = true
      getSettlementById({
        id: row.id,
      }).then(res => {
        if (res.data.status === 200) {
          this.cashData = res.data.data[0].receivePaymentOrderList
          this.detail = res.data.data[0]
        }
      })
    },
    // 取消
    cancel() {
      this.cashVisible = false
      this.checkVisible = false
    },
    checkStatus(row, colum, columValue) {
      if (columValue === null) {
        this.tableData.check_status = ""
      } else {
        return columValue ? "是" : "否"
      }
    },
    // 作废
    destroy() {
      if (!this.cancelList.length) {
        this.$notify({
          title: "警告",
          message: "请选择要作废的数据",
          type: "warning",
        })
        return
      }
      this.$confirm("确定作废吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          updateInvalidStatus({
            is_all_select: 0,
            check_status: 0,
            check_fail_reason: this.checkData.check_fail_reason,
            settlementList: this.cancelList,
            is_invalid: 1,
          }).then(res => {
            if (res.data.status === 200) {
              this.$message({
                message: res.data.message,
                type: "success",
              })
              this.searchHandler()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          })
        })
    },
    destroyWrite() {
      if (!this.cancelList.length) {
        this.$notify({
          title: "警告",
          message: "请选择要销账的数据",
          type: "warning",
        })
        return
      }
      this.$confirm("确定销账吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          updateSaleStatus({
            sale_status: 1,
            settlementList: this.cancelList,
            is_all_select: 0,
          }).then(res => {
            if (res.data.status === 200) {
              this.$message({
                message: res.data.message,
                type: "success",
              })
              this.searchHandler()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          })
        })
    },
    // tableRowClassName({ row }) {
    //   //数据过期
    //   // if (row[0] === "0") {
    //   //   return "cancel-row"
    //   // } else {
    //   //   return "success-row"
    //   // }
    // },
    openlist() {
      // this.listData = this.searchInfo.params
    },
    // 结算
    open() {
      this.listData = this.cancelList
      this.financeGet()
    },
    print() {
      this.printStatus = "end"
      this.printVisible = true
      this.listPrint = this.tableData
    },
    close() {
      this.printVisible = false
    },
    saleStatus(row, volumn, volumnValue) {
      return volumnValue ? "是" : "否"
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
.uncheck {
  width: 100%;
}
.bookingDetail label {
  width: 135px;
  color: #99a9bf;
}

.bookingDetail .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 40%;
}
.bookingDetail {
  max-height: 400px;
  overflow: auto;
  margin-bottom: 10px;
}
</style>
