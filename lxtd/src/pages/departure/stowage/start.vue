/**
 * 马少良
 */
<template>
	<div class="Search">
    <el-form  class="demo-form-inline search_form" label-position="top" :model="searchInfo" ref="startForm">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="航班号" class="grid-content" prop="flight_no" 
          :rules="{ required: true, message: '请输入航班号', trigger: 'blur' }">
            <el-input size="mini" v-model="searchInfo.flight_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item  label="日期" prop="flight_date"
          :rules="{ required: true, message: '请输入日期', trigger: 'blur' }">
            <el-input size="mini" v-model="searchInfo.flight_date"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="始发站" class="grid-content" prop="departure">
            <el-select size="mini" filterable remote allow-create default-first-option placeholder="" clearable
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
            <el-select size="mini" allow-create filterable remote default-first-option placeholder="" clearable
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
      </el-row>
    </el-form>
    <div class="btn_wrap">
      <el-row>
        <el-col :span="7" :offset="1">
        <div class="grid-content bg-purple">
            <el-button type="primary" size="mini" @click="create">生成终舱单</el-button>
            <el-button type="primary" size="mini" @click="print">打印出港货邮舱单</el-button>
        </div>
        </el-col>
        <el-col :span="8" :offset="7">
        <div class="grid-content bg-purple" style="float: right;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
        </div>
        </el-col>
      </el-row>
    </div>
    <el-form label-position="left" inline class="sum_info">
      <el-form-item label="货单数:">
        <span>{{sumInfo.orderNumTotal}}</span>
      </el-form-item>
      <el-form-item label="货物件数:">
        <span>{{sumInfo.orderQuantityTotal}}</span>
      </el-form-item>
      <el-form-item label="货物重量:">
        <span>{{sumInfo.orderWeightTotal}}</span>
      </el-form-item>
      <el-form-item label="邮单数:">
        <span>{{sumInfo.mailNumTotal}}</span>
      </el-form-item>
      <el-form-item label="邮单件数:">
        <span>{{sumInfo.mailQuantityTotal}}</span>
      </el-form-item>
      <el-form-item label="邮单重量:">
        <span>{{sumInfo.mailWeightTotal}}</span>
      </el-form-item>
      <el-form-item label="公务货数:">
        <span>{{sumInfo.businessCargoNumTotal}}</span>
      </el-form-item>
      <el-form-item label="公务货件数:">
        <span>{{sumInfo.businessCargoQuantityTotal}}</span>
      </el-form-item>
      <el-form-item label="公务货重量:">
        <span>{{sumInfo.businessCargoWeightTotal}}</span>
      </el-form-item>
    </el-form>
    <div class="start_list">
      <el-table :data="tableData" border style="width: 100%" :height="screenHeight - 410" size="small" @selection-change="getList">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
        <el-table-column sortable prop="warehouse" label="库位"></el-table-column>
        <el-table-column sortable prop="order_no" label="运单号" width="120"></el-table-column>
        <el-table-column sortable prop="batch" label="批次" width="55"></el-table-column>
        <el-table-column sortable prop="quantity" label="件数" width="55"></el-table-column>
        <el-table-column sortable prop="weight" label="重量" width="55"></el-table-column>
        <el-table-column sortable prop="stowage_quantity" label="已配载件数" width="100"></el-table-column>
        <el-table-column sortable prop="stowage_weight" label="已配载重量" width="100"></el-table-column>
        <el-table-column sortable prop="volume" label="体积" width="60"></el-table-column>
        <el-table-column sortable prop="product" label="品名" width="100"></el-table-column>
        <el-table-column sortable prop="departure" label="起始" width="100"></el-table-column>
        <el-table-column sortable prop="destination" label="终到" width="100"></el-table-column>
        <el-table-column sortable prop="good_pull_down" label="订舱类型标志" width="110"></el-table-column>
        <el-table-column sortable prop="booking_no" label="订舱号"></el-table-column>
        <el-table-column sortable prop="cabin" label="舱位" width="55"></el-table-column>
        <el-table-column sortable prop="remark" label="注释"></el-table-column>
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
    <start-print :visible="printVisible" :flightInfo="searchInfo"  :list="printData" :data="basicPrint" status="start" @close="close"/>
	</div>
</template>
<script>
import { getOrderListByFlight, updateStowageBooking } from "@/service/stowage.js"
import { printEnd } from "@/service/index.js"
import { mapState } from "vuex"
import mixin from "./mixin"
import getCityMixin from "@/mixin/getCityMixin"

import StartPrint from "./print"

export default {
  mixins: [mixin, getCityMixin],
  data() {
    return {
      title: "初舱单",
      tableData: [],
      total: "",
      currPage: 1,
      pageSize: 10,
      sumInfo: {},
      list: [],
      printData: [],
      basicPrint: [],
      departures: [],
      destinations: [],
      screenHeight: window.innerHeight,
      printVisible: false,
    }
  },
  computed: {
    ...mapState({
      searchInfo: state => state.flightInfo,
    }),
    orderIdList() {
      return this.list.map(item => ({ id: item.id * 1 }))
    },
  },
  components: {
    StartPrint,
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
    load() {
      this.$store.commit("ADD_FOOTNAV", {
        name: "初舱单",
        route: "/stowage/start",
        title: "初舱单",
      })

      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.$store.commit("CHANGE_STOWAGESTEP", 2)
      this.search()
    },
    search() {
      this.$refs["startForm"].validate(valid => {
        if (valid) {
          this.searchHandle()
        } else {
          return false
        }
      })
    },
    searchHandle() {
      getOrderListByFlight({ ...this.searchInfo, currPage: this.currPage, pageSize: this.pageSize, type: 1 }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data[0].result.list
          this.total = res.data.data[0].result.total
          this.sumInfo = res.data.data[0]
        }
      })
    },
    reset() {
      this.$refs["startForm"].resetFields()
      this.$store.commit("CHANGE_FLIGHTINGO", {
        flight_no: "",
        flight_date: "",
        departure: "",
        destination: "",
      })
    },
    create() {
      // 生成终舱单
      if (!this.list.length) {
        this.$notify({
          title: "警告",
          message: "请选择要生成终舱单的单据",
          type: "warning",
        })
        return
      }

      updateStowageBooking({
        type: 2,
        orderIdList: this.orderIdList,
      }).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: "生成终舱单成功",
            type: "success",
          })
          this.$router.push({ name: "StowageEnd" })
        }
      })
    },
    close() {
      this.printVisible = false
    },
    print() {
      printEnd({ ...this.searchInfo, currPage: this.currPage, type: 1 }).then(res => {
        if (res.data.status === 200) {
          this.printVisible = true
          this.printData = res.data.data[0].StorageInfos
          this.basicPrint = res.data.data[0].storagePrintParams
        }else{
          this.printVisible = false
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.btn_wrap2 {
  margin: 20px;
}
.sum_info {
  .el-form-item {
    margin-bottom: 10px;
  }
}
</style>
