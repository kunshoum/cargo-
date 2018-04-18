<template>
<!-- 雷云朵 -->
<div class="loginDaily">
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top"  ref="searchForm">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-form-item label="用户名" class="grid-content" prop="params.user_name">
                <el-input size="mini"  v-model="searchInfo.params.user_name" placeholder="用户名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="登录状态" class="grid-content" prop="params.login_state">
                  <el-select size="mini" v-model="searchInfo.params.login_state" placeholder="登录状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="登录成功" value="0"></el-option>
                    <el-option label="未知账户" value="1"></el-option>
                    <el-option label="错误密码" value="2"></el-option>
                    <el-option label="用户被锁定" value="3"></el-option>
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
          <el-col :span="4" :offset="20">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
          </div>
          </el-col>
        </el-row>
      </div>
      <div class="receive_list">
        <el-table :data="tableData" border style="width: 100%" :height="this.screenHeight - 320" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" size="small" >
          <el-table-column type="index" :index="indexMethod" label="序号" width="60"></el-table-column>
          <el-table-column sortable prop="user_name" label="用户名"></el-table-column>
          <el-table-column sortable prop="real_name" label="真实姓名"></el-table-column>
          <el-table-column sortable prop="depart_name" label="所属单位"></el-table-column>
          <el-table-column sortable prop="login_time" label="登录时间"></el-table-column>
          <el-table-column sortable prop="logout_time" label="登出时间"></el-table-column>
          <el-table-column sortable prop="login_state" :formatter="statuFormat" label="登录状态"></el-table-column>
          <el-table-column sortable prop="ip_address" label="IP地址"></el-table-column>
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
import { loginDailySearch } from "../../service"
import { mapState } from "vuex"

import { isnumRequired ,regThreeCode} from "@/mode/ruleMethods" //校验

export default {
  data() {
    return {
      loading: false,
      title: "登录日志",
      screenHeight: window.innerHeight,
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
        params: {
          user_name:"",
          login_state:"",
          currPage: 1,
        },
        timeValue: "",
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
    this.load()
  },
  methods: {
    statuFormat(row, column, cellValue) {
      let stateArr = ["登录成功","未知账户","错误密码"," 用户被锁定"]
      return stateArr[cellValue]
    },
    pageChange(val) {
      this.searchInfo.params.currPage = val
      this.search()
    },
    load() {
      this.$store.commit("TICKET_BATCH", [])
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
      this.search()
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    search() {
      this.loading = true
      this.searchInfo.params.login_time_start = this.searchInfo.timeValue[0] || ""
      this.searchInfo.params.login_time_end = this.searchInfo.timeValue[1] || ""
      loginDailySearch({ ...this.searchInfo.params }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          this.tableData = res.data.data[0].list
          this.total = res.data.data[0].total
        } else if (res.data.status === 400) {
          setTimeout(() => {
            this.loading = false
            this.tableData = []
          }, 300)
        } else {
          this.tableData = []
        }
      })
    },
    reset() {
      
      this.$refs["date_picker"]._data.userInput = null
      this.$refs["searchForm"].resetFields()
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
