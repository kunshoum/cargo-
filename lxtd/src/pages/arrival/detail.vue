<template>
<!-- 雷云朵 --><!-- 王艺蒙中转货 -->
	<div class="Detail Billing_detail">
		<el-form :model="detailInfo" class="demo-form-inline detail_form" label-position="top" :rules="rules" ref="ruleForm">
			<el-row :gutter="10">
				<el-col :span="4">
					<el-form-item label="是否不正常货物" class="grid-content" prop="params.is_unusual">
						<el-select size="mini" v-model="detailInfo.params.is_unusual">
							<el-option label="正常" :value="0"></el-option>
							<el-option label="不正常" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="模式" class="grid-content" prop="params.type">
						<el-select size="mini" v-model="detailInfo.params.type" @blur="oneType" placeholder="" ref='type'>
							<el-option label="主单" :value="0"></el-option>
							<!--<el-option label="包舱" :value="1"></el-option>-->
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="运输方式" class="grid-content" prop="params.transport_mode">
						<el-select size="mini" v-model="detailInfo.params.transport_mode" placeholder="" 
						 @change='modeChange' ref='transport_mode'>
							<el-option label="航空" :value="0"></el-option>
							<el-option label="公路" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="关联点" class="grid-content break_line" prop="params.association_point">
						<el-select clearable size="mini" filterable remote 
						default-first-option placeholder="" ref='association_point' 
						v-model="detailInfo.params.association_point" @focus="getDestination" 
						@change="pointChange" :loading="loading">
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg" v-show="this.type === 'main'">
					<el-form-item label="起飞站" class="grid-content break_line" prop="params.take_off">
						<el-select clearable size="mini" filterable remote default-first-option placeholder="" ref='take_off' v-model="detailInfo.params.take_off" @focus="getTakeOff" @change="getfly" :loading="loading">
							<el-option v-for="item in takeOff" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="航班日期" class="grid-content" prop="params.flight_date">
						<el-input size="mini" v-model="detailInfo.params.flight_date" @blur="arrivalDate" ref='flight_date' placeholder="" v-on-enter="'flight_no'"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg" v-show="this.type === 'main'">
					<el-form-item label="航班号" class="grid-content" prop="params.flight_no">
						<el-input size="mini" v-model="detailInfo.params.flight_no" placeholder="" v-on-enter="'order_three_code'" @blur='flightDateOn' ref='flight_no'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="到达操作点" class="grid-content break_line" prop="params.arrive_point_operation">
						<el-input size="mini" v-model="detailInfo.params.arrive_point_operation" ref='arrive_point_operation' placeholder="" v-on-enter="'order_three_code'"></el-input>
					</el-form-item>
				</el-col>
				<!-- <el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="货物来源" class="grid-content" prop="params.product_source">
						<el-select clearable size="mini" v-model="detailInfo.params.product_source" placeholder="" @change='sourceChange'>
							<el-option label="河北空港物流" value='河北空港物流'></el-option>
						</el-select>
					</el-form-item>
				</el-col> -->
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="货物来源" class="grid-content break_line" prop="params.product_source">
						<el-input size="mini" v-model="detailInfo.params.product_source" v-on-enter="'order_three_code'" ref='product_source' placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'" class="must_bg">
					<el-form-item label="主单号" class="grid-content break_line" required>
						<el-col :span="9">
							<el-form-item prop="params.order_three_code">
								<el-input size="mini" v-on-enter="'order_num'" v-model="detailInfo.params.order_three_code" placeholder="三字码" @blur="getOrderNo" ref='order_three_code'></el-input>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="1">-</el-col>
						<el-col :span="14">
							<el-form-item prop="params.order_num">
								<el-input size="mini" ref='order_num' v-on-enter="'senders'" @input="iptOrderNum" v-model="detailInfo.params.order_num" placeholder="八位数字" @blur="countOrderNum"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="始发站" class="grid-content break_line" prop="params.departure">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" @change="departureChange" ref="departures" v-model="detailInfo.params.departure" @focus="getDepartures" :loading="loading">
							<el-option v-for="item in departures" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="目的站" class="grid-content break_line" prop="params.destination">
						<el-select clearable size="mini" filterable remote allow-create default-first-option placeholder="" ref='destination' v-model="detailInfo.params.destination" @focus="getDestination" @change="destinationChange" :loading="loading">
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="发货人" class="grid-content" prop="params.sender"> 
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder=""
							ref="senders"
							v-model="detailInfo.params.sender"
							@focus="renderJointCpmpany"
							@change="getSender"
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
				<el-col :span="4" v-show="this.type === 'sub'" class="must_bg">
					<el-form-item label="发货人" class="grid-content" prop="params.sender"> 
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder=""
							ref="sender"
							v-model="detailInfo.params.sender"
							@focus="renderJointCpmpany"
							@change="getSender"
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
				<el-col :span="4" v-show="this.type === 'sub'" class="must_bg">
					<el-form-item label="主单号" class="grid-content break_line" required>
						<el-col :span="9">
							<el-form-item prop="params.main_order_three_code">
								<el-input size="mini" v-model="detailInfo.params.main_order_three_code" v-on-enter="'main_order_num'" placeholder="三字码" ref='main_order_three_code'></el-input>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="1">-</el-col>
						<el-col :span="14">
							<el-form-item prop="params.main_order_num">
								<el-input size="mini" v-model="detailInfo.params.main_order_num"  @input="iptOrderNum" @blur="countOrderNum" ref='main_order_num' v-on-enter="'order_three_codes'" placeholder="八位数字"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'" class="must_bg">
					<el-form-item label="分单号" class="grid-content break_line" required>
						<el-col :span="8">
							<el-form-item prop="params.order_three_code">
								<el-input size="mini" v-model="detailInfo.params.order_three_code" v-on-enter="'order_nums'" placeholder="三字码" ref='order_three_codes'></el-input>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="14">
							<el-form-item prop="params.order_num">
								<el-input size="mini" v-on-enter="'departure'" ref='order_nums'  @input="iptSubOrderNum" v-model="detailInfo.params.order_num" placeholder="9位数字"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'sub'">
					<el-form-item label="始发站" class="grid-content break_line" prop="params.departure">
						<el-select clearable size="mini" filterable remote allow-create default-first-option placeholder="" @change="departureChange" ref="departure" v-model="detailInfo.params.departure" @focus="getDepartures" :loading="loading">
							<el-option v-for="item in departures" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'sub'">
					<el-form-item label="目的站" class="grid-content break_line" prop="params.destination">
						<el-select clearable size="mini" ref='destinations' filterable remote allow-create default-first-option placeholder="" v-model="detailInfo.params.destination" @change="destinationChange" @focus="getDestination" :loading="loading">
							<el-option v-for="item in destinations" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'" class="must_bg">
					<el-form-item label="品名" class="grid-content" prop="params.product">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" 
						v-model="detailInfo.params.product"
            :filter-method="filterProducts" 
						@focus="renderProduct" 
            @change="fillProductAbout" 
            :loading="loading" 
            ref='products'>
							<el-option v-for="item in products" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'" class="must_bg">
					<el-form-item label="货物类别" class="grid-content" prop="params.product_category">
						<el-select clearable size="mini" filterable remote default-first-option placeholder="" 
            allow-create
						v-model="detailInfo.params.product_category"
            :filter-method="filterProductCategorys" 
            @focus="renderProductCategory" 
						@change="fillProductCategoryAbout" 
            :loading="loading"  
            ref='product_categorys'>
							<el-option v-for="item in productCategorys" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="包装" class="grid-content" prop="params.packaging">
					<el-select size="mini" filterable remote default-first-option placeholder=""
						clearable
						ref="packagings"
						v-model="detailInfo.params.packaging"
            :filter-method="filterPackage"
						@focus="queryPackage"
            @change="fillPackingAbout"
						 v-on-enter="'quantity'"
						:loading="loading">
						<el-option
						v-for="(item, index) in packages"
						:key="index"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'main'">
					<el-form label="" class="grid-content break_line" prop="batch_list" :rules="rules" ref="batchForm">
						<el-button type="warning" @click="inBatchList" size="mini" style="margin-top:150">分批记录</el-button>

						<el-dialog title="分批记录" :visible.sync="dialogTableVisible" width="80%">
							<el-table :data="gridData" show-summary :summary-method="getSummaries" size="small">
								<el-table-column type="index" label="批次号" width="150" prop='batch_no'></el-table-column>
								<el-table-column prop='single_order_no' ref='single_order_no' label="分单号" width="200">
									<template slot-scope="scope">
										<div slot="reference">
											<el-input size="mini" :disabled="true" v-model="scope.row.single_order_no" ref='single_order_no' v-on-enter="'weight'"></el-input>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop='weight' label="重量" width="200">
									<template slot-scope="scope">
										<div slot="reference">
											<el-input size="mini" v-model="scope.row.weight" ref='weight' v-on-enter="'quantity'"></el-input>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop='quantity' label="件数" width="200">
									<template slot-scope="scope">
										<div slot="reference">
											<el-input size="mini" ref='quantity' v-model="scope.row.quantity" v-on-enter="'volume'"></el-input>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop='volume' label="体积" width="200">
									<template slot-scope="scope">
										<div slot="reference">
											<el-input size="mini" ref='volume' v-model="scope.row.volume"  v-on-enter="'arrive_time'"></el-input>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop='arrive_time' label="到达时间" width="200">
									<template slot-scope="scope">
										<div slot="reference">
											<el-input size="mini" ref='arrive_time' v-model="scope.row.arrive_time" @blur='timesRule(scope.$index,scope.row)' @keyup.enter.native="volumeAdd(scope.$index,scope.row)"></el-input>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="操作" align='center' fixed="right">
									<template slot-scope="scope">
										<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div slot="footer" class="dialog-footer">
								<el-button @click="cancel" size="mini">取 消</el-button>
								<el-button type="primary" @click="total" size="mini">确 定</el-button>
							</div>
						</el-dialog>
					</el-form>
				</el-col>
				<el-col :span="type === 'main' ? 3 : 3" class="must_bg" v-show="this.type === 'main'">
					<el-form-item label="件数" class="grid-content" prop="params.quantity">
						<el-input size="mini" v-on-enter="'net_weight'" v-model.number="detailInfo.params.quantity" placeholder="" @blur='equalQuantity' ref='quantity'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="type === 'main' ? 3 : 3" class="must_bg" v-show="this.type === 'sub'">
					<el-form-item label="件数" class="grid-content" prop="params.quantity">
						<el-input size="mini" v-on-enter="'net_weights'" v-model.number="detailInfo.params.quantity" placeholder="" @blur='equalQuantity' ref='quantitys'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="type === 'main' ? 2 : 3" class="must_bg" v-show="this.type === 'main'">
					<el-form-item label="实重(kg)" class="grid-content" prop="params.net_weight">
						<el-input size="mini" v-on-enter="'volume'" ref='net_weight' v-model.number="detailInfo.params.net_weight" placeholder="" @blur="equalWeight"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="type === 'main' ? 2 : 3" v-show="this.type === 'sub'" class="must_bg">
					<el-form-item label="实重(kg)" class="grid-content" prop="params.net_weight">
						<el-input size="mini" v-on-enter="'weights'" ref='net_weights' v-model.number="detailInfo.params.net_weight" placeholder="" @blur="equalWeight"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2" v-show="this.type === 'main'">
					<el-form-item label="体积" class="grid-content" prop="params.volume">
					<el-input size="mini" v-on-enter="'weight'" ref='volume' v-model.number="detailInfo.params.volume" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="type === 'main' ? 2 : 4" class="must_bg" v-show="this.type === 'main'">
					<el-form-item label="计重(kg)" class="grid-content" prop="params.weight">
						<el-input size="mini" v-on-enter="'arrive_quantity'" ref='weight' v-model.number="detailInfo.params.weight" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="type === 'main' ? 2 : 4" class="must_bg" v-show="this.type === 'sub'">
					<el-form-item label="计重(kg)" class="grid-content" prop="params.weight">
						<el-input size="mini" v-on-enter="'products'" ref='weights' v-model.number="detailInfo.params.weight" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'" class="must_bg">
					<el-form-item label="品名" class="grid-content" prop="params.product">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder="" 
						v-model="detailInfo.params.product"
            :filter-method="filterProducts" 
						@focus="renderProduct" 
            @change="fillProductAbout" 
            :loading="loading" 
            ref='product'>
							<el-option v-for="item in products" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'" class="must_bg">
					<el-form-item label="货物类别" class="grid-content" prop="params.product_category">
						<el-select clearable size="mini" filterable remote default-first-option placeholder="" 
            allow-create
						v-model="detailInfo.params.product_category"
            :filter-method="filterProductCategorys" 
            @focus="renderProductCategory" 
						@change="fillProductCategoryAbout" 
            :loading="loading"  
            ref='product_category'>
							<el-option v-for="item in productCategorys" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="包装" class="grid-content" prop="params.packaging">
					<el-select size="mini" filterable remote default-first-option placeholder=""
						clearable
						ref="packaging"
						v-on-enter="'input_storeroom_quantity'"
						v-model="detailInfo.params.packaging"
            :filter-method="filterPackage"
						@focus="queryPackage"
            @change="fillPackingAbout"
						:loading="loading">
						<el-option
						v-for="(item, index) in packages"
						:key="index"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="入库件数" class="grid-content" prop="params.input_storeroom_quantity">
						<el-input size="mini" v-on-enter="'input_storeroom_weight'" v-model.number="detailInfo.params.input_storeroom_quantity" placeholder="" ref='input_storeroom_quantity'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="入库重量" class="grid-content" prop="params.input_storeroom_weight">
						<el-input size="mini" v-on-enter="'receiver'" ref='input_storeroom_weight' v-model.number="detailInfo.params.input_storeroom_weight" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="货物状态" class="grid-content" prop="params.cargo_status">
						<el-select clearable ref='cargo_status' v-model="detailInfo.params.cargo_status" size="mini" :disabled="true">
							<el-option v-for="item in status_name" ref='cargo_status' placeholder='' :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="到达件数" class="grid-content" prop="params.arrive_quantity">
						<el-input size="mini" v-on-enter="'arrive_weight'" v-model.number="detailInfo.params.arrive_quantity" ref='arrive_quantity' placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="到达重量" class="grid-content" prop="params.arrive_weight">
						<el-input size="mini" v-on-enter="'receiver'" ref='arrive_weight' v-model.number="detailInfo.params.arrive_weight" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="到达状态" class="grid-content" prop="params.arrive_status">
						<el-select size="mini" v-on-enter="'receiver'" ref='arrive_status' v-model="detailInfo.params.arrive_status" placeholder="" @change='statusChange'>
							<el-option label="已到达" :value="0"></el-option>
							<el-option label="未到达" :value="1"></el-option>
							<el-option label="部分到达" :value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="收货人" class="grid-content" prop="params.receiver">
						<el-select clearable size="mini" filterable remote default-first-option allow-create placeholder=""
							ref="receiver"
							v-model="detailInfo.params.receiver"
							@focus="getReceiverInfoCpmpany"
							@change="fillReceiverInfo"
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
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="收货人电话" class="grid-content break_line" prop="params.receiver_telephone">
						<el-input size="mini" v-on-enter="'receiver_address'" ref='receiver_telephone' v-model="detailInfo.params.receiver_telephone" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" v-show="this.type === 'main'">
					<el-form-item label="收货人地址" class="grid-content break_line" prop="params.receiver_address">
						<el-input size="mini" v-on-enter="'delivery_mode'" ref='receiver_address' v-model="detailInfo.params.receiver_address" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="收货人电话" class="grid-content break_line" prop="params.receiver_telephone">
						<el-input size="mini" v-on-enter="'receiver_addres'" ref='receiver_telephones' v-model="detailInfo.params.receiver_telephone" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8" v-show="this.type === 'sub'">
					<el-form-item label="收货人地址" class="grid-content break_line" prop="params.receiver_address">
						<el-input size="mini" v-on-enter="'delivery_modes'" ref='receiver_addres' v-model="detailInfo.params.receiver_address" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg" v-show="this.type === 'main'">
					<el-form-item label="提货方式" class="grid-content" prop="params.delivery_mode">
						<el-select size="mini" ref='delivery_mode' v-model="detailInfo.params.delivery_mode" placeholder=""  @change="deliveryMode">
							<el-option label="自提" :value="1"></el-option>
							<el-option label="派送" :value="2"></el-option>
							<el-option label="中转" :value="3"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="提货方式" class="grid-content" prop="params.delivery_mode">
						<el-select size="mini" ref='delivery_modes' v-model="detailInfo.params.delivery_mode" placeholder=""  @change="deliveryMode">
							<el-option label="自提" :value="1"></el-option>
							<el-option label="派送" :value="2"></el-option>
							<el-option label="中转" :value="3"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="目的站提货方式" class="grid-content" prop="params.destination_delivery_mode" v-if='detailInfo.params.delivery_mode === 3'>
						<el-select size="mini" v-on-enter="'payer'" v-model="detailInfo.params.destination_delivery_mode" placeholder="" ref='destination_delivery_mode' @change='deliveryChange'>
							<el-option label="自提" :value="1"></el-option>
							<el-option label="派送" :value="2"></el-option>
							<el-option label="中转" :value="3"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'" class="must_bg">
					<el-form-item label="付费方" class="grid-content" prop="params.payer">
						<el-select size="mini" :class="{ must_color: detailInfo.params.payer === '发货方'}" v-model="detailInfo.params.payer" placeholder="" ref='payer' @change='payerChange'>
							<el-option label="发货方" value="发货方" class="must_color"></el-option>
							<el-option label="收货方" value="收货方"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="付费方" class="grid-content" prop="params.payer">
						<el-select size="mini" :class="{ must_color: detailInfo.params.payer === '发货方'}" v-model="detailInfo.params.payer" 
						placeholder="" ref='payers' @change='payerChange'>
							<el-option label="发货方" value="发货方" class="must_color"></el-option>
							<el-option label="收货方" value="收货方"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="区域" class="grid-content" prop="params.area">
						<el-select clearable size="mini" @change="areaStyle" ref='area' filterable remote default-first-option placeholder="" v-model="detailInfo.params.area" @focus="getParmasArea" :loading="loading">
							<el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_bg" v-show="this.type === 'sub'">
					<el-form-item label="区域" class="grid-content" prop="params.area">
						<el-select clearable size="mini" @change="areaStyle" ref='areas' filterable remote default-first-option placeholder="" v-model="detailInfo.params.area" @focus="getParmasArea" :loading="loading">
							<el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="派送路线" class="grid-content" prop="params.line">
						<el-select clearable size="mini" @change="lineStyle" filterable remote default-first-option placeholder="" v-model="detailInfo.params.line" @focus="getline" :loading="loading" ref='line'>
							<el-option v-for="item in lines" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="付款方式" class="grid-content" prop="params.payment_method">
						<el-select clearable ref='payment_method' v-model="detailInfo.params.payment_method" size="mini" @change='paymentChange'>
							<el-option v-for="item in payment" placeholder='' :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="返自提费" class="grid-content break_line" prop="params.retrun_self_pick_cost">
						<el-input size="mini" v-on-enter="'retrun_delivery_cost'" v-model="detailInfo.params.retrun_self_pick_cost" placeholder="" ref='retrun_self_pick_cost'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="返派送费" class="grid-content break_line" prop="params.retrun_delivery_cost">
						<el-input size="mini" v-on-enter="'retrun_transit_cost'" ref='retrun_delivery_cost' v-model="detailInfo.params.retrun_delivery_cost" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="返中转费" class="grid-content break_line" prop="params.retrun_transit_cost">
						<el-input size="mini" v-on-enter="'return_other_cost'" ref='retrun_transit_cost' v-model="detailInfo.params.retrun_transit_cost" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="返其他费用" class="grid-content break_line" prop="params.return_other_cost">
						<el-input size="mini" v-on-enter="'input_storeroom_time'" ref='return_other_cost' v-model="detailInfo.params.return_other_cost" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="库房" v-on-enter="'agency_fund'" class="grid-content" prop="params.storeroom">
						<el-select v-model="detailInfo.params.storeroom" @change="storeroomChange" size="mini" ref='storerooms'>
							<el-option v-for="item in storerooms" placeholder='' :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="入库时间" class="grid-content break_line" prop="params.input_storeroom_time">
						<el-input size="mini" v-on-enter="'agency_funds'" ref='input_storeroom_time' v-model="detailInfo.params.input_storeroom_time" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="货物状态" class="grid-content" prop="params.cargo_status">
						<el-select clearable v-on-enter="'arrive_time'" v-model="detailInfo.params.cargo_status" ref='cargo_status' size="mini" :disabled="true">
							<el-option v-for="item in status_name" placeholder='' :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="到达时间" class="grid-content" prop="params.arrive_time">
						<el-input size="mini" v-on-enter="'agency_fund'" v-model="detailInfo.params.arrive_time" placeholder="" ref='arrive_time'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="是否分单" class="grid-content" prop="params.is_single">
						<el-select size="mini" ref='is_single' v-model="detailInfo.params.is_single" placeholder="" @change="iSingle">
							<el-option label="分单" :value="1"></el-option>
							<el-option label="不分单" :value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'">
					<el-form-item label="分单数" class="grid-content" prop="params.single_quantity">
						<el-input size="mini" v-on-enter="'agency_fund'" v-model.number="detailInfo.params.single_quantity" id="quantitu" :disabled="isdisabled" ref='single_quantity'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'" class="must_bg">
					<el-form-item label="库房" v-on-enter="'agency_fund'" class="grid-content" prop="params.storeroom">
						<el-select clearable v-model="detailInfo.params.storeroom" @change="storeroomChange" size="mini" ref='storeroom'>
							<el-option v-for="item in storerooms" placeholder='' :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_color" v-show="this.type === 'main'">
					<el-form-item label="代收款" class="grid-content" prop="params.agency_fund">
						<el-input size="mini" v-on-enter="'remark'" ref='agency_fund' v-model.number="detailInfo.params.agency_fund" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" class="must_color" v-show="this.type === 'sub'">
					<el-form-item label="代收款" class="grid-content" prop="params.agency_fund">
						<el-input size="mini" v-on-enter="'service_record'" ref='agency_funds' v-model.number="detailInfo.params.agency_fund" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="是否放货" class="grid-content" prop="params.is_ready"
					:class="{ must_color: detailInfo.params.is_ready === 1}">
						<el-select size="mini" v-model="detailInfo.params.is_ready" ref='is_ready' placeholder="" @change='putChange'>
							<el-option label="不放货" :value="1" class="must_color"></el-option>
							<el-option label="放货" :value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'sub'">
					<el-form-item label="有无原件签收单" class="grid-content" prop="params.is_original_receipt">
						<el-select size="mini" :class="{ must_color: detailInfo.params.is_original_receipt === 1}" @change="originalReceipt" v-model="detailInfo.params.is_original_receipt" placeholder="" ref='is_original_receipt'>
							<el-option label="有" :value="1" class="must_color"></el-option>
							<el-option label="无" :value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'sub'">
					<el-form-item label="提货地点" class="grid-content" prop="params.pick_up_location">
						<el-input size="mini" ref='pick_up_location' v-model="detailInfo.params.pick_up_location" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'sub'">
					<el-form-item label="生成人" class="grid-content" prop="params.creater">
						<el-input size="mini" v-on-enter="'create_time'" ref='creater' v-model="detailInfo.params.creater" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'sub'">
					<el-form-item label="生成时间" class="grid-content" prop="params.create_time">
						<el-input size="mini" v-on-enter="'update_person'" ref='create_time' v-model="detailInfo.params.create_time" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4" v-show="this.type === 'main'" class="must_color">
					<el-form-item label="备注" class="grid-content break_line" prop="params.remark">
						<el-input size="mini" v-on-enter="'pick_excel_quantity'" ref='remark' v-model="detailInfo.params.remark" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'main'">
					<el-form-item label="提货表件数" class="grid-content" prop="params.pick_excel_quantity">
						<el-input size="mini" v-on-enter="'pick_excel_weight'" ref='pick_excel_quantity' v-model.number="detailInfo.params.pick_excel_quantity" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'main'">
					<el-form-item label="提货表重量" class="grid-content" prop="params.pick_excel_weight">
						<el-input size="mini" v-on-enter="'service_record'" ref='pick_excel_weight' v-model.number="detailInfo.params.pick_excel_weight" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'main'">
					<el-form-item label="录入人" class="grid-content" prop="params.creater">
						<el-input size="mini" v-on-enter="'create_time'" ref='creater' v-model="detailInfo.params.creater" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'main'">
					<el-form-item label="录入时间" class="grid-content" prop="params.create_time">
						<el-input size="mini" v-on-enter="'update_person'" ref='create_time' v-model="detailInfo.params.create_time" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item label="修改人" class="grid-content" prop="params.update_person">
						<el-input size="mini" v-on-enter="'update_time'" ref='update_person' v-model="detailInfo.params.update_person" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item label="修改时间" class="grid-content" prop="params.update_time">
						<el-input size="mini" v-model="detailInfo.params.update_time" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'main'">
					<el-form-item label="交接人" class="grid-content" prop="params.heir">
			 			<el-input size="mini" v-on-enter="'heir_time'" ref='heir' v-model="detailInfo.params.heir" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3" v-show="this.type === 'main'">
					<el-form-item label="交接时间" class="grid-content" prop="params.heir_time">
						<el-input size="mini" v-on-enter="'service_record'" ref='heir_time' v-model="detailInfo.params.heir_time" placeholder="" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="客服记录" class="grid-content" prop="params.service_record">
						<el-input type="textarea" :rows="2" size="mini" ref='service_record' v-model="detailInfo.params.service_record" placeholder="" class="operate" @focus="toCustom"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btn_wrap">
			<el-row>
				<el-col :span="12" :offset="8">
					<div class="grid-content bg-purple">
						<!--<print-order v-if="edit"/>-->
						<el-button type="primary" icon="el-icon-plus" size="small" @click="Subsingle" v-show="this.type === 'sub'">分单开单</el-button>
						<el-button type="primary" icon="el-icon-plus" size="small" @click="MainSub" v-show="this.type === 'main' && detailInfo.params.is_single === 0">主单开单</el-button>
						<el-button type="primary" icon="el-icon-plus" size="small" @click="SubMain" v-show="this.type === 'main' && detailInfo.params.is_single === 1">分单处理</el-button>
						<el-button type="primary" icon="el-icon-plus" size="small" @click="save" v-show="this.type === 'main'">保存</el-button>
						<el-button type="primary" icon="el-icon-plus" size="small" @click="SubSave" v-show="this.type === 'sub'">保存</el-button>
						<el-button type="primary" icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
						<el-button type="primary" size="small" @click="singlePass" v-show="this.type === 'main' && detailInfo.params.destination != 'SJW/石家庄' ">通单中转</el-button>
						<el-button type="primary" size="small" @click="changePass" v-show="this.type === 'main' && detailInfo.params.destination != 'SJW/石家庄' ">换单中转</el-button>
						
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
const { Decimal } = require("../../utils/count.js")
import { isRequired, priceRequired, regPhone, regSpecial, isNumber, isTimes } from "@/mode/ruleMethods"
import {
  // 发货人
  searchJointCompany,
  //添加
  ArrivaInsert,
  //进港编辑前查询
  Arrivaby,
  //进港编辑修改
  ArrivaUpdateby,
  //货物类别
  ArrivalCargo,
  //结算方式
  // getPayMethod,
  //提货地点
  ArrivaLocation,
  //验证单号是否存在
  deliveryUsed,
  //提货主单
  deliveryInsert,
  //航班号
  deliverygetFlightInfo,
  // 区域
  getAreaArea,
  // 付款方式
  getPayMethod,
  // 派送路线
  getDeliveryLine,
  // 库房、
  storeRoom,
  // 城市
  searchCity,
  // 收货人
  searchSenderReceiver,
  // 品名
  searchProduct,
  // 货物类别
  searchProductCategory,
  // 包装
  searchPackage,
  // 付款方式
  searcharea,
  //分批记录删除
  getInputSingle,
  //
  beforeEditRecive,
  //中转货单号是否可用
  isarrivelOrderUsed,

} from "../../service"

