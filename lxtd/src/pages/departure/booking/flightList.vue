<template>
<!-- 雷云朵 -->
<div class="Search">
  <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form-item label="航班号" class="grid-content break_line">
          <el-col :span="9">
            <el-form-item prop="params.two_flight_code">
              <el-input size="mini" v-model="searchInfo.params.two_flight_code" placeholder="二字码"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="14">
            <el-form-item prop="params.flight_num">
              <el-input size="mini" v-model="searchInfo.params.flight_num" placeholder="四位数字"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
      <!--<el-col :span="4">
        <el-form-item label="机型代码" class="grid-content" prop="params.model_code">
          <el-input size="mini" v-model="searchInfo.params.model_code" placeholder=""></el-input>
        </el-form-item>
      </el-col>-->
      <el-col :span="6">
					<el-form-item label="始发站" class="grid-content break_line" prop="params.departure">
						<el-select clearable size="mini" filterable remote allow-create default-first-option placeholder="" ref="departure" v-model="searchInfo.params.departure" @focus="getDepartures" :loading="loading" @change='getdeparture'>
							<el-option v-for="item in departures" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="目的站" class="grid-content break_line" prop="params.destination">
						<el-select clearable size="mini" filterable allow-create remote default-first-option placeholder="" ref='destination' v-model="searchInfo.params.destination" @focus="getDestination" :loading="loading" @change='getdestina'>
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
      <el-col :span="6">
        <el-form-item label="国内/国际" class="grid-content" prop="params.is_domestic">
          <el-select clearable size="mini" v-model="searchInfo.params.is_domestic" placeholder="" ref='is_domestic'>
            <el-option label="全部" value=""></el-option>
            <el-option label="国内" value="0"></el-option>
            <el-option label="国际" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="起止时间" class="grid-content" prop="timeValue">
          <el-date-picker
            size="mini"
            ref='date_picker'
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
      <el-col :span="4" :offset="20">
      <div class="grid-content bg-purple">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
      </div>
      </el-col>
    </el-row>
  </div>
  <div class="receive_list">
    <el-table :data="tableData" border style="width: 100%" :height="this.screenHeight - 400"  size="small" 
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
      <el-table-column fixed label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看" placement="left">
            <el-button type="primary" icon="el-icon-view" size="mini" @click="view(scope.row,scope.$index)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column sortable prop="flight_no" label="航班号"></el-table-column>
      <!-- <el-table-column sortable prop="plan_fly_date" label="出发日" width="90"></el-table-column> -->
      <el-table-column sortable prop="departure" label="始发站" width="90"></el-table-column>
      <el-table-column sortable prop="destination" label="目的站" width="90"></el-table-column>
      <el-table-column sortable prop="plan_fly_date" label="预计起飞时间" width="150"></el-table-column>
      <el-table-column sortable prop="plan_drop_date" label="预计到达时间" width="150"></el-table-column>
      <el-table-column sortable prop="std" label="STD" width="50"></el-table-column>
      <el-table-column sortable prop="model_code" label="机型" width="100"></el-table-column>
      <el-table-column sortable prop="stop_info" label="经停信息"></el-table-column>
      <el-table-column sortable prop="is_overtime" label="加班" :formatter="overtimeFormat"></el-table-column>
      <el-table-column sortable prop="is_domestic" label="国际/国内" :formatter="domesticFormat"></el-table-column>
      <el-table-column sortable prop="pub" label="PUB" width="55"></el-table-column>
      <el-table-column sortable prop="can" label="CAN" width="55"></el-table-column>
      <el-table-column sortable prop="book_termination" label="订舱终止时间" width="150" :formatter="timeFormat"></el-table-column>
      <el-table-column prop="sender_telephone" label="按航线订舱">
        <el-table-column sortable prop="line1" label="1" width="30"></el-table-column>
        <el-table-column sortable prop="line2" label="2" width="30"></el-table-column>
        <el-table-column sortable prop="line3" label="3" width="30"></el-table-column>
        <el-table-column sortable prop="line4" label="4" width="30"></el-table-column>
        <el-table-column sortable prop="line5" label="5" width="30"></el-table-column>
      </el-table-column>
      <el-table-column sortable prop="can_match_position" label="可配舱位"></el-table-column>
      <el-table-column sortable prop="bookings_positions" label="订舱量"></el-table-column>
      <el-table-column sortable prop="remain_positions" label="剩余舱位"></el-table-column>
      <el-table-column sortable prop="is_arrival" label="到货"></el-table-column>
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
</div>
</template>

