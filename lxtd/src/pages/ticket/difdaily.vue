<!--王艺蒙-->
<template>
<div class="Search">
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" :rules="rules" ref="searchForm">
        <el-row :gutter="10">
           <el-col :span="4">
                <el-form-item label="单号前缀" class="grid-content" prop="params.orderPrefix">
                <el-input size="mini" v-model="searchInfo.params.orderPrefix" placeholder="单号前缀"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="4" width="180">
                <el-form-item label="单号" class="grid-content break_line"  width="180" prop="params.orderNo">
                 <el-col>
                    <el-form-item prop="">
                    <el-input size="mini" v-model="searchInfo.params.orderNo" placeholder="单号前缀-单号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="异常类型" class="grid-content" prop="params.exceptionType">
                    <el-select size="mini" v-model="searchInfo.params.exceptionType" placeholder="">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="丢失" value="3"></el-option>
                      <el-option label="破损" value="4"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="登记人" class="grid-content" prop="params.registrant">
                <el-input size="mini" v-model="searchInfo.params.registrant" placeholder="登记人"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="登记营业点" class="grid-content" prop="params.registPlace">
                <el-input size="mini" v-model="searchInfo.params.registPlace" placeholder="登记营业点"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="是否已处理" class="grid-content" prop="params.isEnd">
                  <el-select size="mini" v-model="searchInfo.params.isEnd" placeholder="">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="已处理" value="0"></el-option>
                      <el-option label="未处理" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="起始时间" class="grid-content" prop="timeValue">
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
     
          <div class="receive_list">
            <el-table :data="tableData" border style="width: 100%" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" :height="this.screenHeight - 410"  size="small" >
              <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="查看" placement="right">
                    <el-button type="primary" icon="el-icon-fa-eye" size="mini" @click="detail(scope.row)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column sortable prop="orderPrefix" :formatter="orderFormat" label="单证唯一标识"></el-table-column>
              <el-table-column sortable prop="exceptionType" label="异常类型" :formatter="mangFormat"></el-table-column>
              <el-table-column sortable prop="registrant" label="登记人"></el-table-column>
              <el-table-column sortable prop="registPlace" label="登记营业点"></el-table-column>
              <el-table-column sortable prop="registTime" label="登记时间"></el-table-column>
              <el-table-column sortable prop="isEnd" label="是否已处理" :formatter="isFormat"></el-table-column>
            </el-table>
            <el-pagination
              v-if="total"
              @current-change="pageChange"
              @size-change="sizeChange"
              :current-page="searchInfo.params.currPage"
              :page-size="10"
              :page-sizes="[10, 15, 20]"
              layout="sizes, total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
           <el-dialog title="票证异常信息" :visible.sync="dialogTableVisible" width="60%">
             <el-form :model="editInfo" class="demo-form-inline change_form" label-position="top" ref="changeForm">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="完成处理" class="grid-content" prop="params.isEnd">
                            <el-select size="mini"  v-model="editInfo.params.isEnd" placeholder="">
                            <el-option label="已处理" value="0"></el-option>
                            <el-option label="未处理" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" class="grid-content" prop="params.exceptionDesc">
                        <el-input type="textarea" v-model="editInfo.params.exceptionDesc"
                        :rows="2" size="mini" 
                        placeholder="" class="operate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="btn_wrap">
                <el-row>
                <el-col :span="6" :offset="21">
                <div class="grid-content bg-purple">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="editTicket">修改</el-button>
                </div>
                </el-col>
                </el-row>
            </div>
        </el-dialog>
</div>
</template>
<script>
import { difDaily, difdailyEdit } from "../../service"
import { mapState } from "vuex"

import rules from "@/mode/rulesData"
import { regThreeCode ,isNumber } from "@/mode/ruleMethods" //校验


export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      type: "",
      loading: false,
      title: "异常票证日志",
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
          exceptionType: "",
          registrant: "",
          registPlace: "",
          isEnd: "",
          orderPrefix: "",
          orderNo: "",
          currPage: 1,
          pageSize: 10,
        },
        timeValue: "",
      },
      editInfo: {
        params: {
          isEnd: "",
          exceptionDesc: "",
          id: "",
        },
      },
      tableData: [],
      total: "",
      dialogTableVisible: false,
      rules: {
        //查询区
        ...rules,
        // "params.orderPrefix": [{ validator: regThreeCode }],
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
    mangFormat(row, column, cellValue) {
      let stateArr = ["", "", "", "丢失", "破损"]
      return stateArr[cellValue]
    },
    isFormat(row, column, cellValue) {
      let stateArr = ["已处理", "未处理"]
      return stateArr[cellValue]
    },
    search() {
      this.loading = true
      this.searchInfo.params.startTime = this.searchInfo.timeValue[0] || ""
      this.searchInfo.params.endTime = this.searchInfo.timeValue[1] || ""
      difDaily({
        ...this.searchInfo.params,
      }).then(res => {
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
    detail(item) {
      this.dialogTableVisible = true
      if (item.isEnd === 1) {
        this.editInfo.params.isEnd = "未处理"
      } else if (item.isEnd === 0) {
        this.editInfo.params.isEnd = "已处理"
      } else {
        this.editInfo.params.isEnd = ""
      }
      if (item.exceptionDesc) {
        this.editInfo.params.exceptionDesc = item.exceptionDesc
      }
      this.editInfo.params.id = item.id
    },
    editTicket() {
      difdailyEdit(this.editInfo.params).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: "票证异常信息修改成功",
            type: "success",
          })
          this.dialogTableVisible = false
          this.search()
        } else {
          this.$message(res.data.message)
        }
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
