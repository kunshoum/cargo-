<template>
<!-- 雷云朵 -->
	<div class="Search">
		<el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
			<el-row :gutter="10">
				<el-col :span="6" width="180">
					<el-form-item label="单号" class="grid-content break_line" width="180">
						<el-col :span="9" width="180">
							<el-form-item prop="params.order_three_code" width="180">
								<el-input size="mini" v-model="searchInfo.params.order_three_code" placeholder="三字码" width="180"></el-input>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="1">-</el-col>
						<el-col :span="14">
							<el-form-item prop="params.order_num">
								<el-input size="mini" v-model="searchInfo.params.order_num" placeholder="八位数字"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="录入日期" class="grid-content" prop="timeValue">
						<el-date-picker size="mini" ref='date_picker' v-model="searchInfo.timeValue" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%;">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<!-- <el-col :span="4">
					<el-form-item label="预计库房" class="grid-content" prop="params.expected_storeroom">
						<el-input size="mini" v-model="searchInfo.params.expected_storeroom" placeholder="预计库房"></el-input>
					</el-form-item>
				</el-col> -->
				<el-col :span="4">
					<el-form-item label="预计库房" class="grid-content" prop="params.storeroom">
						<el-select filterable clearable v-model="searchInfo.params.storeroom" size="mini" ref='storeroom'>
							<el-option v-for="(item, index) in storerooms" placeholder='' :key="index" :label="item.label" :value="item.value === '全部' ? undefined : item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="到达状态" class="grid-content" prop="params.arrive_status">
					<el-select size="mini" v-model="searchInfo.params.arrive_status" placeholder="" @change='arrStatus'>
						<el-option label="全部" value=""></el-option>
						<el-option label="已到达" value="0"></el-option>
						<el-option label="未到达" value="1"></el-option>
						<el-option label="部分到达" value="2"></el-option>
					</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="始发站" class="grid-content" prop="params.departure">
						<el-input size="mini" v-model="searchInfo.params.departure" placeholder="始发站代码" ref='departure'></el-input>
					</el-form-item>
				</el-col>
        <el-col :span="4">
          <el-form-item label="航班号" class="grid-content" prop="params.flight_no">
            <el-input size="mini" v-model="searchInfo.params.flight_no" placeholder="航班号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
					<el-form-item label="是否为不正常货物" class="grid-content" prop="params.is_unusual">
					<el-select size="mini" v-model="searchInfo.params.is_unusual" placeholder="" @change='arrStatus'>
						<el-option label="全部" value=""></el-option>
						<el-option label="正常" value="0"></el-option>
						<el-option label="不正常" value="1"></el-option>
					</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btn_wrap">
			<el-row>
				<el-col :span="6" :offset="17">
					<div class="grid-content bg-purple" style="float: right">
						<el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加</el-button>
						<el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="receive_list">
			<el-table :data="tableData" border style="width: 100%" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" :height="screenHeight - 400" size="small" :row-class-name="tableRowClassName">
				<el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
				<el-table-column fixed label="操作">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="编辑" placement="left">
							<el-button type="primary" icon="el-icon-edit" size="mini" @click="searchEdit(scope.row)"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column sortable prop="order_no" label="主单号" v-if="this.type === 'main'"></el-table-column>
				<el-table-column sortable prop="order_no" label="分单号" v-if="this.type === 'sub'"></el-table-column>
				<el-table-column sortable prop="main_order_no" label="主单号" v-if="this.type === 'sub'"></el-table-column>
        <el-table-column sortable prop="flight_no" label="航班号" v-if="this.type === 'main'"></el-table-column>
				<el-table-column sortable prop="arrive_time" label="到达时间"></el-table-column>
        <el-table-column sortable prop="is_unusual" label="是否为不正常货物" :formatter="isUnusuals"></el-table-column>
				<el-table-column sortable prop="departure" label="起点"></el-table-column>
				<el-table-column sortable prop="destination" label="终点"></el-table-column>
				<el-table-column sortable prop="association_point" label="关联点"></el-table-column>
				<el-table-column sortable prop="product" label="品名"></el-table-column>
				<el-table-column sortable prop="quantity" label="件数"></el-table-column>
				<el-table-column sortable prop="net_weight" label="毛重"></el-table-column>
				<el-table-column sortable prop="weight" label="计重"></el-table-column>
				<el-table-column sortable prop="arrive_quantity" label="到达件数"></el-table-column>
				<el-table-column sortable prop="arrive_weight" label="到达重量"></el-table-column>
				<el-table-column sortable prop="remark" label="备注"></el-table-column>
				<el-table-column sortable prop="arrive_status" label="到达状态" :formatter="depStateFormat"></el-table-column>
				<el-table-column sortable prop="sender" label="发货人"></el-table-column>
				<el-table-column sortable prop="receiver" label="收货人"></el-table-column>
				<el-table-column sortable prop="expected_storeroom" label="库房"></el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" @size-change="sizeChange"
      :page-sizes="[10, 15, 20]" :current-page="searchInfo.params.currPage" :page-size="10" layout="sizes,total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
