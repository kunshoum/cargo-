<template>
<!-- 雷云朵 -->
	<div id="userSearch" class="Search">
		<el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
			<el-row :gutter="10">
				<el-col :span="4">
					<el-form-item label="登陆账号" class="grid-content" prop="name">
						<el-input size="mini" v-model="searchInfo.name" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="中文名" class="grid-content" prop="real_name">
						<el-input size="mini" v-model="searchInfo.real_name" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="部门" class="grid-content" prop="depart_research_id">
						<el-select filterable clearable size="mini" v-model="searchInfo.depart_research_id" placeholder="" :remote-method='departName'>
							<el-option v-for="item in departs_name" :key='item.value' :label='item.label' :value="item.value"></el-option>
						</el-select>
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
			<el-table :data="tableData" border style="width: 100%"  :height="this.screenHeight - 330" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" size="small" :row-class-name="tableRowClassName">
				<el-table-column fixed type="index" :index="indexMethod" label="序号" align='center'></el-table-column>
				<el-table-column fixed label="操作" width="240" align='center'>
					<template slot-scope="scope">
						<inline-operate :row="scope.row" @search='search' :departName='departs_name' />
					</template>
				</el-table-column>
				<el-table-column sortable prop="name" label="账号" align='center'></el-table-column>
				<el-table-column sortable prop="real_name" label="中文名" align='center'></el-table-column>
				<el-table-column sortable prop="en_name" label="英文名" align='center'></el-table-column>
				<el-table-column sortable prop="depart_name" label="部门" align='center'></el-table-column>
				<el-table-column sortable prop="email" label="邮箱" align='center'></el-table-column>
				<el-table-column sortable prop="phone" label="手机号" align='center'></el-table-column>
				<el-table-column sortable prop="is_auth" label="是否授权" align='center' :formatter="isAuth"></el-table-column>
			</el-table>

		</div>
		<el-pagination v-if="total" @current-change="pageChange" @size-change="sizeChange"
      :page-sizes="[10, 15, 20]" :current-page="searchInfo.currPage" :page-size="10" layout="sizes,total, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>
</template>
<script>
import { mapState } from "vuex"
import User from "./user.vue"
import { getDepartListNoPage, getEmpList, deleteEmplById } from "../../service"
import InlineOperate from "./inlineOperate.vue"
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      title: "员工管理",
      searchInfo: {
        name: "", //账号
        real_name: "", //中文名
        depart_research_id: "", //部门
        currPage: 1,
        //					depart_hide_id:this.$getStore('departId'),
      },
      tableData: [],
      total: "",
      loading: false,
      detialVisible: false,
      departs_name: [], //部门
    }
  },
  components: {
    User,
    InlineOperate,
  },
  computed: {
    ...mapState(["loadingTime"]),
  },
  mounted() {
    this.departName()
    this.search()
    this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
  },
  methods: {
    //			部门
    departName() {
      getDepartListNoPage().then(res => {
        //					console.log(res.data)
        this.departs_name = res.data.data.map(item => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      })
    },
    searchHandler() {
      this.searchInfo.currPage = 1
      this.search()
    },
    //			查询
    search() {
      this.loading = true
      getEmpList({
        ...this.searchInfo,
      })
        .then(res => {
          if (res.data.status === 200) {
            setTimeout(() => {
              this.loading = false
              this.tableData = res.data.data[0].list
              this.total = res.data.data[0].total
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
    //			添加
    insert(item) {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-添加")
      this.$router.push({
        params: {
          item: "user",
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
      this.searchInfo.currPage = val
      this.search()
    },
    sizeChange(size) {
      this.searchInfo.pageSize = size
      this.search()
    },
    //			序号
    indexMethod(index) {
      return (this.searchInfo.currPage - 1) * 10 + index + 1
    },
    //			编辑查询
    searchEdit(item) {
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-编辑")
      this.$router.push(`/system/byUser/user/${item.id}`)
    },
    tableRowClassName({ row }) {
      if (row.easy_flag) {
        return "warning-row"
      } else {
        return "success-row"
      }
    },
    //			是否授权
    isAuth(row, column, cellValue) {
      return cellValue ? "是" : "否"
    },
  },
}
</script>