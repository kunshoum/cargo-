<template>
<!-- 雷云朵 -->
	<el-dialog :title="headTitle" :visible.sync="visible" append-to-body width="70%" :before-close="close">
		<el-form label-position="top" :model="detail" class="demo-form-inline editDetail" :rules="rules" ref="ruleForm">
			<el-row :gutter="10">
				<el-col :span="4">
					<el-form-item label="订舱号" class="grid-content" prop="booking_no">
						<el-input size="mini" v-model="detail.booking_no" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="运单号" class="grid-content" prop="order_no">
						<el-input size="mini" v-model="detail.order_no" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="发货人名称" class="grid-content" prop="sender">
						<!--<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" ref="sender" v-model="detail.sender_name" :remote-method="getSenders" @change="getSenderInfo" :loading="loading">
							<el-option v-for="item in senders" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>-->
						<el-input size="mini" v-model="detail.sender" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="发货人电话" class="grid-content" prop="sender_telephone">
						<el-input size="mini" v-model="detail.sender_telephone" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="收货人名称" class="grid-content" prop="receiver_name">
						<!--<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" ref="receiver_name" v-model="detail.receiver_name" :remote-method="getReceivers" @change="getReceiverInfo" :loading="loading">
							<el-option v-for="item in receivers" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>-->
						<el-input size="mini" v-model="detail.receiver" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="收货人电话" class="grid-content" prop="receiver_telephone">
						<el-input size="mini" v-model="detail.receiver_telephone" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="始发站" class="grid-content break_line" prop="departure">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" ref="departure" v-model="detail.departure" @focus="getDepartures" :loading="loading" @change='departure'>
							<el-option v-for="item in departures" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="目的站" class="grid-content break_line" prop="destination">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" ref='destination' v-model="detail.destination" @focus="getDestination" :loading="loading" @change='destination'>
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="航班日期" class="grid-content" prop="flight_date">
						<el-input size="mini" v-model="detail.flight_date" placeholder="" ref='flight_date'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="航班号" class="grid-content" prop="flight_no">
						<el-input size="mini" v-model="detail.flight_no" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="品名" class="grid-content" prop="product">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" v-model="detail.product" :remote-method="renderProduct" @change="fillProductAbout">
							<el-option v-for="item in products" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="申请件数" class="grid-content" prop="apply_quatity">
						<el-input size="mini" v-model="detail.apply_quatity" placeholder="" ref='apply_quatity'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="申请重量" class="grid-content" prop="apply_weight">
						<el-input size="mini" v-model="detail.apply_weight" placeholder="" ref="apply_weight"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="申请体积" class="grid-content" prop="apply_volume">
						<el-input size="mini" v-model="detail.apply_volume" placeholder="" ref='apply_volume'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="箱板数" class="grid-content" prop="number_plate">
						<el-input size="mini" v-model="detail.number_plate" placeholder="" ref='number_plate'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="联系人" class="grid-content" prop="booking_contact_person">
						<el-input size="mini" v-model="detail.booking_contact_person" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="联系电话" class="grid-content" prop="booking_contact_person_tel">
						<el-input size="mini" v-model="detail.booking_contact_person_tel" ref='booking_contact_person_tel' placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注" class="grid-content" prop="remark">
						<el-input type="textarea" :rows="2" size="mini" v-model="detail.remark"></el-input>
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
	import { bookingDetail, upDateBookingOut, addBookingOut, } from "../../../service"
	import { listBookingOut } from "../../../service"
	import { isnumRequired, telPhones } from "@/mode/ruleMethods"
	import {
		getCity,
		getProduct,
getAirport,
	} from "../../../linkQuery"

	export default {
		props: ['detail', 'visible', 'title'],
		data() {
			return {
				products: '',
				destinations:'',
				departures:'',
				loading:false,
				rules: {
					apply_quatity: [{ validator: isnumRequired }],
					apply_weight: [{ validator: isnumRequired }],
					apply_volume: [{ validator: isnumRequired }],
					number_plate: [{ validator: isnumRequired }],
					booking_contact_person_tel: [{ validator: telPhones }],
				},
			}
		},
		computed: {
			headTitle() {
				return this.title
			}
		},
		methods: {
			close() {
				this.$emit('close')
			},
			editInsert() {
				if(this.title == '复制添加') {
					addBookingOut({ ...this.detail,
						id: this.detail.id
					}).then(res => {
						// console.log(res.data)
						if(res.data.status === 200) {
							this.$message({
								message: '添加成功',
								type: 'success'
							})
							this.close()
							this.$emit('search')
						} else {
							this.$message({
								message: res.data.message,
								type: 'warning'
							})
						}

					})
				}

			},
			//始发站
			getDepartures(query) {
				getAirport(this, "").then(res => {
					this.departures = res
				})
			},
			//目的站
			getDestination(query) {
				getAirport(this, "").then(res => {
					this.destinations = res
				})
			},
			//品名
			renderProduct(query) {
				getProduct(this, query).then(res => {
					this.products = res.map(item => {
						return {
							value: item.name,
							label: item.name
						}
					})
				})
			},
			fillProductAbout(query) {
				this.$refs['apply_quatity'].focus()
				getProduct(this, query).then(res => {
					if(Array.isArray(res)) {
						let o = res[0]
						if(o) {
							this.detail.product_category = o.start_product_category
							//							this.detail.packaging = o.pkg
						}
					}
				})
			},
			departure() {
				this.$refs['destination'].focus()
			},
			destination() {
				this.$refs['flight_date'].focus()
			},
		},
	}
</script>

<style lang="less">

</style>