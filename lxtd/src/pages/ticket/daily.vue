<!--王艺蒙-->
<template>
<div class="Search">
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" :rules="rules" ref="searchForm">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-form-item label="单证类型" class="grid-content" prop="params.orderType">
                    <el-select size="mini" v-model="searchInfo.params.orderType" placeholder="">
                      <el-option label="航空运单" value="航空运单"></el-option>
                      <el-option label="分单" value="分单"></el-option>
                      <el-option label="民航快递单" value="民航快递单"></el-option>
                      <el-option label="邮单" value="邮单"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="起始号段" class="grid-content" prop="params.startNum">
                <el-input size="mini" v-model="searchInfo.params.startNum" placeholder="起始号段"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="终止号段" class="grid-content" prop="params.endNum">
                <el-input size="mini" @change="judge" v-model="searchInfo.params.endNum" placeholder="终止号段"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="目前所在点" class="grid-content" prop="params.currentUnit">
                <el-input size="mini" v-model="searchInfo.params.currentUnit" placeholder="目前所在点"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="操作人" class="grid-content" prop="params.opName">
                <el-input size="mini" v-model="searchInfo.params.opName" placeholder="操作人"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="操作类型" class="grid-content" prop="params.operateType">
                    <el-select size="mini" v-model="searchInfo.params.operateType" placeholder="">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="外部返单" value="9"></el-option>
                      <el-option label="取消外部返单" value="15"></el-option>
                      <el-option label="外部退库" value="10"></el-option>
                      <el-option label="取消外部退库" value="16"></el-option>
                      <el-option label="外部销号" value="11"></el-option>
                      <el-option label="取消外部销号" value="17"></el-option>
                      <el-option label="取消内部返单" value="12"></el-option>
                      <el-option label="内部退库" value="7"></el-option>
                      <el-option label="取消内部退库" value="13"></el-option>
                      <el-option label="内部销号" value="8"></el-option>
                      <el-option label="取消内部销号" value="14"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="日志创建时间" class="grid-content" prop="timeValue">
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
          <el-col :span="6" :offset="18">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
          </div>
          </el-col>
        </el-row>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="操作日志">
          <div class="receive_list">
            <el-table :data="tableData" border v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" :height="this.screenHeight - 550" size="small" >
              <el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
              <el-table-column sortable prop="orderPrefix" :formatter="orderFormat" label="单证唯一标识"></el-table-column>
              <el-table-column sortable prop="operateType" label="操作状态" :formatter="opeFormat"></el-table-column>
              <el-table-column sortable prop="lastOpname" label="最后操作人"></el-table-column>
              <el-table-column sortable prop="currentUnit" label="所在单位"></el-table-column>
              <el-table-column sortable prop="lastOptime" label="最后操作时间"></el-table-column>
              <el-table-column sortable prop="fromUnit" label="单证来源单位"></el-table-column>
              <el-table-column sortable prop="currentUnit" label="当前所在单位"></el-table-column>
            </el-table>
            <el-pagination
              v-if="total"
              @current-change="pageChange"
              @size-change="sizeChange"
              :current-page="searchInfo.params.currPage"
              :page-size="10"
              :page-sizes="[10, 15, 20]"
              layout="sizes,total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="流转情况">
          <div class="receive_list">
            <el-table :data="tableDatas" border v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)"  :height="this.screenHeight - 550"  size="small" >
              <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
              <el-table-column sortable prop="orderType" label="票证类型"></el-table-column>
              <el-table-column sortable prop="startNum" label="起始号段"></el-table-column>
              <el-table-column sortable prop="endNum" label="终止号段"></el-table-column>
              <el-table-column sortable prop="claimer" label="领取人"></el-table-column>
              <el-table-column sortable prop="claimTime" label="领取时间"></el-table-column>
              <el-table-column sortable prop="getUnit" label="领取单位"></el-table-column>
              <el-table-column sortable prop="giveUnit" label="来源单位"></el-table-column>
              <el-table-column sortable prop="count" label="数量"></el-table-column>
              <el-table-column sortable prop="opName" label="操作人"></el-table-column>
              <el-table-column sortable prop="createTime" label="日志创建时间"></el-table-column>
            </el-table>
            <el-pagination
              v-if="totals"
              @current-change="pageChange"
              @size-change="sizeChange"
              :current-page="searchInfo.params.currPages"
              :page-size="10"
              :page-sizes="[10, 15, 20]"
              layout="sizes, total, prev, pager, next, jumper"
              :total="totals">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
      
</div>
</template>
<script>
import { tickeOpdaily, tickeDaily } from "../../service"
import { mapState } from "vuex"

import rules from "@/mode/rulesData"
import { isnumRequired } from "@/mode/ruleMethods" //校验
export default {
  data() {
    return {
      screenHeight: window.screen.height,
      type: "",
      loading: false,
      title: "票证日志",
      orderNo: "", 
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
          orderType: "航空运单", //票证类型
          currentUnit: "", //目前所在点
          startNum: "", //起始号段
          endNum: "", //终止号段
          currPage: 1,
          // currPages: 1,
          operateType: "", //操作类型
          opName: "", //操作人
          pageSize: 10,
          
          // pageSizes: 10,
        },
        timeValue: "",
      },
      tableData: [], //操作日志
      tableDatas: [], //流转日志
      total: "", //操作日志
      totals: "", //流转日志
      rules: {
        //查询区
        ...rules,
        "params.startNum": [{ validator: isnumRequired }],
        "params.endNum": [{ validator: isnumRequired }],
      },
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
    judge() {
      if (this.searchInfo.params.startNum) {
        if (this.searchInfo.params.endNum <= this.searchInfo.params.startNum) {
          this.searchInfo.params.endNum = ""
          this.$message("终止号段应大于起始号段,请重新填写")
        }
      }
    },
    pageChange(val) {
      this.searchInfo.params.currPage = val
      this.search()
    },
    
    sizeChange(size) {
      this.searchInfo.params.pageSize = size
      this.search()
    },
    load() {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
      this.search()
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    orderFormat(row, column, cellValue) {
      let stateArr = row.orderPrefix + row.orderNo
      return (cellValue = stateArr)
    },
    opeFormat(row, column, cellValue) {
      //处理操作状态的返回数据 转值
      let stateArr = [
        "",
        "",
        "作废",
        "",
        "",
        "取消",
        "内部返单",
        "内部退库",
        "内部销号",
        "外部返单",
        "外部退库",
        "外部销号",
        "取消内部返单",
        "取消内部退库",
        "取消内部销号",
        "取消外部返单",
        "取消外部退库",
        "取消外部销号",
      ]
      return stateArr[cellValue]
    },
    search() {
      this.loading = true
      this.searchInfo.params.startTime = this.searchInfo.timeValue[0] || ""
      this.searchInfo.params.endTime = this.searchInfo.timeValue[1] || ""

      tickeOpdaily(this.searchInfo.params).then(res => {
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
      tickeDaily(this.searchInfo.params).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          this.tableDatas = res.data.data[0].list
          this.totals = res.data.data[0].total
        } else if (res.data.status === 400) {
          setTimeout(() => {
            this.loading = false
            this.tableDatas = []
          }, 300)
        } else {
          this.tableDatas = []
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

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
