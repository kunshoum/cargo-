/**
 * 马少良
 */
 
<template>
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
      <el-col :span="8">
        <el-form-item label="起止时间" class="grid-content" prop="timeValue">
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
      <el-col :span="8" :offset="15">
        <div class="grid-content bg-purple" style="float: right;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="receive_list">
    <el-table :data="tableData" border style="width: 100%" :height="screenHeight - 330" size="small" 
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
      <el-table-column fixed label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="配载" placement="left">
            <el-button type="primary" class="peizai" size="mini" @click="stowageByFlight(scope.row)">配载</el-button>
          </el-tooltip>
        </template>   
      </el-table-column>
      <el-table-column sortable prop="flight_no" label="航班号"></el-table-column>
      <el-table-column sortable :formatter="planFly" label="计划起飞时间" width="150"></el-table-column>
      <el-table-column sortable :formatter="planDrop" label="计划降落时间" width="150"></el-table-column>
      <el-table-column sortable :formatter="actualFly" label="实际起飞时间" width="150"></el-table-column>
      <el-table-column sortable :formatter="actualDrop" label="实际降落时间" width="150"></el-table-column>
      <el-table-column sortable prop="distance_fly_time" label="距离起飞时间" width="150"></el-table-column>
      <el-table-column sortable prop="departure" label="始发站" width="100"></el-table-column>
      <el-table-column sortable prop="destination" label="目的站" width="100"></el-table-column>
      <el-table-column sortable prop="std" label="STD" width="50"></el-table-column>
      <el-table-column sortable prop="model_code" label="机型" width="100"></el-table-column>
      <el-table-column sortable prop="stop_info" label="经停信息"></el-table-column>
      <el-table-column sortable prop="pub" label="PUB" width="55"></el-table-column>
      <el-table-column sortable prop="can" label="CAN" width="55"></el-table-column>
      <el-table-column prop="sender_telephone" label="航线">
        <el-table-column sortable prop="line1" label="1" width="30"></el-table-column>
        <el-table-column sortable prop="line2" label="2" width="30"></el-table-column>
        <el-table-column sortable prop="line3" label="3" width="30"></el-table-column>
        <el-table-column sortable prop="line4" label="4" width="30"></el-table-column>
        <el-table-column sortable prop="line5" label="5" width="30"></el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total > 10"
      @current-change="pageChange"
      :current-page="currPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import { getFlightList } from "@/service/stowage.js"
  import {formatTime} from "../../../utils/time.js"
  import {mapState} from "vuex"
  import mixin from "./mixin"
  import getCityMixin from "@/mixin/getCityMixin"

  export default {
    mixins: [mixin, getCityMixin],
    data() {
      return {
        title: '按作业航班配载',
        departures:'',
        destinations:'',
        searchInfo: {
          params: {
            two_flight_code: '',  // 航班号二字码
            flight_num: '', // 航班数字
            destination: '', // 到达站
            is_domestic: '', // 国内/国际
            plan_fly_time_start: '',
            plan_fly_time_end: '',
          },
          timeValue: '',
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: [],
        total: '',
        loading: false,
        list: [],
        currPage: 1,
        departures: [],
        destinations: [],
        screenHeight: window.innerHeight,
      }
    },
    mounted() {
      this.load()
    },
    computed: {
      ...mapState(['loadingTime', 'flightInfo'])
    },
    methods: {
      load() {
        this.$store.commit('ADD_FOOTNAV', {
          name: '按作业航班配载',
          route: '/stowage/byFlight',
        })

        this.$store.commit('CHANGE_TOPTITLE', this.title)
        this.search()
      },
      planFly(row, column, cellValue) {
        return row.plan_fly_date + " " + row.plan_fly_time
      },
      planDrop(row, column, cellValue) {
        return row.plan_drop_date + " " + row.plan_drop_time
      },
      actualFly(row, column, cellValue) {
        return (row.actual_fly_date || '') + " " + (row.actual_fly_time || '')
      },
      actualDrop(row, column, cellValue) {
        return (row.actual_drop_date || '') + " " + (row.actual_drop_time || '')
      },
      search() {
        this.loading = false
        // this.searchInfo.params.plan_fly_time_start = this.searchInfo.timeValue[0] || ''
        // this.searchInfo.params.plan_fly_time_end = this.searchInfo.timeValue[1] || ''
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

        getFlightList({...this.searchInfo.params, currPage: this.currPage}).then(res => {
          if(res.data.status === 200) {
            setTimeout(() => {
              this.loading = false
              this.tableData = res.data.data[0].list
              this.total = res.data.data[0].total
            }, this.loadingTime)
          }else {
            this.loading = false
            this.$message({
              type: 'warning',
              message: res.data.message,
            })
          }
        })
      },
      reset() {
        this.$refs['date_picker']._data.userInput = null
        this.$refs['searchForm'].resetFields()
      },
      getFlightInfo(item) {
        return {
          flight_no: item.flight_no,
          flight_date: item.plan_fly_date,
          departure: item.departure,
          destination: item.destination,
        }
      },
      stowageByFlight(item) {
        this.$store.commit('CHANGE_FLIGHTINGO', this.getFlightInfo(item))
        this.$router.push({name: 'StowageBooking'})
      },
    }
  }
</script>
