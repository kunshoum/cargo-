/**
 * 马少良
 */
 
<template>
<div class="Search">
  <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
    <el-row :gutter="10">
      <el-col :span="4">
        <el-form-item :label="this.orderType === 0 ? '运单号' : '分单号'" class="grid-content break_line">
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
      <!-- <el-col :span="4">
        <el-form-item label="单据类型" class="grid-content" prop="params.receipt_type">
          <el-select size="mini" v-model="searchInfo.params.receipt_type" placeholder="" @change='receiptType'>
            <el-option label="全部" value=""></el-option>
            <el-option label="及时" value="0"></el-option>
            <el-option label="事后" value="1"></el-option>
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
      </el-col> -->
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
          <el-select size="mini" filterable remote allow-create default-first-option placeholder="" clearable
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
          <el-input size="mini" v-model="searchInfo.params.sender"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="收货人" class="grid-content" prop="params.receiver">
          <el-input size="mini" v-model="searchInfo.params.receiver"></el-input>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="4">
        <el-form-item label="是否作废" class="grid-content" prop="params.abolish_flag">
          <el-select size="mini" placeholder="" v-model="searchInfo.params.abolish_flag">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col> -->
      <el-col :span="4">
        <el-form-item label="单据状态" class="grid-content" prop="params.state">
          <el-select size="mini" placeholder="" v-model="searchInfo.params.state">
            <el-option label="全部" value=""></el-option>
            <el-option label="未完成" :value="-1"></el-option>
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
    :row-class-name="tableRowClassName"
    @selection-change="getCancelList"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="储运备注">
              <span>{{ props.row.other_storage_remark}}</span>
            </el-form-item>
            <el-form-item label="出港状态">
              <span>{{ ["未出港", "部分出港", "已出港"][props.row.departure_status || 0]}}</span>
            </el-form-item>
            <el-form-item label="提货方式">
              <span>{{ ["机场自提","配送","中转"][props.row.delivery_mode - 1] }}</span>
            </el-form-item>
            <el-form-item label="承运人储运备注" v-if="orderType === 0">
              <span>{{ props.row.carrier_storage_remark}}</span>
            </el-form-item>
            <el-form-item label="预计航班日期">
              <span>{{ props.row.expected_flight_time}}</span>
            </el-form-item>
            <el-form-item label="预计航班号">
              <span>{{ props.row.expected_flight_no}}</span>
            </el-form-item>
            <el-form-item label="第一程">
              <span>{{ props.row.first_transfer_process}}</span>
            </el-form-item>
            <el-form-item label="是否中转">
              <span>{{ ["不中转", "中转"][props.row.air_transit || 0] }}</span>
            </el-form-item>
            <el-form-item label="第二程">
              <span>{{ props.row.second_transfer_process}}</span>
            </el-form-item>
            <el-form-item label="体积">
              <span>{{ props.row.volume}}</span>
            </el-form-item>
            <el-form-item label="实重">
              <span>{{ props.row.net_weight}}</span>
            </el-form-item>
            <el-form-item label="包装">
              <span>{{ props.row.packaging}}</span>
            </el-form-item>
            <el-form-item label="对应单号">
              <span>{{ props.row.correspond_order_no}}</span>
            </el-form-item>
            <el-form-item label="应收总费用">
              <span>{{ props.row.receive_total_cost}}</span>
            </el-form-item>
            <el-form-item label="应付总费用">
              <span>{{ props.row.pay_total_cost}}</span>
            </el-form-item>
            <el-form-item label="商品代码">
              <span>{{ props.row.product_code}}</span>
            </el-form-item>
            <el-form-item label="自分类别">
              <span>{{ props.row.your_category}}</span>
            </el-form-item>
            <el-form-item label="发货人电话">
              <span>{{ props.row.sender_telephone}}</span>
            </el-form-item>
            <el-form-item label="发货人地址">
              <span>{{ props.row.sender_address}}</span>
            </el-form-item>
            <el-form-item label="收货人电话">
              <span>{{ props.row.receiver_telephone}}</span>
            </el-form-item>
            <el-form-item label="收货人地址">
              <span>{{ props.row.receiver_address}}</span>
            </el-form-item>
            <el-form-item label="结算备注">
              <span>{{ props.row.billing_remark}}</span>
            </el-form-item>
            <el-form-item label="拼货网络公司">
              <span>{{ props.row.joint_network_company}}</span>
            </el-form-item>
            <el-form-item label="提货电话">
              <span>{{ props.row.signer_telephone}}</span>
            </el-form-item>
            <el-form-item label="保险价值">
              <span>{{ props.row.insurance_value}}</span>
            </el-form-item>
            <el-form-item label="申明价值">
              <span>{{ props.row.declared_value}}</span>
            </el-form-item>
            <el-form-item label="价种">
              <span>{{ props.row.price_species}}</span>
            </el-form-item>
            <el-form-item label="开票价">
              <span>{{ props.row.invoice_price}}</span>
            </el-form-item>
            <el-form-item label="销售价">
              <span>{{ props.row.sale_price}}</span>
            </el-form-item>
            <el-form-item label="付款方式">
              <span>{{ props.row.payment_method}}</span>
            </el-form-item>
            <el-form-item label="是否预付">
              <span>{{ ["预付","网络公司到付","收货人到付"][props.row.pre_arrive_pay || 0]}}</span>
            </el-form-item>
            <el-form-item label="发货去向">
              <span>{{ props.row.ship_whereabouts}}</span>
            </el-form-item>
            <el-form-item label="签收状态">
              <span>{{ ["未签收","已签收"][props.row.sign_state || 0]}}</span>
            </el-form-item>
            <el-form-item label="签收件数">
              <span>{{ props.row.sign_quantity}}</span>
            </el-form-item>
            <el-form-item label="开票人">
              <span>{{ props.row.issuer}}</span>
            </el-form-item>
            <el-form-item label="开票时间">
              <span>{{ props.row.billing_time | formatTime}}</span>
            </el-form-item>
            <el-form-item label="开票地点">
              <span>{{ props.row.billing_location}}</span>
            </el-form-item>
            <el-form-item label="修改人">
              <span>{{ props.row.update_person}}</span>
            </el-form-item>
            <el-form-item label="修改时间">
              <span>{{ props.row.update_time | formatTime}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
      <el-table-column fixed label="操作"  width="70">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="left">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column sortable prop="order_no" :label="this.orderType === 0 ? '运单号' : '分单号'" width="120">></el-table-column>
      <el-table-column sortable v-if="orderType === 0" prop="departure_priority" label="出发优先级" :formatter="priorityFormat" width="100"></el-table-column>
      <el-table-column sortable prop="destination" label="目的站" width="120"></el-table-column>
      <el-table-column sortable prop="state" label="单号状态" :formatter="stateFormat"></el-table-column>
      <el-table-column sortable prop="sender" label="发货人" width="150"></el-table-column>
      <el-table-column sortable prop="receiver" label="收货人" width="150"></el-table-column>
      <el-table-column sortable prop="billing_time" label="开票时间" width="160" :formatter="timeFormat"></el-table-column>
      <el-table-column sortable prop="product" label="品名" width="120"></el-table-column>
      <el-table-column sortable prop="product_category" label="货物类别"></el-table-column>
      <el-table-column sortable prop="quantity" align="right" label="件数" width="55"></el-table-column>
      <el-table-column sortable prop="weight" align="right" label="计重" width="55"></el-table-column>
    </el-table>
    <el-pagination
      v-if="total > 10"
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
import { getCity } from "@/linkQuery"

import { formatTime } from "../../utils/time.js"
import { mapState } from "vuex"
import getCityMixin from "@/mixin/getCityMixin"
export default {
  mixins: [getCityMixin],

  data() {
    return {
      type: "",
      title: "收货主单",
      searchInfo: {
        params: {
          type: 0,
          state: '',
          // abolish_flag: 0,
          order_three_code: "", // 单号三字码
          order_num: "", // 单号八位数字
          receipt_type: "", // 单据类型
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
        timeValue: [],
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
      unitIds: [],
      departures: [],
      destinations: [],
      screenHeight: window.screen.height,
      addAuth: true,
    }
  },

  watch: {
    "$route.params.type"() {
      this.reset()
      this.load()
    },
  },

  mounted() {
    this.load()
  },

  computed: {
    ...mapState(["loadingTime", "orderType","isChange"]),
  },
  
  methods: {
    load() {
      this.type = this.$route.params.type
      this.searchInfo.params.type = this.type === "sub" ? 1 : 0
      this.pageId = this.type === "sub" ? 1003 : 1002
      this.title = this.type === "sub" ? "收货分单" : "收货主单"
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
      this.searchHandler()
      // this.getPageItem()
    },
    getPageItem() {
      let list = JSON.parse(this.$getStore("authList")).filter(item => item.parent_id === this.pageId && item.is_select)
      .map(item => item.name)

      this.addAuth = new Set(list).has("添加")
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
          if (res.status === 200) {
            setTimeout(() => {
              this.loading = false
              this.tableData = res.data.data[0].list
              this.total = res.data.data[0].total
              
              this.$nextTick(() => {
                // 触发页面重绘,解决第一次渲染时滚动条样式位置不对问题
                this.tableData = this.tableData.map(item => item)
              })
            }, this.loadingTime)
          }
        })
        .catch(err => {
          this.loading = false
        })
    },

    add() {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-添加")
      this.$store.commit("IS_CHANGE", 1)
      this.$router.push(`/receive/${this.type}/billing/detail`)
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
      this.$router.push(`/receive/${this.type}/billing/detail/${item.order_no}`)
    },
    stateFormat(row, column, cellValue) {
      let arr = ["未完成", "已使用", "已作废", "已打单"]
      return arr[cellValue + 1]
    },
    timeFormat(row, column, cellValue) {
      return formatTime(cellValue)
    },
    priorityFormat(row, column, cellValue) {
      return cellValue ? '优先' : '普通'
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
      if (row.state === 1) {
        return "cancel-row"
      } else if (row.state === -1) {
        return "warning-row"
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
      this.unitIds = list.map(item => item.data_unit_id)
    },
    cancelOrder() {
      cancelOrders({
        order_nos: this.cancelList,
        unitIds:this.unitIds,
        type: this.orderType,
        currentUnit: this.$getStore("unit"),
      }).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: "作废成功",
            type: "success",
          })
          this.searchInfo.params.currPage = 1
          this.search()
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

<style lang="less">
  .receive_list {
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 140px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 33%;
    }
  }
</style>
