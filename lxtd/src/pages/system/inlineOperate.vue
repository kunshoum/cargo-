<template>
<!-- 雷云朵 -->
	<el-button-group>
		<el-tooltip class="item" effect="dark" content="编辑" placement="left">
			<el-button type="primary" icon="el-icon-edit" size="mini" @click="editDetail('编辑')"></el-button>
		</el-tooltip>
		<el-tooltip class="item" effect="dark" content="设置功能权限" placement="left">
			<el-button type="primary" icon="el-icon-setting" size="mini" @click="classDetail"></el-button>
		</el-tooltip>
    <el-tooltip class="item" effect="dark" content="设置数据权限" placement="left">
			<el-button type="primary" icon="el-icon-setting" size="mini" @click="dataDetail"></el-button>
		</el-tooltip>
		<el-tooltip class="item" effect="dark" content="删除" placement="left">
			<el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteDetail('删除')"></el-button>
		</el-tooltip>
		<user-detail :detail="detail" :departName='departName' :visible="editVisible" :title="title" @close="close" @search='search' />
		<class-detail :detail="detail" :dataTrue='dataTrue' :visible="detialVisible" :title="title" @close="close" @search='search' />
    <data-detail :detail="detail" :data='userDataTure' :user="user_id" :visible="dataVisible" :title="title" @close="close" @search='search' />
	</el-button-group>
</template>

<script>
import { getEmplById, getBookingOut, deleteEmplById, getEmplAuthByUserid, getEmplDataAuthByUserid } from "../../service"
import UserDetail from "./userDetail.vue"
import ClassDetail from "./classDetail.vue"
import DataDetail from "./userdataDetail.vue" //数据权限

import formatParams from "../../utils/formatParams"

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
      userDataTure:[],
      localParams: {},
      user_id: "",
    }
  },
  components: {
    UserDetail,
    ClassDetail,
    DataDetail,
  },
  methods: {
    //			编辑前查询
    beforeEdit() {
      return getEmplById({
        id: this.row.id,
      }).then(res => {
        if (res.data.status === 200) {
          this.saveLocalParams()
          this.detail = res.data.data[0]
        } else {
          this.loading = false
          this.$message({
            message: res.data.message,
            type: "warning",
          })
        }
      })
    },
    elTrue() {
      getEmplAuthByUserid({ user_id: this.row.id }).then(res => {
        this.dataTrue = res.data.data
      })
    },
    daTrue() {
      this.user_id = this.row.id
      getEmplDataAuthByUserid({ user_id: this.row.id }).then(res => {
        this.userDataTure = res.data.data
        this.dataVisible = true
      })
    },
    saveLocalParams() {
      this.localParams = JSON.parse(JSON.stringify(this.detail))
    },
    editDetail(title) {
      this.beforeEdit().then(() => {
        this.title = title
        this.editVisible = true
      })
    },
    close() {
      this.detialVisible = false
      this.editVisible = false
      
      this.dataVisible = false
    },
    classDetail() {
      this.elTrue()

      this.beforeEdit().then(() => {
        this.detialVisible = true
      })
    },
    dataDetail() {
      this.daTrue()
    },
    search() {
      this.$emit("search")
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
      deleteEmplById({
        id: this.row.id,
      }).then(res => {
        if (res.data.status === 200) {
          this.search()
        }
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