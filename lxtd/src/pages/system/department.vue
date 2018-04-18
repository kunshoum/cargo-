<template>
<!-- 雷云朵 -->
	<div class="department">
		<div class="departs">
			<el-tabs class="tabs">
				<el-tab-pane label="单位管理" name="department"></el-tab-pane>
			</el-tabs>
			<i class="el-icon-circle-close closeBilling" @click="backSearch"></i>
		</div>
		<el-form label-position="top" :model="detail" class="demo-form-inline department" :rules="rules" ref="ruleForm">
			<el-row :gutter="10">
				<el-col :span="6">
					<el-form-item label="部门代码" class="grid-content" prop="code">
						<el-input size="mini" v-on-enter="'name'" ref='code' v-model="detail.code" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="部门名称" class="grid-content" prop="name">
						<el-input size="mini" v-on-enter="'city'" ref='name' v-model="detail.name" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="所在城市" class="grid-content" prop="city">
						<el-select clearable size="mini" filterable remote default-first-option placeholder=""
							ref="city"
							v-model="detail.city"
							:remote-method='getDepartures'
               v-on-enter="'parent_depart_id'"
							:loading="loading">
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
					<el-form-item label="上级部门" class="grid-content" prop="parent_depart_id">
						<el-select clearable size="mini" v-on-enter="'tel'" ref='parent_depart_id' v-model="detail.parent_depart_id" placeholder="" @change="filterParentId">
							<el-option v-for="item in departs_name" :key='item.value' :label='item.label' :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			    <el-col :span="6"  v-if="unitShow">
					<el-form-item label="所属单位" class="grid-content" prop="unit">
						<el-input :disabled="disable" size="mini" v-model="detail.unit" placeholder="" v-on-enter="'tel'"  ref='unit'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="电话" class="grid-content" prop="tel">
						<el-input size="mini" v-model="detail.tel" placeholder="" v-on-enter="'fax'"  ref='tel'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="传真" class="grid-content" prop="fax">
						<el-input size="mini" v-model="detail.fax" placeholder=""  ref='fax'></el-input>
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
import { getDepartListNoPage, addDepart } from "../../service"
import { getCity } from "../../linkQuery"
import { telPhones } from "@/mode/ruleMethods"

export default {
  data() {
    return {
      detail: {
        code: "", //部门代码
        name: "", //部门名称
        tel: "", //电话
        fax: "", //传真
        parent_depart_id: "", //上级部门
        city: "",
        unit: "",
      },
      loading: false,
      departs_name: [],
      departures: [],
      disableds: false,
      disable: false,
      unitShow: true,
      departs: [],
      pid: "",
      rules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        city: [{ required: true, message: "请输入所在城市", trigger: "blur" }],
        unit: [{ required: true, message: "请输入所属单位", trigger: "blur" }],
        parent_depart_id: [{ required: true, message: "请选择上级部门", trigger: "blur" }],
        tel: [{ validator: telPhones }],
      },
    }
  },
  mounted() {
    this.departName()
    this.detail.city = this.$getStore("city")
    this.detail.unit = this.$getStore("unit")
    if (this.detail.city === "" || this.detail.city === "null") {
      this.disableds = false
    } else {
      this.disableds = true
    }
    if (this.detail.unit === "" || this.detail.unit === "null") {
      this.disable = false
    } else {
      this.disable = true
    }
  },
  methods: {
    //保存
    save() {
      addDepart({ ...this.detail }).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          })
          this.saveSuccessHandle()
        } else {
          this.$message({
            message: res.data.message,
            type: "warning",
          })
        }
      })
    },
    saveSuccessHandle() {
      this.$confirm("是否继续添加?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$router.push(`/system/byDepart/department`)
          this.reset()
        })
        .catch(() => {
          this.$router.push(`/system/byDepart/departSearch`)
          this.$store.commit("ADD_FOOTNAV", this.routeItem)
        })
    },
    //重置
    reset() {
      this.$refs["ruleForm"].resetFields()
      this.$store.commit("GET_CUSTOMLIST", [])
    },
    //			始发站
    getDepartures(query) {
      getCity(this, query).then(res => {
        this.departures = res
      })
    },
    //			部门
    departName() {
      getDepartListNoPage().then(res => {
        if (res.data.status === 200) {
          this.departs = res.data.data
          this.departs_name = res.data.data.map(item => {
            return {
              value: item.id,
              label: item.name,
            }
          })
        }
      })
    },
    filterParentId(id) {
      this.pid = this.departs.filter(item => item.id === id)[0].parent_depart_id
      if (!this.pid) {
        this.unitShow = false
      } else {
        this.unitShow = true
      }
    },
    backSearch() {
      this.$router.push(`/system/byDepart`)
    },
  },
}
</script>

<style lang="less">

</style>