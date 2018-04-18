<template>
<!-- 雷云朵 -->
	<div class="NormalBooking">
		<div class="departs">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
				<el-breadcrumb-item v-if="parent === 'list'" :to="{ path: '/booking/list' }">订舱列表</el-breadcrumb-item>
				<el-breadcrumb-item v-if="parent === 'flight'" :to="{ path: '/booking/byflight' }">航班列表</el-breadcrumb-item>
				<el-breadcrumb-item v-if="parent === 'flight'" :to="{ path: '/booking/byflight/bookinglist/' + $route.query.id }">订舱明细</el-breadcrumb-item>
				<el-breadcrumb-item>普通订舱</el-breadcrumb-item>
			</el-breadcrumb>
			<i class="el-icon-circle-close closeBilling" @click="backSearch"></i>
		</div>
		<el-form label-position="top" :model="detail" class="demo-form-inline editDetail" :rules="rules" ref="ruleForm">
			<el-row :gutter="10">
				<el-col :span="6">
					<el-form-item label="订舱号" class="grid-content" prop="booking_no">
						<el-input size="mini" v-model="detail.booking_no" placeholder="" :disabled='true'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="运单号" class="grid-content" prop="order_no">
						<el-input size="mini" v-model="detail.order_no" placeholder="" @blur="getByOrderNo"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="始发站" class="grid-content break_line" prop="departure">
						<el-select clearable size="mini" filterable remote allow-create default-first-option placeholder="" :disabled="isdable" ref="departure" v-model="detail.departure" @focus="getDepartures" :loading="loading" @change='depar'>
							<el-option v-for="item in departures" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="目的站" class="grid-content break_line" prop="destination">
						<el-select clearable size="mini" filterable remote allow-create default-first-option placeholder="" :disabled="isdable" ref='destination' v-model="detail.destination" @focus="getDestination" :loading="loading" @change='destion'>
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<!-- <el-col :span="4">
					<el-form-item label="经停站" class="grid-content" prop="stopping_city">
						<el-input size="mini" v-model="detail.stopping_city" placeholder=""></el-input>
					</el-form-item>
				</el-col> -->
				<el-col :span="4">
					<el-form-item label="经停站" class="grid-content break_line" prop="stopping_city">
						<el-select clearable size="mini" filterable remote allow-create default-first-option placeholder="" ref='stopping_city' v-model="detail.stopping_city" @focus="getDestination" :loading="loading" @change='stopping'>
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="发货人" class="grid-content" prop="sender"> 
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder=""
							ref="sender"
							v-model="detail.sender"
							:remote-method="getSenders"
							@change="getSenderInfo"
							:loading="loading">
							<el-option
								v-for="(item, index) in senders"
								:key="index"
								:label="item.label"
								:value="item.value"
								>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="发货人电话" class="grid-content" prop="sender_telephone">
						<el-input size="mini" v-model="detail.sender_telephone" placeholder="" ref="sender_telephone"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="收货人" class="grid-content" prop="receiver">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder=""
							ref="receiver"
							v-model="detail.receiver"
							@change="getReceiverInfo"
							:loading="loading">
							<el-option
								v-for="(item, index) in receivers"
								:key="index"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="收货人电话" class="grid-content" prop="receiver_telephone">
						<el-input size="mini" v-model="detail.receiver_telephone" placeholder="" ref="receiver_telephone"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="航班日期" class="grid-content" prop="flight_date">
						<el-input size="mini" v-model="detail.flight_date" placeholder="" :disabled="isdable" ref='flight_date'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="航班号" class="grid-content" prop="flight_no">
						<el-input size="mini" v-model="detail.flight_no" placeholder="" :disabled="isdable"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="品名" class="grid-content" prop="product">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" v-model="detail.product" :remote-method="renderProduct" @change="fillProductAbout" :loading="loading">
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
						<el-input size="mini" v-model="detail.apply_volume" placeholder="" ref="apply_volume"></el-input>
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
	import { addBookingOut, searchCity, getBookingNo, searchReceiver, getOrderInfoByOrderNo } from "../../../service"
	import { getTime, getDate } from "../../../utils/time"
	import { isnumRequired, telPhones } from "@/mode/ruleMethods"
	import {
		getCity,
		getProduct,
		getAirport,
		getSenderReceiver,
	} from "../../../linkQuery"
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				title: "普通订舱",
				isdable: false,
				detail: {
					booking_no: '', //订舱号
					order_no: '', //运单号
					product: '', //品名
					apply_quatity: '', //申请件数
					apply_weight: '', //申请重量
					apply_volume: '', //申请体积
					number_plate: '', //箱版数
					sender: '', //发货人
					sender_telephone: '', //发货人电话
					receiver: '', //收货人
					receiver_telephone: '', //收货人电话
					departure: this.$getStore('city'), //始发站
					destination: '', //目的站
					stopping_city: "",  //经停站
					booking_contact_person: '', //订舱联系人
					booking_contact_person_tel: '', //订舱联系人电话
					flight_no: '', //航班号
					flight_date: '', //航班日期
					remark: '', //备注
				},
				departures: [], //始发站
				destinations: [], //目的地
				products: [], //品名
				loading: false,
				parent: '',
				senders: [], //发货人
				receivers: [], //收货人
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
			...mapState(['loadingTime', 'bookingNo', 'bookingData', 'departure', 'destination'])
		},
		watch: {
			'detail.destination' () {
				if(this.detail.receiver) {
					this.renderReceiverName()
				}
			}
		},
		mounted() {
			this.$store.commit('CHANGE_TOPTITLE', this.title)
			this.parent = this.$route.query.from
//			console.log(this.parent)
			if(this.parent){
				this.detail.flight_no = this.bookingNo
				this.detail.departure = this.departure
				this.detail.destination = this.destination
				this.detail.flight_date = this.bookingData
			}else{
				this.detail.flight_date = getDate()
			}
			
			this.BookingNo()
			// this.detail.departure = this.$getStore('city')
		},
		methods: {
			//保存
			save() {
				addBookingOut({ ...this.detail
				}).then(res => {
					//console.log(res.data)
					if(res.data.status === 200) {
						this.$message({
							message: "添加成功",
							type: "success",
						})
						this.$router.push(`/booking/list`)
					} else {
						this.$message({
							message: res.data.message,
							type: "warning"
						})
					}
				})
			},
			BookingNo(){
				getBookingNo().then(res =>{
					// console.log(res.data)
					if(res.data.status === 200){
						this.detail.booking_no = res.data.data[0]
					}
				})
			},
			//重置
			reset() {
				this.$refs['ruleForm'].resetFields()
				this.$store.commit('GET_CUSTOMLIST', [])
				this.BookingNo()
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
			depar() {
				this.$refs['destination'].focus()
			},
			destion() {
				this.$refs['stopping_city'].focus()
			},
			stopping() {
				this.$refs['sender'].focus()				
			},
			backSearch() {
				this.$router.push(`/booking/list`)
			},
			// 发货人    
			getSenderInfo(query) {
				getSenderReceiver(this, query).then(res => {
					if (Array.isArray(res)) {
						let o = res[0]
						if (o && o.code === query) {
							this.detail.sender = o.code
							this.detail.sender_name = o.name
							this.detail.sender_telephone = o.telephone
							this.detail.sender_address = o.address
							this.detail.payment_method = o.start_payment_method || 0
							this.renderReceiverName()
							this.$store.commit("GET_SENDER", o.code)
							this.$refs["receiver"].focus()
						} else {
							this.detail.sender = query
							this.$store.commit("GET_SENDER", query)
							this.detail.sender_name = query
							this.detail.sender_telephone = ""
							this.detail.sender_address = ""
							this.detail.payment_method = 0
						}
					}
				})
			},
			// 发货人 
			getSenders(query) {
				getSenderReceiver(this, query).then(res => {
					this.senders = res.map(item => {
						return { value: item.code, label: item.code }
					})
				})
			},
			// 收货人
			getReceiverInfo(query) {
				let item = this.filterReceiver(query)

				if (item) {
					this.detail.receiver = item.receiver_name
					this.detail.receiver_telephone = item.receiver_telephone
					this.detail.receiver_address = item.receiver_address
					this.$refs["flight_date"].focus()
				} else {
					this.detail.receiver = ""
					this.detail.receiver_telephone = ""
					this.detail.receiver_address = ""
					this.$refs["receiver_telephone"].focus()
				}
			},
			getReceiverBySender() {
				let params = {
					receiver_name: '',
					sender_name: this.detail.sender,
					destination: this.detail.destination,
				}
				return searchReceiver(params).then(res => {
					return res.data.data
				})
			},
			renderReceiverName() {
				this.getReceiverBySender().then(res => {
					this.receiverList = res

					if(!this.receiverList.length) {
						this.detail.receiver = ""
						this.detail.receiver_telephone = ""
						this.detail.receiver_address = ""
					}

					this.receivers = res.map(item => {
						return { value: item.receiver_name, label: item.receiver_name }
					})
					if (!this.receivers.length) {
						this.detail.receiver = ""
					}
					this.$refs["receiver"].focus()
				})
			},
			filterReceiver(name) {
				if(this.receiverList.length) {
					return this.receiverList.filter(item => name === item.receiver_name)[0]
				}else {
					return ''
				}
			},
			// 运单号
			getByOrderNo() {
				if(this.detail.order_no !== '') {
					getOrderInfoByOrderNo({order_no:this.detail.order_no}).then(res => {
						// console.log(res.data)
						if(res.data.status === 200) {
							this.detail.sender = res.data.data[0].sender
							this.detail.sender_telephone = res.data.data[0].sender_telephone
							this.detail.receiver = res.data.data[0].receiver
							this.detail.receiver_telephone = res.data.data[0].receiver_telephone
							this.detail.departure = res.data.data[0].departure
							this.detail.destination = res.data.data[0].destination
							this.detail.flight_no = res.data.data[0].flight_no
							this.detail.flight_date = res.data.data[0].flight_date
							this.detail.product = res.data.data[0].product
							this.detail.apply_quatity = res.data.data[0].quantity
							this.detail.apply_volume = res.data.data[0].volume
							this.detail.apply_weight = res.data.data[0].weight
							this.isdable = true
						}else {
							this.isdable = false
						}
					})
				}
			},
		},
	}
</script>

<style lang="less" scoped>
.editDetail {
	background: #fff;
}
</style>