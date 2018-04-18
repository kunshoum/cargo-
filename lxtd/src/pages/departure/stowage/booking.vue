/**
 * 马少良
 */
<template>
	<div class="Search sbooking">
    <el-form class="demo-form-inline search_form" label-position="top" ref="searchForm" :model="searchInfo">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="单据类型" class="grid-content" prop="type">
            <el-select size="mini" v-model="searchInfo.type" placeholder="" ref='type' @change="search">
              <el-option label="主单" :value="0"></el-option>
              <el-option label="邮件" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航班号" class="grid-content" prop="flight_no">
            <el-input size="mini" v-model="searchInfo.flight_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航班日期" class="grid-content" prop="flight_date">
            <el-input size="mini" v-model="searchInfo.flight_date"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="始发站" class="grid-content" prop="departure">
            <el-select size="mini" filterable remote allow-create default-first-option placeholder=""
              clearable
              ref="departure"
              v-model="searchInfo.departure"
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
          <el-form-item label="目的站" class="grid-content" prop="destination">
            <el-select size="mini" allow-create filterable remote default-first-option placeholder=""
              clearable
              v-model="searchInfo.destination"
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
        <el-col :span="4">
          <el-form-item label="货物类别" class="grid-content" prop="product_category">
            <el-select size="mini" filterable remote default-first-option placeholder=""
              clearable
              v-model="searchInfo.product_category"
              @focus="renderProductCategory">
              <el-option
                v-for="(item, index) in productCategorys"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订舱号" class="grid-content" prop="booking_no">
            <el-input size="mini" v-model="searchInfo.booking_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="运单号" class="grid-content" prop="order_no">
            <el-input size="mini" v-model="searchInfo.order_no"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn_wrap">
      <el-row>
        <el-col :span="4" :offset="1">
        <div class="grid-content bg-purple">
          <el-button type="primary" size="mini" @click="book">配载订舱</el-button>
        </div>
        </el-col>
        <el-col :span="8" :offset="10">
        <div class="grid-content bg-purple" style="float: right">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
        </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" :height="screenHeight - 420" size="small" 
      @selection-change="getList" :cell-class-name="cellClassName">
        <el-table-column sortable type="selection" width="55"></el-table-column>
        <el-table-column sortable fixed type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
        <el-table-column sortable prop="goods_route" label="货物路由" width="120"></el-table-column>
        <el-table-column sortable prop="order_no" label="运单号" width="120"></el-table-column>
        <el-table-column sortable prop="booking_no" label="订舱号" width="100"></el-table-column>
        <el-table-column sortable v-if="searchInfo.type === 0" prop="departure_priority" label="出发优先级" :formatter="priorityFormat" width="100"></el-table-column>
        <el-table-column sortable prop="quantity" label="件数" width="55"></el-table-column>
        <el-table-column sortable prop="weight" label="重量" width="55"></el-table-column>
        <el-table-column sortable prop="stowage_quantity" label="已配载件数" width="100"></el-table-column>
        <el-table-column sortable prop="stowage_weight" label="已配载重量" width="100"></el-table-column>
        <el-table-column sortable prop="volume" label="体积" width="55"></el-table-column>
        <el-table-column sortable prop="departure" label="起始" width="100"></el-table-column>
        <el-table-column sortable prop="destination" label="终到" width="100"></el-table-column>
        <el-table-column sortable prop="product" label="品名" width="100"></el-table-column>
        <el-table-column sortable prop="good_pull_down" label="拉下"></el-table-column>
        <el-table-column sortable prop="special_order_code" label="特货代码"></el-table-column>
        <el-table-column sortable prop="warehouse" label="库位"></el-table-column>
        <el-table-column sortable prop="warehouse_quantity" label="库位件数"></el-table-column>
      </el-table>
      <el-pagination
        v-if="total > 10"
        @current-change="pageChange"
        @size-change="sizeChange"
        :current-page="searchInfo.currPage"
        :page-size="10"
        :page-sizes="[10, 15, 20]"
        layout="sizes, total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <book-confirm :visible="visible" :list="list" @close="close"/>
	</div>
</template>
<script>
import { getOrderList, confirmBooking } from "@/service/stowage.js"
import { getProductCategory } from "@/linkQuery"
import mixin from "./mixin"
import {mapState} from "vuex"
import getCityMixin from "@/mixin/getCityMixin"
import BookConfirm from "./bookConfirm"

export default {
  mixins: [mixin, getCityMixin],
  data() {
    return {
      title: "配载订舱",
      searchInfo: {
        type: 0,
        flight_no: "",
        flight_date: "",
        departure: "",
        destination: "",
        product_category: "",
        booking_no: "",
        order_no: "",
      },
      tableData: [],
      total: "",
      visible: false,
      list: [],
      currPage: 1,
      pageSize: 10,
      departures: [],
      destinations: [],
      productCategorys: [],
      screenHeight: window.innerHeight,
    }
  },
  components: {
    BookConfirm,
  },
  computed: {
    ...mapState(['loadingTime', 'flightInfo'])
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$store.commit("ADD_FOOTNAV", {
        name: "配载订舱",
        route: "/stowage/booking",
        title: "配载订舱",
      })

      this.searchInfo.flight_no = this.flightInfo.flight_no
      this.searchInfo.flight_date = this.flightInfo.flight_date
      this.searchInfo.departure = this.flightInfo.departure
      this.searchInfo.destination = this.flightInfo.destination

      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.$store.commit("CHANGE_STOWAGESTEP", 0)
      this.search()
    },
    reset() {
      this.searchInfo = {type: 0}
    },
    search() {
      getOrderList({ ...this.searchInfo, currPage: this.currPage, pageSize: this.pageSize, }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data[0].list
          this.total = res.data.data[0].total
        }
      })
    },
    book() {
      if (!this.list.length) {
        this.$notify({
          title: "警告",
          message: "请选择要配载的单据",
          type: "warning",
        })
        return
      }
      this.visible = true
    },
    close() {
      this.visible = false
    },
    renderProductCategory(query) {
      getProductCategory(this, '').then(res => {
        this.productCategorys = res.map(item => {
          return { value: item.name, label: item.name }
        })
      })
    },
    priorityFormat(row, column, cellValue) {
      if(cellValue === 0) {
        return '普通'
      }
      
      if(cellValue === 1) {
        return '优先'
      }
    },
    cellClassName({row, column, rowIndex, columnIndex}) {
      if(row.departure_priority === 1 && column.label === '出发优先级') {
        return "must_color"
      }
    },
  },
}
</script>