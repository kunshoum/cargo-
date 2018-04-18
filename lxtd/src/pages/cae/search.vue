<template><!--王艺蒙50%-->
<div class="Search">
  <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
    <el-row :gutter="10">
      <el-col :span="4" width="180">
        <el-form-item label="单号" class="grid-content break_line"  width="180">
          <el-col :span="9" width="180">
            <el-form-item prop="params.order_three_code"  width="180">
              <el-input size="mini" v-model="searchInfo.params.order_three_code" placeholder="三字码" width="180"></el-input>
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
        <el-form-item label="开票地点" class="grid-content" prop="params.billing_location">
          <el-input size="mini" v-model="searchInfo.params.billing_location" placeholder="目的站代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="始发站" class="grid-content" prop="params.departure_code">
          <el-input size="mini" v-model="searchInfo.params.departure_code" placeholder="始发站代码"></el-input>
        </el-form-item>
      </el-col>
       <el-col :span="4">
        <el-form-item label="客服状态" class="grid-content" prop="params.customer_status">
          
          <el-select v-model="searchInfo.params.customer_status" size="mini">
							<el-option v-for="item in status_name" placeholder=''
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
        </el-form-item>
        
      </el-col>
     
       <el-col :span="8">
        <el-form-item label="开票日期" class="grid-content" prop="timeValue">
          <el-date-picker
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
      <el-col :span="2" :offset="1">
        <el-button type="warning" icon="el-icon-delete" size="mini" @click="cancel">作废</el-button>
      </el-col>
      <el-col :span="6" :offset="15">
      <div class="grid-content bg-purple">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
      </div>
      </el-col>
    </el-row>
  </div>
  <div class="receive_list">
    <el-table :data="tableData" border style="width: 100%" height="370" size="small" 
    :row-class-name="tableRowClassName" 
    @selection-change="getCancelList">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
      <el-table-column fixed label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="left">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="searchEdit(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column sortable prop="order_no" label="单号" width="110"></el-table-column>
      <el-table-column sortable prop="correspond_order_no" label="对应单号"></el-table-column>
      <el-table-column sortable prop="expected_flight_time" label="计划起飞时间"></el-table-column>
      <el-table-column sortable prop="departure" label="始发站"></el-table-column>
      <el-table-column sortable prop="destination" label="目的站"></el-table-column>
      <el-table-column sortable prop="state" label="单号状态" :formatter="orderStateFormat"></el-table-column>
      <el-table-column sortable prop="first_transfer_process" label="第一程"></el-table-column>
      <el-table-column sortable prop="air_transit" label="空运中转" :formatter="stateFormat"></el-table-column>
      <el-table-column sortable prop="sender_name" label="发货人名称"></el-table-column>
      <el-table-column sortable prop="receiver_name" label="收货人名称"></el-table-column>
      <el-table-column sortable prop="billing_location" label="开票地点"></el-table-column>
      <el-table-column sortable prop="issuer" label="开票人"></el-table-column>
      <el-table-column sortable prop="billing_time" label="开票日期"></el-table-column>
      <el-table-column sortable prop="price_species_name" label="价种"></el-table-column>
      <el-table-column sortable prop="quantity" label="件数"></el-table-column>
      <el-table-column sortable prop="net_weight" label="毛重"></el-table-column>
      <el-table-column sortable prop="weight" label="计重"></el-table-column>
      <el-table-column sortable prop="volume" label="体积"></el-table-column>
      <el-table-column sortable prop="product_name" label="品名"></el-table-column>
      <el-table-column sortable prop="product_category" label="货物类别"></el-table-column>
      <el-table-column sortable prop="packaging" label="包装"></el-table-column>
    </el-table>
    <el-pagination
      v-if="total"
      @current-change="pageChange"
      :current-page="searchInfo.params.currPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
// 查询分页
import { pageQueryCA, cancelOrders } from "../../service"
import { queryCustServiceState } from "../../service"
import { formatTime } from "../../utils/time.js"
import { mapState } from "vuex"

export default {
  data() {
    return {
      type: "",
      form: {
        type: "",
      },
      status_name: [],
      title: "民航快递",
      searchInfo: {
        params: {
          type: 3,
          order_three_code: "", // 单号三字码
          order_num: "", // 单号八位数字
          order_no: "",
          departure_code: "",
          billing_location: "",
          billing_time_start: "", // 开始日期
          billing_time_end: "", // 结束日期
          currPage: 1,
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
    }
  },
  watch: {
    $route() {
      this.load()
    },
  },
  mounted() {
    this.type = this.$route.params.type
    this.load()
    queryCustServiceState({ type: 0, order_type: 3 }).then(res => {
      // console.log(res.data);
      this.status_name = res.data.data.map(item => {
        // console.log(item.name);
        return { value: item.name, label: item.name }
      })
    })
  },
  computed: {
    ...mapState(["loadingTime", "orderType"]),
  },
  methods: {
    load() {
      this.title = "民航快递"
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
      this.search()
    },
    search() {
      this.searchInfo.params.billing_time_start = this.searchInfo.timeValue[0] || ""
      this.searchInfo.params.billing_time_end = this.searchInfo.timeValue[1] || ""
      pageQueryCA(this.searchInfo.params).then(res => {
        this.tableData = res.data.data[0].list
        this.total = res.data.data[0].total
      })
    },
    add() {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-添加")
      this.$router.push(`/cae/billing/detail`)
    },
    reset() {
      this.$refs["searchForm"].resetFields()
    },
    searchEdit(item) {
      if (item.state === 1) {
        this.$notify({
          title: "警告",
          message: "该单据已作废",
          type: "warning",
        })
        return
      }
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-编辑")
      this.$router.push(`/cae/billing/detail/${item.order_no}`)
    },
    stateFormat(row, column, cellValue) {
      return cellValue ? "是" : "否"
    },
    orderStateFormat(row, column, cellValue) {
      return cellValue ? "已作废" : "已使用"
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
    getCancelList(list) {
      this.cancelList = list.map(item => item.order_no)
    },
    cancelOrder() {
      cancelOrders({ order_nos: this.cancelList, type: this.orderType }).then(res => {
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
