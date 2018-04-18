<template>
  <div class="abnormal_goods">
		<el-card class="register">
			<div slot="header" class="title">
				<span>不正常货物登记</span>
			</div>
			<el-form :model="registerInfo" class="demo-form-inline" label-position="top" ref="registerForm">
				<el-row :gutter="10">
					<el-col :span="4">
						<el-form-item label="记录号" class="grid-content" prop="unusual_no">
							<el-input size="mini" disabled v-model="registerInfo.unusual_no"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="货物件数" class="grid-content" prop="unusual_qunatity">
							<el-input size="mini" v-model="registerInfo.unusual_qunatity"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label="货物重量" class="grid-content" prop="unusual_weight">
							<el-input size="mini" v-model="registerInfo.unusual_weight"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="操作员" class="grid-content" prop="unusual_record_person">
							<el-input size="mini" disabled v-model="registerInfo.unusual_record_person"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="所在营业点" class="grid-content" prop="unusual_record_person_operate_epart">
							<el-input size="mini" disabled v-model="registerInfo.unusual_record_person_operate_epart"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="创建时间" class="grid-content" prop="unusual_record_time">
							<el-input size="mini" disabled v-model="registerInfo.unusual_record_time"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="不正常原因描述" class="grid-content" prop="unusual_record_desc">
							<el-input type="textarea" :rows="2" size="mini" v-model="registerInfo.unusual_record_desc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<div class="grid-content" style="float:right">
							<el-button type="primary" size="small" @click="sureRegister">确认</el-button>
							<el-button size="small" @click="cancelRegister">取消</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</el-card>

		<el-card>
			<div slot="header" class="title">
				<span>不正常货物处理</span>
			</div>
			<el-form :model="dealInfo" class="demo-form-inline" label-position="top" ref="dealForm">
				<el-row :gutter="10">
					<el-col :span="4">
						<el-form-item label="是否结案" class="grid-content" prop="unusual_is_close">
							<el-select size="mini" v-model="dealInfo.unusual_is_close">
								<el-option label="未结案" :value="0"></el-option>
								<el-option label="已结案" :value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="操作员" class="grid-content" prop="unusual_handle_person">
							<el-input size="mini" disabled v-model="dealInfo.unusual_handle_person"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="所在营业点" class="grid-content" prop="unusual_handle_person_operate_epart">
							<el-input size="mini" disabled v-model="dealInfo.unusual_handle_person_operate_epart"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="操作时间" class="grid-content" prop="unusual_handle_time">
							<el-input size="mini" disabled v-model="dealInfo.unusual_handle_time"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="处理意见" class="grid-content" prop="unusual_handle_detail">
							<el-input type="textarea" :rows="1" size="mini" v-model="dealInfo.unusual_handle_detail"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<div class="grid-content" style="float:right">
							<el-button type="primary" size="small" @click="sureDeal">确认</el-button>
							<el-button size="small" @click="cancelDeal">取消</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</el-card>

		<el-row type="flex" justify="center">
      <el-button type="primary" size="small" class="save" @click="backDetail">保存并返回开单明细</el-button>
    </el-row>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import {getTime} from '@/utils/time'

export default {
	data() {
		return {
			
		}
	},
	computed: {
		...mapState(["registerInfo", "dealInfo"])
	},
	mounted() {
		this.isAdd()
	},
	watch: {
		'$route.params.id'(id) {
			this.isAdd()
		}
	},
	methods: {
		isAdd() {
			if(!this.$route.params.id) {
				this.resetRegister()
				this.resetDeal()
			}
		},
		backDetail() {
			this.$router.push({ params: { item: "detail" } })
		},
		sureRegister() {
			
		},
		sureDeal() {
			
		},
		resetRegister() {
			this.registerInfo.unusual_no = ''
			this.registerInfo.unusual_qunatity = ''
			this.registerInfo.unusual_weight = ''
			this.registerInfo.unusual_record_desc = ''
			this.registerInfo.unusual_record_person = this.$getStore('real_name')
			this.registerInfo.unusual_record_person_operate_epart = this.$getStore('unit')
			this.registerInfo.unusual_record_time = ''
		},
		resetDeal() {
			this.dealInfo.unusual_handle_person = this.$getStore('real_name')
			this.dealInfo.unusual_handle_person_operate_epart = this.$getStore('unit')
			this.dealInfo.unusual_handle_time = ''
			this.dealInfo.unusual_handle_detail = ''
			this.dealInfo.unusual_is_close = 0
		},
		cancelRegister() {
			this.$refs["registerForm"].resetFields()
		},
		cancelDeal() {
			this.$refs["dealForm"].resetFields()
		},
	}
}
</script>

<style lang="less">
	.abnormal_goods {
		.el-card {
			margin-bottom: 20px;
			.el-card__header {
				padding: 8px 20px;
			}

			.el-card__body {
				padding: 12px 20px;
			}
		}
	}
</style>
