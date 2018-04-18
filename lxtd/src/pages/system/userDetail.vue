<template>
<!-- 雷云朵 -->
	<el-dialog :title="headTitle" :visible.sync="visible" :departName='departName' append-to-body width="70%" :before-close="close">
		<el-form label-position="top" :model="detail" class="demo-form-inline editDetail" :rules="rules" ref="ruleForm">
			<el-row :gutter="10">
				<el-col :span="6">
					<el-form-item label="登陆账号" class="grid-content" prop="name">
						<el-input size="mini" v-model="detail.name" placeholder="" v-on-enter="'real_name'" ref="name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="中文名" class="grid-content" prop="real_name">
						<el-input size="mini" v-on-enter="'en_name'" ref='real_name' v-model="detail.real_name" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="英文名" class="grid-content" prop="en_name">
						<el-input size="mini" v-on-enter="'depart_name'" v-model="detail.en_name" placeholder=""  ref='en_name'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="部门" class="grid-content" prop="depart_id">
						<el-select clearable size="mini" v-on-enter="'email'"  ref='depart_id' v-model="detail.depart_id" placeholder="" :loading="loading" :remote-method='getDepartName'>
							<el-option v-for='item in departName' :label='item.label' :value="item.value" :key='item.key'></el-option>
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
				<!-- <el-col :span="6">
					<el-form-item label="设置密码" class="grid-content" prop="password">
						<el-input size="mini" type="password" v-on-enter="'is_syn_depart_auth'" ref='password' v-model="detail.password" placeholder=""></el-input>
					</el-form-item>
				</el-col> -->
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
		<span slot="footer" class="dialog-footer">
	        <el-button @click="close" size="mini">取 消</el-button>
	        <el-button type="primary" @click="editInsert" size="mini">确 定</el-button>
	    </span>
	</el-dialog>
</template>

<script>
import { mapState } from "vuex"
import { getEmplById, updateEmplById, getDepartListNoPage } from "../../service"
import formatParams from "../../utils/formatParams"

import { isEnglich, telPhones } from "@/mode/ruleMethods"

export default {
  props: ["detail", "visible", "title", "departName"],
  data() {
    return {
      loading: false,
      edit: false,
      localParams: {
        name: "",
        real_name: "",
        en_name: "",
        level: "",
        email: "",
        phone: "",
        depart_id: "",
        password: "",
        is_syn_depart_auth: "",
      },
      rules: {
        en_name: [{ validator: isEnglich }],
        phone: [{ validator: telPhones }],
      },
    }
  },
  computed: {
    headTitle() {
      return this.title
    },
  },
  mounted() {
  },
  methods: {
    //保存
    editInsert() {
      let editObj = formatParams(this.localParams, this.detail)
      updateEmplById({
        ...editObj,
        id: this.detail.id,
      }).then(res => {
        // console.log(res.data)
        if (res.data.status === 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          })
          this.close()
          this.$emit("search")
        } else {
          this.$message({
            message: res.data.message,
            type: "warning",
          })
        }
      })
    },
    saveLocalParams() {
      this.localParams = JSON.parse(JSON.stringify(this.detail))
    },
    //			部门
    getDepartName() {
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
    //重置
    reset() {
      this.$refs["ruleForm"].resetFields()
      this.$store.commit("GET_CUSTOMLIST", [])
    },
    close(done) {
      this.$emit("close")
    },
  },
}
</script>

<style lang="less">

</style>