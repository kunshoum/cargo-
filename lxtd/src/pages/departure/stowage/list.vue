/**
 * 马少良
 */
<template>
	<div class="Search">
    <el-form  class="demo-form-inline search_form" label-position="top" :model="searchInfo" ref="listForm">
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
            <el-select size="mini" filterable allow-create remote default-first-option placeholder="" clearable
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
          <el-form-item label="订舱客户代码" class="grid-content">
            <el-input size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn_wrap">
      <el-row>
        <el-col :span="9" :offset="1">
          <div class="grid-content bg-purple">
            <el-button type="primary" size="mini" @click="update">修改配载订舱</el-button>
            <el-button type="primary" size="mini" @click="cancel">取消配载订舱</el-button>
            <el-button type="primary" size="mini" @click="create">生成初舱单</el-button>
          </div>
        </el-col>
        <el-col :span="6" :offset="7">
          <div class="grid-content bg-purple" style="float:right;">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="rest">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" :height="screenHeight - 370" size="small" @selection-change="getList"> 
        <el-table-column  type="selection" width="55"></el-table-column>
        <el-table-column  fixed type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
        <el-table-column sortable prop="order_no" label="运单号" width="120"></el-table-column>
        <el-table-column sortable prop="batch" label="批次" width="55"></el-table-column>
        <el-table-column sortable prop="quantity" label="件数" width="55"></el-table-column>
        <el-table-column sortable prop="stowage_quantity" label="已配载件数" width="100"></el-table-column>
        <el-table-column sortable prop="stowage_weight" label="已配载重量" width="100"></el-table-column>
        <el-table-column sortable prop="weight" label="重量" width="55"></el-table-column>
        <el-table-column sortable prop="volume" label="体积" width="60"></el-table-column>
        <el-table-column sortable prop="product" label="品名" width="100"></el-table-column>
        <el-table-column sortable prop="special_order_code" label="特货代码"></el-table-column>
        <el-table-column sortable prop="departure" label="起始" width="100"></el-table-column>
        <el-table-column sortable prop="destination" label="终到" width="100"></el-table-column>
        <el-table-column sortable prop="good_pull_down" label="拉下"></el-table-column>
        <el-table-column sortable label="TT"></el-table-column>
        <el-table-column sortable label="订舱类型标志" width="120"></el-table-column>
        <el-table-column sortable prop="booking_no" label="订舱号"></el-table-column>
        <el-table-column sortable prop="cabin" label="舱位" width="55"></el-table-column>
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
    <cancel-booking :visible="cancelVisible" :list="list" @close="close" :status="1" @search="search"/>
    <update-booking :visible="updateVisible" :list="list" @close="close" @updateSearch="updateSearch"/>
	</div>
</template>

<script>
import { getOrderListByFlight, updateStowageBooking } from "@/service/stowage.js"
import {mapState} from "vuex"
import mixin from "./mixin"
import getCityMixin from "@/mixin/getCityMixin"
import CancelBooking from "./cancelBooking"
import UpdateBooking from "./updateBooking"

export default {
  mixins: [mixin, getCityMixin],
  data() {
    return {
      title: "配载订舱列表",
      tableData: [],
      total: '',
      list: [],
      cancelVisible: false,
      updateVisible: false,
      currPage: 1,
      pageSize: 10,
      departures: [],
      destinations: [],
      screenHeight: window.innerHeight,
    }
  },
  components: {
    CancelBooking,
    UpdateBooking,
  },
  computed: {
    ...mapState({
      searchInfo: state => state.flightInfo
    }),
    orderIdList() {
      return this.list.map(item => ({id: item.id*1}))
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
    load() {
      this.$store.commit('ADD_FOOTNAV', {
        name: '配载订舱列表',
        route: '/stowage/list',
        title: '配载订舱列表',
      })

      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.$store.commit("CHANGE_STOWAGESTEP", 1)
      this.search()
    },
    search() {
      this.$refs["listForm"].validate(valid => {
        if (valid) {
          this.searchHandle()
        } else {
          return false
        }
      })
    },
    searchHandle() {
      getOrderListByFlight({...this.searchInfo, currPage: this.currPage, type: 0, pageSize: this.pageSize}).then(res => {
        if(res.data.status === 200) {
          this.tableData = res.data.data[0].result.list
          this.total = res.data.data[0].result.total
        }
      })
    },
    updateSearch(newParams) { // 修改配载成功后按修改后的航班信息查询
      this.search()
    },
    rest() {
      this.$refs["listForm"].resetFields()
      this.$store.commit('CHANGE_FLIGHTINGO', {
        flight_no: '',
        flight_date: '',
        departure: '',
        destination: '',
      })
    },
    update() {
      if(!this.list.length) {
        this.$notify({
          title: "警告",
          message: "请选择要修改的单据",
          type: "warning",
        })
        return
      }

      this.updateVisible = true
    },
    cancel() {
      if(!this.list.length) {
        this.$notify({
          title: "警告",
          message: "请选择要取消的单据",
          type: "warning",
        })
        return
      }

      this.cancelVisible = true
    },
    create() { // 生成初舱单
      if(!this.list.length) {
        this.$notify({
          title: "警告",
          message: "请选择要生成初舱单的单据",
          type: "warning",
        })
        return
      }

      updateStowageBooking({
        type: 1,
        orderIdList: this.orderIdList,
      }).then(res => {
        if(res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: "生成初舱单成功",
            type: "success",
          })
          this.$router.push({name: 'StowageStart'})
        }
      })
    },
    close() {
      this.cancelVisible = false
      this.updateVisible = false
    },
  },
}
</script>

<style lang="less">

</style>
