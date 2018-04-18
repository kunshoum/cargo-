<!--王艺蒙-->
<template>
<div class="Search Report">
  <el-form class="demo-form-inline search_form" label-position="top" ref="searchForm">
    <el-row :gutter="10">
       <el-col :span="6" v-show="this.id === '1059' || this.id === '1060' || this.id === '1070'">
        <el-form-item label="汇总条件" class="grid-content">
          <el-select size="mini" filterable clearable v-model="searchInfo.collect"  @change="getCollect">
            <el-option v-for="(item, index) in collectDatas" :key="index" :id="item.id" :name="item.label" :label="item.name" :value="item.value"><span>{{item.label}}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4"
        v-for="item in searchQuery"
        v-if="item.isSelect === 0 && item.propertyType === 0"
        :key="item.id"
      >
        <el-form-item :label="item.name" class="grid-content" :prop="item.enName">
          <el-input size="mini" v-model="searchInfo[item.enName]" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-for="item in searchQuery" v-if="item.name === '单据类型'" :key="item.id">
        <el-form-item :label="item.name" class="grid-content" :prop="item.enName">
          <el-select size="mini" clearable v-model="searchInfo[item.enName]" @change="getType">
            <el-option v-for="(item, index) in item.reportItemSelects" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
       <el-col :span="4" v-for="item in searchQuery" v-if="item.isSelect === 0 && item.propertyType === 1 && item.name != '单据类型'" :key="item.id">
        <el-form-item :label="item.name" class="grid-content" :prop="item.enName">
          <el-select size="mini" v-if="item.enName != 'pick_up_location' && item.enName != 'update_person' && item.enName != 'cargo_status' && item.enName != 'is_domestic' && item.enName != 'issuer'" clearable v-model="searchInfo[item.enName]"  @change="dbsearch">
            <el-option v-for="(item, index) in item.reportItemSelects" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-if="item.enName === 'pick_up_location'" @change="pickUp" size="mini" clearable v-model="searchInfo[item.enName]">
            <el-option v-for="(item, index) in item.reportItemSelects" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-if="item.enName === 'is_domestic'" @change="isDomestic" size="mini" clearable v-model="searchInfo[item.enName]">
            <el-option v-for="(item, index) in item.reportItemSelects" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-if="item.enName === 'issuer'" @change="isSuer" size="mini" clearable v-model="searchInfo[item.enName]">
            <el-option v-for="(item, index) in item.reportItemSelects" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-if="item.enName === 'update_person'" @change="updatePerson" size="mini" clearable v-model="searchInfo[item.enName]">
            <el-option v-for="(item, index) in item.reportItemSelects" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-if="item.enName === 'cargo_status'" @change="cargoStatus" size="mini" clearable v-model="searchInfo[item.enName]">
            <el-option v-for="(item, index) in item.reportItemSelects" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
       <el-col :span="8" v-show="this.id === '1074' ">
        <el-form-item label="起始日期" class="grid-content" prop="timeValue">
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
       <el-col :span="8" v-show="this.id === '1075' ">
        <el-form-item label="开票日期" class="grid-content" prop="timeValue">
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
       <el-col :span="15" >
        <set-search :data="searchQuery" :collectId="collectId" :type='type' @success="renderPage" title="设置查询条件" :id="id"/>
        <set-show :data="allQuery" :collectId="collectId" :type='type' @success="renderPage" title="设置表头显示项" :id="id"/>
        <set-sort :data="sortQuery" :collectId="collectId" :type='type' @success="renderPage" @updateSort="updateSort" title="排列表头显示项" :id='id'/>
        <sale-Excel :data="table" :id='id'/>
        <el-col :span="3">
          <el-button type="primary" size="mini" @click="print">打印</el-button>  
        </el-col>  
      </el-col>
      <el-col :span="5" :offset="2">
        <div class="grid-content bg-purple" style="float: right">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="reset" size="mini">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <div id="end_list">
    <el-table :data="tableData" border style="width: 100%" :height="this.screenHeight - 370" size="small">
      <el-table-column label="序号" prop="_index"  width="50"></el-table-column>
      <el-table-column sortable
       v-for="(item,index) in tableQuery"
      :key="index"
      v-if="!item.isSelect"
      :prop="item.enName" 
      :label="item.name"
      :align="item.leftRight === 0 ? 'left' : 'right' "
      ></el-table-column>
    </el-table>
  </div>
   <end-print :data="tableQuery" :startDates='startDates' :endDates='endDates' :summary='summary' :updateVal='updateVal' :cargoVal='cargoVal' :isSuerVal='isSuerVal' :domesticVal='domesticVal' :deliveryUp='deliveryUp' :billValue='billValue' :profiTitle="title" :id='id' :visible="printVisible" :flightInfo="searchInfo" :list="list" status="end" @close="close"/>
