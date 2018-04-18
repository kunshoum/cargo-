<template>
<!-- 雷云朵 -->
	<div class="Detail Billing_detail">
		<el-form :model="detailInfo" class="demo-form-inline detail_form" label-position="top" :rules="rules" ref="ruleForm">
			<el-row :gutter="10">
				<el-col :span="4">
					<el-form-item label="签收单号" class="grid-content" prop="params.sign_no">
						<el-input size="mini" v-model="detailInfo.params.sign_no" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-if="this.type === 'main'">
					<el-form-item label="主单号" class="grid-content break_line">
						<el-col :span="8">
							<el-form-item prop="params.order_three_code">
								<el-input size="mini" v-model="detailInfo.params.order_three_code" placeholder="三字码" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="14">
							<el-form-item prop="params.order_num">
								<el-input size="mini" v-model="detailInfo.params.order_num" placeholder="8位数字" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="主单号" class="grid-content break_line">
						<el-col :span="8">
							<el-form-item prop="params.main_order_three_code">
								<el-input size="mini" v-model="detailInfo.params.main_order_three_code" placeholder="三字码" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="14">
							<el-form-item prop="params.main_order_num">
								<el-input size="mini" v-model="detailInfo.params.main_order_num" placeholder="9位数字" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-if="this.type === 'sub'">
					<el-form-item label="分单号" class="grid-content break_line">
						<el-col :span="8">
							<el-form-item prop="params.order_three_code">
								<el-input size="mini" v-model="detailInfo.params.order_three_code" placeholder="三字码" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="14">
							<el-form-item prop="params.order_num">
								<el-input size="mini" v-model="detailInfo.params.order_num" placeholder="9位数字" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
				</el-col>
				<el-col :span="type === 'main' ? 4 : 3">
					<el-form-item label="件数" class="grid-content" prop="params.quantity">
						<el-input size="mini" v-model.number="detailInfo.params.quantity" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="type === 'main' ? 4 : 3" class="must_bg">
					<el-form-item label="实重" class="grid-content" prop="params.net_weight">
						<el-input size="mini" v-model.number="detailInfo.params.net_weight" placeholder="" @blur='equalWeight' :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="体积" class="grid-content" prop="params.volume">
					<el-input size="mini" v-model.number="detailInfo.params.volume" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="type === 'main' ? 4 : 3" class="must_bg">
					<el-form-item label="计重" class="grid-content" prop="params.weight">
						<el-input size="mini" v-model.number="detailInfo.params.weight" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="type === 'main' ? 4 : 3">
					<el-form-item label="终点" class="grid-content break_line" prop="params.destination">
						<el-select clearable size="mini"  :disabled="true" filterable remote default-first-option placeholder="" v-model="detailInfo.params.destination" @focus="getDestination" @change="destinationChange" :loading="loading">
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="国内" class="grid-content" prop="params.is_domestic">
						<el-select size="mini" v-model="detailInfo.params.is_domestic" placeholder="" ref='is_domestic' :disabled="true" @change='domestiChange'>
							<el-option label="国内" :value="0"></el-option>
							<el-option label="国际" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg">
					<el-form-item label="品名" class="grid-content" prop="params.product">
						<el-select clearable size="mini" filterable remote default-first-option placeholder="" :disabled="true" v-model="detailInfo.params.product" :remote-method="renderProduct" @change="fillProductAbout" ref='product' :loading="loading">
							<el-option v-for="item in products" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg">
					<el-form-item label="货物类别" class="grid-content" prop="params.product_category">
						<el-select clearable size="mini" filterable remote default-first-option placeholder="" :disabled="true" v-model="detailInfo.params.product_category" :remote-method="renderProductCategory" @change="fillProductCategoryAbout" :loading="loading">
							<el-option v-for="item in productCategorys" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="包装" class="grid-content" prop="params.packaging">
						<el-select clearable size="mini" filterable remote default-first-option placeholder="" :disabled="true" ref="packaging" v-model="detailInfo.params.packaging" :remote-method="getPackage" :loading="loading">
							<el-option v-for="item in packages" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="起点" class="grid-content break_line" prop="params.departure">
						<el-select clearable size="mini" filterable remote default-first-option placeholder="" :disabled="true" v-model="detailInfo.params.departure" @focus="getDestination" @change="departureChange" ref='departure' :loading="loading">
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg">
					<el-form-item label="运输方式" class="grid-content" prop="params.transport_mode">
						<el-select size="mini" v-model="detailInfo.params.transport_mode" :disabled="true" placeholder="" ref='transport_mode' @change='transportChange'>
							<el-option label="航空" :value="0"></el-option>
							<el-option label="公路" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="货物状态" class="grid-content" prop="params.cargo_status" :disabled="true">
						<el-select clearable v-model="detailInfo.params.cargo_status" size="mini" :disabled="true" ref='cargo_status'>
							<el-option v-for="item in status_name" placeholder='' :key="item.value" :label="item.label" :value="item.value" :disabled="true">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg">
					<el-form-item label="提货方式" class="grid-content" prop="params.delivery_mode">
						<el-select size="mini" v-model="detailInfo.params.delivery_mode" :disabled="true" placeholder="" @change="deliveryMode" ref='delivery_mode'>
							<el-option label="自提" :value="1"></el-option>
							<el-option label="派送" :value="2"></el-option>
							<el-option label="中转" :value="3"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="目的站提货方式" class="grid-content" prop="params.destination_delivery_mode" v-if='detailInfo.params.delivery_mode === 3'>
						<el-select size="mini" v-model="detailInfo.params.destination_delivery_mode" placeholder="" ref='destination_delivery_mode'>
							<el-option label="自提" :value="1"></el-option>
							<el-option label="派送" :value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="付费方" class="grid-content" prop="params.payer">
						<el-select size="mini" v-model="detailInfo.params.payer" :class="{ must_color: detailInfo.params.payer === '发货方'}" :disabled='true' placeholder="" ref='payer' @change='payerChange'>
							<el-option label="发货方" value="发货方" class="must_color"></el-option>
							<el-option label="收货方" value="收货方"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="代收款" class="grid-content must_color" prop="params.agency_fund">
						<el-input size="mini" v-model.number="detailInfo.params.agency_fund" :disabled="true" placeholder="" ref='agency_fund'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type==='sub'">
					<el-form-item label="实付发货人费用" class="grid-content" prop="params.actual_pay_sender">
						<el-input size="mini" v-model.number="detailInfo.params.actual_pay_sender" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="4" class="must_bg">
					<el-form-item label="收货人" class="grid-content" prop="params.receiver">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" ref="receiver" v-model="detailInfo.params.receiver" @focus="getReceivers" @change="getReceiverInfo" :loading="loading">
							<el-option v-for="item in receivers" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="收货人电话" class="grid-content break_line" prop="params.receiver_telephone">
						<el-input size="mini" v-on-enter="'payment_method'"  v-model="detailInfo.params.receiver_telephone" ref="receiver_telephone" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="结算方式" class="grid-content" prop="params.payment_method">
						<el-select :class="{ must_color: detailInfo.params.payment_method === '现金'}" v-model="detailInfo.params.payment_method" size="mini" ref='payment_method' @change='modeChange'>
							<el-option v-for="item in payment" placeholder='' :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="收货人证件类别" class="grid-content" prop="params.receiver_certificate_category">
						<el-select v-model="detailInfo.params.receiver_certificate_category" size="mini" ref='receiver_certificate_category' @change='cateChange'>
							<el-option v-for="(item, index) in category_code" placeholder='' :key="index" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="收货人证件号" class="grid-content break_line">
						<el-col :span="20">
              <el-form-item prop="params.receiver_certificate_no">
                <el-input v-on-enter="'area'" size="mini" v-model="detailInfo.params.receiver_certificate_no" placeholder="" ref='receiver_certificate_no'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" size="mini" @click="readCardReceiver">识别</el-button> 
              </el-form-item>
            </el-col>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="收货人地址" class="grid-content break_line" prop="params.receiver_address">
						<el-input size="mini"  v-on-enter="'area'" v-model="detailInfo.params.receiver_address" ref="receiver_address" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg">
					<el-form-item label="区域" class="grid-content" prop="params.area">
						<el-select clearable  size="mini" filterable remote default-first-option placeholder="" v-model="detailInfo.params.area" @focus="getParmasArea" @change="getNextremark" :loading="loading" ref='area'>
							<el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type==='sub'">
					<el-form-item label="路线" class="grid-content break_line" prop="params.line">
            <el-select clearable size="mini" filterable default-first-option placeholder="" @change="getCarnum" v-model="detailInfo.params.line" @focus="getline" :loading="loading" ref='line'>
							<el-option v-for="item in lines" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type==='sub'">
					<el-form-item label="车号" class="grid-content break_line" prop="params.car_number">
						<el-input size="mini" v-on-enter="'driver'" v-model="detailInfo.params.car_number" placeholder="" ref="car_number"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type==='sub'">
					<el-form-item label="司机" class="grid-content break_line" prop="params.driver">
						<el-input size="mini" v-on-enter="'remark'" v-model="detailInfo.params.driver" placeholder="" ref="driver"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="是否放货" class="grid-content" prop="params.is_ready"
          :class="{ must_color: detailInfo.params.is_ready === 1}">
						<el-select size="mini" v-model="detailInfo.params.is_ready" placeholder="" ref="is_relay" @change='relayChange' :disabled="true">
							<el-option label="放货" :value="0"></el-option>
							<el-option label="不放货" :value="1" class="must_color"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="type==='sub' ? 4 : 8">
					<el-form-item label="备注" class="grid-content break_line must_color" prop="params.remark">
						<el-input size="mini" v-on-enter="'signer'" v-model="detailInfo.params.remark" placeholder="" ref='remark'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="签收人" class="grid-content" prop="params.signer">
						<el-select clearable v-on-enter="'signer_certificate_no'" filterable allow-create v-model="detailInfo.params.signer" ref="signer" size="mini" @change='signerChange'>
							<el-option v-for="item in signerCode" placeholder='' :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="签收人证件类别" class="grid-content" prop="params.signer_certificate_category">
						<el-select v-on-enter="'signer_certificate_no'" v-model="detailInfo.params.signer_certificate_category" size="mini" @change='categoryChange' ref='signer_certificate_category'>
							<el-option v-for="(item, index) in category_code" placeholder='' :key="index" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
        <el-col :span="8">
					<el-form-item label="签收人证件号" class="grid-content break_line">
						<el-col :span="20">
              <el-form-item prop="params.signer_certificate_no">
                <el-input size="mini" v-on-enter="'sign_time'" v-model="detailInfo.params.signer_certificate_no" placeholder="" ref='signer_certificate_no'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" size="mini" @click="readCardSinger">识别</el-button> 
              </el-form-item>
            </el-col>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="签收时间" class="grid-content break_line" prop="params.sign_time">
						<el-input size="mini" v-on-enter="'local_transfer'" v-model="detailInfo.params.sign_time" ref="sign_time" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="有无原件签收单" class="grid-content" prop="params.is_original_receipt">
						<el-select size="mini" :class="{ must_color: detailInfo.params.is_original_receipt === 1}" v-model="detailInfo.params.is_original_receipt" ref="is_original_receipt" placeholder="" @change='receiptChange'>
							<el-option label="有" :value="1" class="must_color"></el-option>
							<el-option label="无" :value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="签收单是否返回" class="grid-content" prop="params.is_return_receipt">
						<el-select size="mini" :class="{ must_color: detailInfo.params.is_return_receipt === 1}" v-model="detailInfo.params.is_return_receipt" placeholder="" ref='is_return_receipt' @change='isReceiptChange'>
							<el-option label="不返回" :value="0"></el-option>
							<el-option label="返回" class="must_color" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="返回时间" class="grid-content break_line" prop="params.return_time">
						<el-input size="mini" v-model="detailInfo.params.return_time" placeholder="" ref='return_time' :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg">
					<el-form-item label="发货人" class="grid-content" prop="params.sender">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" :disabled="true" ref="sender" v-model="detailInfo.params.sender" :remote-method="getSenders" @change="getSenderInfo" :loading="loading">
							<el-option v-for="item in senders" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="提货地点" class="grid-content break_line" prop="params.pick_up_location">
						<el-input size="mini" v-model="detailInfo.params.pick_up_location" placeholder="" :disabled="true" ref='pick_up_location'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="入库时间" class="grid-content break_line" prop="params.input_storeroom_time">
						<el-input size="mini" v-model="detailInfo.params.input_storeroom_time" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="库房" class="grid-content break_line" prop="params.storeroom">
						<el-input size="mini" :disabled='true' v-model="detailInfo.params.storeroom" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="入库人" class="grid-content break_line" prop="params.input_storeroom_person">
						<el-input size="mini" v-model="detailInfo.params.input_storeroom_person" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="终止保管时间" class="grid-content break_line" prop="params.store_termination">
						<el-input size="mini" :disabled='true' v-model="detailInfo.params.store_termination" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="出库时间" class="grid-content break_line" prop="params.out_storeroom_time">
						<el-input size="mini" v-model="detailInfo.params.out_storeroom_time" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="出库人" class="grid-content break_line" prop="params.out_storeroom_person">
						<el-input size="mini" v-model="detailInfo.params.out_storeroom_person" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="出库状态" class="grid-content must_color" prop="params.out_storeroom_status">
						<el-select size="mini" v-model="detailInfo.params.out_storeroom_status" placeholder="" :disabled="true" @change='statusChange'>
							<el-option label="未出库" :value="0"></el-option>
							<el-option label="已出库" :value="1"></el-option>
							<el-option label="部分出库" :value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="到达操作点" class="grid-content break_line" prop="params.arrive_point_operation">
						<el-input size="mini" v-model="detailInfo.params.arrive_point_operation" :disabled="true" placeholder="" ref='arrive_point_operation'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="发票类型" class="grid-content" prop="params.invoice_type">
						<el-select size="mini" v-model="detailInfo.params.invoice_type" ref="invoice_type" placeholder="" @change='typeChange'>
							<el-option label="普票" :value="0"></el-option>
							<el-option label="专票" :value="1"></el-option>
							<el-option label="收据" :value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="本地中转人" class="grid-content break_line" prop="params.local_transfer">
						<el-input size="mini" v-on-enter="'service_record'" v-model="detailInfo.params.local_transfer" placeholder="" ref='local_transfer'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg">
					<el-form-item label="关联点" class="grid-content break_line" prop="params.association_point">
						<el-select clearable size="mini" filterable remote default-first-option placeholder="" :disabled="true" v-model="detailInfo.params.association_point" :remote-method="getDestinations" @change="pointChange" :loading="loading">
							<el-option v-for="item in destinationsAss" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="开票人" class="grid-content" prop="params.issuer">
						<el-input size="mini" v-model="detailInfo.params.issuer" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="开票时间" class="grid-content" prop="params.billing_time">
						<el-input size="mini" v-model="detailInfo.params.billing_time" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="修改人" class="grid-content must_color" prop="params.update_person">
						<el-input size="mini" v-model="detailInfo.params.update_person" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="修改时间" class="grid-content must_color" prop="params.update_time">
						<el-input size="mini" v-model="detailInfo.params.update_time" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="生成人" class="grid-content" prop="params.creater">
						<el-input size="mini" v-model="detailInfo.params.creater" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="生成时间" class="grid-content" prop="params.create_time">
						<el-input size="mini" v-model="detailInfo.params.create_time" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="签收单打印次数" class="grid-content" prop="params.sign_print_num">
						<el-input size="mini" v-model="detailInfo.params.sign_print_num" placeholder="" ref='sign_print_num' :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="应收发货方费用" class="grid-content" prop="params.should_receive_sender">
						<el-input size="mini" v-model="detailInfo.params.should_receive_sender" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="实收发货方费用" class="grid-content" prop="params.actual_receive_sender">
						<el-input size="mini" v-model="detailInfo.params.actual_receive_sender" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="应收收货人费用" class="grid-content" prop="params.should_receive_receiver">
						<el-input size="mini" v-model="detailInfo.params.should_receive_receiver" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="实收收货人费用" class="grid-content" prop="params.actual_receive_receiver">
						<el-input size="mini" v-model="detailInfo.params.actual_receive_receiver" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="4">
					<el-form-item label="应付中转人" class="grid-content" prop="params.should_pay_transiter">
						<el-input size="mini" v-model="detailInfo.params.should_pay_transiter" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="客服记录" class="grid-content" prop="params.service_record">
						<el-input type="textarea" :rows="2" size="mini" ref="service_record" v-model="detailInfo.params.service_record" placeholder="" class="operate" @focus="toCustom"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btn_wrap">
			<el-row>
				<el-col :span="12" :offset="7">
					<div class="grid-content bg-purple">
						<print-order :mode="detailInfo.params.delivery_mode"/>
						<el-button type="primary" icon="el-icon-tickets" size="small" @click="buttonDelivery">提货</el-button>
						<el-button type="primary" icon="el-icon-plus" size="small" @click="save">保存</el-button>
						<el-button type="primary" icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import PrintOrder from "./print.vue"