// 查询分页
import { pageQueryCA } from "../../service"
// 下拉
//	import { queryCustServiceState } from "../../service"
import { formatTime } from "../../utils/time.js"
//查询
import { ArrivalSearch, storeRoom } from "../../service"

import { mapState } from "vuex"

export default {
  data() {
    return {
      type: "main",
      status_name: [],
      title: "",
      screenHeight: window.innerHeight,
      // 库房
      storerooms: [],
      searchInfo: {
        params: {
          order_three_code: "", // 单号三字码
          order_num: "", // 单号八位数字
          create_time_start: "", // 开始日期
          create_time_end: "", // 结束日期
          expected_storeroom: "", //库房
          arrive_status: "", //到达状态
          departure: "", //始发站
          flight_no: "",  //航班号
          is_unusual: '',  //不正常货物
          currPage: 1,
        },
        timeValue: "",
      },
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
      tableData: [],
      total: "",
      loading: false,
    }
  },
  watch: {
    $route() {
      this.load()
      this.reset()
      this.search()
    },
  },
  mounted() {
    this.type = this.$route.params.type
    this.load()
    this.search()
    if (this.type === "main") {
    }
    // 库房
    storeRoom({
      type: 1,
      goodsType: 0,
      outLet: "市内营业部",
      city: this.$getStore("city"),
      // city: "石家庄",
    }).then(res => {
      // console.log(res.data)
      if (res.data.status === 200) {
        this.storerooms = res.data.data.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })

        if(this.storerooms.length && this.storerooms[0]) {
          this.searchInfo.params.storeroom = this.storerooms[0].value
        }
      }
    })
    
  },
  computed: {
    ...mapState(["loadingTime"]),
  },
  methods: {
    load() {
      this.type = this.$route.params.type
      this.title = this.type === "sub" ? "进港分单" : "进港主单"
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
    },
    // 点击查询，页面为第一页
    searchHandler() {
      this.searchInfo.params.currPage = 1
      this.search()
    },
    // 查询
    search() {
      this.loading = true
      this.searchInfo.params.create_time_start = this.searchInfo.timeValue[0] || ""
      this.searchInfo.params.create_time_end = this.searchInfo.timeValue[1] || ""
      ArrivalSearch({ ...this.searchInfo.params, type: this.type === "main" ? 0 : 1 })
        .then(res => {
          if (res.data.status === 200) {
            setTimeout(() => {
              this.loading = false
              this.tableData = res.data.data[0].list
              this.total = res.data.data[0].total
              this.status_name = res.data.data.map(item => {
                return { value: item.name, label: item.name }
              })
              this.$nextTick(() => {
                this.tableData = this.tableData.map(item => item)
              })
            }, this.loadingTime)
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    // 到达状态
    depStateFormat(row, column, cellValue) {
      let stateArr = ["已到达", "未到达", "部分到达"]
      return stateArr[cellValue]
    },
    isUnusuals(row, column, cellValue) {
      let stateArr = ["正常", "不正常"]
      return stateArr[cellValue]
    },
    // 添加
    add() {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-添加")
      this.$router.push(`/arrival/${this.type}/billing/detail`)
    },
    // 重置
    reset() {
      this.$refs["searchForm"].resetFields()
      this.$refs["date_picker"]._data.userInput = null
    },
    // 编辑
    searchEdit(item) {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-编辑")
      this.$router.push(`/arrival/${this.type}/billing/detail/${item.id}`)
    },
    // 分页
    pageChange(val) {
      this.searchInfo.params.currPage = val
      this.search()
    },
    sizeChange(size) {
      this.searchInfo.params.pageSize = size
      this.search()
    },
    // 分页
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    tableRowClassName({ row }) {
      if (row.easy_flag) {
        return "warning-row"
      } else {
        return "success-row"
      }
    },
    arrStatus() {
      this.$refs["departure"].focus()
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