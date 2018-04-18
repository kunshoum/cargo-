/**
 * 马少良
 */
 
<template>
	<div class="Search">
    <el-form class="demo-form-inline search_form" label-position="top" ref="searchForm" :model="searchInfo">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="结算单位" class="grid-content" prop="clearing_unit">
            <el-input size="mini" v-model="searchInfo.clearing_unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="收预付款人" class="grid-content" prop="receive_cost_person">
            <el-input size="mini" v-model="searchInfo.receive_cost_person"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款时间" class="grid-content">
            <el-date-picker
              ref="date_picker"
              size="mini"
              v-model="timeValue"
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
        <el-col :span="13" :offset="10">
        <div class="grid-content bg-purple" style="float: right">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
        </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" :height="screenHeight - 340" size="small">
        <el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
        <el-table-column sortable prop="clearing_unit" label="结算单位" width="100"></el-table-column>
        <el-table-column sortable prop="start_arrive" label="出发/到达" :formatter="stateFormat" width="100"></el-table-column>
        <el-table-column sortable prop="receive_pay_type" label="收付款单位" :formatter="typeFormat"></el-table-column>
        <el-table-column sortable prop="pre_payment_cost" label="预付款" ></el-table-column>
        <el-table-column sortable prop="receive_cost_time" label="缴费时间" :formatter="timeFormat"></el-table-column>
        <el-table-column sortable prop="operator" label="录改人"></el-table-column>
        <el-table-column sortable prop="operat_time" label="录改时间"></el-table-column>
      </el-table>
      <el-pagination
        v-if="total > 10"
        @current-change="pageChange"
        @size-change="sizeChange"
        :current-page="currPage"
        :page-size="10"
        :page-sizes="[10, 15, 20]"
        layout="sizes, total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
	</div>
</template>
<script>

import { chargeLog } from "@/service/prepay"
import {formatTime} from '@/utils/time'

export default {
  data() {
    return {
      title: "预付款日志",
      searchInfo: {
        clearing_unit: "",
        receive_cost_person: "",
        receive_cost_time_start: "",
        receive_cost_time_end: "",
      },
      timeValue: [],
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
      currPage: 1,
      pageSize: 10,
      screenHeight: window.innerHeight,
    }
  },
  mounted() {
    this.$store.commit("CHANGE_TOPTITLE", this.title)
    this.$store.commit('ADD_FOOTNAV', {
      name: '预付款日志',
      route: '/prepay/log',
    })
    this.searchHandler()
  },
  methods: {
    reset() {
      this.$refs['date_picker']._data.userInput = null
      this.$refs["searchForm"].resetFields()
      this.timeValue = []
    },
    searchHandler() {
      this.currPage = 1
      this.search()
    },
    search() {
      this.searchInfo.receive_cost_time_start = this.timeValue[0] || ""
      this.searchInfo.receive_cost_time_end = this.timeValue[1] || ""
      
      chargeLog({ ...this.searchInfo, currPage: this.currPage, pageSize: this.pageSize }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data[0].list
          this.total = res.data.data[0].total
        }
      })
    },
    indexMethod(index) {
      return (this.currPage - 1) * 10 + index + 1
    },
    pageChange(index) {
      this.currPage = index
      this.search()
    },
    sizeChange(size) {
      this.pageSize = size
      this.search()
    },
    stateFormat(row, column, cellValue) {
      if(cellValue === 0) {
        return '出发'
      }else {
        return '到达'
      }
    },
    typeFormat(row, column, cellValue) {
      if(cellValue === 0) {
        return '付款单位'
      }else {
        return '收款单位'
      }
    },
    timeFormat(row, column, cellValue) {
      return formatTime(cellValue)
    }
  }
}
</script>