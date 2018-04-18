<template>
<!-- 雷云朵 -->
	<div class="Search">
		<el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
			<el-row :gutter="10">
				<el-col :span="6" width="180" v-show="this.type === 'main'">
					<el-form-item label="主单号" class="grid-content break_line" width="180">
						<el-col :span="9" width="180">
							<el-form-item prop="params.order_three_code" width="180">
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
        <el-col :span="6" width="180" v-show="this.type === 'sub'">
					<el-form-item label="主单号" class="grid-content break_line" width="180">
						<el-col :span="9" width="180">
							<el-form-item prop="params.main_order_three_code" width="180">
								<el-input size="mini" v-model="searchInfo.params.main_order_three_code" placeholder="三字码" width="180"></el-input>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="1">-</el-col>
						<el-col :span="14">
							<el-form-item prop="params.main_order_num">
								<el-input size="mini" v-model="searchInfo.params.main_order_num" placeholder="八位数字"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
				</el-col>
        <el-col :span="6" width="180" v-show="this.type === 'sub'">
					<el-form-item label="分单号" class="grid-content break_line" width="180">
						<el-col :span="9" width="180">
							<el-form-item prop="params.order_three_code" width="180">
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
          <el-form-item label="始发站" class="grid-content" prop="params.departure">
            <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
              clearable
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
        <el-col :span="type === 'main' ? 6 : 4">
					<el-form-item label="发货人" class="grid-content" prop="params.sender">
						<el-input size="mini"  v-model="searchInfo.params.sender" placeholder="" ref='sender'></el-input>
					</el-form-item>
				</el-col>
        <el-col :span="4">
					<el-form-item label="收货人" class="grid-content" prop="params.receiver">
						<el-input size="mini" v-model="searchInfo.params.receiver" placeholder="" ref='receiver'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="货物状态" class="grid-content" prop="params.cargo_status">
						<el-select filterable clearable v-model="searchInfo.params.cargo_status" size="mini"  @change='cargoStatus'>
							<el-option v-for="item in status_name" placeholder='' :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="提货地点" class="grid-content" prop="params.pick_up_location">
						<el-select filterable clearable v-model="searchInfo.params.pick_up_location" size="mini" ref='pick_up_location' @change='getpick'>
							<el-option placeholder='' v-for="item in up_location" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="出库状态" class="grid-content" prop="params.out_storeroom_status">
						<el-select v-model="searchInfo.params.out_storeroom_status" size="mini" ref='out_storeroom_status' @change='outStore'>
							<el-option label="全部" value=""></el-option>
							<el-option label="未出库" value="0"></el-option>
							<el-option label="已出库" value="1"></el-option>
							<el-option label="部分出库" value="2"></el-option>
						  </el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="客服记录" class="grid-content" prop="params.cust_service_status">
						<el-select v-model="searchInfo.params.cust_service_status" size="mini" @change='custStatus' ref='cust_service_status'>
							<el-option label="全部" value=""></el-option>
							<el-option label="未客服" value="0"></el-option>
	            			<el-option label="已客服" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="提货方式" class="grid-content" prop="params.delivery_mode">
						<el-select v-model="searchInfo.params.delivery_mode" size="mini" ref='delivery_mode'>
							<el-option label="全部" value=""></el-option>
							<el-option label="自提" value="1"></el-option>
							<el-option label="派送" value="2"></el-option>
							<el-option label="中转" value="3"></el-option>	            
						  </el-select>
					</el-form-item>
				</el-col>
        <el-col :span="8">
					<el-form-item label="录入日期" class="grid-content" prop="timeValue">
						<el-date-picker size="mini" v-model="searchInfo.timeValue" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%;">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btn_wrap">
			<el-row>
				<el-col :span="6" :offset="17">
					<div class="grid-content bg-purple" style="float:right">
						<el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加</el-button>
						<el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="receive_list">
			<el-table :data="tableData" border style="width: 100%" :height="screenHeight - 430" size="small" :row-class-name="tableRowClassName">
				<el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
				<el-table-column fixed label="操作">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="编辑" placement="left">
							<el-button type="primary" icon="el-icon-edit" size="mini" @click="searchEdit(scope.row)"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column sortable prop="arrive_record" label="到达情况"></el-table-column>
				<el-table-column sortable prop="transport_mode" label="到达方式" :formatter="transportMode"></el-table-column>
				<el-table-column sortable prop="order_no" label="主单号" v-if="this.type === 'main'"></el-table-column>
        <el-table-column sortable prop="main_order_no" label="主单号" v-if="this.type === 'sub'"></el-table-column>
				<el-table-column sortable prop="order_no" label="分单号" v-if="this.type === 'sub'"></el-table-column>
				<el-table-column sortable prop="cargo_status_name" label="状态"></el-table-column>
				<el-table-column sortable prop="cust_service_status" label="客服记录" :formatter="serviceStatus"></el-table-column>
				<el-table-column sortable prop="delivery_mode" label="提货方式" :formatter="deliveryStyle"></el-table-column>
				<el-table-column sortable prop="receiver" label="收货人名称"></el-table-column>
				<el-table-column sortable prop="receiver_telephone" label="收货人电话"></el-table-column>
				<el-table-column sortable prop="receiver_address" label="收货人地址"></el-table-column>
				<el-table-column sortable prop="sender" label="发货人名称"></el-table-column>
				<el-table-column sortable prop="product" label="品名"></el-table-column>
				<el-table-column sortable prop="quantity" label="件数"></el-table-column>
				<el-table-column sortable prop="net_weight" label="实重"></el-table-column>
				<el-table-column sortable prop="departure" label="起点"></el-table-column>
				<el-table-column sortable prop="destination" label="终点"></el-table-column>
				<el-table-column sortable prop="agency_fund" label="代收款"></el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" @size-change="sizeChange"
      :page-sizes="[10, 15, 20]" :current-page="searchInfo.params.currPage" :page-size="10" layout="sizes,total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
