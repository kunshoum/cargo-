<template>
<!-- 雷云朵 -->
	<el-button-group>
		<el-tooltip class="item" effect="dark" content="编辑" placement="left">
			<el-button type="primary" icon="el-icon-edit" size="mini" @click="editDetail('编辑')"></el-button>
		</el-tooltip>
		<el-tooltip class="item" effect="dark" content="设置功能权限" placement="left">
			<el-button type="primary" icon="el-icon-setting" size="mini" @click="setDetail"></el-button>
		</el-tooltip>
    <el-tooltip class="item" effect="dark" content="设置数据权限" placement="left">
			<el-button type="primary" icon="el-icon-setting" size="mini" @click="dataDetail"></el-button>
		</el-tooltip>
		<el-tooltip class="item" effect="dark" content="删除" placement="left">
			<el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteDetail('删除')"></el-button>
		</el-tooltip>
		<depart-detail :detail="detail" :departName='departName' :visible="editVisible" :title="title" @close="close" @search='search' />
		<set-detail :detail="detail" :dataTrue='dataTrue' :visible="detialVisible" :title="title" @close="close" @search='search' />
    <data-detail :detail="detail" :data='userDataTure' :user="user_id" :visible="dataVisible" :title="title" @close="close" @search='search' />
	</el-button-group>
</template>

<script>
import { getDepartById, getBookingOut, deleteDepartById, getDepartAuthByid ,getDepartdataById } from "../../service"
import DepartDetail from "./departDetail.vue"
import SetDetail from "./setDetail.vue"
import formatParams from "../../utils/formatParams"
import DataDetail from "./setdataDetail.vue" //数据权限<!--王艺蒙-->

export default {
  props: ["row", "departName"],
  data() {
    return {
      detialVisible: false,
      editVisible: false,
      dataVisible: false,
      title: "编辑",
      detail: {},
      dataTrue: [],
      localParams: {},
      userDataTure: [],
      user_id: "",
    }
  },
  components: {
    DepartDetail,
    SetDetail,
    DataDetail,
  },
  methods: {
    //		编辑前查询
    beforeEdit() {
      return getDepartById({
        id: this.row.id,
      }).then(res => {
        //					console.log(this.row)
        if (res.data.status === 200) {
          this.detail = res.data.data[0]
          this.saveLocalParams()
        } else {
          this.loading = false
          this.$message({
            message: res.data.message,
            type: "warning",
          })
        }
      })
    },
    editDetail(title) {
      this.beforeEdit().then(() => {
        //					console.log(title)
        // console.log(this.detail)
        this.title = title
        this.editVisible = true
      })
    },
    saveLocalParams() {
      this.localParams = JSON.parse(JSON.stringify(this.detail))
    },
    close() {
      //				console.log('close')
      this.detialVisible = false
      this.editVisible = false
      this.dataVisible = false
    },
    //			权限管理
    elTrue() {
      getDepartAuthByid({ depart_id: this.row.id }).then(res => {
        // console.log(res.data.data)
        this.dataTrue = res.data.data
      })
    },
    setDetail() {
      this.elTrue()

      this.beforeEdit().then(() => {
        this.detialVisible = true
      })
    },
    deleteDetail() {
      this.$confirm("确定删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.beforeDelete()
      })
    },
    beforeDelete() {
      deleteDepartById({
        id: this.row.id,
      }).then(res => {
        if (res.data.status === 200) {
          this.search()
        }
      })
    },
    search() {
      this.$emit("search")
    },
    
    dataDetail() {
      this.daTrue()
    },
    daTrue() {
      this.user_id = this.row.id
      getDepartdataById({ unit_id: this.row.id }).then(res => {
        this.userDataTure = res.data.data
        this.dataVisible = true
      })
    },
  },
}
</script>

<style lang="less">
.bookingDetail label {
  width: 110px;
  color: #99a9bf;
}

.bookingDetail .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
}
</style>