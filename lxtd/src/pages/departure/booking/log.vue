<template>
<!-- 雷云朵 -->
	<div id="BookingLog" class="Search">
		<el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
			<el-row :gutter="10">
				<el-col :span="4">
					<el-form-item label="订舱号" class="grid-content" prop="params.booking_no">
						<el-input size="mini" v-model="searchInfo.params.booking_no" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="操作人" class="grid-content" prop="params.operator">
						<el-input size="mini" v-model="searchInfo.params.operator" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="开票日期" class="grid-content" prop="timeValue">
						<el-date-picker
							size="mini"
							ref='date_picker'
							v-model="searchInfo.timeValue"
							type="datetimerange"
							:picker-options="pickerOptions"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							value-format="yyyy-MM-dd"
							style="width:100%;"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="操作类型" class="grid-content" prop="operate_type">
						<el-select size="mini" v-model="searchInfo.params.operate_type" placeholder="" @change='getoperateType'>
							<el-option label="全部" value=""></el-option>
							<el-option label="订舱录入" value="0"></el-option>
							<el-option label="订舱修改" value="1"></el-option>
							<el-option label="订舱取消" value="2"></el-option>
							<el-option label="订舱确认" value="3"></el-option>
							<el-option label="审核通过" value="4"></el-option>
							<el-option label="审核不通过" value="5"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="运单号" class="grid-content" prop="order_no">
						<el-input size="mini" v-model="searchInfo.params.order_no" placeholder="" ref='order_no'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btn_wrap">
			<el-row>
				<el-col :span="4" :offset="20">
					<div class="grid-content bg-purple">
						<el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
						<el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
					</div>
				</el-col>
			</el-row>
		</div>

		<!--列表-->
		<div class="log_list">
			<el-table :data="tableData" border style="width: 100%" :height="this.screenHeight - 340" size="small" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
				<el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
        <el-table-column fixed label="操作">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="查看" placement="left">
							<el-button type="primary" icon="el-icon-view" size="mini" @click="handleClass(scope.row)"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column sortable prop="operate_type" label="操作类型" :formatter='operateType'></el-table-column>
				<el-table-column sortable prop="operate_time" label="操作时间" :formatter="formatTime"></el-table-column>
				<el-table-column sortable prop="operator" label="操作人"></el-table-column>
				<el-table-column sortable prop="order_no" label="运单号"></el-table-column>
				<el-table-column sortable prop="booking_no" label="订舱号"></el-table-column>
				<el-table-column sortable prop="product" label="品名"></el-table-column>
				<el-table-column sortable prop="apply_quatity" label="申请件数"></el-table-column>
				<el-table-column sortable prop="apply_weight" label="申请重量"></el-table-column>
				<el-table-column sortable prop="reply_quatity" label="批复件数"></el-table-column>
				<el-table-column sortable prop="reply_weight" label="批复重量"></el-table-column>
				<el-table-column sortable prop="departure" label="始发站"></el-table-column>
				<el-table-column sortable prop="destination" label="目的地"></el-table-column>
			</el-table>
			<booking-detail :detail="detail" :visible="detialVisible" @close="close" />
			<el-pagination
      v-if="total"
      @current-change="pageChange"
      @size-change="sizeChange"
      :page-sizes="[10, 15, 20]"
      :current-page="searchInfo.params.currPage"
      :page-size="10"
      layout="sizes,total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
		</div>
	</div>
</template>
<script>
import { getBookingOut, listBookingLogOut, getBookingLogById } from "../../../service"
import BookingDetail from "./bookingDetail.vue"
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      title: "订舱日志",
      searchInfo: {
        params: {
          booking_no: "", //订舱号
          operate_type: "", //订舱录入
          operator: "", //操作人
          operate_time_start: "", //操作时间起始
          operate_time_end: "", //操作时间终止
          order_no: "", //运单号
          currPage: 1,
        },

        timeValue: [],
      },
      tableData: [
        {
          //					booking_no: 132081,
        },
      ],
      total: "",
      loading: false,
      detail: {},
      detialVisible: false,
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
    BookingDetail,
  },
  mounted() {
    this.search()
    this.$store.commit("CHANGE_TOPTITLE", this.title)
  },
  methods: {
    //			查询
    searchHandler() {
      this.searchInfo.params.currPage = 1
      this.search()
    },
    sizeChange(size) {
      this.searchInfo.params.pageSize = size
      this.search()
    },
    //			查询
    search() {
      if (this.searchInfo.timeValue) {
        this.searchInfo.params.operate_time_start = this.searchInfo.timeValue[0] || ""
        this.searchInfo.params.operate_time_end = this.searchInfo.timeValue[1] || ""
      } else {
        this.searchInfo.params.operate_time_start = ""
        this.searchInfo.params.operate_time_end = ""
      }
      listBookingLogOut({
        ...this.searchInfo.params,
      }).then(res => {
        // console.log(res.data)
        if (res.data.status === 200) {
          this.tableData = res.data.data[0].list
          this.total = res.data.data[0].total
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    getBookingDetail(row) {
      return getBookingLogById({
        id: row.id,
      }).then(res => {
        if (res.data.status === 200) {
          this.detail = res.data.data[0]
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    handleClass(row) {
      this.getBookingDetail(row).then(() => {
        this.detialVisible = true
      })
    },
    //			重置
    reset() {
      this.$refs["searchForm"].resetFields()
      this.$refs["date_picker"]._data.userInput = null
    },
    //关闭
    close() {
      this.detialVisible = false
    },
    //分页
    pageChange(val) {
      this.searchInfo.params.currPage = val
      this.search()
    },
    //			操作类型
    operateType(row, column, cellValue) {
      let stateArr = ["订舱录入", "订舱修改", "订舱取消", "订舱确认", "审核通过", "审核不通过"]
      return stateArr[cellValue]
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    getoperateType() {
      this.$refs["order_no"].focus()
    },
    formatTime(row, column, cellValue) {
      if(cellValue) {
        return cellValue.slice(0,19)
      }else {
        return ""
      }
    }
  },
}
</script>