<template>
<!-- 雷云朵 -->
	<div id="Search" class="Search">
		<el-breadcrumb class="breadcrumb">
			<el-breadcrumb-item>个人信息</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row class='row'>
			<el-col :span="12">
				<el-form inline class="classDetail">
					<el-form-item label="账号" class='label'>
						<span>{{detail.name}}</span>
					</el-form-item>
					<el-form-item label="真实姓名" class='label'>
						<span>{{detail.real_name}}</span>
					</el-form-item>
					<el-form-item label="英文名" class='label'>
						<span>{{detail.en_name}}</span>
					</el-form-item>
					<el-form-item label="手机号" class='label'>
						<span>{{detail.phone}}</span>
					</el-form-item>
					<el-form-item label="邮箱" class='label'>
						<span>{{detail.email}}</span>
					</el-form-item>
					<el-form-item label="所属部门" class='label'>
						<span>{{detail.depart_name}}</span>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<div class="btn_wrap">
			<el-row>
				<el-col :span="6" :offset="9">
					<div class="grid-content bg-purple">
						<el-button type="primary" icon="el-icon-edit" size="small" @click='edit("编辑信息")'>编辑信息</el-button>
						<!--<el-button type="primary" icon="el-icon-edit" size="small" v-show="dialogTableVisible" @click='edit("取消编辑")'>取消编辑</el-button>-->
						<el-button type="primary" icon="el-icon-refresh" size="small" @click='update("修改密码")'>修改密码</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="edit" v-show="dialogTableVisible">
			<el-form label-position="top" :model="detailInfo" class="demo-form-inline user" :rules="rules" ref="ruleForm">
				<el-row :gutter="10">
					<el-col :span="7">
						<el-form-item label="英文名" class="grid-content" prop="en_name">
							<el-input size="mini" v-model="detailInfo.en_name" placeholder="" ref='en_name'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="邮箱" class="grid-content" prop="email"
            :rules="[
            { message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]">
							<el-input size="mini" v-model="detailInfo.email" ref="email" placeholder=""></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="手机号" class="grid-content" prop="phone">
							<el-input size="mini" v-model="detailInfo.phone" placeholder="" ref="phone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="btn_save">
				<el-row>
					<el-col :span="6" :offset="9">
						<div class="grid-content bg-purple">
							<el-button type="primary" icon="el-icon-plus" size="small" @click='save'>保存</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="edit" v-show="Visible">
			<el-form label-position="top" :model="searchInfo" :rules="rules" class="demo-form-inline user" ref="ruleForm">
				<el-row :gutter="10">
					<el-col :span="7">
						<el-form-item label="旧密码" class="grid-content" prop="old_password">
							<el-input size="mini" type="password" v-model="searchInfo.old_password" placeholder="" ref='en_name'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="新密码" prop="new_password" class="grid-content">
							<el-input type="password" v-model="searchInfo.new_password" size="mini" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="确认新密码" prop="checkPass" class="grid-content">
							<el-input type="password" v-model="searchInfo.checkPass" size="mini" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="btn_save">
				<el-row>
					<el-col :span="6" :offset="9">
						<div class="grid-content bg-purple">
							<el-button type="primary" icon="el-icon-plus" size="small" @click='install'>保存</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
import formatParams from "../../utils/formatParams"
import { getEmplById, updateEmplById, updatePasswordById } from "../../service"
import { mapState } from "vuex"
import { isEnglich, telPhones } from "@/mode/ruleMethods"
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.searchInfo.new_password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      detail: {
        name: "",
        real_name: "",
        en_name: "",
        email: "",
        phone: "",
        depart_name: "",
        depart_id: "",
      },
      detailInfo: {
        en_name: "",
        email: "",
        phone: "",
      },
      searchInfo: {
        old_password: "",
        new_password: "",
      },
      rules: {
        new_password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
        en_name: [{ validator: isEnglich }],
        phone: [{ validator: telPhones }],
      },
      id: this.$getStore("userId"),
      tableData: [],
      title: "个人中心",
      dialogTableVisible: false,
      Visible: false,
      localParams: null,
      detailClass: [],
      loading: false,
    }
  },
  mounted() {
    this.search()
    this.$store.commit("CHANGE_TOPTITLE", this.title)
  },
  methods: {
    //			编辑信息
    edit() {
      this.Visible = false
      if (this.title === "个人中心") {
        this.dialogTableVisible = true
        this.title = "取消编辑"
        this.detailInfo = JSON.parse(JSON.stringify(this.detail))
      } else {
        this.title = "个人中心"
        this.detailInfo = JSON.parse(JSON.stringify(this.detail))
        this.dialogTableVisible = false
      }
    },
    search() {
      getEmplById({
        id: this.id,
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
    //修改密码
    update() {
      this.dialogTableVisible = false

      if (this.Visible) {
        this.Visible = false
      } else {
        this.Visible = true
      }
    },
    //保存
    save() {
      console.log(this.localParams)
      let editObj = formatParams(this.localParams, this.detailInfo)
      updateEmplById({
        ...editObj,
        id: this.id,
        depart_id: this.detail.depart_id,
      }).then(res => {
        //					console.log(res.data)
        if (res.data.status === 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          })
          this.search()
        } else {
          this.$message({
            message: res.data.message,
            type: "warning",
          })
        }
      })
    },
    //修改密码
    install() {
      updatePasswordById({
        ...this.searchInfo,
      }).then(res => {
        console.log(res.data)
        if (res.data.status === 200) {
          this.$message({
            message: res.data.message,
            type: "success",
          })
        } else {
          this.$message({
            message: res.data.message,
            type: "warning",
          })
        }
      })
    },
    saveLocalParams() {
      if (!this.localParams) {
        this.localParams = JSON.parse(JSON.stringify(this.detailInfo))
      }
    },
    //重置
    reset() {
      this.$refs["ruleForm"].resetFields()
      this.$store.commit("GET_CUSTOMLIST", [])
    },
  },
}
</script>
<style>
.classDetail .label {
  width: 100%;
}

#Search .row {
  background-color: #fff;
}

.classDetail {
  margin-left: 50px;
  /*padding-top: 10px;*/
}

#Search .breadcrumb {
  padding: 10px;
}

.btn_wrap {
  margin: 10px 0;
}

.edit {
  background-color: #fff;
  padding: 10px 0;
  padding-left: 20px;
}
</style>