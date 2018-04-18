/**
 * 马少良
 */
 
<template>
<div class="Search">
  <el-form class="demo-form-inline search_form" label-position="top" ref="searchForm">
    <el-row :gutter="10">
      <el-col :span="4"
        v-for="(item, index) in searchData"
        v-if="!item.selectValues"
        :key="index"
      >
        <el-form-item :label="item.key" class="grid-content" :prop="item.value">
          <el-input size="mini" v-model="searchInfo[item.value]" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4"
        v-for="(item, index) in searchData"
        v-if="item.selectValues"
        :key="index"
      >
        <el-form-item :label="item.key" class="grid-content" :prop="item.value">
          <el-select size="mini" v-model="searchInfo[item.value]" filterable placeholder="请选择">
            <el-option
              v-for="(option, index) in item.selectValues"
              :key="index"
              :label="option"
              :value="option === '全部' ? undefined : option">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="btn_wrap">
    <el-row>
      <el-col :span="15" :offset="1">
        <div class="grid-content">
          <import-excel @reload="loadPage"/>
          <export-excel />
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="mutiEdit">批量编辑</el-button>
          <el-button type="primary" size="mini" @click="add">添加</el-button>
          <el-button type="primary" size="mini" icon="el-icon-delete" @click="bathDelete">删除</el-button>
          <el-button type="primary" size="mini" icon="el-icon-setting" @click="setSearch">设置查询条件</el-button>
          <el-button type="primary" size="mini" icon="el-icon-setting" @click="setShow">设置表头显示项</el-button>
        </div>
      </el-col>
      <el-col :span="5" :offset="2">
      <div class="grid-content" style="float: right">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
      </div>
      </el-col>           
    </el-row>
  </div>
  <div>
    <el-table 
      class="basicdata_table"
      ref="basicTable"
      v-if="showData.length"
      :data="tableData" border style="width: 100%" v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" :height="tableHeight" size="small"
      :row-class-name="tableRowClassName"
      @cell-dblclick="dbsearch"
      @cell-click="inlineEdit"
      @selection-change="getIdList">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column fixed type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column fixed label="操作" width="130">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="复制添加" placement="left">
              <el-button type="primary" icon="el-icon-fa-file-text" size="mini" @click="copyAdd(scope.row[1])"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" placement="right">
              <el-button type="primary" icon="el-icon-edit" size="mini"  @click="edit(scope.row[1])"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable
        v-for="(item,index) in showData" 
        :key="index" 
        :prop="(index+2) + ''"  
        :label="item.key">
          <template slot-scope="scope">
            <el-select 
              v-show="scope.column.id === column_id && scope.row[1] === row_id"
              size="mini" filterable default-first-option allow-create
              v-model="scope.row[index+2]"
              @blur="exitInlineEdit"
              @change="saveEdit(scope.row, scope.column)">
              <el-option
                v-for="(item, index) in inlineOptions"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <span v-show="scope.column.id !== column_id || scope.row[1] !== row_id">{{ scope.row[index+2] }}</span>
          </template>
        </el-table-column>
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
  <add-edit :id="idList" :operationType="operationType" :visible="visible" :editData="editData" 
  :title="dialogTitle" @close="visible = false" @search="search"/>
  <set-search :id="pageId" :visible="searchVisible" :title="'设置查询项'" :data="searchSetData" 
  @close="searchVisible = false" @updateSearchData="updateSearchData" @cancelSearchSet="cancelSearchSet" @setSuccess="setSuccess"/>
  <set-show :id="pageId" :visible="showVisible" :title="'设置显示项'" :data="showSetData" 
  @close="showVisible = false" @updateShowData="updateShowData" @cancelShowSet="cancelShowSet" @setSuccess="setSuccess"/>
</div>
</template>
<script>

import {loadPageItem, searchExcel, batchDelete, beforeEditBasic, beforeEditInline, editBasicData} from "@/service"
import ImportExcel from "./importExcel"
import ExportExcel from "./exportExcel"
import AddEdit from "./addEdit"
import SetSearch from "./setSearch"
import SetShow from "./SetShow"

