/**
 * 马少良
 */
 
<template>
<div class="Search">
  <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
    <el-row :gutter="10">
      <el-col :span="4">
        <el-form-item label="邮单号" class="grid-content break_line">
          <el-col :span="9">
            <el-form-item prop="params.order_three_code">
              <el-input size="mini" v-model="searchInfo.params.order_three_code" placeholder="三字码"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="14">
            <el-form-item prop="params.order_num">
              <el-input size="mini" v-model="searchInfo.params.order_num" placeholder="八位数字"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="单据类型" class="grid-content" prop="params.receipt_type">
          <el-select size="mini" v-model="searchInfo.params.receipt_type" placeholder="" @change='receiptType'>
            <el-option label="即时" :value="0"></el-option>
            <el-option label="事后" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="制单类型" class="grid-content" prop="params.easy_flag">
          <el-select size="mini" v-model="searchInfo.params.easy_flag" placeholder="" ref='easy_flag' @change='easyFlag'>
            <el-option label="全部" value=""></el-option>
            <el-option label="正常制单" value="0"></el-option>
            <el-option label="简易制单" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="出港状态" class="grid-content" prop="params.departure_status">
          <el-select size="mini" v-model="searchInfo.params.departure_status" placeholder="" ref='departure_status' 
         @change='departureStatus'>
            <el-option label="全部" value=""></el-option>
            <el-option label="未出港" value="0"></el-option>
            <el-option label="部分出港" value="1"></el-option>
            <el-option label="已出港" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="始发站" class="grid-content" prop="params.departure">
          <el-select size="mini" filterable remote allow-create default-first-option placeholder="" clearable
            ref="departure"
            v-model="searchInfo.params.departure"
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
        <el-form-item label="目的站" class="grid-content" prop="params.destination">
          <el-select size="mini" filterable allow-create remote default-first-option placeholder="" clearable
            v-model="searchInfo.params.destination"
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
        <el-form-item label="发货人" class="grid-content" prop="params.sender">
          <el-input size="mini" v-model="searchInfo.params.sender" placeholder="发货人代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="收货人" class="grid-content" prop="params.receiver">
          <el-input size="mini" v-model="searchInfo.params.receiver" placeholder="收货人代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="单据状态" class="grid-content" prop="params.state">
          <el-select size="mini" placeholder="" v-model="searchInfo.params.state">
            <el-option label="全部" value=""></el-option>
            <el-option label="已使用" :value="0"></el-option>
            <el-option label="已作废" :value="1"></el-option>
            <el-option label="已打单" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开票日期" class="grid-content" prop="timeValue">
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
    </el-row>
  </el-form>
  <div class="btn_wrap">
    <el-row>
      <el-col :span="3" :offset="1">
        <el-button type="warning" icon="el-icon-delete" size="mini" @click="cancel">作废</el-button>
      </el-col>
      <el-col :span="8" :offset="11">
      <div class="grid-content bg-purple" style="float: right">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
      </div>
      </el-col>
    </el-row>
  </div>
  <div class="receive_list">
    <el-table :data="tableData" border style="width: 100%" :height="this.screenHeight - 520" size="small" 
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    @selection-change="getCancelList"
    :row-class-name="tableRowClassName">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
      <el-table-column fixed label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="left">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column sortable prop="order_no" label="邮单号" width="100">></el-table-column>
      <el-table-column sortable prop="departure" label="始发站" width="100"></el-table-column>
      <el-table-column sortable prop="destination" label="目的站" width="100"></el-table-column>
      <el-table-column sortable prop="state" label="单号状态" :formatter="stateFormat"></el-table-column>
      <el-table-column sortable prop="sender_name" label="发货人名称" width="150"></el-table-column>
      <el-table-column sortable prop="receiver_name" label="收货人名称" width="150"></el-table-column>
      <el-table-column sortable prop="billing_time" label="开票时间" width="140" :formatter="timeFormat"></el-table-column>
      <el-table-column sortable prop="receiver_telephone" label="收货人电话" width="120"></el-table-column>
      <el-table-column sortable prop="departure_status" label="出港状态" :formatter="depStateFormat"></el-table-column>
      <el-table-column sortable prop="sender_telephone" label="发货人电话" width="120"></el-table-column>
      <el-table-column sortable prop="correspond_order_no" label="对应单号" width="200"></el-table-column>
    </el-table>
    <el-pagination
      v-if="total"
      @current-change="pageChange"
      @size-change="sizeChange"
      :current-page="searchInfo.params.currPage"
      :page-size="10"
      :page-sizes="[10, 15, 20]"
      layout="sizes, total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import { getReciveList, cancelOrders } from "../../service"
