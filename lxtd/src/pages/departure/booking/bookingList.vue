<template>
<!-- 雷云朵 -->
	<div class="Search">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb" v-if="id">
			<el-breadcrumb-item :to="{ path: '/booking/byflight' }">航班列表</el-breadcrumb-item>
			<el-breadcrumb-item>订舱明细</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
			<el-row :gutter="10">
				<el-col :span="4">
					<el-form-item label="订舱号" class="grid-content" prop="booking_no">
						<el-input size="mini" v-model="searchInfo.booking_no" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="有无运单" class="grid-content" prop="is_order_no">
						<el-select size="mini" placeholder="" v-model="searchInfo.is_order_no" @change='getorder'>
							<el-option label="全部" value=""></el-option>
							<el-option label="有运单" value="1"></el-option>
							<el-option label="无运单" value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="运单号" class="grid-content" prop="order_no" v-show="this.searchInfo.is_order_no === 0">
						<el-input size="mini" v-model="searchInfo.order_no" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="航班日期" class="grid-content" prop="flight_date">
						<el-input size="mini" v-model="searchInfo.flight_date" placeholder="" ref='flight_date'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="航班号" class="grid-content" prop="flight_no">
						<el-input size="mini" v-model="searchInfo.flight_no" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="始发站" class="grid-content break_line" prop="departure">
						<el-select clearable size="mini" filterable remote allow-create default-first-option placeholder="" ref="departure" v-model="searchInfo.departure" @focus="getDepartures" :loading="loading" @change='depar'>
							<el-option v-for="item in departures" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="目的站" class="grid-content break_line" prop="destination">
						<el-select clearable size="mini" filterable remote allow-create default-first-option placeholder="" ref='destination' v-model="searchInfo.destination" @focus="getDestination" :loading="loading" @change='destion'>
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="订舱状态" class="grid-content" prop="status">
						<el-select size="mini" placeholder="" v-model="searchInfo.status" @change='getstatus' ref='status'>
							<el-option label="全部" value=""></el-option>
							<el-option label="订舱取消" value="0"></el-option>
							<el-option label="订舱确认" value="1"></el-option>
							<el-option label="审核通过" value="2"></el-option>
							<el-option label="审核未通过" value="3"></el-option>
							<el-option label="待审核" value="4"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="订舱客户" class="grid-content break_line" prop="booking_contact_person">
            <el-input size="mini" v-model="searchInfo.booking_contact_person" placeholder=""></el-input>
						<!-- <el-select clearable size="mini" filterable remote default-first-option placeholder="" ref='booking_contact_person' v-model="searchInfo.booking_contact_person" @focus="bookingContactPerson" :loading="loading">
							<el-option v-for="(item, index) in bookingContact" :key="index" :label="item.label" :value="item.code">
							</el-option>
						</el-select> -->
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btn_wrap">
			<el-row>
				<el-col :span="10">
					<el-button type="primary" size="mini" @click="recovery" v-show='bookingShow'>订舱恢复</el-button>
					<el-button type="primary" size="mini" @click="cancel" v-show='bookingShow'>订舱取消</el-button>
					<el-button type="primary" size="mini" @click="reply" v-show='bookingShow'>审核通过</el-button>
					 <!--dialogTableVisible = true--> 
					<!--<el-button type="primary" size="mini" v-for="item in states" :key="item.state" @click="updateState(item.state)">{{item.label}}</el-button>-->
					<el-button type="primary" size="mini" @click="dialogTableVisible = true" v-show='bookingShow'>审核不通过</el-button>
				</el-col>
				<el-col :span="8" :offset="6">
					<el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
					<el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="bookingInput">订舱录入</el-button>
				</el-col>
			</el-row>
		</div>
		<!--审核未通过-->
		<el-dialog title="" :visible.sync="dialogTableVisible">
			<el-table :data="notPassList">
				<el-table-column property="booking_no" label="订舱号"></el-table-column>
				<el-table-column property="product" label="品名"></el-table-column>
				<el-table-column property="apply_quatity" label="件数"></el-table-column>
				<el-table-column property="apply_weight" label="重量"></el-table-column>
				<el-table-column property="apply_volume" label="体积"></el-table-column>
			</el-table>
			<el-form :model="form">
		    <el-form-item label="不通过原因" prop='unreply_reason'>
		      <el-input v-model="form.unreply_reason" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>  
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">取 消</el-button>
				<el-button type="primary" @click="unReply(dialogTableVisible = false)">确 定</el-button>
			</div>
		</el-dialog>

		<div class="receive_list">
			<el-table :data="tableData" border style="width: 100%" :height="this.screenHeight - 400" size="small" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" @selection-change="select">
				<el-table-column type="selection" width="55" prop='booking_no_list'></el-table-column>
				<el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
				<el-table-column fixed label="操作" width="200">
					<template slot-scope="scope">
						<inline-operate :row="scope.row" @search='search'/>
					</template>
				</el-table-column>
				<el-table-column sortable prop="booking_no" label="订舱号"></el-table-column>
				<el-table-column sortable prop="order_no" label="运单号"></el-table-column>
				<el-table-column sortable prop="booking_status" label="订舱状态" :formatter="stateFormat"></el-table-column>
				<el-table-column sortable prop="reply_status" label="审核状态" width="100" :formatter="checkStateFormat"></el-table-column>
				<el-table-column sortable prop="booking_contact_person" label="订舱客户" width="150"></el-table-column>
				<el-table-column sortable label="航程" width="100">
					<el-table-column sortable prop="departure" label="起飞" width="50"></el-table-column>
					<el-table-column sortable prop="destination" label="到达" width="50"></el-table-column>
				</el-table-column>
				<el-table-column sortable prop="flight_no" label="航班号"></el-table-column>
				<el-table-column sortable prop="flight_date" label="航班日期" width="150"></el-table-column>
				<el-table-column sortable prop="apply_quatity" label="件数" width="50"></el-table-column>
				<el-table-column sortable prop="apply_weight" label="重量" width="50"></el-table-column>
				<el-table-column sortable prop="product" label="品名"></el-table-column>
				<el-table-column sortable prop="remark" label="注释"></el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" @size-change="sizeChange" :page-sizes="[10, 15, 20]" :current-page="searchInfo.currPage" :page-size="10" layout="sizes,total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { bookingList } from "../../../service"
