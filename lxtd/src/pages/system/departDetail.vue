<template>
<!-- 雷云朵 -->
	<el-dialog :title="headTitle" :visible.sync="visible" append-to-body width="70%" :before-close="close">
		<el-form label-position="top" :model="detail" class="demo-form-inline editDetail" :rules="rules" ref="ruleForm">
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
                  v-on-enter="'parent_depart_id'"
			            @focus='getDepartures'
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
					<el-col :span="6">
						<el-form-item label="上级部门" class="grid-content" prop="parent_depart_id">
							<el-select clearable size="mini" placeholder="" v-on-enter="'tel'" ref="parent_depart_id" v-model="detail.parent_depart_id"
								@change="filterParentId">
								<el-option
									v-for="(item, index) in departs_name"
									:key="index"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
				</el-col>
			    <el-col :span="6"  v-if="unitShow || isUnitShow">
					<el-form-item label="所属单位" class="grid-content" prop="unit">
						<el-input size="mini" v-model="detail.unit" placeholder="" v-on-enter="'tel'"  ref='unit'></el-input>
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
		<span slot="footer" class="dialog-footer">
	        <el-button @click="close" size="mini">取 消</el-button>
	        <el-button type="primary" @click="editInsert" size="mini">确 定</el-button>
	    </span>
	</el-dialog>
</template>

<script>
import { mapState } from "vuex"
import { updateDepartById, getDepartListNoPage } from "../../service"
import formatParams from "../../utils/formatParams"
import { getCity, getCode } from "../../linkQuery"
import { telPhones } from "@/mode/ruleMethods"
export default {
  props: ["detail", "visible", "title", "departName"],
  data() {
    return {
      loading: false,
      edit: false,
      departures: [],
      localParams: {
        code: "",
        name: "",
        tel: "",
        fax: "",
        parent_depart_id: "",
        city: "",
        unit: "",
      },
      unitShow: false,
      departs: [],
      rules: {
        tel: [{ validator: telPhones }],
      },
    }
  },
  computed: {
    headTitle() {
      return this.title
    },
    departs_name() {
      return this.departName.map(item => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    },
    isUnitShow() {
      if(this.detail && this.detail.parent_depart_id) {
        return this.departName.filter(item => item.id === this.detail.parent_depart_id)[0].parent_depart_id
      }
    }
  },
  mounted() {
    this.localParams.city = this.$getStore("city")
    this.localParams.unit = this.$getStore("unit")
  },
  methods: {
    //保存
    editInsert() {
      if (this.title == "编辑") {
        let editObj = formatParams(this.localParams, this.detail)
        updateDepartById({
          ...editObj,
          id: this.detail.id,
        }).then(res => {
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
      }
    },
    //			部门
    filterParentId(id) {
      this.pid = this.departName.filter(item => item.id === id)[0].parent_depart_id
      if (!this.pid) {
        this.unitShow = false
      } else {
        this.unitShow = true
      }
    },
    //			始发站
    getDepartures(query) {
      if(this.departures.length > 0) {
        return
      }
      
      getCity(this, "").then(res => {
        this.departures = res
      })
    },
    saveLocalParams() {
      this.localParams = JSON.parse(JSON.stringify(this.detail))
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