import {
  //货物状态
  ArrivalCargo,
  //付款方式
  getPayMethod,
  //证件类别接口
  getcertificate,
  //编辑前查询
  deliveryby,
  //提货编辑修改
  deliveryUpdateby,
  //提货添加
  deliveryInsert,
  //进港数据返到提货页面的接口
  getDelivery,
  //提货费用
  deliverygetCostItem,
  //		签收人
  oftenDeliveryPerson,
  // 城市
  searchCity,
  // 发货人
  searchSenderReceiver,
  // 品名
  searchProduct,
  // 货物类别
  searchProductCategory,
  // 包装
  searchPackage,
  // 收货人
  searchReceiver,
  // 区域
  searcharea,
  // 区域
  getAreaArea,
  getDeliveryLine,
  // 提货
  clickPickUp,
  searchSummary,
  readCard,
} from "../../service"

import {
  // 城市
  getCity,
  // 发货人
  getSenderReceiver,
  // 品名
  getProduct,
  // 货物类别
  getProductCategory,
  // 包装
  getPackage,
} from "../../linkQuery"

import { getTime } from "../../utils/time"
import { mapState } from "vuex"

import { regCertificate } from "@/mode/ruleMethods"
// import rules from "../../mode/rulesData"

export default {
  data() {
    return {
      id: "",
      type: "main",
      order_no: "",
      main_order_no: "",
      edit: false,
      status_name: [],
      payment: [],
      category_code: [],
      signerCode: [],
      certificate: [],
      lines: [],
      detailInfo: {
        params: {
          sign_no: "", //签收单号
          order_three_code: "", //三字码
          order_num: "", //运单后缀
          main_order_three_code: "", //对应主单号三字码 分单才会有
          main_order_num: "", //对应的主单号后缀 分单才会有
          quantity: "", //件数
          net_weight: "", //实重
          volume: "", //体积
          weight: "", //计重
          destination: "", //目的站
          is_domestic: 0, //国内
          product: "", //品名
          product_category: "", //货物类别
          packaging: "", //包装
          departure: "", //始发站
          transport_mode: 0, //运输方式
          delivery_mode: 2, //提货方式
          destination_delivery_mode: 1, //目的站提货方式
          cargo_status: -1, //货物状态
          payer: "发货方", //付款方
          agency_fund: "", //代收款
          receiver: "", //收货人
          receiver_telephone: "", //收货人电话
          receiver_address: "", //收货人地址
          receiver_certificate_category: "身份证", //收货人证件类别
          receiver_certificate_no: "", //收货人证件号
          area: "", //区域
          line: "", //路线
          car_number: "", //车号
          driver: "", //司机
          is_ready: 0, //是否放货 0放货 1 未放货
          payment_method: "", //结算方式
          remark: "", //备注
          signer: "", //签收人
          signer_certificate_category: "身份证", //签收人证件类别
          signer_certificate_no: "", //签收人证件号
          sign_time: "", //签收时间
          is_original_receipt: 0, //是无原件签收单
          is_return_receipt: 0, //签收单是否返回
          return_time: "", //返回时间
          sender: "", //发货人
          pick_up_location: "", //提货地点
          storeroom: "", //库房
          input_storeroom_time: "", //入库时间
          input_storeroom_person: "", //入库人
          store_termination: "", //终止保管时间
          out_storeroom_person: "", //出库人
          out_storeroom_time: "", //出库时间
          out_storeroom_status: 0, //出库状态
          is_lock: 0, //是否锁定
          arrive_point_operation: this.$getStore("unit"), //到达操作点
          update_person: "", //修改人
          update_time: "", //修改时间
          creater: "", //生成人
          create_time: "", //生成时间
          sign_print_num: "", //签收单打印次数
          should_receive_sender: "", //应收收货方费用
          actual_receive_sender: "", //实收收货方费用
          should_receive_receiver: "", //应收发货方费用
          actual_receive_receiver: "", //实收发货方费用
          should_pay_transiter: "", //应付中转人费用
          service_record: "", //客服记录
          custServiceList: [], //客服记录列表
          invoice_type: 0, //发票类型
          local_transfer: "", //本地中转人
          association_point: "SJW/石家庄", //关联点
          issuer: "", //开票人
          billing_time: "", //开票时间
        },
      },
      rules: {
        "params.delivery_mode": [{ required: true, message: "请选择提货方式", trigger: "change", type: "number" }],
        "params.transport_mode": [{ required: true, message: "请选择运输方式", trigger: "change", type: "number" }],
        "params.sender": [{ required: true, message: "请输入发货人", trigger: "change" }],
        "params.net_weight": [{ required: true, message: "请输入实重" }, { type: "number", message: "必须为数字值" }],
        "params.weight": [{ required: true, message: "请输入计重" }],
        "params.area": [{ required: true, message: "请输入区域" }],
        "params.product": [{ required: true, message: "请输入品名" }],
        "params.receiver": [{ required: true, message: "请输入收货人" }],
        "params.product_category": [{ required: true, message: "请输入货物类别" }],
        "params.association_point": [{ required: true, message: "请输入关联点" }],
        // "params.storeroom": [{ required: true, message: "请输入库房" }],
        "params.receiver_certificate_no": [{ validator: regCertificate, trigger: "blur" }],
        "params.signer_certificate_no": [{ validator: regCertificate, trigger: "blur" }],
      },
      departures: [],
      destinations: [],
      destinationsAss: [],
      senders: [],
      receivers: [],
      receiverNames: [],
      products: [],
      productCategorys: [],
      packages: [],
      loading: false,
      areas: [],
      //证件类别
      certificate: [],
      routeItem: {
        name: this.type === "main" ? "提货主单管理" : "提货分单管理",
        route: this.type === "main" ? "/delivery/main" : "/delivery/sub",
        title: this.type === "main" ? "提货主单-查询" : "提货分单-查询",
      },
    }
  },
  components: {
    PrintOrder,
  },
  computed: {
    ...mapState(["customList", "costList", "orderType", "arriveMainOrder", "mainOrderNo", "costAbout"]),
  },
  watch: {
    "$route.params.id"(id) {
      this.edit = id ? true : false
    },
    "$route.params.type"() {
      this.reset()
      if (this.type === "main") {
        this.type = this.$route.params.type
      }

      if (this.type === "sub") {
        this.type = this.$route.params.type
      }

      this.title = this.type === "sub" ? "提货分单" : "提货主单"
      this.getPayMethod()
    },
    "$route.params.item"(to, from) {
      if (to === "cost" && from === "detail") {
        this.costMainSub()
      }
    },
    customList: {
      handler() {
        let contentArr = this.customList.map(item => item.content)
        contentArr.pop()
        this.detailInfo.params.service_record = contentArr.join(";")
      },
      deep: true,
    },
    costAbout(info) {
      if(!info.should_receive_receiver) {
        return
      }
      this.detailInfo.params.should_receive_sender = info.should_receive_sender
      this.detailInfo.params.should_receive_receiver = info.should_receive_receiver
      this.detailInfo.params.should_pay_transiter = info.should_pay_transiter
    },
  },
  mounted() {
    this.type = this.$route.params.type
    this.detailInfo.params.pick_up_location = this.$getStore("operateDepart")
    // 进港的主单号、分单号
    this.detailInfo.params.sign_time = getTime()
    this.detailInfo.params.store_termination = getTime()
    this.detailInfo.params.order_three_code = this.arriveMainOrder.slice(0, 3)
    this.detailInfo.params.order_num = this.arriveMainOrder.slice(3, 12)

    if (this.type === "sub") {
      this.detailInfo.params.main_order_three_code = this.mainOrderNo.slice(0, 3)
      this.detailInfo.params.main_order_num = this.mainOrderNo.slice(3, 12)
    }

    // 进港数据返到提货页面的接口
    if (!this.$route.params.id) {
      getDelivery({
        order_no: this.detailInfo.params.order_three_code + this.detailInfo.params.order_num,
      }).then(res => {
        if (res.data.status === 200) {
          this.getOrderNo()
          this.id = res.data.data[0].id
          this.fillPage(res.data.data[0])
          // console.log(res.data.data[0].should_receive_receiver)
          this.detailInfo.params.should_receive_sender = res.data.data[0].should_receive_sender
          this.detailInfo.params.should_receive_receiver = res.data.data[0].should_receive_receiver
        }
      })
    }

    //货物状态
    ArrivalCargo({
      id: this.id,
    }).then(res => {
      this.status_name = res.data.data.map(item => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    })

    this.getPayMethod()

    //证件类别
    getcertificate({
      name: this.name,
    }).then(res => {
      //console.log(res.data);
      this.category_code = res.data.data.map(item => {
        return {
          value: item.name,
          label: item.name,
        }
      })
    })

    this.type = this.$route.params.type
    this.title = this.type === "sub" ? "提货分单" : "提货主单"
    this.edit = this.$route.params.id ? true : false

    this.beforeEdit()
    this.edit
      ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
      : (this.detailInfo.params.issuer = this.$getStore("real_name"))
    this.detailInfo.params.out_storeroom_person = this.$getStore("real_name")
  },
  methods: {
    readCardReceiver() {
      readCard().then(res => {
        if(res.status === 200) {
          let idNumber = res.data.split('IDNumber":')[1].slice(2, 20)
          this.detailInfo.params.receiver_certificate_no = idNumber
        }
      })
    },
    readCardSinger() {
      readCard().then(res => {
        if(res.status === 200) {
          let idNumber = res.data.split('IDNumber":')[1].slice(2, 20)
          this.detailInfo.params.signer_certificate_no = idNumber
        }
      })
    },
    // 付款方式
    getPayMethod() {
      //付款方式
      getPayMethod({
        type: this.type === "main" ? 0 : 1,
        related_type: 1,
      }).then(res => {
        this.payment = res.data.data.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })
      })
    },
    //提货方式
    deliveryMode() {
      this.$refs["payer"].focus()
      if (this.detailInfo.params.delivery_mode === 1) {
        this.detailInfo.params.cargo_status = 1
        this.detailInfo.params.payer = "收货方"
      } else if (this.detailInfo.params.delivery_mode === 2) {
        this.detailInfo.params.cargo_status = 2
        this.detailInfo.params.payer = "发货方"
      } else if (this.detailInfo.params.delivery_mode === 3) {
        this.detailInfo.params.cargo_status = 3
        this.detailInfo.params.payer = "发货方"
      }
    },
    getOftenDelivery() {
      //签收人
      oftenDeliveryPerson({
        receiver: this.detailInfo.params.receiver,
      }).then(res => {
        //					console.log(res.data);
        this.signerCode = res.data.data.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })
      })
    },
    //区域
    getArea(value) {
      searcharea({
        destination: value,
      }).then(res => {
        if (res.data.status === 200) {
          this.detailInfo.params.area = res.data.data[0]
        }
      })
    },
    //开单费用
    costParams() {
      let o = this.detailInfo.params
      return {
        type: this.type === "main" ? 0 : 1,
        delivery_mode: o.delivery_mode,
        transport_method: o.transport_method,
        sender: o.sender,
        area: o.area,
        weight: o.weight,
        receiver: o.receiver,
        product_category: o.product_category,
        association_point: o.association_point,
        storeroom: o.storeroom,
        payer: o.payer,
        local_transfer: o.local_transfer,
        order_no: o.order_three_code + o.order_num,
        agency_fund: o.agency_fund,
      }
    },
    //主单
    mainCostParams() {
      let o = this.detailInfo.params
      return {
        ...this.costParams(),
        avg_weight: o.avg_weight,
        product: o.product,
        start_arrive: 1,
      }
    },
    costMainSub() {
      let params = this.type === "main" ? this.mainCostParams() : this.costParams()
      // 提货费用
      deliverygetCostItem(params).then(res => {
        if (res.data.status === 200) {
          this.$store.commit("GET_COSTLIST", res.data.data[0].costItem)
          this.$store.commit("GET_COSTSUMLIST", res.data.data[0].clearUnitCountList)
          this.detailInfo.params.should_receive_sender = res.data.data[0].should_receive_sender
          this.detailInfo.params.should_receive_receiver = res.data.data[0].should_receive_receiver
          this.detailInfo.params.should_pay_transiter = res.data.data[0].should_pay_transiter
        }
      })
    },
    // 单号
    getOrderNo() {
      if (this.detailInfo.params.order_num) {
        this.order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num
        this.$store.commit("GET_ORDERNO", this.order_no)
      } else {
        this.order_no = ""
        this.$store.commit("GET_ORDERNO", this.order_no)
      }
    },
    formatNull() {
      let o = this.detailInfo.params
      o.payment_method === null ? (o.payment_method = 0) : (o.payment_method = o.payment_method)
      o.delivery_mode === null ? (o.delivery_mode = 1) : (o.delivery_mode = o.delivery_mode)
      o.receiver_certificate_category === null
        ? (o.receiver_certificate_category = "身份证")
        : (o.receiver_certificate_category = o.receiver_certificate_category)
      o.signer_certificate_category === null
        ? (o.signer_certificate_category = "身份证")
        : (o.signer_certificate_category = o.signer_certificate_category)
    },
    // 重置
    reset() {
      this.$refs["ruleForm"].resetFields()
      this.getOrderNo()
      this.$store.commit("GET_CUSTOMLIST", [])
      this.$store.commit("GET_COSTLIST", [])
      this.detailInfo.params.pick_up_location = this.$getStore("city")
      this.edit
        ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
        : (this.detailInfo.params.issuer = this.$getStore("real_name"))
    },
    fillPage(d) {
      this.reset()
      this.detailInfo.params = d
      this.getOrderNo()
      this.formatNull()
      this.$store.commit("GET_CUSTOMLIST", d.custServiceList || [])
      this.$store.commit("GET_COSTLIST", d.costItemList || [])
      this.detailInfo.params.pick_up_location = this.$getStore("city")
      this.$store.commit("GET_SENDER", d.sender)
      this.edit
        ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
        : (this.detailInfo.params.issuer = this.$getStore("real_name"))

      this.$store.commit("GET_PAYER", d.payer)
      this.$store.commit("GET_DELIVERTMODE", d.delivery_mode)
      this.$store.commit("GET_AGENCYFUND", d.agency_fund)

      searchSummary({
        costItem: d.costItemList,
        payer: d.payer,
        agency_fund: d.agency_fund,
        delivery_mode: d.delivery_mode,
      }).then(res => {
        if (res.data.status === 200) {
          let d = res.data.data[0]
          this.$store.commit("GET_COSTSUMLIST", d.clearUnitCountList)
          this.$store.commit("CHANGE_COSTABOUT", {
            should_receive_sender: d.should_receive_sender,
            should_receive_receiver: d.should_receive_receiver,
            should_pay_transiter: d.should_pay_transiter,
          })
        }
      })
    },
    // 编辑
    beforeEdit() {
      this.$store.commit("GET_ORDERNO", this.order_no)
      this.$store.commit("GET_MAINORDERNO", this.mainOrderNo)
      if (this.$route.params.id) {
        this.edit = true
        this.id = this.$route.params.id.split("&")[0]
        this.cargo_status = this.$route.params.id.split("&")[1]
        deliveryby({
          id: this.id,
          cargo_status: this.cargo_status,
        }).then(res => {
          //						console.log(res.data);
          let resData = res.data
          resData.status === 200
            ? this.fillPage(resData.data[0])
            : this.$message({
                message: res.data.message,
                type: "warning",
              })
        })
      }
    },
    getCustomList() {
      let cust_service_type = this.orderType
      this.detailInfo.params.custServiceList = this.customList.map(item => {
        return {
          ...item,
          order_no: this.order_no,
          cust_service_type,
        }
      })

      this.detailInfo.params.custServiceList.pop()
    },
    getCostList() {
      this.detailInfo.params.costItemList = this.costList.map(item => {
        return {
          payer: item.payer,
          is_lock: item.is_lock,
          remark: item.remark,
          order_no: this.order_no,
        }
      })

      this.detailInfo.params.costItemList.pop()
    },
    //添加
    save() {
      this.getCostList()
      this.getCustomList()
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.edit) {
            deliveryUpdateby({
              ...this.detailInfo.params,
              id: this.id,
              cargo_status: this.detailInfo.params.cargo_status,
              type: this.type === "main" ? 0 : 1,
            }).then(res => {
              // console.log(res.data)
              if (res.data.status === 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                })
                // this.saveSuccessHandle()
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          } else {
            deliveryInsert({
              ...this.detailInfo.params,
              type: this.type === "main" ? 0 : 1,
            }).then(res => {
              if (res.data.status === 200) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                })
                // this.saveSuccessHandle()
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    saveSuccessHandle() {
      this.$confirm("是否继续开下一单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$router.push(`/delivery/${this.type}/billing/detail`)
          this.reset()
        })
        .catch(() => {
          this.$router.push(`/delivery/main`)
          this.$store.commit("ADD_FOOTNAV", this.routeItem)
        })
    },
    //出发、到达情况
    toCustom() {
      this.$router.push({
        params: {
          item: "deparr",
        },
      })
    },
    // 城市
    getCity(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchCity({
        code: query,
      }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data.map(item => {
            return {
              value: item.cn_name,
              label: item.cn_name,
            }
          })
        }
      })
    },
    //实重
    equalWeight() {
      this.detailInfo.params.weight = this.detailInfo.params.net_weight
      this.detailInfo.params.arrive_weight = this.detailInfo.params.net_weight
    },
    // 目的站
    getDepartures(query) {
      this.getCity(query).then(res => {
        this.departures = res
      })
    },
    // 目的站
    getDestination(query) {
      getAirport(this, "").then(res => {
        this.destinations = res
      })
    },
    getDestinations(query) {
      this.getCity(query).then(res => {
        this.destinationsAss = res
      })
    },
    // 发货人
    getSenderReceiver(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchSenderReceiver({
        code: query,
        is_arrive_relate: 1,
      }).then(res => {
        //console.log(res.data)
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data
        }
      })
    },
    // 发货人
    getSenders(query) {
      this.getSenderReceiver(query).then(res => {
        this.senders = res.map(item => {
          return {
            value: item.code,
            label: item.code,
          }
        })
      })
    },
    // 发货人
    getSenderInfo(query) {
      this.$refs["pick_up_location"].focus()
      this.$store.commit("GET_SENDER", query)
      searchSenderReceiver(query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o) {
            this.detailInfo.params.sender = o.code
          }
          this.renderReceiverName()
        }
      })
    },
    // 收货人
    getReceivers(query) {
      this.getSenderReceiver("").then(res => {
        this.receivers = res.map(item => {
          return {
            value: item.code,
            label: item.code,
          }
        })
      })
    },
    // 收货人
    getReceiverBySender() {
      let params = {
        receiver: this.detailInfo.params.receiver,
        sender: this.detailInfo.params.sender,
        destination: this.detailInfo.params.destination,
      }
      return searchReceiver(params).then(res => {
        //console.log(res.data)
        return res.data.data
      })
    },
    // 收货人
    renderReceiverName() {
      this.getReceiverBySender().then(res => {
        this.receiverNames = res.map(item => {
          return {
            value: item.receiver,
            label: item.receiver,
          }
        })
        if (!this.receiverNames.length) {
          this.detailInfo.params.receiver = ""
        }
        // this.$refs["receiver"].focus()
      })
    },
    // 收货人
    fillReceiveAbout() {
      this.getReceiverBySender().then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o) {
            this.detailInfo.params.receiver_telephone = o.receiver_telephone
            this.detailInfo.params.receiver_address = o.receiver_address
            this.detailInfo.params.other_storage_remark = o.storage_remark
            // this.$refs['delivery_mode'].focus()
          }
        }
      })
    },
    // 收货人
    getReceiverInfo(query) {
      //console.log(query)
      this.getSenderReceiver(query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o) {
            //this.detailInfo.params.receiver_name = o.full_name
            this.detailInfo.params.receiver_telephone = o.telephone
            this.detailInfo.params.receiver_address = o.address
            this.detailInfo.params.delivery_mode = o.delivery_mode
            this.detailInfo.params.area = o.area_code
            this.detailInfo.params.payment_method = o.arrive_payment_method
            this.detailInfo.params.receiver_certificate_category = o.certificate_category || "身份证"
            this.detailInfo.params.receiver_certificate_no = o.certificate_no
            this.detailInfo.params.delivery_mode = o.delivery_mode
            this.detailInfo.params.line = o.line
            this.detailInfo.params.remark = o.remark
            setTimeout(() => {
              this.$refs["receiver_certificate_no"].focus()
            }, 300)
          } else {
            setTimeout(() => {
              this.$refs["receiver_telephone"].focus()
            }, 300)
          }
        }
      })
      this.getOftenDelivery()
    },
    // 品名
    getProduct(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchProduct({
        code: query,
      }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data
        }
      })
    },
    // 品名
    renderProduct(query) {
      this.getProduct(query).then(res => {
        this.products = res.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })
      })
    },
    // 品名
    fillProductAbout(query) {
      this.getProduct(query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o) {
            this.detailInfo.params.product_category = o.start_product_category
            this.detailInfo.params.packaging = o.pkg
            this.$refs["departure"].focus()
          }
        }
      })
    },
    // 货物类别
    getProductCategory(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchProductCategory({
        code: query,
      }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data
        }
      })
    },
    // 货物类别
    renderProductCategory(query) {
      this.getProductCategory(query).then(res => {
        this.productCategorys = res.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })
      })
    },
    // 货物类别
    fillProductCategoryAbout(query) {
      searchProductCategory({ code: query, type: 2 }).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o) {
            this.detailInfo.params.departure_priority = o.departure_priority
            // this.$refs['packaging'].focus()
          }
        }
      })
    },
    // 包装
    getPackage(query) {
      if (query !== "") {
        this.loading = true
      }
      searchPackage({
        code: query,
      }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          this.packages = res.data.data.map(item => {
            return {
              value: item,
              label: item,
            }
          })
        }
      })
    },
    //终点
    destinationChange() {
      this.getArea()
      this.$refs["is_domestic"].focus()
    },
    //国内
    domestiChange() {
      this.$refs["product"].focus()
    },
    //起点
    departureChange() {
      this.getArea()
      this.$refs["transport_mode"].focus()
    },
    //运输方式
    transportChange() {
      this.$refs["delivery_mode"].focus()
    },
    //结算方式
    modeChange() {
      setTimeout(() => {
        this.$refs["receiver_certificate_no"].focus()
      }, 300)
    },
    //收货人证件类别
    cateChange() {
      setTimeout(() => {
        this.$refs["receiver_certificate_no"].focus()
      }, 300)
    },
    //是否放货
    relayChange() {
      this.$refs["remark"].focus()
    },
    //签收人证件类别
    categoryChange() {
      setTimeout(() => {
        this.$refs["signer_certificate_no"].focus()
      }, 300)
    },
    //有无原件签收单
    receiptChange() {
      this.$refs["is_return_receipt"].focus()
      if (this.detailInfo.params.is_original_receipt == 1) {
        this.detailInfo.params.return_time = getTime()
        this.detailInfo.params.is_return_receipt = 1
      }
    },
    //签收单是否返回
    isReceiptChange() {
      this.$refs["return_time"].focus()
      this.$refs["invoice_type"].focus()
    },
    //出库状态
    statusChange() {
      this.$refs["is_lock"].focus()
    },
    //是否锁定
    lockChange() {
      this.$refs["arrive_point_operation"].focus()
    },
    //发票类型
    typeChange() {
      setTimeout(() => {
        this.$refs["local_transfer"].focus()
      }, 300)
    },
    //关联点
    pointChange() {
      this.getArea()
      this.$refs["sign_print_num"].focus()
    },
    //付费方
    payerChange() {
      //				this.$refs['agency_fund'].focus()
      this.type === "main" ? this.$refs["receiver"].focus() : this.$refs["agency_fund"].focus()
    },
    //			签收人
    signerChange() {
      this.$refs["signer_certificate_category"].focus()
    },
    //			提货按钮
    buttonDelivery() {
      this.$confirm('确认提货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getCostList()
        this.getCustomList()
        clickPickUp({
          order_no: this.detailInfo.params.order_three_code + this.detailInfo.params.order_num,
        }).then(res => {
          if (res.data.status === 200) {
            this.detailInfo.params.sign_no = res.data.message
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提货'
        });          
      });
      
      // if (!this.$route.params.id) {
      // console.log(this.id)
      // }
      // console.log(this.id)
      // if (this.detailInfo.params.is_ready === 1) {
      //   return
      // }
      // this.getCostList()
      // this.getCustomList()

      // if (!this.$route.params.id) {
      //   deliveryInsert({
      //     ...this.detailInfo.params,
      //     id: this.id,
      //     type: this.type === "main" ? 0 : 1,
      //     cargo_status: 4,
      //   }).then(res => {
      //     if (res.data.status === 200) {
      //       //							console.log(res.data.message)
      //       this.detailInfo.params.sign_no = res.data.data
      //       this.$notify({
      //         title: "成功",
      //         message: "添加成功",
      //         type: "success",
      //       })
      //     }
      //   })
      // } else {
      //   deliveryUpdateby({
      //     ...this.detailInfo.params,
      //     id: this.id,
      //     type: this.type === "main" ? 0 : 1,
      //     cargo_status: 4,
      //   }).then(res => {
      //     if (res.data.status === 200) {
      //       //							console.log(res.data.message)
      //       this.detailInfo.params.sign_no = res.data.data
      //       this.$notify({
      //         title: "成功",
      //         message: "编辑成功",
      //         type: "success",
      //       })
      //     }
      //   })
      // }
    },
    // 区域
    AreaAreaParmas(query) {
      if (query !== "") {
        this.loading = true
      }
      return getAreaArea({
        code: query,
      }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data
        }
      })
    },
    getNextremark() {
      if (this.type === "sub") {
        setTimeout(() => {
          this.$refs["line"].focus()
        }, 300)
      } else {
        setTimeout(() => {
          this.$refs["remark"].focus()
        }, 300)
      }
    },
    getCarnum() {
      setTimeout(() => {
        this.$refs["car_number"].focus()
      }, 300)
    },
    getParmasArea(query) {
      this.AreaAreaParmas("").then(res => {
        this.areas = res.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })
      })
    },
    // 派送路线
    getline() {
      getDeliveryLine().then(res => {
        this.lines = res.data.data.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })
      })
    },
  },
}
</script>

<style lang="less">
.redMark input {
  color: red !important;
}
</style>
