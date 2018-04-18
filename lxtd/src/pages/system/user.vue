<template>
<!-- 雷云朵 -->
	<div class="user">
		<div class="departs">
			<el-tabs class="tabs">
				<el-tab-pane label="用户信息" name="department"></el-tab-pane>
			</el-tabs>
			<i class="el-icon-circle-close closeBilling" @click="backSearch"></i>
		</div>
		<el-form label-position="top" :model="detail" class="demo-form-inline user" :rules="rules" ref="ruleForm">
			<el-row :gutter="10">
				<el-col :span="6">
					<el-form-item label="登陆账号" class="grid-content" prop="name">
						<el-input size="mini" v-model="detail.name" placeholder="" v-on-enter="'real_name'"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="中文名" class="grid-content" prop="real_name">
						<el-input size="mini" v-on-enter="'en_name'" ref='real_name' v-model="detail.real_name" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="英文名" class="grid-content" prop="en_name">
						<el-input size="mini" v-model="detail.en_name" placeholder="" v-on-enter="'depart_id'"  ref='en_name'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="部门" class="grid-content" prop="depart_id">
						<el-select clearable size="mini" v-on-enter="'email'"  ref='depart_id' v-model="detail.depart_id" placeholder="">
							<el-option v-for='item in departs_name' :label='item.label' :value="item.value" :key='item.value'></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="邮箱" class="grid-content" prop="email" 
          :rules="[
            { message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]">
						<el-input size="mini" v-model="detail.email" placeholder="" v-on-enter="'phone'" ref='email'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="手机号" class="grid-content" prop="phone">
						<el-input size="mini" v-on-enter="'password'" ref='phone' v-model="detail.phone" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="设置密码" class="grid-content" prop="password">
						<el-input size="mini" v-on-enter="'is_syn_depart_auth'" ref='password' type="password" v-model="detail.password" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="是否与部门权限同步" class="grid-content" prop="is_syn_depart_auth">
						<el-select clearable size="mini" ref='is_syn_depart_auth' v-model="detail.is_syn_depart_auth" placeholder="">
							<el-option label="是" :value="0"></el-option>
							<el-option label="否" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btn_wrap">
			<el-row>
				<el-col :span="6" :offset="9">
					<div class="grid-content bg-purple">
						<el-button type="primary" icon="el-icon-plus" size="small" @click='save'>保存</el-button>
						<el-button type="primary" icon="el-icon-refresh" size="small" @click='reset'>重置</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import { getEmplById, updateEmplById, getDepartListNoPage, addEmpl } from "../../service"
import { isEnglich, telPhones } from "@/mode/ruleMethods"
export default {
  data() {
    return {
      detail: {
        name: "", //登陆账号
        real_name: "", //中文名
        en_name: "", //英文名
        depart_id: "", //部门
        email: "", //邮箱
        phone: "", //手机号
        password: "", //密码
        is_syn_depart_auth: 0, //是否与部门权限同步
      },
      loading: false,
      edit: false,
      departs_name: [],
      rules: {
        name: [{ required: true, message: "请输入登陆账号", trigger: "blur" }],
        real_name: [{ required: true, message: "请输入中文名", trigger: "blur" }],
        password: [{ required: true, message: "请设置密码", trigger: "blur" }],
        depart_id: [{ required: true, message: "请选择部门", trigger: "change" }],
        en_name: [{ validator: isEnglich }],
        phone: [{ validator: telPhones }],
      },
    }
  },
  computed: {},
  mounted() {
    this.beforeEdit()
    this.getDepartName()
  },
  methods: {
    //			部门
    getDepartName() {
      getDepartListNoPage().then(res => {
        //					console.log(res.data.data[0].id)
        this.departs_name = res.data.data.map(item => {
          return {
            value: item.id + "",
            label: item.name,
          }
        })
      })
    },
    //			编辑前查询
    beforeEdit() {
      this.id = this.$route.params.id
      this.$store.commit("GET_ORDERNO", this.order_no)
      if (this.$route.params.id) {
        this.edit = true
        getEmplById({
          id: this.id,
        }).then(res => {
          console.log(res.data)
          this.detail = res.data.data[0]
        })
      }
    },
    //保存
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          addEmpl({ ...this.detail }).then(res => {
            if (res.data.status === 200) {
              this.$message({
                message: "添加成功",
                type: "success",
              })
              // this.saveSuccessHandle()
              this.$router.push(`/system/byUser/userSearch`)
            } else {
              this.$message({
                message: res.data.message,
                type: "warning",
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // saveSuccessHandle() {
    //   this.$confirm("是否继续添加?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "info",
    //   })
    //     .then(() => {
    //       this.$router.push(`/system/byUser/user`)
    //       this.reset()
    //     })
    //     .catch(() => {
    //       this.$router.push(`/system/byUser/userSearch`)
    //       this.$store.commit("ADD_FOOTNAV", this.routeItem)
    //     })
    // },
    //重置
    reset() {
      this.$refs["ruleForm"].resetFields()
      this.$store.commit("GET_CUSTOMLIST", [])
    },
    close(done) {
      this.$emit("close")
    },
    backSearch() {
      this.$router.push(`/system/byUser/userSearch`)
    },
  },
}
</script>

<style lang="less">
.user .delete {
  position: absolute;
  right: 80px;
  display: inline-block;
}
</style>