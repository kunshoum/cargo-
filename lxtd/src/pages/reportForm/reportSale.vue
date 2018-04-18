<template>
<!-- 雷云朵 -->
<div class="Search Report">
  <el-form class="demo-form-inline search_form" label-position="top" ref="searchForm">
    <el-row :gutter="10">
      <el-col :span="4"
        v-for="(item, index) in selectList"
        v-if="item && item.selectValues && item.cn_name === '查询依据'"
        :key="item.en_name"
      >
        <el-form-item :label="item.cn_name" class="grid-content" :prop="item.value">
          <el-select clearable size="mini" v-model="searchInfo[item.en_name]" filterable placeholder="请选择" @change='changeName'>
            <el-option
              v-for="(option, index) in item.selectValues"
              :key="index"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4"
        v-for="(item, index) in selectList"
        v-if="item.cn_name === '单据类型'"
        :key="item.en_name"
      >
        <el-form-item :label="item.cn_name" class="grid-content" :prop="item.value">
          <el-select clearable size="mini" v-model="searchInfo[item.en_name]" filterable placeholder="请选择" @change='styleName'>
            <el-option
              v-for="(option, index) in item.selectValues"
              :key="index"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4"
        v-for="(item, index) in selectList"
        v-if="item.cn_name === '简易制单'"
        :key="item.en_name"
      >
        <el-form-item :label="item.cn_name" class="grid-content" :prop="item.value">
          <el-select clearable size="mini" v-model="searchInfo[item.en_name]" filterable placeholder="请选择">
            <el-option
              v-for="(option, index) in item.selectValues"
              :key="index"
              :label="option.name"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4"
        v-for="(item, index) in selectList"
        v-if="item.selectValues && item.cn_name !== '查询依据' && item.cn_name !== '单据类型' && item.en_name !== 'order_no' && item.cn_name !== '简易制单'"
        :key="item.en_name"
      >
        <el-form-item :label="item.cn_name" class="grid-content" :prop="item.value">
          <el-select v-if="item.en_name !== 'state' && item.en_name !== 'pay_sale' && item.en_name !== 'billing_location' && item.en_name !== 'issuer' && item.en_name !== 'is_domestic' && item.en_name !== 'pick_up_location' " clearable size="mini" v-model="searchInfo[item.en_name]" 
            filterable remote default-first-option allow-create placeholder="请选择">
            <el-option
            v-for="(option, index) in item.selectValues"
            :key="index"
            :label="option.name"
            :value="option.value">
            </el-option>
          </el-select>
          <el-select v-if="item.en_name === 'billing_location'" clearable size="mini" v-model="searchInfo[item.en_name]" 
            filterable remote default-first-option allow-create placeholder="请选择" @change="receive">
            <el-option
            v-for="(option, index) in item.selectValues"
            :key="index"
            :label="option.name"
            :value="option.value">
            </el-option>
          </el-select>
          <el-select v-if="item.en_name === 'issuer'" clearable size="mini" v-model="searchInfo[item.en_name]" 
            filterable remote default-first-option allow-create placeholder="请选择" @change="ticketHolder">
            <el-option
            v-for="(option, index) in item.selectValues"
            :key="index"
            :label="option.name"
            :value="option.value">
            </el-option>
          </el-select>
          <el-select v-if="item.en_name === 'pick_up_location'" clearable size="mini" v-model="searchInfo[item.en_name]" 
            filterable remote default-first-option allow-create placeholder="请选择" @change="pickUp">
            <el-option
            v-for="(option, index) in item.selectValues"
            :key="index"
            :label="option.name"
            :value="option.value">
            </el-option>
          </el-select>
          <el-select v-if="item.en_name === 'is_domestic'" clearable size="mini" v-model="searchInfo[item.en_name]" 
            filterable remote default-first-option allow-create placeholder="请选择" @change="domestic">
            <el-option
            v-for="(option, index) in item.selectValues"
            :key="index"
            :label="option.name"
            :value="option.value">
            </el-option>
          </el-select>
          <el-select v-if="item.en_name === 'state'" clearable size="mini" v-model="searchInfo[item.en_name]" 
            filterable remote default-first-option allow-create placeholder="请选择" @change="statusChange">
            <el-option
            v-for="(option, index) in item.selectValues"
            :key="index"
            :label="option.name"
            :value="option.value">
            </el-option>
          </el-select>
          <el-select v-if="item.en_name === 'pay_sale'" clearable size="mini" v-model="searchInfo[item.en_name]" 
            filterable remote default-first-option allow-create placeholder="请选择" @change="paySale">
            <el-option
            v-for="(option, index) in item.selectValues"
            :key="index"
            :label="option.name"
            :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4"
        v-for="(item, index) in selectList"
        v-if="item.en_name === 'order_no'"
        :key="item.en_name"
      >
        <el-form-item :label="item.cn_name" class="grid-content" :prop="item.en_name">
          <el-input size="mini" v-model="searchInfo[item.en_name]" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="按日期" class="grid-content" prop="timeValue">
          <el-date-picker
            size="mini"
            ref='date_picker'
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
      <el-col :span="15" >
        <set-search :data="searchData" :quaryBasis='quaryBasis' :type='type' @success="searchReport" title="设置查询条件" :id="id" />
        <set-show :data="showData" :quaryBasis='quaryBasis' :type='type' @success="searchReport" title="设置表头显示项" :id="id"/>
        <set-sort :data="showDataList" :quaryBasis='quaryBasis' :type='type' @success="searchReport" @updateSort="updateSort" title="排列表头显示项" :id="id" />
        <sale-Excel :type="type" :enName="en_name" :quaryBasis='quaryBasis' :id='id'/>
        <el-col :span="3">
          <el-button type="primary" size="mini" @click="print">打印</el-button>  
        </el-col>
      </el-col>
      <el-col :span="5" :offset="2">
        <div class="grid-content bg-purple" style="float: right">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
  <div  class="end_list report_sale_list">
    <el-table :data="tableData" border style="width: 100%" :height="screenHeight - 370" size="small"
    id="reportTable"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column label="序号" prop="sequence" width="50"></el-table-column>
      <el-table-column sortable
      v-for="(item, index) in tableQuery"
      :key="index"
      v-if="!item.is_select"
      :align = "item.left_right === 1 ? 'right' : 'left'"
      :prop="item.en_name" 
      :label="item.cn_name"
      ></el-table-column>
    </el-table>
  </div>
   <end-print :data="tableQuery" :id='id' :paySaleValue='paySaleValue' :pickUpLocation='pickUpLocation' :title='title' :ticketValue='ticketValue' :domesticValue='domesticValue' :receiveValue='receiveValue' :oneStyle='oneStyle' :orderSelect='orderSelect' :statusValue='statusValue' :visible="printVisible" :flightInfo="searchInfo" :list="list" status="end" @close="close"/>