//查询订舱列表
import { listBookingOut } from "../../../service"
//	订舱恢复、取消、、、、
import { BookingOutStatus } from "../../../service"

import { formatTime } from "../../../utils/time.js"

import { mapState } from "vuex"

import { getTime, getDate } from "../../../utils/time"

import InlineOperate from "./inlineOperate.vue"

import { getCity, getSenderReceiver, getAirport } from "../../../linkQuery"

export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      id: "",
      title: "订舱列表",
      dialogTableVisible: false,
      gridData: [
        {
          booking_no: "121212",
        },
      ],
      form: { unreply_reason: "" },
      searchInfo: {
        flight_id: this.$route.params.id,
        booking_no: "", // 订舱号
        is_order_no: "", //有无运单
        order_no: "", // 运单号
        flight_date: "", //航班日期
        flight_no: "", //航班号
        status: "", //订舱状态
        departure: "", //始发站
        destination: "", //目的地
        booking_contact_person: "", // 订舱客户
        currPage: 1,
      },
      tableData: [],
      bookingContact: [], //订舱客户
      departures: [], //始发站
      destinations: [], //目的站
      total: "",
      loading: false,
      //				订舱号列表
      booking_no_list: "",
      notPassList: [],
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
      bookingShow: false,
    }
  },
  components: {
    InlineOperate,
  },
  computed: {
    ...mapState(["loadingTime", "bookingNo", "bookingData", "departure", "destination"]),
  },
  mounted() {
    //			console.log(this.$route.params.id)
    if (this.$route.params.id) {
      this.searchInfo.flight_date = this.bookingData
      this.searchInfo.flight_no = this.bookingNo
      this.searchInfo.departure = this.departure
      this.searchInfo.destination = this.destination
    } else {
      this.searchInfo.flight_date = ""
      this.searchInfo.flight_no = ""
      this.searchInfo.departure = ""
      this.searchInfo.destination = ""
    }

    this.load()

    this.authList = JSON.parse(this.$getStore("authList")).filter(item => {
      //				console.log(item)
      if (item.page_item === 1 && item.is_select === 1) {
        this.bookingShow = false
      } else {
        this.bookingShow = true
      }
    })
  },
  methods: {
    load() {
      this.id = this.$route.params.id
      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.search()
    },
    searchHandler() {
      this.searchInfo.currPage = 1
      this.search()
    },
    //			查询
    search() {
      //				console.log('search')
      this.loading = false
      listBookingOut(this.searchInfo).then(res => {
        if (res.data.status === 200) {
          setTimeout(() => {
            this.loading = false
            this.tableData = res.data.data[0].list
            this.total = res.data.data[0].total
            this.$nextTick(() => {
              this.tableData = this.tableData.map(item => item)
            })
          }, this.loadingTime)
          
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    //			重置
    reset() {
      this.$refs["searchForm"].resetFields()
    },
    //			订舱录入
    bookingInput() {
      listBookingOut(this.searchInfo).then(res => {
        if (res.data.status === 200) {
          let booking_no = this.searchInfo.flight_no
          let booking_data = this.searchInfo.flight_date
          let departure = this.searchInfo.departure
          let destination = this.searchInfo.destination
          //			        	console.log(booking_no,booking_data,departure,destination)
          this.$store.commit("BOOKING_NO", booking_no)
          this.$store.commit("BOOKING_DATA", booking_data)
          this.$store.commit("DEPARTURE", departure)
          this.$store.commit("DESTINATION", destination)
          //		    			this.$router.push({params: {item: 'normal', id: item.id}})
          if (this.$route.params.item) {
            this.$router.push({ name: "Normal", query: { from: "flight", id: this.$route.params.id } })
          } else {
            this.$router.push({ name: "Normal", query: { from: "list" } })
          }
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    // 订舱客户
    bookingContactPerson(query) {
      getSenderReceiver(this, "").then(res => {
        // console.log(query)
        this.bookingContact = res
      })
    },
    //始发站
    getDepartures(query) {
      getAirport(this, "").then(res => {
        this.departures = res
      })
    },
    //目的站
    getDestination(query) {
      getAirport(this, "").then(res => {
        this.destinations = res
      })
    },
    updateState(state) {
      //				console.log(state)
    },
    // 订舱状态
    stateFormat(row, column, cellValue) {
      if (cellValue == 1) {
        return "订舱确认"
      }
      if (cellValue == 2) {
        return "订舱取消"
      }
    },
    // 审核状态
    checkStateFormat(row, column, cellValue) {
      if (cellValue == 0) {
        return "待审核"
      }
      if (cellValue == 1) {
        return "审核通过"
      }
      if (cellValue == 2) {
        return "审核不通过"
      }
    },
    // 分页
    pageChange(val) {
      this.searchInfo.currPage = val
      this.search()
    },
    sizeChange(size) {
      this.searchInfo.pageSize = size
      this.search()
    },
    indexMethod(index) {
      return (this.searchInfo.currPage - 1) * 10 + index + 1
    },
    select(selectedInfo) {
      //				this.booking_no_list = selectedInfo.map(item => item.booking_no)
      this.booking_no_list = selectedInfo.map(item => {
        return {
          booking_no: item.booking_no,
          booking_status: item.booking_status,
          reply_status: item.reply_status,
        }
      })

      this.notPassList = selectedInfo.map(item => {
        return {
          booking_no: item.booking_no,
          product: item.product,
          apply_quatity: item.apply_quatity,
          apply_weight: item.apply_weight,
          apply_volume: item.apply_volume,
          //						unreply_reason:item.unreply_reason
        }
      })
    },
    //			订舱恢复
    recovery() {
      //				console.log(this.tableData[0].booking_status)
      BookingOutStatus({ booking_no_list: this.booking_no_list, booking_status: 1 }).then(res => {
        if (res.data.status === 200) {
          res.data.booking_status = 1
          this.search()
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    //			订舱取消
    cancel() {
      BookingOutStatus({ booking_no_list: this.booking_no_list, booking_status: 2 }).then(res => {
        if (res.data.status === 200) {
          res.data.booking_status = 2
          this.search()
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    //			审核通过
    reply() {
      BookingOutStatus({ booking_no_list: this.booking_no_list, reply_status: 1 }).then(res => {
        if (res.data.status === 200) {
          res.data.reply_status = 1
          this.search()
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    //审核未通过  ->查询，弹框，返数据
    //审核未通过
    unReply() {
      BookingOutStatus({
        booking_no_list: this.booking_no_list,
        reply_status: 2,
        unreply_reason: this.form.unreply_reason,
      }).then(res => {
        if (res.data.status === 200) {
          res.data.reply_status = 2
          this.search()
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    // 有无运单
    getorder() {
      this.$refs["flight_date"].focus()
    },
    // 订舱状态
    getstatus() {
      this.$refs["booking_contact_person"].focus()
    },
    // 始发站
    depar() {
      this.$refs["destination"].focus()
    },
    // 目的站
    destion() {
      this.$refs["status"].focus()
    },
  },
}
</script>