</div>
</template>

<script>
import {
  renderReport,
  searchReportm,
  selectItem,
  searchlistReportm,
  exportReport,
  searchroomReportm,
  searchinternetReportm,
  searchlocalReportm,
} from "../../service"
import formatParams from "../../utils/formatParams"

import { mapState } from "vuex"
import SetSearch from "./searchQuery.vue" //检索
import SetShow from "./searchQuery.vue" //tablehead
import SetSort from "./reportSort.vue" //sort
import EndPrint from "./print"
import SaleExcel from "./profitExcel"
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      printVisible: false,
      id: this.$route.params.id,
      name: "",
      table: "",
      reportDatas: [],
      reportheadDatas: [],
      collectDatas: [],
      sortDatas: [],
      tableData: [],
      searchQuery: [],
      tableQuery: [],
      sortQuery: [],
      list: [],
      allQuery: [],
      type: "",
      collectId: "",
      authList: "",
      reportItemSelect: [],
      reportItemSelects: [],
      startDate: "",
      endDate: "",
      searchInfo: {
        collect: "",
        timeValue: "",
        type: "0",
        // startDate: "",
        // endDate: "",
      },
      summary: "",
      billValue: "",
      deliveryUp: "",
      domesticVal: "",
      isSuerVal: "",
      updateVal: "",
      cargoVal: "",
      startDates: "",
      endDates: "",
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
    }
  },
  components: {
    SetSearch,
    SetShow,
    SetSort,
    EndPrint,
    SaleExcel,
  },
  mounted() {
    this.load()
    this.search()
  },
  computed: {
    title() {
      // 由登陆权限信息根据当前id筛选出当前页面标题
      if (this.authList && this.authList.filter(item => item.id === this.id * 1)[0]) {
        return this.authList.filter(item => item.id === this.id * 1)[0].name
      }
    },
  },
  watch: {
    "$route.params.id"() {
      this.id = this.$route.params.id
      this.load()
      this.search()
    },
  },
  methods: {
    pickUp(val) {
      this.dbsearch()
      this.deliveryUp = val
    },
    isDomestic(val) {
      this.dbsearch()
      let domestic = ["国内", "国际"]
      this.domesticVal = domestic[val]
    },
    isSuer(val) {
      this.isSuerVal = val
    },
    updatePerson(val) {
      this.updateVal = val
    },
    cargoStatus(val) {
      let cargoStatu = ["已录入", "可提货", "已提货", "已派送", "已中转"]
      this.cargoVal = cargoStatu[val * 1 + 1]
    },
    load() {
      if (this.$route.params.id === "1060") {
        this.searchInfo.collect = "main"
        this.collectId = 1012
        this.type = 0
      } else if (this.$route.params.id === "1059") {
        this.searchInfo.collect = "sender"
        this.collectId = 1016
        this.type = 0
      } else if (this.$route.params.id === "1070") {
        this.searchInfo.collect = "departure"
        this.collectId = 1042
      } else if (this.$route.params.id === "1074") {
        this.type = 0
        this.searchInfo.collect = ""
        this.collectId = ""
      } else if (this.$route.params.id === "1075") {
        this.type = 0
        this.searchInfo.collect = ""
        this.collectId = ""
      }

      this.authList = JSON.parse(this.$getStore("authList"))
      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.$store.commit("ADD_FOOTNAV", {
        name: this.title,
        route: this.$route.path,
      })
      this.renderPage()
      this.search()
    },
    reset() {
      this.searchInfo = {}
    },
    renderPage() {
      if (this.$route.params.id === "1070") {
        renderReport({ pageId: this.id, collectId: this.collectId }).then(res => {
          if (res.data.status === 200) {
            this.sortDatas = res.data.data[0].userHeadItems
            this.reportDatas = res.data.data[0].searchItems
            this.reportheadDatas = res.data.data[0].headItems
            this.dataFilter()
            if (res.data.data[0].collectList) {
              this.collectDatas = res.data.data[0].collectList.map(item => {
                return { value: item.param, label: item.fullName, name: item.name, id: item.id }
              })
            }
            console.log(this.sortDatas.length)
            if(this.sortDatas.length != 0){
              this.search()
            }else{
              this.$notify({
              title: "警告",
              message: "请先设置显示项",
              type: "warning",
              })
            }
          }
        })
      } else {
        renderReport({ pageId: this.id, type: this.type, collectId: this.collectId }).then(res => {
          if (res.data.status === 200) {
            this.sortDatas = res.data.data[0].userHeadItems
            this.reportDatas = res.data.data[0].searchItems
            this.reportheadDatas = res.data.data[0].headItems
            this.dataFilter()
            if (res.data.data[0].collectList) {
              this.collectDatas = res.data.data[0].collectList.map(item => {
                return { value: item.param, label: item.fullName, name: item.name, id: item.id }
              })
            }
            console.log(this.sortDatas.length)
            if(this.sortDatas.length != 0){
              this.search()
            }else{
              this.$notify({
              title: "警告",
              message: "请先设置显示项",
              type: "warning",
              })
            }
          }
        })
      }
    },
    dataFilter() {
      this.searchQuery = this.reportDatas.filter((item, index) => {
        return item
      })
      this.allQuery = this.reportheadDatas.filter((item, index) => {
        return item
      })

      let len = this.sortDatas.length
      this.sortQuery = this.sortDatas.filter((item, index) => {
        return item
      })

      this.tableQuery = this.sortDatas.map(item => item)
      this.formatSearchData()
    },
    formatSearchData() {
      this.searchQuery = this.searchQuery.map(item => {
        var selsctArr = []
        if (item.reportItemSelects && item.name != "单据类型") {
          var objSelect = { name: "全部", value: undefined }
          item.reportItemSelects.unshift(objSelect)
          return item
        } else {
          return item
        }
      })
    },
    getCollect(val) {
      if (!val) {
        return
      }
      this.collectId = val
      let selectVal = this.collectDatas.filter(item => item.value === this.collectId)
      this.summary = selectVal[0].label
      this.collectId = selectVal[0].id
      
      this.$notify({
          title: "警告",
          message: "请设置"+selectVal[0].name+"为表格显示项",
          type: "warning",
      })
      if ((this.sortDatas.length = 0)) {
        this.renderPage()
        this.search()
      } else {
        this.renderPage()
      }
    },
    getType(val) {
      let billStyle = ["主单", "分单"]
      this.billValue = billStyle[val]
      if (val) {
        this.type = val
      } else {
        this.type === 0
      }

      this.renderPage()
      this.search()
    },
    dbsearch() {
      this.search()
      this.search()
    },
    dataTable(msg) {
      // 格式化查询出的数据
      let arr = msg.queryReturn
        .map(item => {
          if (item.total === null) {
            return item.list.concat(item.total)
          } else {
            item.total._index = "小计"
            return item.list.concat(item.total)
          }
        })
        .reduce((arr1, arr2) => {
          return arr1.concat(arr2)
        }, [])

      let index = 0
      msg.total._index = "总计"

      this.tableData = arr.concat(msg.total)
      this.tableData.forEach(item => {
        if (!item._index) {
          item._index = ++index
        }
      })
    },
    dataTables(msg) {
      // 格式化查询出的数据
      let arr = msg.queryReturn
        .map(item => {
          item.total._index = "小计"
          return item.list.concat(item.total)
        })
        .reduce((arr1, arr2) => {
          return arr1.concat(arr2)
        }, [])

      let index = 0
      msg.total._index = "总计"

      this.tableData = arr.concat(msg.total)
      this.tableData.forEach(item => {
        if (!item._index) {
          item._index = ++index
        }
      })
    },
    search() {
      if (this.$route.params.id === "1060") {
        searchReportm({ ...this.searchInfo }).then(res => {
          if (res.data.status === 200) {
            this.dataTable(res.data.data[0])
            this.loading = false
            this.table = window.document.getElementById("end_list").innerHTML
          } else {
            this.tableData = []
            this.table = window.document.getElementById("end_list").innerHTML
          }
        })
      } else if (this.$route.params.id === "1059") {
        searchlistReportm({ ...this.searchInfo }).then(res => {
          if (res.data.status === 200) {
            this.dataTables(res.data.data[0])
            this.loading = false
            this.table = window.document.getElementById("end_list").innerHTML
          } else {
            this.tableData = []
            this.table = window.document.getElementById("end_list").innerHTML
          }
        })
      } else if (this.$route.params.id === "1070") {
        delete this.searchInfo.type
        searchroomReportm({ ...this.searchInfo }).then(res => {
          if (res.data.status === 200) {
            this.dataTables(res.data.data[0])
            this.loading = false
            this.table = window.document.getElementById("end_list").innerHTML
          } else {
            this.tableData = []
            this.table = window.document.getElementById("end_list").innerHTML
          }
        })
      } else if (this.$route.params.id === "1075") {
        if (this.searchInfo.timeValue) {
          this.startDate = this.searchInfo.timeValue[0] || ""
          this.endDate = this.searchInfo.timeValue[1] || ""
          delete this.searchInfo.timeValue
          delete this.searchInfo.collect
        } else {
          this.startDate = ""
          this.endDate = ""
        }

        searchlocalReportm({ ...this.searchInfo, startDate: this.startDate, endDate: this.endDate }).then(res => {
          if (res.data.status === 200) {
            this.dataTables(res.data.data[0])
            this.loading = false
            this.table = window.document.getElementById("end_list").innerHTML
          } else {
            this.tableData = []
            this.table = window.document.getElementById("end_list").innerHTML
          }
        })
      } else if (this.$route.params.id === "1074") {
        delete this.searchInfo.collect
        if (this.searchInfo.timeValue) {
          this.startDate = this.searchInfo.timeValue[0] || ""
          this.endDate = this.searchInfo.timeValue[1] || ""
        } else {
          this.startDate = ""
          this.endDate = ""
        }

        searchinternetReportm({ ...this.searchInfo, startDate: this.startDate, endDate: this.endDate }).then(res => {
          if (res.data.status === 200) {
            this.dataTables(res.data.data[0])
            this.loading = false
            this.table = window.document.getElementById("end_list").innerHTML
          } else {
            this.tableData = []
            this.table = window.document.getElementById("end_list").innerHTML
          }
        })
      }
    },
    updateSort(list) {
      this.sortQuery = list
    },
    print() {
      let searchPrint = this.reportheadDatas.filter(item => item.isSelect === 0)
      if (searchPrint.length > 10) {
        this.$notify({
          title: "警告",
          message: "设置数据显示项过多",
          type: "warning",
        })
      }else{
        if (this.searchInfo.timeValue) {
          this.startDates = this.searchInfo.timeValue[0] || ""
          this.endDates = this.searchInfo.timeValue[1] || ""
        }
        this.printStatus = "end"
        this.printVisible = true
        this.list = this.tableData
      }
      
    },
    close() {
      this.printVisible = false
    },
  },
}
</script>
<style>
.el-notification {
  z-index: 9999999 !important;
}
.el-table  th{
  
    text-align: left !important;
  
}
</style>