import {
  // 目的站
  getCity,
  getAirport,
  // 品名
  getProduct,
  // 货物类别
  getProductCategory,
  //包装
  getPackage,
  // 区域
  AreaAreaParmas,
} from "../../linkQuery"

import { getTime, getDate, formatTime, formatIptDate, } from "@/utils/time"
import filterMixin from "@/mixin/filterMethod.js"
import { mapState } from "vuex"
import rules from "@/mode/rulesData"

export default {
  mixins: [filterMixin],
  data() {
    return {
      title: "进港主单",
      type: "",
      order_no: "",
      main_order_no: "",
      sender: "",
      edit: false,
      status_name: [],
      payment: [],
      up_location: [],
      // 库房
      storerooms: [],
      isdisabled: true,
      plan_fly_date: "",
      flight_num: "",
      subOrderNum: 1,
      detailInfo: {
        params: {
          is_air_transit_cargo: null,
          is_unusual: 0,
          type: 0, //模式
          transport_mode: 0, //运输方式
          association_point: this.$getStore("city"), //关联点
          take_off: "", //起飞站
          flight_date: "", //航班日期
          flight_no: "", //航班号
          arrive_point_operation: this.$getStore("unit"), //到达操作点
          product_source: "河北空港物流", //货物来源
          order_three_code: "", //运单号
          order_num: "", //三字码
          departure: "", //始发站
          destination: this.$getStore("city"), //目的站
          sender: "", //发货人
          product: "", //品名
          product_category: "", //货物类别
          packaging: "", //包装
          quantity: "", //件数
          net_weight: "", //实重
          volume: "", //体积
          weight: "", //计重
          arrive_quantity: "", //到达件数
          arrive_weight: "", //到达重量
          arrive_status: 0, //到达状态
          receiver: "", //收货人
          receiver_telephone: "", //收货人电话
          receiver_address: "", //收货人地址
          cargo_status: 0, //货物状态
          arrive_time: "", //到达时间
          is_single: 0, //是否分单
          single_quantity: 0, //分单数
          expected_storeroom: "内国内到达库", //预计库房
          agency_fund: "0", //代收款
          remark: "", //备注
          pick_excel_quantity: "0", //提货表件数
          pick_excel_weight: "0", //提货表重量
          creater: "", //录入人
          create_time: "", //录入时间
          update_person: "", //修改人
          update_time: "", //修改时间
          heir: "", //交接人
          heir_time: "", //交接时间
          service_record: "", //客服记录

          main_order_three_code: "", //对应主单号三字码
          main_order_num: "", //对应主单号后缀
          input_storeroom_quantity: "", //入库件数
          input_storeroom_weight: "", //入库重量
          delivery_mode: 2, //提货方式
          destination_delivery_mode: 1, //目的站提货方式
          payer: "发货方", //付费方
          area: "", //区域
          line: "", //路线
          payment_method: "现金", //结算方式
          retrun_self_pick_cost: "0", //返自提费
          retrun_delivery_cost: "0", //返派送费
          retrun_transit_cost: "0", //返中转费
          return_other_cost: "0", //返其他费
          storeroom: "", //库房
          input_storeroom_time: "", //入库时间
          is_ready: 0, //是否放货
          pick_up_location: this.$getStore("operateDepart"), //提货地点
          is_original_receipt: 1, //有无原件签收单
          //						creater: '', //生成人
          //						create_time: '', //生成时间
          batch_list: [
            //分批记录
            {
              single_order_no: "", //分单号
              quantity: "", //件数
              weight: "", //计重
              volume: "", //体积
              arrive_time: "", //到达时间
            },
          ],
          custServiceList: [],
        },
      },
      rules: {
        ...rules,
        "params.sender": [{ required: true, message: "请选择发货人", trigger: "change" }],
        "params.receiver": [{ required: true, message: "请选择收货人", trigger: "change" }],
        "params.product": [{ required: true, message: "请选择品名", trigger: "change" }],
        "params.product_category": [{ required: true, message: "请选择货物类别", trigger: "change" }],
        // "params.order_num": [{ required: true, message: "请输入主单号", trigger: "change" }, { max: 7, message: '请输入七位数字', trigger: 'change' }],
        // "params.order_num": [{ required: true, message: "请输入分单号", trigger: "change" }, { max: 9, message: '请输入九位数字', trigger: 'blur' }],
        "params.order_three_code": [{}],
        "params.volume": [{ required: true, validator: isRequired }],
        "params.arrive_quantity": [{ validator: isNumber }],
        "params.arrive_weight": [{ validator: isNumber }],
        "params.pick_excel_quantity": [{ validator: isNumber }],
        "params.pick_excel_weight": [{ validator: isNumber }],
        "params.single_quantity": [{ validator: isNumber }],
        "params.agency_fund": [{ validator: isNumber }],
        "params.arrive_time": [{ validator: isTimes }],
      },
      departures: [],
      destinations: [],
      associationPoints: [],
      senders: [],
      receivers: [],
      receiverNames: [],
      products: [],
      allProducts: [],
      productCategorys: [],
      allProductCategorys: [],
      packages: [],
      allPackages: [],
      loading: false,
      areas: [],
      lines: [],
      dataUnit: "",
      gridData: [
        {
          single_order_no: "", //分单号
          quantity: "", //件数
          weight: "", //计重
          volume: "", //体积
          arrive_time: "", //到达时间
        },
      ], //分批记录
      gridDataCopy: [{}],
      takeOff: "", //起飞站
      dialogTableVisible: false,
      getquantity: "",
      getWeight: "",
      getVolume: "",
      id: "",
      mutationType: {
        main: "CHANGE_ARRIVALMAIN",
        sub: "CHANGE_ARRIVALSUB",
      },
      bathNum: 1,
    }
  },
  components: {
    // PrintOrder,
  },
  computed: {
    ...mapState([
      "customList",
      "costList",
      "arrivalMain",
      "arrivalSub",
      "orderType",
      "arriveMainOrder",
      "mainOrderNo",
      "registerInfo",
      "dealInfo",
      "isChange",
      "isChangeNum",
    ]),
  },
  watch: {
    "$route.params.type"(type) {
      this.type = type
      this.detailInfo.params.storeroom = this.storerooms[0].value
    },
    customList: {
      handler() {
        let contentArr = this.customList.map(item => item.content)
        contentArr.pop()
        this.detailInfo.params.service_record = contentArr.join(";")
      },
      deep: true,
    },
  },
  mounted() {
    // if(this.detailInfo.params.is_single.value === '0') {
    // 	this.isdisabled = false
    // }
    // this.$refs['type'].focus()
    this.gridData[0].arrive_time = getTime()
    this.detailInfo.params.flight_date = getDate()
    this.detailInfo.params.input_storeroom_time = getTime()
    this.detailInfo.params.batch_list[0].arrive_time = getTime()
    this.id = this.$route.params.id
    if (this.id) {
      this.edit = true
    }

    this.edit
      ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
      : (this.detailInfo.params.creater = this.$getStore("real_name"))
    //货物状态
    ArrivalCargo({
      id: this.id,
    }).then(res => {
      //					console.log(res.data);
      this.status_name = res.data.data.map(item => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    }),
      //提货地点
      ArrivaLocation().then(res => {
        //				console.log(res.data);
        this.up_location = res.data.data.map(item => {
          return {
            value: item,
            label: item,
          }
        })
      })

    this.getPayMethod()
    // 库房
    storeRoom({
      type: 1,
      goodsType: 0,
      outLet: this.$getStore("operateDepart"),
      // outLet: "机场营业部",
      city: this.$getStore("city"),
    }).then(res => {
      // console.log(res.data)
      if (res.data.status === 200) {
        this.storerooms = res.data.data.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })
        if (this.storerooms.length) {
          this.detailInfo.params.storeroom = this.storerooms[0].value
        }
      }
    })

    this.type = this.$route.params.type
    this.beforeEdit()
  },
  // beforeRouteEnter(to, from, next) {
  // 	// 添加进入时判断是否有存储项,有则填充
  // 	next(vm => {
  // 		if (to.params.type === "main" && !to.params.id && vm.arrivalMain) {
  // 			// vm.popList(vm.receiveMain)
  // 			vm.fillPage(vm.receiveMain)
  // 		}
  // 		if (to.params.type === "sub" && !to.params.id && vm.arrivalSub) {
  // 			// vm.popList(vm.receiveSub)
  // 			vm.fillPage(vm.receiveSub)
  // 		}
  // 		if (to.params.type === "main" && !vm.arrivalMain) {
  // 			vm.reset()
  // 		}
  // 		if (to.params.type === "sub" && !vm.arrivalSub) {
  // 			vm.reset()
  // 		}
  // 	})
  // },
  // beforeRouteLeave(to, from, next) {
  // 	// 判断是否从添加页面离开，是则保存当前页数据
  // 	if (!this.edit) {
  // 		this.$store.commit(this.mutationType[this.type], this.detailInfo.params)
  // 	}
  // 	next()
  // },
  // beforeRouteUpdate(to, from, next) {
  //   if (to.params.type !== from.params.type) {
  //     // 离开当前单页面
  //     if (!this.edit) {
  //       // 从添加页面离开,保存当前单数据
  //       // this.getTabInfo()
  //       // this.$store.commit(this.mutationType[this.type], this.detailInfo.params)
  //     }

  //     if (to.params.type === "main") {
  //       // 进入主单页面,填充主单数据
  //       if (this.arrivalMain) {
  //         // this.fillPage(this.arrivalMain)
  //       } else {
  //         this.reset()
  //       }
  //     }

  //     if (to.params.type === "sub") {
  //       // 进入分单页面,填充分单数据
  //       if (this.arrivalSub) {
  //         // this.popList(this.receiveSub)
  //         // this.fillPage(this.arrivalSub)
  //       } else {
  //         this.reset()
  //       }
  //     }
  //   }

  //   if (to.params.type === from.params.type) {
  //     // 由当前单编辑页面跳到当前单添加页面时清空数据
  //     if (this.edit && !to.params.id) {
  //       this.reset()
  //     }
  //   }
  //   next()
  // },
  methods: {
    // 主单号
    iptOrderNum(num) {
      if (num.length > 7) {
        this.$notify({
          title: "警告",
          message: "不可输入超过7位或者小于七位",
          type: "warning",
        })
      }
    },
    iptSubOrderNum(num) {
      if (num.length > 9) {
        this.$notify({
          title: "警告",
          message: "不可超过9位",
          type: "warning",
        })
      }
    },
    countOrderNum() {
      let regx = /^\d{7}$/
      let n = this.detailInfo.params.order_num
      // let l = this.detailInfo.params.main_order_num
      if (regx.test(n) && this.type === "main") {
        this.detailInfo.params.order_num = n + (~~n % 7 + "")
      }
      // if (regx.test(l) && this.type === "sub") {
      //   this.detailInfo.params.main_order_num = l + (~~l % 7 + "")
      // }

      this.getOrderNo()
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
    load() {
      this.type = this.$route.params.type
      this.detailInfo.params.type = this.type === "sub" ? 1 : 0
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
    },
    // 是否分单
    iSingle(query) {
      // console.log(query)
      if (query === 0) {
        setTimeout(() => {
          this.$refs["agency_fund"].focus()
        }, 300)
        this.detailInfo.params.single_quantity = 0
        this.isdisabled = true
      } else {
        this.detailInfo.params.single_quantity = ""
        this.isdisabled = false
        setTimeout(() => {
          this.$refs["single_quantity"].focus()
        }, 300)
      }
    },
    // 付款方式
    getArea: function(value) {
      searcharea({
        destination: value,
      }).then(res => {
        if (res.data.status === 200) {
          this.detailInfo.params.area = res.data.data[0]
        }
      })
    },
    // 主单号
    getOrderNo() {
      if (this.detailInfo.params.order_num) {
        this.order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num
        this.main_order_no = this.detailInfo.params.main_order_three_code + this.detailInfo.params.main_order_num
        this.$store.commit("GET_ORDERNO", this.order_no)
        this.$store.commit("GET_MAINORDERNO", this.main_order_no)
      } else {
        this.order_no = ""
        this.$store.commit("GET_ORDERNO", this.order_no)
      }
    },
    formatNull() {
      let o = this.detailInfo.params
      o.payment_method === null ? (o.payment_method = 0) : (o.payment_method = o.payment_method)
    },
    // 重置
    reset() {
      this.getOrderNo()
      this.prices = []
      this.$store.commit("GET_CUSTOMLIST", [])
      this.gridData = [{}]
      this.$refs["ruleForm"].resetFields()

      this.edit
        ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
        : (this.detailInfo.params.creater = this.$getStore("real_name"))
    },
    getRegisterInfo(d) {
      let registerInfo = {
        unusual_no: d.unusual_no,
        unusual_qunatity: d.unusual_qunatity,
        unusual_weight: d.unusual_weight,
        unusual_record_desc: d.unusual_record_desc,
        unusual_record_person: d.unusual_record_person,
        unusual_record_person_operate_epart: d.unusual_record_person_operate_epart,
        unusual_record_time: formatTime(d.unusual_record_time),
      }
      this.$store.commit("CHANGE_REGISTERINFO", registerInfo)
    },
    getDealInfo(d) {
      let dealInfo = {
        unusual_handle_person: d.unusual_handle_person,
        unusual_handle_person_operate_epart: d.unusual_handle_person_operate_epart,
        unusual_handle_time: formatTime(d.unusual_handle_time),
        unusual_handle_detail: d.unusual_handle_detail,
        unusual_is_close: d.unusual_is_close,
      }
      this.$store.commit("CHANGE_DEALINFO", dealInfo)
    },
    fillPage(d) {
      this.reset()
      this.detailInfo.params = d
      this.gridData = d.batch_list

      if (d.is_single === 0) {
        this.isdisabled = true
      } else {
        this.isdisabled = false
      }

      this.getOrderNo()
      this.formatNull()
      this.prices.push({
        value: {
          price_species: d.price_species,
        },
        label: d.price_species,
      })

      this.getRegisterInfo(d)
      this.getDealInfo(d)

      this.$store.commit("GET_CUSTOMLIST", d.custServiceList || [])
      this.$store.commit("GET_COSTLIST", d.costItemList || [])
    },
    //分批记录    编辑前查询
    beforeEdit() {
      this.id = this.$route.params.id
      this.$store.commit("GET_ORDERNO", this.order_no)
      if (this.$route.params.id) {
        this.edit = true
        Arrivaby({
          id: this.id,
        }).then(res => {
          let resData = res.data
          
          this.gridData = res.data.data[0].batch_list || []
          this.gridDataCopy = JSON.parse(JSON.stringify(res.data.data[0].batch_list))
          this.dataUnit = res.data.data[0].data_unit_id
          this.iSingle()
          resData.status === 200
            ? this.fillPage(resData.data[0])
            : this.$message({
                message: res.data.message,
                type: "warning",
              })
        })
      }
    },
    //分批记录
    inBatchList() {
      this.dialogTableVisible = true
      if (this.gridData[0].single_order_no === "") {
        this.gridData[0].single_order_no =
          this.detailInfo.params.order_three_code + this.detailInfo.params.order_num + this.bathNum
      }
    },
    //分批记录 删除
    handleDelete(index, row) {
      getInputSingle({
        singleOrderNo: this.gridData.single_order_no,
      }).then(res => {
        // console.log(res.data)
        if (res.data.status === 200) {
          this.gridData.splice(index, 1)
          if(this.gridData.length === 0) {
            this.gridData.push({
              single_order_no:
                this.detailInfo.params.order_three_code + this.detailInfo.params.order_num + (++this.bathNum + ""),
              weight: "",
              quantity: "",
              volume: "",
              arrive_time: "",
            })
          }
        }
      })
    },
    getCustomList() {
      let cust_service_type = this.type === "main" ? 0 : 1
      this.detailInfo.params.custServiceList = this.customList.map(item => {
        return {
          ...item,
          order_no: this.order_no,
          cust_service_type,
        }
      })

      this.detailInfo.params.custServiceList.pop()
    },
    //添加
    save() {
      this.detailInfo.params.batch_list = this.gridData
      this.$refs["ruleForm"].validate(valid => {
        // if (valid) {
          
          this.detailInfo.params.cargo_status = -1
          this.getCustomList()
          this.edit
            ? (this.detailInfo.params.update_time = getTime())
            : (this.detailInfo.params.create_time = getTime())
            // console.log(this.edit)
          if (this.edit) {
            this.getCostList()
            ArrivaUpdateby({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
              type: this.type === "main" ? 0 : 1,
              id: this.id,
              data_unit_id :this.dataUnit,
            }).then(res => {
              if (res.data.status === 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                })
                this.SubMainSuccess()
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          } else {
            this.getCostList()
            ArrivaInsert({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
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
        // } else {
        //   return false
        // }
      })
    },
    SubSave() {
      // console.log(123)
      this.detailInfo.params.batch_list = this.gridData
      this.$refs["ruleForm"].validate(valid => {
        // console.log(valid)
        // if (valid) {
          this.detailInfo.params.cargo_status = -1
          this.getCustomList()
          this.edit
            ? (this.detailInfo.params.update_time = getTime())
            : (this.detailInfo.params.create_time = getTime())
          if (this.edit) {
            ArrivaUpdateby({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
              type: this.type === "main" ? 0 : 1,
              id: this.id,
            }).then(res => {
              if (res.data.status === 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                })
                // this.SubMainSuccess()
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          } else {
            // console.log(222)
            ArrivaInsert({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
              type: this.type === "main" ? 0 : 1,
            }).then(res => {
              if (res.data.status === 200) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                })
                this.subOrderNum = this.subOrderNum - 1
                if (this.subOrderNum < 1) {
                  return
                }
                this.SubMainSuccess()
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          }
        // } else {
        //   return false
        // }
      })
    },
    // 分单处理提示
    SubMainSuccess() {
      if(this.type === 'sub') {
        this.$confirm("是否继续开下一单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        })
        .then(() => {
          this.$router.push(`/arrival/sub/billing/detail`)
          // this.reset()
          let order_no = this.detailInfo.params.main_order_three_code + this.detailInfo.params.main_order_num
          let sender = this.detailInfo.params.sender
          this.$store.commit("GET_ORDERNO", this.order_no)
          this.$store.commit("GET_SENDER", this.sender)
          this.$refs["ruleForm"].resetFields()
          this.detailInfo.params.main_order_three_code = order_no.slice(0, 3)
          this.detailInfo.params.main_order_num = order_no.slice(3, 12)
          this.detailInfo.params.sender = sender
        })
        .catch(() => {
          // this.$router.push(`/arrival/sub`)
        })
      }
    },
    //分单处理
    SubMain() {
      this.detailInfo.params.batch_list = this.gridData
      this.$refs["ruleForm"].validate(valid => {
        // if (valid) {
          this.detailInfo.params.cargo_status = -1
          this.getCustomList()
          this.edit
            ? (this.detailInfo.params.update_time = getTime())
            : (this.detailInfo.params.create_time = getTime())
            // console.log(this.edit)
          if (this.edit) {
            ArrivaUpdateby({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
              type: this.type === "main" ? 0 : 1,
              id: this.id,
            }).then(res => {
              if (res.data.status === 200) {
                let order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num
                let sender = this.detailInfo.params.sender
                this.$store.commit("GET_ORDERNO", this.order_no)
                this.$store.commit("GET_SENDER", this.sender)
                this.subOrderNum = this.detailInfo.params.single_quantity
                this.$router.push(`/arrival/sub/billing/detail`)
                this.$refs["ruleForm"].resetFields()
                this.detailInfo.params.main_order_three_code = order_no.slice(0, 3)
                this.detailInfo.params.main_order_num = order_no.slice(3, 12)
                this.detailInfo.params.sender = sender
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          } else {
            ArrivaInsert({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
              type: this.type === "main" ? 0 : 1,
            }).then(res => {
              if (res.data.status === 200) {
                let order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num
                let sender = this.detailInfo.params.sender
                this.$store.commit("GET_ORDERNO", this.order_no)
                this.$store.commit("GET_SENDER", this.sender)
                this.subOrderNum = this.detailInfo.params.single_quantity
                this.$router.push(`/arrival/sub/billing/detail`)
                this.$refs["ruleForm"].resetFields()
                this.detailInfo.params.main_order_three_code = order_no.slice(0, 3)
                this.detailInfo.params.main_order_num = order_no.slice(3, 12)
                this.detailInfo.params.sender = sender
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          }
        // } else {
        //   return false
        // }
      })
    },
    //分单开单按钮
    Subsingle() {
      this.$refs["ruleForm"].validate(valid => {
        // console.log(123)
        // if (valid) {
          this.detailInfo.params.cargo_status = 0
          this.getCustomList()
          if (this.edit) {
            ArrivaUpdateby({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
              is_main_order_real: 1,
              type: this.type === "main" ? 0 : 1,
              id: this.id,
            }).then(res => {
              if (res.data.status === 200) {
                this.$router.push(`/delivery/sub/billing/detail`)
                let order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num //运单号//三字码
                let main_order_no = this.detailInfo.params.main_order_three_code + this.detailInfo.params.main_order_num
                //console.log(mainOrderNo)
                this.$store.commit("ARRIVE_MAIN_ORDER", order_no)
                this.$store.commit("GET_MAINORDERNO", main_order_no)
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          } else {
            ArrivaInsert({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
              type: this.type === "main" ? 0 : 1,
              is_main_order_real: 1,
            }).then(res => {
              if (res.data.status === 200) {
                this.$router.push(`/delivery/sub/billing/detail`)
                let order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num //运单号//三字码
                let main_order_no = this.detailInfo.params.main_order_three_code + this.detailInfo.params.main_order_num
                this.$store.commit("ARRIVE_MAIN_ORDER", order_no)
                this.$store.commit("GET_MAINORDERNO", main_order_no)
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          }
        // } else {
        //   return false
        // }
      })
    },
    //主单开单按钮
    MainSub() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.detailInfo.params.cargo_status = 0
          this.getCustomList()
          if (this.edit) {
            ArrivaUpdateby({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
              type: this.type === "main" ? 0 : 1,
              id: this.id,
              is_main_order_real: 1,
            }).then(res => {
              if (res.data.status === 200) {
                this.$router.push(`/delivery/main/billing/detail`)
                let order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num //运单号//三字码

                this.$store.commit("ARRIVE_MAIN_ORDER", order_no)
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
          } else {
            ArrivaInsert({
              ...this.detailInfo.params,
              ...this.registerInfo,
              ...this.dealInfo,
              type: this.type === "main" ? 0 : 1,
              is_main_order_real: 1,
              // id: this.id
            }).then(res => {
              if (res.data.status === 200) {
                this.$router.push(`/delivery/main/billing/detail`)
                let order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num //运单号//三字码
                //									console.log(order_no)
                this.$store.commit("ARRIVE_MAIN_ORDER", order_no)
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
    //分批记录弹框
    volumeAdd(index, row) {
      if (index == this.gridData.length - 1) {
        this.gridData.push({
          single_order_no:
            this.detailInfo.params.order_three_code + this.detailInfo.params.order_num + (++this.bathNum + ""),
          weight: "",
          quantity: "",
          volume: "",
          arrive_time: getTime(),
        })
        this.$nextTick(function() {
          this.$refs["weight"].focus()
        })
      }
      let times = /([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/
      if(!row.arrive_time.match(times)) {
        this.$message({
          type: 'warning',
          message: '时间格式不正确，请重新输入'
        })
      }
    },
    timesRule(index, row) {
      let times = /([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/
      if(!row.arrive_time.match(times)) {
        this.$message({
          type: 'warning',
          message: '时间格式不正确，请重新输入'
        })
      }
    },
    //件数
    equalQuantity() {
      //				console.log(this.detailInfo.params.quantity)
      this.detailInfo.params.arrive_quantity = this.detailInfo.params.quantity
      this.detailInfo.params.pick_excel_quantity = this.detailInfo.params.quantity
    },
    //实重
    equalWeight() {
      //				console.log(this.detailInfo.params.weight)
      this.detailInfo.params.weight = this.detailInfo.params.net_weight
      this.detailInfo.params.arrive_weight = this.detailInfo.params.net_weight
      this.detailInfo.params.pick_excel_weight = this.detailInfo.params.net_weight
    },
    // 计算
    getSummaries(param) {
      const { data } = param
      let sumInfo = data.reduce(
        (item1, item2) => {
          let getquantity = Decimal.add([item1.quantity || 0, item2.quantity || 0]).toNumber()
          let getWeight = Decimal.add([item1.weight || 0, item2.weight || 0]).toNumber()
          let getVolume = Decimal.add([item1.volume || 0, item2.volume || 0]).toNumber()
          return {
            quantity: getquantity,
            weight: getWeight,
            volume: getVolume,
          }
        },
        {
          weight: 0,
          quantity: 0,
          volume: 0,
        },
      )
      this.getquantity = sumInfo.quantity
      this.getWeight = sumInfo.weight
      this.getVolume = sumInfo.volume
      return ["合计", "", sumInfo.weight, sumInfo.quantity, sumInfo.volume]
    },
    // 分批记录确定
    total() {
      this.dialogTableVisible = false
      if (
        this.gridData[0].quantity === "" &&
        this.gridData[0].weight === "" &&
        this.gridData[0].volume === "" &&
        this.gridData[0].single_order_no === ""
      ) {
        return
      }
      this.detailInfo.params.net_weight = this.getWeight
      this.detailInfo.params.weight = this.getWeight
      this.detailInfo.params.arrive_weight = this.getWeight
      this.detailInfo.params.quantity = this.getquantity
      this.detailInfo.params.arrive_quantity = this.getquantity

      this.detailInfo.params.batch_list = this.gridData

      this.detailInfo.params.pick_excel_quantity = this.getquantity
      this.detailInfo.params.pick_excel_weight = this.getWeight
      this.detailInfo.params.volume = this.getVolume

      this.gridDataCopy = JSON.parse(JSON.stringify(this.gridData))
    },
    // 提示
    // saveSuccessHandle() {
    //   this.$confirm("是否继续开下一单?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "info",
    //   })
    //     .then(() => {
    //       this.$router.push(`/arrival/${this.type}/billing/detail`)
    //       this.reset()
    //     })
    //     .catch(() => {
    //       this.$router.push(`/arrival/main`)
    //     })
    // },
    //航班号
    flightDateOn() {
      if (!this.detailInfo.params.flight_no) {
        return
      }

      deliverygetFlightInfo({
        plan_fly_date: this.detailInfo.params.flight_date,
        flight_num: this.detailInfo.params.flight_no,
      }).then(res => {
        if (res.status === 200 && res.data.data[0]) {
          this.detailInfo.params.flight_no = res.data.data[0].flight_no
          this.detailInfo.params.order_three_code = res.data.data[0].order_three_code
          this.detailInfo.params.arrive_time = res.data.data[0].plan_drop_date + " " + res.data.data[0].plan_drop_time
        }
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
    //城市
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
    //付款方式
    getArea(query) {
      searcharea({
        destination: query,
      }).then(res => {
        if (res.data.status === 200) {
          this.detailInfo.params.area = res.data.data[0]
        }
      })
    },
    // 始发站
    getDepartures(query) {
      getAirport(this, "").then(res => {
        this.departures = res
      })
    },
    // 关联点、目的站
    getDestination(query) {
      getAirport(this, "").then(res => {
        this.destinations = res
      })
    },
    //起飞站
    getTakeOff(query) {
      getAirport(this, "").then(res => {
        this.takeOff = res
        this.departures = res
      })
    },
    getfly(query) {
      this.getCity(query).then(res => {
        //console.log(query)
        this.detailInfo.params.departure = query
        this.$refs["flight_no"].focus()
      })
    },
    // 发货人
    getJointCompany(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchJointCompany({
        code: query,
        association_city: this.detailInfo.params.departure,
        is_domestic: 0,
        start_arrive: 2,
      }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data.map(item => {
            return {
              value: item.name,
              label: item.name,
            }
          })
        }
      })
    },
    // 发货人
    renderJointCpmpany(query) {
      this.getJointCompany("").then(res => {
        this.senders = res
      })
    },
    // 发货人
    getSender() {
      this.getJointCompany()

      if (this.detailInfo.params.sender) {
        setTimeout(() => {
          this.type === "main" ? this.$refs["products"].focus() : this.$refs["main_order_three_code"].focus()
        }, 500)
      }
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
      if (this.allProducts.length > 0) {
        return
      }

      this.getProduct("").then(res => {
        this.products = res.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })

        this.allProducts = res.map(item => {
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
        if (!res.length) {
          // console.log("kkkkkk")
          setTimeout(() => {
            this.type === "main" ? this.$refs["product_categorys"].focus() : this.$refs["product_category"].focus()
          }, 300)
          return
        }

        if (Array.isArray(res)) {
          let o = res[0]
          if (o) {
            this.detailInfo.params.product_category = o.arrive_product_category
            this.detailInfo.params.packaging = o.pkg
            setTimeout(() => {
              this.type === "main" ? this.$refs["packagings"].focus() : this.$refs["packaging"].focus()
            }, 300)
          }
        }
      })
    },
    fillPackingAbout() {
      setTimeout(() => {
        this.type === "main" ? this.$refs["quantity"].focus() : this.$refs["input_storeroom_quantity"].focus()
      }, 300)
    },
    // 货物类别
    getProductCategory(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchProductCategory({
        code: query,
        type: 2,
      }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data
        }
      })
    },
    // 货物类别
    renderProductCategory(query) {
      if (this.allProductCategorys.length) {
        return
      }

      this.getProductCategory("").then(res => {
        this.productCategorys = res.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })

        this.allProductCategorys = res.map(item => {
          return {
            value: item.name,
            label: item.name,
          }
        })
      })
    },
    // 货物类别
    fillProductCategoryAbout(query) {
      searchProductCategory(query).then(res => {
        if (Array.isArray(res.data.data)) {
          let o = res.data.data[0]
          if (o) {
            setTimeout(() => {
              this.type === "main" ? this.$refs["packagings"].focus() : this.$refs["packaging"].focus()
            }, 300)
          }
        }
      })
    },
    // 区域
    areaStyle() {
      setTimeout(() => {
        this.type === "main" ? this.$refs["arrive_time"].focus() : this.$refs["line"].focus()
      }, 300)
    },
    // 派送路线
    lineStyle() {
      setTimeout(() => {
        this.$refs["retrun_self_pick_cost"].focus()
      }, 300)
    },
    //包装
    getPackage(query) {
      if (this.allPackages.length) {
        return
      }

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

          this.allPackages = res.data.data.map(item => {
            return {
              value: item,
              label: item,
            }
          })
        }
      })
    },
    //包装
    queryPackage(query) {
      getPackage(this, "")
    },
    //运输方式
    modeChange() {
      this.$refs["association_point"].focus()
    },
    //关联点
    pointChange() {
      this.getArea()
      this.$refs["take_off"].focus()
    },
    //货物来源
    sourceChange() {
      this.$refs["order_three_code"].focus()
    },
    //始发站
    departureChange() {
      setTimeout(() => {
        this.type === "main" ? this.$refs["senders"].focus() : this.$refs["quantitys"].focus()
      }, 300)
    },
    //目的站
    destinationChange() {
      this.getArea()
      setTimeout(() => {
        this.type === "main" ? this.$refs["senders"].focus() : this.$refs["quantitys"].focus()
      }, 300)
    },
    //到达状态
    statusChange() {
      this.$refs["receiver"].focus()
    },
    //目的站提货方式
    deliveryChange() {
      this.$refs["payer"].focus()
    },
    //付款方式
    paymentChange() {
      setTimeout(() => {
        this.$refs["retrun_self_pick_cost"].focus()
      }, 300)
    },
    //是否放货
    putChange() {
      this.$refs["is_original_receipt"].focus()
    },
    //提货地点
    locationChange() {
      this.$refs["is_original_receipt"].focus()
    },
    //取消
    cancel() {
      this.dialogTableVisible = false
      if (this.gridData === "") {
        this.gridData = JSON.parse(JSON.stringify(this.gridDataCopy))
      }
    },
    //付费方
    payerChange(val) {
      if (val === "发货方") {
        this.detailInfo.params.payment_method = "发方月结"
      }
      this.type === "main" ? this.$refs["area"].focus() : this.$refs["areas"].focus()
    },
    //			提货方式
    deliveryMode(query) {
      if (query === 1) {
        this.detailInfo.params.payer = "收货方"
      } else if (query === 2 || query === 3) {
        this.detailInfo.params.payer = "发货方"
      }
      this.type === "main" ? this.$refs["area"].focus() : this.$refs["areas"].focus()
    },

    // 收货人
    getReceiverInfo(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchSenderReceiver({
        is_arrive_relate: 1,
        code: query,
      }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data
        }
      })
    },
    // 收货人
    getReceiverInfoCpmpany(query) {
      this.getReceiverInfo().then(res => {
        this.receivers = res.map(item => {
          return {
            value: item.code,
            label: item.code,
          }
        })
      })
    },
    fillReceiverInfo(query) {
      this.getReceiverInfo(query).then(res => {
        if (!res.length) {
          this.detailInfo.params.receiver_telephone = ""
          this.detailInfo.params.receiver_address = ""
          setTimeout(() => {
            this.type === "main" ? this.$refs["receiver_telephone"].focus() : this.$refs["receiver_telephones"].focus()
          }, 500)
          return
        }

        this.detailInfo.params.receiver_telephone = res[0].telephone
        this.detailInfo.params.receiver_address = res[0].address
        this.type === "main" ? this.$refs["area"].focus() : this.$refs["areas"].focus()
      })
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
    oneType() {
      this.$refs["transport_mode"].focus()
    },
    originalReceipt() {
      this.$refs["service_record"].focus()
    },
    // 库房
    storeroomChange() {
      this.$refs["input_storeroom_time"].focus()
    },
    costParams() {
      let o = this.detailInfo.params
      return {
        id: this.priceId,
        order_no: this.order_no,
        type: this.type === "main" ? 0 : 1,
        invoice_price: o.invoice_price,
        quantity: o.quantity,
        weight: o.weight,
        is_domestic: o.is_domestic,
        price_species: o.price_species,
        destination: o.destination,
        sender: o.sender,
        product_category: o.product_category,
      }
    },
    getCostList() {
      // 获取要传给后台的费用数据
      this.detailInfo.params.costItemList = this.costList.map(item => {
        return {
          cost_name: item.cost_name,
          payer: item.payer,
          relevance_id: item.relevance_id,
          invoice_price: item.invoice_price,
          invoice_choice_way: item.invoice_choice_way,
          is_lock: item.is_lock,
          absolute_cost: item.absolute_cost,
          actual_cost: item.actual_cost,
          remark: item.remark,
          is_sys_cost: item.is_sys_cost,
          payee: item.payee,
          related_type: 2,
          impact: item.impact,
        }
      })

      this.detailInfo.params.costItemList.pop()
    },
    //通单中转
    singlePass(){
      this.$confirm("确定要换单中转吗吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        }).then(() => {
          isarrivelOrderUsed({
            orderNo: this.detailInfo.params.order_num,
            orderPrefix: this.detailInfo.params.order_three_code,
          }).then(res => {
            if (res.data.status === 200) {
              this.curTansfer()
            }
          })
      })
    },  
    curTansfer() {
      this.detailInfo.params.is_air_transit_cargo = 1
      if (this.type === "main" && this.detailInfo.params.is_air_transit_cargo === 1) {
        // 通单中转
        this.detailInfo.params.batch_list = this.gridData
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.detailInfo.params.cargo_status = -1
            this.getCustomList()
            this.edit
              ? (this.detailInfo.params.update_time = getTime())
              : (this.detailInfo.params.create_time = getTime())
            if (this.edit) {
              this.getCostList()
              ArrivaUpdateby({
                ...this.detailInfo.params,
                ...this.registerInfo,
                ...this.dealInfo,
                type: this.type === "main" ? 0 : 1,
                id: this.id,
              }).then(res => {
                if (res.data.status === 200) {
                  this.$router.push(`/receive/main/billing/detail/${this.order_no}`)
                  this.$message({
                    message: "编辑成功",
                    type: "success",
                  })
                  // this.SubMainSuccess()
                } else {
                  this.$message({
                    message: res.data.message,
                    type: "warning",
                  })
                }
              })
            } else {
              this.getCostList()
              ArrivaInsert({
                ...this.detailInfo.params,
                ...this.registerInfo,
                ...this.dealInfo,
                type: this.type === "main" ? 0 : 1,
              }).then(res => {
                if (res.data.status === 200) {
                  this.$router.push(`/receive/main/billing/detail/${this.order_no}`)
                  this.$message({
                    message: "添加成功",
                    type: "success",
                  })
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
      }
    },
    //换单中转
    changePass(){
      this.$confirm("确定要换单中转吗吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        }).then(() => {
          isarrivelOrderUsed({
            orderNo: this.detailInfo.params.order_num,
            orderPrefix: this.detailInfo.params.order_three_code,
          }).then(res => {
            if (res.data.status === 200) {
              this.changeTansfer()
            }
          })
      })
    }, 
    changeTansfer() {
      this.detailInfo.params.is_air_transit_cargo = 2
      if (this.type === "main" && this.detailInfo.params.is_air_transit_cargo === 2) {
        // 通单中转
        this.detailInfo.params.batch_list = this.gridData
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.detailInfo.params.cargo_status = -1
            this.getCustomList()
            this.edit
              ? (this.detailInfo.params.update_time = getTime())
              : (this.detailInfo.params.create_time = getTime())
            if (this.edit) {
              this.getCostList()
              ArrivaUpdateby({
                ...this.detailInfo.params,
                ...this.registerInfo,
                ...this.dealInfo,
                type: this.type === "main" ? 0 : 1,
                id: this.id,
              }).then(res => {
                if (res.data.status === 200) {
                  this.$store.commit("CHANGE_TOPTITLE", this.title + "-添加")
                  this.$router.push(`/receive/main/billing/detail`)
                  this.$store.commit("IS_CHANGE", 0)
                  this.$store.commit("IS_CHANGE_NUM", this.order_no)
                } else {
                  this.$message({
                    message: res.data.message,
                    type: "warning",
                  })
                }
              })
            } else {
              this.getCostList()
              ArrivaInsert({
                ...this.detailInfo.params,
                ...this.registerInfo,
                ...this.dealInfo,
                type: this.type === "main" ? 0 : 1,
              }).then(res => {
                if (res.data.status === 200) {
                  this.$store.commit("CHANGE_TOPTITLE", this.title + "-添加")
                  this.$router.push(`/receive/main/billing/detail`)
                  this.$store.commit("IS_CHANGE", 0)
                  this.$store.commit("IS_CHANGE_NUM", this.order_no)
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
      }
    },
    // 验证航班日期
    arrivalDate() {
      this.detailInfo.params.flight_date = formatIptDate(this.detailInfo.params.flight_date)
    },

  },
}
</script>

<style lang="less" scoped>
// 分批记录
.el-button--warning {
  margin-top: 25px;
  margin-left: 20px;
}
</style>