// 查询分页
import { pageQueryCA } from "../../service"
// 下拉
//	import { queryCustServiceState } from "../../service"
import { formatTime } from "../../utils/time.js"
//货物状态查询
import { ArrivalCargo } from "../../service"
//提货地点
import { ArrivaLocation } from "../../service"
//提货查询
import { deliverySearch } from "../../service"

import getCityMixin from "@/mixin/getCityMixin"


export default {
  mixins: [getCityMixin],
  data() {
    return {
      type: "",
      form: {
        type: "",
      },
      departures: [],
      screenHeight: window.innerHeight,
      status_name: [],
      up_location: [],
      title: "",
      searchInfo: {
        params: {
          type: 1,
          order_three_code: "", // 单号三字码
          order_num: "", // 单号八位数字
          create_time_start: "", // 开始日期
          create_time_end: "", // 结束日期
          cargo_status: null, //货物状态
          pick_up_location: "", //提货地点
          out_storeroom_status: "", //出库状态
          cust_service_status: "", // 客服记录 0未客服 1 已客服
          delivery_mode: "", // 提货方式 1自提 2派送 3 中转
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
      this.reset()
      this.search()
    },
  },
  mounted() {
    this.type = this.$route.params.type
    this.load()
    //货物状态
    ArrivalCargo({ id: this.id }).then(res => {
      //					console.log(res.data);
      this.status_name = res.data.data.map(item => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    }),
      //提货地点
      ArrivaLocation().then(res => {
        //					console.log(res.data);
        this.up_location = res.data.data.map(item => {
          return {
            value: item,
            label: item,
          }
        })
      })
  },
  methods: {
    load() {
      this.type = this.$route.params.type
      this.searchInfo.params.type = this.type === "sub" ? 1 : 0
      this.title = this.type === "sub" ? "提货分单" : "提货主单"
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
      this.search()
    },
    searchHandler() {
      this.searchInfo.params.currPage = 1
      this.search()
    },
    // 查询
    search() {
      this.searchInfo.params.create_time_start = this.searchInfo.timeValue[0] || ""
      this.searchInfo.params.create_time_end = this.searchInfo.timeValue[1] || ""
      deliverySearch(this.searchInfo.params).then(res => {
        if(res.data.status === 200) {
          this.tableData = res.data.data[0].list
          this.total = res.data.data[0].total
          this.$nextTick(() => {
            this.tableData = this.tableData.map(item => item)
          })
        }
      })
    },
    // 添加
    add() {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-添加")
      this.$router.push(`/delivery/${this.type}/billing/detail`)
    },
    // 重置
    reset() {
      this.$refs["searchForm"].resetFields()
      this.$refs["date_picker"]._data.userInput = null
    },
    // 编辑
    searchEdit(item) {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-编辑")
      this.$router.push(`/delivery/${this.type}/billing/detail/${item.id + "&" + item.cargo_status}`)
    },
    // 状态
    depStateFormat(row, column, cellValue) {
      let stateArr = ["已录入", "可提货", "可自提", "可派送", "可中转", "已提货"]
      //				console.log(cellValue)
      return stateArr[cellValue + 1]
    },
    // 客服记录
    serviceStatus(row, column, cellValue) {
      return cellValue ? "未客服" : "已客服"
    },
    transportMode(row, column, cellValue) {
      return cellValue ? "航空" : "公路"
    },
    // 提货方式
    deliveryStyle(row, column, cellValue) {
      let stateArr = ["自提", "派送", "中转"]
      return stateArr[cellValue]
    },
    // 分页
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
      if (row.easy_flag) {
        return "warning-row"
      } else {
        return "success-row"
      }
    },
    // 货物状态
    cargoStatus() {
      this.$refs["pick_up_location"].focus()
    },
    // 提货地点
    getpick() {
      this.$refs["out_storeroom_status"].focus()
    },
    // 出库状态
    outStore() {
      this.$refs["cust_service_status"].focus()
    },
    // 客服记录
    custStatus() {
      this.$refs["delivery_mode"].focus()
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

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>