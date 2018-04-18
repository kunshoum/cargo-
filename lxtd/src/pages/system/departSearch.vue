<template>
<!-- 雷云朵 -->
	<div id="departSearch" class="Search">
		<el-form :model="detail" class="demo-form-inline search_form" label-position="top" ref="searchForm">
			<el-row :gutter="10">
				<el-col :span="4">
					<el-form-item label="部门代码" class="grid-content" prop="code">
						<el-input size="mini" v-model="detail.code" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="部门名称" class="grid-content" prop="name">
						<el-input size="mini" v-model="detail.name" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btn_wrap">
			<el-row>
				<el-col :span="10" :offset="13">
					<div class="grid-content bg-purple" style="float: right">
						<el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="insert">添加</el-button>
						<el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
					</div>
				</el-col>
			</el-row>
		</div>

		<!--列表-->
		<div class="receive_list">
			<el-table :data="tableData" border style="width: 100%" :height="this.screenHeight - 330" size="small" v-loading='loading' element-loading-background="rgba(0, 0, 0, 0.8)" :row-class-name="tableRowClassName">
				<el-table-column fixed type="index" :index="indexMethod" label="序号" align='center'></el-table-column>
				<el-table-column fixed label="操作" width="240"  sortablealign='center'>
					<template slot-scope="scope">
						<depart-operate :row="scope.row" @search='search' :departName='departs_name' />
					</template>
				</el-table-column>
				<el-table-column sortable prop="code" label="部门代码" align='center'></el-table-column>
				<el-table-column sortable prop="name" label="部门名称" align='center'></el-table-column>
				<el-table-column sortable prop="parent_depart_name" label="上级部门" align='center'></el-table-column>
				<el-table-column sortable prop="tel" label="电话" align='center'></el-table-column>
				<el-table-column sortable prop="fax" label="传真" align='center'></el-table-column>
				<el-table-column sortable prop="is_auth" label="是否授权" align='center' :formatter="isAuth"></el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" @size-change="sizeChange"
      :page-sizes="[10, 15, 20]" :current-page="detail.currPage" :page-size="10" layout="sizes,total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex"
import { getDepartListNoPage, searchCity, getDepartList } from "../../service"
import DepartOperate from "./departOperate.vue"
import Department from "./department.vue"
import { getCity } from "../../linkQuery"
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      title: "单位管理",
      detail: {
        name: "", //部门名称
        code: "", //部门代码
        currPage: 1,
      },
      tableData: [],
      total: "",
      loading: false,
      detialVisible: false,
      departs_name: [], //部门
    }
  },
  components: {
    DepartOperate,
    Department,
  },
  computed: {
    ...mapState(["loadingTime"]),
  },
  mounted() {
    this.search()
    this.departName()
    this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
  },
  methods: {
    searchHandler() {
      this.detail.currPage = 1
      this.search()
    },
    //			查询
    search() {
      this.loading = true
      getDepartList({ ...this.detail })
        .then(res => {
          if (res.data.status === 200)
            setTimeout(() => {
              this.loading = false
              this.tableData = res.data.data[0].list
              this.total = res.data.data[0].total
              this.$nextTick(() => {
                this.tableData = this.tableData.map(item => item)
              })
            }, this.loadingTime)
        })
        .catch(err => {
          this.loading = false
        })
    },
    //			部门
    departName() {
      getDepartListNoPage().then(res => {
        //					console.log(res.data)
        this.departs_name = res.data.data
      })
    },
    //			添加
    insert(item) {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-添加")
      this.$router.push({
        params: {
          item: "department",
          id: item.id,
        },
      })
    },
    //			重置
    reset() {
      this.$refs["searchForm"].resetFields()
    },
    //			关闭
    close() {
      this.detialVisible = false
    },
    //			分页
    pageChange(val) {
      this.detail.currPage = val
      this.search()
    },
    sizeChange(size) {
      this.detail.pageSize = size
      this.search()
    },
    //			序号
    indexMethod(index) {
      return (this.detail.currPage - 1) * 10 + index + 1
    },
    //			是否授权
    isAuth(row, column, cellValue) {
      return cellValue ? "是" : "否"
    },
    tableRowClassName({ row }) {
      if (row.easy_flag) {
        return "warning-row"
      } else {
        return "success-row"
      }
    },
  },
}
</script>