export default {
  data() {
    return {
      pageId: '',
      searchData: [],
      showData: [],
      setData: [],
      searchSetData: [],
      showSetData: [],
      searchInfo: {},
      tableData: [],
      loading: false,
      total: 0,
      currPage: 1,
      pageSize: 10,
      idList: [],
      id: '',
      operationType: 'add',
      visible: false,
      searchVisible: false,
      showVisible: false,
      editData: [],
      dialogTitle: '',
      screenHeight: window.innerHeight,
      searchHeight: 0,
      column_id: "",
      row_id: "",
      column_name: "",
      inlineOptions: [],
    }
  },
  components: {
    ImportExcel,
    ExportExcel,
    AddEdit,
    SetSearch,
    SetShow,
  },
  watch: {
    '$route.params.id'() {
      this.load()
    }
  },
  mounted() {
    this.pageId = this.$route.params.id
    this.authList = JSON.parse(this.$getStore("authList"))
    this.load()
  },
  computed: {
    title() {
      return this.authList.filter(item => item.id === this.pageId*1)[0].name
    },
    tableHeight() {
      return this.screenHeight - this.searchHeight - 200
    },
  },
  methods: {
    inlineEdit(row, column, cell, event) {
      if(!column.property) { return }
      this.column_id = column.id
      this.row_id = row[1]
      
      this.column_name = this.showData[column.property - 2].value
      beforeEditInline({page_id: this.pageId, col: this.column_name}).then(res => {
        if(res.data.status === 200) {
          this.inlineOptions = res.data.data
        }
      })
    },
    exitInlineEdit() {
      this.column_id = ""
      this.row_id = ""
    },
    saveEdit(row, column) {
      this.$confirm('确认要修改吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveInlineEdit(row, column)
      }).catch(() => {
        this.search()
      })
    },
    saveInlineEdit(row, column) {
      let values = row.filter((item, index) => index > 1)
      
      let addData = this.showData.map((item, index) => {
        return {
          key: item.value,
          value: values[index]
        }
      })

      let idList = [row[1]]

      editBasicData({
        addData,
        idList,
        page_id: this.pageId,
      }).then(res => {
        if(res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: '修改成功',
            type: "success",
          })
        }
        this.search()
      })
    },
    load() {
      this.pageId = this.$route.params.id
      this.$store.commit('CHANGE_TOPTITLE', '基础数据 - ' + this.title)
      this.$store.commit('ADD_FOOTNAV', {
        name:  this.title,
        route: this.$route.path,
      })
      this.currPage = 1
      this.loadPage()
    },
    setSuccess() {
      this.loadPage()
    },
    searchParams() {
      let arr = Object.entries(this.searchInfo)
      let selectParam = arr.map(item => {
        return {
          key: item[0],
          value: item[1]
        }
      })

      return {
        currPage: this.currPage,
        pageSize: this.pageSize,
        selectParam,
        page_id: this.pageId,
      }
    },
    searchHandler() {
      this.currPage = 1
      this.search()
    },
    search() {
      searchExcel(this.searchParams()).then(res => {
        if(res.data.status === 200) {
          this.total = res.data.data[0].total
          this.tableData = res.data.data[0].list

          this.$nextTick(() => {
            // 触发页面重绘,解决第一次渲染时滚动条样式位置不对问题
            this.tableData = this.tableData.map(item => item)
          })
        }
      })
    },
    pageChange(val) {
      this.currPage = val
      this.search()
    },
    sizeChange(size) {
      this.pageSize = size
      this.search()
    },
    resetPage() {
      this.setData = []
      this.searchSetData = []
      this.showSetData = []
      this.searchData = []
      this.showData = []
      this.total = 0
      this.currPage = 1
      this.pageSize = 10
      this.tableData = []
      this.searchInfo = {}
      this.idList = []
      this.id = ''
      this.column_id = ""
      this.row_id = ""
      this.column_name = ""
      this.inlineOptions = []
    },
    updateSearchData(list) {
      this.searchSetData = this.searchSetData.map(item => {
        if( list.some(val => val === item.value) ) {
          item.is_select = 0
        }else {
          item.is_select = 1
        }
        return item
      })
    },
    updateShowData(list) {
      this.showSetData = this.showSetData.map(item => {
        if( list.some(val => val === item.value) ) {
          item.is_show = 0
        }else {
          item.is_show = 1
        }
        return item
      })
    },
    cancelSearchSet() {
      this.searchSetData = this.deepCopy(this.setData)
    },
    cancelShowSet() {
      this.showSetData = this.deepCopy(this.setData)
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    loadPage() {
      this.resetPage()
      loadPageItem({page_id: this.pageId}).then(res => {
        if(res.data.status === 200) {
          this.searchData = res.data.data[0].selectParam
          this.showData = res.data.data[0].showCol
          this.setData = this.deepCopy(res.data.data[0].allCol)
          this.searchSetData = this.deepCopy(res.data.data[0].allCol)
          this.showSetData = this.deepCopy(res.data.data[0].allCol)

          this.formatSearchData()
          this.search()

          this.$nextTick(() => {
            this.searchHeight = this.$refs['searchForm'].$el.offsetHeight
          })
        }else {
          this.resetPage()
        }
      })
    },
    formatSearchData() {
      this.searchData = this.searchData.map(item => {
        if(item.selectValues) {
          item.selectValues.unshift('全部')
          return item
        }else {
          return item
        }
      })
    },
    reset() {
      this.searchInfo = {}
      this.search()
    },
    indexMethod(index) {
      return (this.currPage - 1)*10 + index + 1
    },
    getIdList(list) {
      this.idList = list.map(item => {
        return item[1]
      })
    },
    bathDelete() {
      if(!this.idList.length) {
        this.$notify({
          title: "警告",
          message: '请选择',
          type: "warning",
        })
        return
      }

      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {//删
        batchDelete({idList:this.idList, page_id: this.pageId}).then(res => {
          if(res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: res.data.message,
              type: "success",
            })
            this.search()
          }
        })
      })
    },
    setSearch() {
      this.searchVisible = true
    },
    setShow() {
      this.showVisible = true
    },
    getEditData() {
      beforeEditBasic({page_id: this.pageId, id: this.id}).then(res => {
        if(res.data.status === 200) {
          this.editData = res.data.data
          this.visible = true
        }
      })
    },
    add() {
      this.id = '',
      this.operationType = "add"
      this.dialogTitle = "添加"
      this.getEditData()
    },
    copyAdd(id) {
      this.id = id
      this.idList = [id]
      this.operationType = "add"
      this.dialogTitle = "复制添加"
      this.getEditData()
    },
    edit(id) {
      this.id = id
      this.idList = [id]
      this.operationType = "edit"
      this.dialogTitle = "编辑"
      this.getEditData()
    },
    mutiEdit() {
      if(!this.idList.length) {
        this.$notify({
          title: "警告",
          message: '请选择',
          type: "warning",
        })
        return
      }
      this.id = ''
      this.operationType = "edit"
      this.dialogTitle = "批量编辑"
      this.getEditData()
    },
    dbsearch(row, column, cell, event) {
      this.currPage = 1
      let params = {
        currPage: this.currPage,
        selectParam: [{
          key: this.showData[column.property - 2].value,
          value: row[column.property]
        }],
        page_id: this.pageId
      }
      setTimeout(() => {
        searchExcel(params).then(res => {
          if(res.data.status === 200) {
            this.total = res.data.data[0].total
            this.tableData = res.data.data[0].list
          }
        })
      }, 100)
    },
    tableRowClassName({ row }) { //数据过期
        if (row[0] === "0") {
          return "cancel-row"
        } else {
          return "success-row"
        }
    },
  },
}
</script>

<style lang="less">
  .search_form {
    padding-bottom: 16px;
    border-bottom: 1px solid #D8DCE5;
    margin-bottom: 12px;
  }

  .btn_wrap {
    margin-bottom: 10px;
  }

  .basicdata_table {
    .el-table__row {
      .cell {
        white-space: normal !important;
        font-size: 13px;
        font-weight: 600;
      }
    }
  }
</style>