import { formatTime } from "../../utils/time.js"
import { mapState } from "vuex"
import getCityMixin from "@/mixin/getCityMixin"
export default {
  mixins: [getCityMixin],
  data() {
    return {
      type: "",
      title: "邮件管理",
      searchInfo: {
        params: {
          type: 2,
          state: '',
          order_three_code: "", // 单号三字码
          order_num: "", // 单号八位数字
          receipt_type: 0, // 单据类型
          easy_flag: "", // 制单类型
          departure_status: "", // 出港状态
          departure: "", // 始发站
          destination: "", // 目的站
          sender: "", // 发货人,
          receiver: "", // 收货人,
          billing_time_start: "", // 开始日期
          billing_time_end: "", // 结束日期
          currPage: 1,
          pageSize: 10,
        },
        timeValue: "",
      },
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
      tableData: [],
      total: "",
      loading: false,
      cancelList: [],
      departures: [],
      destinations: [],
      screenHeight: window.screen.height,
    }
  },
  mounted() {
    this.load()
  },
  computed: {
    ...mapState(["loadingTime", "orderType"]),
  },
  methods: {
    load() {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
      this.search()
    },
    searchHandler() {
      this.searchInfo.params.currPage = 1
      this.search()
    },
    search() {
      this.loading = true

      if (this.searchInfo.timeValue) {
        this.searchInfo.params.billing_time_start = this.searchInfo.timeValue[0] || ""
        this.searchInfo.params.billing_time_end = this.searchInfo.timeValue[1] || ""
      } else {
        this.searchInfo.params.billing_time_start = ""
        this.searchInfo.params.billing_time_end = ""
      }

      getReciveList(this.searchInfo.params)
        .then(res => {
          if (res.data.status === 200) {
            setTimeout(() => {
              this.loading = false
              this.tableData = res.data.data[0].list
              this.total = res.data.data[0].total
            }, this.loadingTime)
          } else {
            this.loading = false
            this.$message({
              type: "warning",
              message: res.data.message,
            })
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    add() {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-添加")
      this.$router.push(`/mail/billing/detail`)
    },
    reset() {
      this.$refs["date_picker"]._data.userInput = null
      this.$refs["searchForm"].resetFields()
    },
    edit(item) {
      if (item.state === 1) {
        this.$notify({
          title: "警告",
          message: "该单据已作废",
          type: "warning",
        })
        return
      }
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-编辑")
      this.$router.push(`/mail/billing/detail/${item.order_no}`)
    },
    stateFormat(row, column, cellValue) {
      let arr = ["未完成", "已使用", "已作废", "已打单"]
      return arr[cellValue + 1]
    },
    depStateFormat(row, column, cellValue) {
      let stateArr = ["未出港", "部分出港", "已出港"]
      return stateArr[cellValue]
    },
    timeFormat(row, column, cellValue) {
      return formatTime(cellValue)
    },
    pageChange(val) {
      this.searchInfo.params.currPage = val
      this.search()
    },
    sizeChange(size) {
      this.searchInfo.params.pageSize = size
      this.search()
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    tableRowClassName({ row }) {
      if (row.easy_flag === null) {
        return "warning-row"
      } else if (row.state === 1) {
        return "cancel-row"
      } else {
        return "success-row"
      }
    },
    receiptType() {
      this.$refs["easy_flag"].focus()
    },
    easyFlag() {
      this.$refs["departure_status"].focus()
    },
    departureStatus() {
      this.$refs["departure"].focus()
    },
    getCancelList(list) {
      this.cancelList = list.map(item => item.order_no)
    },
    cancelOrder() {
      cancelOrders({ order_nos: this.cancelList, type: this.orderType, currentUnit: this.$getStore("unit"), }).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: "作废成功",
            type: "success",
          })
          this.search()
        } else {
          this.$notify({
            title: "警告",
            message: res.data.message,
            type: "warning",
          })
        }
      })
    },
    cancel() {
      if (!this.cancelList.length) {
        this.$notify({
          title: "警告",
          message: "请选择要作废的单据",
          type: "warning",
        })
        return
      }

      this.$confirm("确定要作废吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      }).then(() => {
        this.cancelOrder()
      })
    },
  },
}
</script>