<script>
import { bookingFlightList, listBookingOut } from "../../../service"
import { formatTime } from "../../../utils/time.js"
import { mapState } from "vuex"
import { getCity, getProduct, getAirport } from "../../../linkQuery"
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      type: "",
      title: "按作业航班订舱",
      departures: "",
      destinations: "",
      searchInfo: {
        params: {
          two_flight_code: "", // 航班号二字码
          flight_num: "", // 航班数字
          model_code: "", // 机型代码
          departure: "", //始发站
          destination: "", // 到达站
          is_domestic: "", // 国内/国际
          plan_fly_time_start: "",
          plan_fly_time_end: "",
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
      loading: false,
    }
  },
  mounted() {
    this.load()
  },
  computed: {
    ...mapState(["loadingTime", "bookingNo", "bookingData", "departure", "destination"]),
  },
  methods: {
    load() {
      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.search()
    },
    searchHandler() {
      this.searchInfo.params.currPage = 1
      this.search()
    },
    search() {
      this.loading = false
      // this.searchInfo.params.plan_fly_time_start = this.searchInfo.timeValue[0] || ""
      // this.searchInfo.params.plan_fly_time_end = this.searchInfo.timeValue[1] || ""
      if(this.searchInfo.timeValue && this.searchInfo.timeValue.length > 1) {
          let timeDate = this.searchInfo.timeValue[0].split(' ') || ''
          let infoDate = this.searchInfo.timeValue[1].split(' ') || ''
          this.searchInfo.params.plan_fly_date_start = timeDate[0]
          this.searchInfo.params.plan_fly_time_start = timeDate[1]
          this.searchInfo.params.plan_fly_date_end = infoDate[0]
          this.searchInfo.params.plan_fly_time_end = infoDate[1]
        }else {
          this.searchInfo.params.plan_fly_date_start = ''
          this.searchInfo.params.plan_fly_time_start = ''
          this.searchInfo.params.plan_fly_date_end = ''
          this.searchInfo.params.plan_fly_time_end = ''
        }

      bookingFlightList(this.searchInfo.params).then(res => {
        if (res.data.status === 200) {
          setTimeout(() => {
            this.loading = false
            this.tableData = res.data.data[0].list
            this.total = res.data.data[0].total

            this.tableData = this.tableData.map(item => {
              return {
                ...item,
                plan_fly_date: item.plan_fly_date + " " + item.plan_fly_time,
                plan_drop_date: item.plan_drop_date + " " + item.plan_drop_time
              }
            })
          }, this.loadingTime)
        } else {
          this.loading = false
          this.$message({
            type: "warning",
            message: res.data.message,
          })
        }
      })
    },
    reset() {
      this.$refs["searchForm"].resetFields()
      this.$refs["date_picker"]._data.userInput = null
    },
    view(item, index) {
      bookingFlightList(this.searchInfo.params).then(res => {
        // console.log(res.data)
        if (res.data.status === 200) {
          let booking_no = res.data.data[0].list[index].flight_no
          let booking_data = res.data.data[0].list[index].plan_fly_date
          let departure = res.data.data[0].list[index].departure
          let destination = res.data.data[0].list[index].destination
          //							console.log(booking_no,booking_data,departure,destination)
          this.$store.commit("BOOKING_NO", booking_no)
          this.$store.commit("BOOKING_DATA", booking_data)
          this.$store.commit("DEPARTURE", departure)
          this.$store.commit("DESTINATION", destination)
          this.$router.push({ params: { item: "bookinglist", id: item.id } })
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    // 加班
    overtimeFormat(row, column, cellValue) {
      return cellValue ? "是" : "否"
    },
    // 国际国内
    domesticFormat(row, column, cellValue) {
      return cellValue ? "国际" : "国内"
    },
    // 订舱终止时间
    timeFormat(row, column, cellValue) {
      return formatTime(cellValue)
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
    getdeparture() {
      this.$refs["destination"].focus()
    },
    getdestina() {
      this.$refs["is_domestic"].focus()
    },
  },
}
</script>
