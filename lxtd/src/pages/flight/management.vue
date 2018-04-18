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
      <el-col :span="4">
        <el-form-item label="始发站" class="grid-content" prop="params.departure">
          <el-select size="mini" filterable remote default-first-option placeholder="" clearable
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
          <el-select size="mini" filterable remote default-first-option placeholder="" clearable
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
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="receive_list">
    <el-table :data="tableData" border style="width: 100%" :height="screenHeight - 340" size="small" 
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
     @selection-change="getList">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
      <el-table-column prop="" label="操作" width="70">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看" placement="right">
            <el-button type="primary" icon="el-icon-fa-eye" size="mini" @click="checkDetail(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column sortable prop="flight_no" label="航班号"></el-table-column>
      <el-table-column sortable prop="departure" label="始发站"></el-table-column>
      <el-table-column sortable prop="destination" label="目的站"></el-table-column>
      <el-table-column sortable prop="plan_fly_date" label="计划起飞"></el-table-column>
      <el-table-column sortable prop="actual_fly_date" :formatter="clearNull" label="实际起飞"></el-table-column>
      <el-table-column sortable prop="plan_drop_date" label="计划到达"></el-table-column>
      <el-table-column sortable prop="actual_drop_date" :formatter="clearNull" label="实际到达"></el-table-column>
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
    <flight-detail :detailInfo="detailInfo" :detail='detail' :visible="visible" @close="close"/>
  </div>
</div>
</template>

<script>
  // import { getFlightList } from "@/service/stowage.js"
  import {formatTime} from "@/utils/time.js"
  import {mapState} from "vuex"
  import getCityMixin from "@/mixin/getCityMixin"
  import FlightDetail from './detail.vue'
  import { listFlightInfo } from '@/service/index.js'

  export default {
    mixins: [getCityMixin],
    data() {
      return {
        title: '航班查询',
        departures:'',
        destinations:'',
        detailInfo: null,
        detail: {},
        searchInfo: {
          params: {
            two_flight_code: '',  // 航班号二字码
            flight_num: '', // 航班数字
            destination: '', // 到达站
            departure: '',
            // is_domestic: '', // 国内/国际
            startDate: '',
            startTime: "",
            endDate: '',
            endTime: '',
            currPage: 1,
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
        departures: [],
        destinations: [],
        screenHeight: window.innerHeight,
        visible: false,
      }
    },
    mounted() {
      this.load()
    },
    components: {
      FlightDetail,
    },
    computed: {
      ...mapState(['loadingTime', 'flightInfo'])
    },
    methods: {
      clearNull(row, column, cellValue) {
        return cellValue = cellValue.replace(/null/g,"")
      },
      load() {
        this.$store.commit('ADD_FOOTNAV', {
          name: '航班查询',
          route: '/flight/management',
        })

        this.searchInfo.params.two_flight_code = this.flightInfo.flight_no && this.flightInfo.flight_no.slice(0, 2)
        this.searchInfo.params.flight_num = this.flightInfo.flight_no && this.flightInfo.flight_no.slice(2, 6)
        this.searchInfo.params.destination = this.flightInfo.destination

        this.$store.commit('CHANGE_TOPTITLE', this.title)
        this.$store.commit("CHANGE_STOWAGESTEP", 4)
        this.search()
      },
      // 点击查询，页面为第一页
      searchHandler() {
        this.searchInfo.params.currPage = 1
        this.search()
      },
      search() {
        this.loading = false
        if(this.searchInfo.timeValue && this.searchInfo.timeValue.length > 1) {
          let timeDate = this.searchInfo.timeValue[0].split(' ') || ''
          let infoDate = this.searchInfo.timeValue[1].split(' ') || ''
          this.searchInfo.params.startDate = timeDate[0]
          this.searchInfo.params.startTime = timeDate[1]
          this.searchInfo.params.endDate = infoDate[0]
          this.searchInfo.params.endTime = infoDate[1]
        }else {
          this.searchInfo.params.startDate = ''
          this.searchInfo.params.startTime = ''
          this.searchInfo.params.endDate = ''
          this.searchInfo.params.endTime = ''
        }

        listFlightInfo({...this.searchInfo.params}).then(res => {
          if(res.data.status === 200) {
            setTimeout(() => {
              this.loading = false
              this.tableData = res.data.data[0].list
              this.total = res.data.data[0].total
              this.tableData = this.tableData.map(item => {
                return {
                  ...item,
                  plan_fly_date: item.plan_fly_date + " " + item.plan_fly_time,
                  actual_fly_date: item.actual_fly_date + " " + item.actual_fly_time,
                  plan_drop_date: item.plan_drop_date + " " + item.plan_drop_time,
                  actual_drop_date: item.actual_drop_date + " " + item.actual_drop_time
                }
              })
              
              this.$nextTick(() => {
                this.tableData = this.tableData.map(item => item)
              })
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
      indexMethod(index) {
        return (this.searchInfo.params.currPage - 1) * 10 + index + 1
      },
      pageChange(val) {
        this.searchInfo.params.currPage = val
        this.search()
      },
      sizeChange(size) {
        this.searchInfo.params.pageSize = size
        this.search()
      },
      getList(list) {
        this.list = list
      },
      reset() {
        this.$refs['searchForm'].resetFields()
        this.$refs['date_picker']._data.userInput = null
        this.searchInfo.params.startDate = ""
          this.searchInfo.params.startTime = ""
          this.searchInfo.params.endDate = ""
          this.searchInfo.params.endTime = ""
      },
      checkDetail(row) {
        this.detailInfo = row.infoList
        // console.log(this.detailInfo)
        this.detail = row
        this.visible = true
      },
      close() {
        this.visible = false
      },
    }
  }
</script>
