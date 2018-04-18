<!--王艺蒙-->
<template>
<div class="Search">
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" :rules="rules" ref="searchForm">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-form-item label="单证前缀" class="grid-content" prop="params.orderPrefix">
                <el-input size="mini" v-model="searchInfo.params.orderPrefix" placeholder="单证前缀"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="起始号段" class="grid-content" prop="params.startNum">
                <el-input size="mini" v-model="searchInfo.params.startNum" placeholder="起始号段"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="终止号段" class="grid-content" prop="params.endNum">
                <el-input size="mini" @change="judge" v-model="searchInfo.params.endNum" placeholder="终止号段" ref="endNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="单证物理状态" class="grid-content" prop="params.realityStatus">
                <el-select size="mini" v-model="searchInfo.params.realityStatus" placeholder="">
                  
                  <el-option label="全部" value=""></el-option>
                  <el-option label="已使用" value="1"></el-option>
                  <el-option label="未使用" value="0"></el-option>
                  <el-option label="已作废" value="2"></el-option>
                  <el-option label="丢失" value="3"></el-option>
                  <el-option label="破损" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="单证管理状态" class="grid-content" prop="params.manageStatus">
                    <el-select size="mini" v-model="searchInfo.params.manageStatus" placeholder="">
                       <el-option label="全部" value=""></el-option>
                      <el-option label="外部退库" value="4"></el-option>
                      <el-option label="外部返单" value="3"></el-option>
                      <el-option label="外部销号" value="5"></el-option>
                      <el-option label="内部退库" value="1"></el-option>
                      <el-option label="内部返单" value="0"></el-option>
                      <el-option label="内部销号" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="是否结算" class="grid-content" prop="params.isClear">
                      <el-select size="mini" v-model="searchInfo.params.isClear" placeholder="">
                         <el-option label="全部" value=""></el-option>
                        <el-option label="是" value="0"></el-option>
                        <el-option label="否" value="1"></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="结算单位" class="grid-content" prop="params.clearingUnit">
                <el-input size="mini" v-model="searchInfo.params.clearingUnit" placeholder="结算单位"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="所在单位" class="grid-content" prop="params.currentUnit">
                <el-input size="mini" v-model="searchInfo.params.currentUnit" placeholder="所在单位"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="当前负责人" class="grid-content" prop="params.currentOwner">
                <el-input size="mini" v-model="searchInfo.params.currentOwner" placeholder="当前负责人"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="票证来源单位" class="grid-content" prop="params.fromUnit">
                <el-input size="mini" v-model="searchInfo.params.fromUnit" placeholder="票证来源单位"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div class="btn_wrap">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-button type="primary" icon="el-icon-setting" size="mini" @click="ticketOp">票证操作</el-button>
            </div>
          </el-col>
          <el-col :span="6" :offset="12">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
          </div>
          </el-col>
        </el-row>
      </div>
      <div class="receive_list">
        <el-table :data="tableData" @selection-change="changegoSto" border style="width: 100%" :height="this.screenHeight - 390" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" size="small" >
          <el-table-column type="selection"  @selection-change="changegoSto(scope.row)"></el-table-column>
          <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
          <el-table-column sortable prop="orderPrefix" :formatter="orderFormat" label="单证唯一标识"></el-table-column>
          <el-table-column sortable prop="realityStatus" label="物理状态" :formatter="stateFormat"></el-table-column>
          <el-table-column sortable prop="manageStatus" label="管理状态" :formatter="mangFormat"></el-table-column>
          <el-table-column sortable prop="isClear" label="是否结算" :formatter="payFormat"></el-table-column>
          <el-table-column sortable prop="clearingUnit" label="结算单位"></el-table-column>
          <el-table-column sortable prop="currentOwner" label="当前责任人"></el-table-column>
          <el-table-column sortable prop="currentUnit" label="所在单位"></el-table-column>
          <el-table-column sortable prop="inTime" label="入库时间"></el-table-column>
          <el-table-column sortable prop="fromUnit" label="单证来源单位"></el-table-column>
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
</div>
</template>
<script>
import { tickeSearch } from "../../service"
import { mapState } from "vuex"

import rules from "@/mode/rulesData"
import { isnumRequired ,regThreeCode} from "@/mode/ruleMethods" //校验

export default {
  data() {
    return {
      type: "",
      loading: false,
      title: "票证管理",
      orderNo: "",
      screenHeight: window.innerHeight,
      searchInfo: {
        params: {
          orderPrefix: "",
          manageStatus: "",
          realityStatus: "",
          isClear: "",
          clearingUnit: "",
          currentUnit: "",
          startNum: "",
          endNum: "",
          currentOwner: "",
          fromUnit: "",
          currPage: 1,
          pageSize: 10,
        },
      },
      tableData: [],
      total: "",
      idList: [],
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
        if (this.searchInfo.params.endNum < this.searchInfo.params.startNum) {
          this.searchInfo.params.endNum = ""
          this.$refs["endNum"].focus()
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
      this.$store.commit("TICKET_BATCH", [])
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
    stateFormat(row, column, cellValue) {
      let stateArr = ["未使用", "已使用", "已作废", "丢失", "破损"]
      return stateArr[cellValue]
    },
    payFormat(row, column, cellValue) {
      let stateArr = ["是", "否"]
      return stateArr[cellValue]
    },
    mangFormat(row, column, cellValue) {
      let stateArr = ["内部返单", "内部退库", "内部销号", "外部返单", "外部退库", "外部销号"]
      return stateArr[cellValue]
    },
    search() {
      this.loading = true
      tickeSearch({ ...this.searchInfo.params }).then(res => {
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
    changegoSto(item) {
      //根据多选数据信息获得入库单号集合
      const idList = []
      if (item.length > 0) {
        for (let a = 0; a < item.length; a++) {
          idList.push(item[a].id)
        }
        this.idList = idList
        this.$store.commit("TICKET_BATCH", idList)
      } else {
        const idList = []
        this.idList = idList
        this.$store.commit("TICKET_BATCH", idList)
      }
    },
    reset() {
      this.$refs["searchForm"].resetFields()
    },
    ticketOp() {
      if (this.idList.length > 0) {
        this.$router.push(`/ticket/currentOperation`)
      } else {
        this.$message("请选择操作的数据")
      }
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