</div>
</template>

<script>
import { mapState } from "vuex"
import { getReportItems, listReportRecords } from "../../service"
import SetSearch from "./headerItem.vue"
import SetShow from "./headerItem.vue"
import SetSort from "./arrayItem.vue"
import SaleExcel from "./saleExcel"

import EndPrint from "./saleprint.vue"

export default {
  data() {
    return {
      id: this.$route.params.id,
      allData: [],
      authList: [],
      screenHeight: window.innerHeight,
      searchInfo: {
        type: "0",
        quary_basis: "",
        print_time_start: "",
        print_time_end: "",
      },
      timeValue: [],
      searchParam: {},
      // 设置表头显示项  is_form_search: 0
      showData: [],
      // 设置查询条件  is_search: 0
      searchData: [],
      searchList: [],
      // 排列表头显示项
      showDataList: [],
      showList: [],
      // 列表展示
      tableQuery: [],
      dataList: [],
      tableData: [],
      checked: false,
      searchVal: [],
      loading: false,
      // 显示的查询条件
      selectList: [],
      list: [],
      printVisible: false,
      // 查询依据的val
      quaryBasis: "",
      searchStyle: "",
      valType: "",
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
      oneStyle: '',
      statusValue: '',
      orderSelect: '',
      receiveValue: '',
      ticketValue: '',
      domesticValue: '',
      pickUpLocation: '',
      paySaleValue: '',
      type: "0",
      en_name: null,
    }
  },
  components: {
    SetSearch,
    SetShow,
    SetSort,
    SaleExcel,
    EndPrint,
  },
  mounted() {
    this.load()
  },
  computed: {
    title() {
      // 由登陆权限信息根据当前id筛选出当前页面标题
      if (this.authList.filter(item => item.id === this.id * 1)[0]) {
        return this.authList.filter(item => item.id === this.id * 1)[0].name
      }
    },
  },
  watch: {
    "$route.params.id"() {
      this.resetPage()
      this.load()
    },
  },
  methods: {
    statusChange(val) {
      let stateVal = ['', '订舱确认', '订舱取消']
      this.statusValue = stateVal[val]
    },
    paySale(val) {
      let payVal = ['', '已销账', '未收付款']
      this.paySaleValue = payVal[val]
    },
    receive(val) {
      this.receiveValue = val
    },
    ticketHolder(val) {
      this.ticketValue = val
    },
    pickUp(val) {
      // console.log(val)
      this.pickUpLocation = val
    },
    domestic(val) {
      let domesticVal = ['国内', '国际']
      this.domesticValue = domesticVal[val]
    },
    load() {
      this.id = this.$route.params.id
      this.authList = JSON.parse(this.$getStore("authList"))
      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.$store.commit("ADD_FOOTNAV", {
        name: this.title,
        route: this.$route.path,
      })
      // 所有的查询方法
      this.searchReport()
    },

    // 所有的查询方法
    searchReport() {
      this.getReportSet()
      this.search()
    },
    // 分页
    pageChange(val) {
      this.searchInfo.params.currPage = val
    },
    // 调用接口
    getReportSet() {
      if(this.timeValue && this.timeValue.length) {
        this.searchInfo.print_time_start = this.timeValue[0] || ""
        this.searchInfo.print_time_end = this.timeValue[1] || ""
      }else {
        this.searchInfo.print_time_start = ""
        this.searchInfo.print_time_end = ""
      }
      
      // 获取当前报表设置数据
      getReportItems({ page_id: this.id, type: this.type, quary_basis_id: this.quaryBasis }).then(res => {
        if (res.data.status === 200) {
          this.dataList = res.data.data[0].showCol
          this.searchList = res.data.data[0].selectAllCol
          this.showList = res.data.data[0].showAllCol
          this.selectList = res.data.data[0].selectParam
          
          this.formatSearchData()
          this.$nextTick(() => {
            this.quaryBasis = res.data.data[0].selectParam[0].class_value
            // console.log(this.quaryBasis)
            this.searchInfo.quary_basis = res.data.data[0].selectParam[0].class_value
          })

          this.formatSetData()
          this.selectValue()
        } else {
          this.resetPage()
        }
      })
    },
    formatSearchData() {
      this.selectList = this.selectList.map(item => {
        var selsctArr = []
        if (item.selectValues && item.cn_name != "单据类型" && item.cn_name != "查询依据") {
          var objSelect = { name: "全部", value: undefined }
          item.selectValues.unshift(objSelect)
          // console.log(item.selectValues)
          return item
        } else {
          return item
        }
      })
    },
    resetPage() {
      this.id = this.$route.params.id
      this.timeValue = []
      this.dataList = []
      this.searchList = []
      this.showList = []
      this.selectList = []
      this.total = 0
      this.tableData = []
      this.quaryBasis = ""
      this.searchInfo = {
        type: "0",
        quary_basis: "",
        print_time_start: "",
        print_time_end: "",
      }
    },
    // 检索项---下拉菜单
    selectValue() {
      this.selectList = this.selectList.map(item => {
        if (item.selectValues) {
          return item
        } else {
          return item
        }
      })
    },
    // 下拉返数据
    changeName(val) {
      if(!val) {
        return
      }
      this.quaryBasis = val
      let selectVal =
        (this.selectList[0] &&
          this.selectList[0].selectValues.filter(item => item.value === this.searchInfo.quary_basis)) ||
        []
      if (selectVal[0]) {
        this.en_name = selectVal[0].en_name
      }
      this.oneStyle = selectVal[0].name

      getReportItems({
        quary_basis_id: val,
        type: this.type,
        page_id: this.id,
      }).then(res => {
        if (res.data.status === 200) {
          this.selectList = res.data.data[0].selectParam
          this.searchList = res.data.data[0].selectAllCol
          this.showList = res.data.data[0].showAllCol
          this.dataList = res.data.data[0].showCol
          this.styleName()
          this.selectValue()
          this.formatSearchData()
          this.searchStyle = this.selectList.filter((item, index) => {
            return item.cn_name === "单据类型"
          })
          this.valType = this.searchStyle[0].class_value
          this.searchInfo.type = this.valType
          this.search()
          this.$notify({
            title: "警告",
            message: "请设置"+selectVal[0].name+"为表格显示项",
            type: "warning",
          })
        }
      })
    },
    // 单据类型  查询传值
    styleName(val) {
      this.type = val
      let valueStyle = ['主单', '分单', '邮件']
      this.orderSelect = valueStyle[val]
      // console.log(this.orderSelect)
      getReportItems({
        type: val,
        page_id: this.id,
        quary_basis_id: this.quaryBasis,
      }).then(res => {
        if (res.data.status === 200) {
          this.selectList = res.data.data[0].selectParam
          this.searchList = res.data.data[0].selectAllCol
          this.showList = res.data.data[0].showAllCol
          this.dataList = res.data.data[0].showCol

          this.formatSearchData()
          this.formatSetData()
          this.search()
        } else {
          this.resetPage()
        }
      })
    },
    // 按钮数据、列表数据
    formatSetData() {
      let len = this.dataList.length
      // 设置查询条件  is_search: 0
      this.searchData = this.searchList.filter((item, index) => {
        return item
      })

      // 设置表头显示项  is_form_search: 0
      this.showData = this.showList.filter((item, index) => {
        return item
      })

      // 列表展示项
      this.tableQuery = this.dataList.filter((item, index) => {
        return index <= len
      })

      // 设置表头显示项  is_form_search: 0
      this.showDataList = this.dataList.filter((item, index) => {
        return item
      })
    },
    // 重置
    reset() {
      this.searchInfo = {}
      this.timeValue = []
      this.$refs["date_picker"]._data.userInput = null
    },
    // 查询     selectParam:this.searchVal.class_value
    search(item) {
      if(this.timeValue && this.timeValue.length) {
        this.searchInfo.print_time_start = this.timeValue[0] || ""
        this.searchInfo.print_time_end = this.timeValue[1] || ""
      }else {
        this.searchInfo.print_time_start = ""
        this.searchInfo.print_time_end = ""
      }
      this.searchParam = JSON.parse(JSON.stringify(this.searchInfo))
      delete this.searchParam.quary_basis

      listReportRecords({
        type: this.type,
        page_id: this.id,
        en_name: this.en_name,
        quary_basis_id: this.quaryBasis,
        ...this.searchParam,
      }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
        }
      })
    },
    // 排序
    updateSort(list) {
      this.showDataList = list
    },
    print() {
      let searchPrint= this.showData.filter(item => item.is_search_head === 0)
      if(searchPrint.length > 10) {
        this.printVisible = false
        this.$notify({
          title: "警告",
          message: '设置数据显示项过多',
          type: "warning",
        })
      }else {
        this.printVisible = true
      }
      this.searchInfo.print_time_start = this.timeValue[0] || ""
      this.searchInfo.print_time_end = this.timeValue[1] || ""
      this.printStatus = "end"
      
      this.list = this.tableData
    },
    close() {
      this.printVisible = false
    },
  },
}
</script>
<style lang="less" scoped>
.report_sale_list {
  .el-notification{
    z-index: 9999999 !important;
  }

  thead {
    th {
      text-align: left !important;
    }
  }
}

</style>

