/**
 * 马少良
 */
 
<template><!-- 王艺蒙运价对比 -->
<div class="Detail Billing_detail">
  <el-form :model="detailInfo" class="demo-form-inline detail_form" label-position="top" :rules="rules" ref="ruleForm">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form-item :label="this.orderType === 0 ? '运单号' : '分单号'" class="grid-content break_line must_bg" required>
          <el-col :span="9">
            <el-form-item prop="params.order_three_code">
              <el-input size="mini" v-model="detailInfo.params.order_three_code" placeholder="三字码"
              :disabled="this.type === 'sub' || (edit && !isCancelTransit)"
              @input="iptOrderNo" 
              ref="order_three_code"
              v-on-enter="'order_num'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="14">
            <el-form-item prop="params.order_num">
              <el-input size="mini" v-model="detailInfo.params.order_num" placeholder="八位数字"
              :disabled="edit && !isCancelTransit"
              @blur="countOrderNum"
              @input="iptOrderNum" 
              ref="order_num"
              v-on-enter="'destination'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="入库单号" class="grid-content" prop="params.in_store_no">
          <el-input size="mini" v-model="detailInfo.params.in_store_no" placeholder=""
          @change="getStoreInfo" 
          v-on-enter="'destination'"
          ref="in_store_no"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" v-show="this.type === 'sub'">
        <el-form-item label="运输方式" class="grid-content" prop="params.transport_mode">
          <el-select size="mini" v-model="detailInfo.params.transport_mode" placeholder=""
          v-on-enter="'association_point'"
          ref="transport_mode" @change="transportChange">
            <el-option label="航空" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="关联点" class="grid-content" prop="params.association_point">
          <el-select size="mini" filterable remote default-first-option placeholder="" clearable
            v-model="detailInfo.params.association_point"
            @change="pointChange"
            @focus="getCitys"
            v-on-enter="'departure'"
            :loading="loading" ref="association_point">
            <el-option
              v-for="(item, index) in associationPoints"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="type === 'sub' ? 4 : 7">
        <el-form-item label="始发站" class="grid-content" prop="params.departure">
          <el-select size="mini" filterable remote default-first-option placeholder="" clearable
            ref="departure"
            v-model="detailInfo.params.departure"
            @focus="getAirports"
            :loading="loading"
            v-on-enter="'destination'"
            @change="departureChange">
            <el-option
              v-for="(item, index) in departures"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="type === 'sub' ? 4 : 7">
        <el-form-item label="目的站" class="grid-content must_bg" prop="params.destination" required>
          <el-select size="mini" filterable remote default-first-option placeholder="" clearable
            @change="destinationChange"
            v-model="detailInfo.params.destination"
            @focus="getAirports"
            :loading="loading"
            ref="destination">
            <el-option
              v-for="(item, index) in destinations"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <div>
      <el-col :span="8">
        <el-form-item label="发货人" class="grid-content must_bg" prop="params.sender"> 
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            clearable
            ref="sender"
            v-model="detailInfo.params.sender"
            @focus="getSenders"
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
      <el-col :span="6">
        <el-form-item label="发货人电话" class="grid-content" prop="params.sender_telephone">
          <el-input size="mini" v-on-enter="'sender_address'" v-model="detailInfo.params.sender_telephone" placeholder="" ref="sender_telephone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="发货人地址" class="grid-content" prop="params.sender_address">
          <el-input size="mini" v-on-enter="'receiver'"  v-model="detailInfo.params.sender_address" placeholder="" ref="sender_address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收货人" class="grid-content must_bg" prop="params.receiver">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            clearable
            ref="receiver"
            v-model="detailInfo.params.receiver"
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
      <el-col :span="6">
        <el-form-item label="收货人电话" class="grid-content" prop="params.receiver_telephone">
          <el-input v-on-enter="'receiver_address'" size="mini" v-model="detailInfo.params.receiver_telephone" 
          placeholder="" ref="receiver_telephone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="收货人地址" class="grid-content" prop="params.receiver_address">
          <el-input v-on-enter="'other_storage_remark'" size="mini" v-model="detailInfo.params.receiver_address" placeholder="" ref='receiver_address'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="提货方式" class="grid-content" prop="params.delivery_mode">
          <el-select size="mini" v-model="detailInfo.params.delivery_mode" placeholder=""
          @change="deliveryModeChange"
          ref="delivery_mode">
            <el-option label="机场自提" :value="1"></el-option>
            <el-option label="配送" :value="2"></el-option>
            <el-option label="中转" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      </div>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="派送费付费方" class="grid-content" prop="params.delivery_payee">
          <el-select size="mini" v-model="detailInfo.params.delivery_payee" placeholder="" 
          ref="delivery_payee" @change="payeeChange">
            <el-option label="收货方付派送提货费" :value="1"></el-option>
            <el-option label="发货方付派送提货费" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6" v-show="this.type === 'main'">
        <el-form-item label="承运人储运备注" class="grid-content" prop="params.carrier_storage_remark">
          <el-input size="mini" v-on-enter="'other_storage_remark'" 
          v-model="detailInfo.params.carrier_storage_remark" placeholder="" ref="carrier_storage_remark"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="type === 'main' ? 6 : 8">
        <el-form-item :label="type === 'main' ? '其他储运备注' : '储运备注'" class="grid-content" prop="params.other_storage_remark">
          <el-input size="mini" v-on-enter="'expected_flight_time'" v-model="detailInfo.params.other_storage_remark" placeholder="" ref="other_storage_remark"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="结算备注" class="grid-content" prop="params.billing_remark">
          <el-input size="mini" v-on-enter="'starting_point_operation'"  v-model="detailInfo.params.billing_remark" placeholder="" ref="billing_remark"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="出发操作点" class="grid-content" prop="params.starting_point_operation">
          <el-input size="mini" v-on-enter="'expected_flight_time'" v-model="detailInfo.params.starting_point_operation" placeholder="" ref="starting_point_operation"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="拼货网络公司" class="grid-content" prop="params.joint_network_company">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            clearable
            ref="joint_network_company"
            v-model="detailInfo.params.joint_network_company"
            @focus="renderJointCpmpany"
            :loading="loading" @change="companyChange">
            <el-option
              v-for="(item, index) in jointCompanys"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="提货电话" class="grid-content" prop="params.signer_telephone">
          <el-input size="mini" v-on-enter="'is_put'" v-model="detailInfo.params.signer_telephone" placeholder="" ref='signer_telephone'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="是否放货" class="grid-content" prop="params.is_put">
          <el-select size="mini" v-model="detailInfo.params.is_put" placeholder="" @change="putChange" ref="is_put">
            <el-option label="放货" :value="1"></el-option>
            <el-option label="不放货" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="预计航班日期" class="grid-content" prop="params.expected_flight_time"
        :class="{ must_bg: type === 'main'}"
        :rules="{
          required: type === 'main' ? true : false, message: '航班日期不能为空'
        }">
          <el-input size="mini" v-model="detailInfo.params.expected_flight_time" 
          v-on-enter="'expected_flight_no'" ref="expected_flight_time" @blur="formatDate"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="预计航班号" class="grid-content"
        :rules="{
          required: type === 'main' ? true : false, message: '航班号不能为空'
        }"
        prop="params.expected_flight_no" :class="{ must_bg: type === 'main'}">
          <el-input size="mini" v-on-enter="'insurance_value'" class="operate" 
          @keyup.enter.native="toFlight" ref="expected_flight_no"
          v-model="detailInfo.params.expected_flight_no" @blur="flightNoChange"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="type === 'sub' ? 4 : 6">
        <el-form-item label="第一程" class="grid-content must_bg" prop="params.first_transfer_process">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            clearable
            v-model="detailInfo.params.first_transfer_process"
            @change="firstChange"
            @focus="getAirports"
            :loading="loading" 
            ref='first_transfer_process'>
            <el-option
              v-for="(item, index) in firstAirports"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="空运中转" class="grid-content" prop="params.air_transit">
          <el-select size="mini" v-model="detailInfo.params.air_transit" placeholder="" @change="transitChange" 
          ref="air_transit">
            <el-option label="中转" :value="1"></el-option>
            <el-option label="不中转" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="type === 'sub' ? 4 : 6">
        <el-form-item label="第二程" class="grid-content" prop="params.second_transfer_process">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            clearable
            v-model="detailInfo.params.second_transfer_process"
            @focus="getAirports"
            @change="secondChange"
            :loading="loading"
            ref="second_transfer_process">
            <el-option
              v-for="(item, index) in secondAirports"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="type === 'main' ? 4 : 2">
        <el-form-item label="保险价值" class="grid-content" prop="params.insurance_value">
          <el-input size="mini" v-on-enter="'declared_value'" v-model="detailInfo.params.insurance_value" placeholder="" ref="insurance_value"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="type === 'main' ? 4 : 2">
        <el-form-item label="申明价值" class="grid-content" prop="params.declared_value">
          <el-input size="mini" v-on-enter="'product'" v-model="detailInfo.params.declared_value" placeholder="" ref="declared_value"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="品名" class="grid-content must_bg" prop="params.product">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            clearable
            ref="product"
            v-model="detailInfo.params.product"
            :filter-method="filterProducts"
            @focus="renderProduct"
            @change="productChange"
            :loading="loading">
            <el-option
              v-for="(item, index) in products"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'main'">
        <el-form-item label="商品代码" class="grid-content" prop="params.product_code">
          <el-input size="mini" v-on-enter="'product_category'" v-model="detailInfo.params.product_code" 
          placeholder="" ref="product_code"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="货物类别" class="grid-content must_bg" prop="params.product_category">
          <el-select size="mini" filterable remote default-first-option placeholder=""
            clearable
            v-model="detailInfo.params.product_category"
            :filter-method="filterProductCategorys"
            @focus="renderProductCategory"
            @change="productCategoryChange"
            v-on-enter="'packaging'"
            :loading="loading" 
            ref="product_category">
            <el-option
              v-for="(item, index) in productCategorys"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="包装" class="grid-content must_bg" prop="params.packaging">
          <el-select size="mini" filterable remote default-first-option placeholder=""
            allow-create
            clearable
            :filter-method="filterPackage"
            ref="packaging"
            v-model="detailInfo.params.packaging"
            @focus="queryPackage"
            @change="packagingChange"
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
      <el-col :span="4" v-show="this.type === 'main'">
        <el-form-item label="自分类别" class="grid-content" prop="params.your_category">
          <el-input size="mini" v-on-enter="'departure_priority'" v-model="detailInfo.params.your_category" placeholder="" ref="your_category"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'main'">
        <el-form-item label="出发优先级" class="grid-content" prop="params.departure_priority">
          <el-select size="mini" v-model="detailInfo.params.departure_priority" placeholder="" ref='departure_priority' 
          @change="priorityChange"
          :class="{ must_color: detailInfo.params.departure_priority === 1}">
            <el-option label="普通" :value="0"></el-option>
            <el-option label="优先" :value="1" class="must_color"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="件数" class="grid-content must_bg" prop="params.quantity">
          <el-input size="mini" v-on-enter="'net_weight'" v-model.number="detailInfo.params.quantity" placeholder=""
          ref="quantity" 
          @change="quantityChange"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="实重" class="grid-content must_bg" prop="params.net_weight">
          <el-input size="mini" v-on-enter="'volume'"
          v-model.number="detailInfo.params.net_weight" ref="net_weight"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="体积" class="grid-content must_bg" prop="params.volume">
          <el-input size="mini" ref="volume" v-model.number="detailInfo.params.volume"
          v-on-enter="'weight'" 
          class="operate" @keyup.enter.native="toVolume"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="计重" class="grid-content must_bg" prop="params.weight">
          <el-input size="mini"  v-on-enter="'priceItem'" v-model.number="detailInfo.params.weight" placeholder="" 
          ref="weight" @change="priceChange"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="价种" class="grid-content must_bg" prop="priceItem" required
        :class="{ must_color: detailInfo.priceItem.price_species === '公务货' || detailInfo.priceItem.price_species === '自定义价种'}">
          <el-select size="mini" class="operate" filterable default-first-option placeholder=""
            clearable
            remote allow-create
            @focus="getPrice"
            v-model="detailInfo.priceItem"
            value-key="price_species"
            @change="getCostItem"
            ref="priceItem"
            :loading="loading">
            <el-option
              v-for="(item, index) in prices"
              :key="index"
              :name="item.label"
              :label="item.name"
              :value="item.value"
              :class="{ must_color: item.label && item.label.indexOf('公务货') > -1  || item.label && item.label.indexOf('自定义价种') > -1 ,
              range_color: item.value.is_in_range}">
              <span>{{item.label}}</span>
            </el-option>
          </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'main'">
        <el-form-item label="结算单位" class="grid-content" prop="params.clearing_unit">
          <el-input size="mini" v-model="detailInfo.params.clearing_unit" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="开票价" class="grid-content" prop="params.invoice_price">
          <el-input size="mini" v-model="detailInfo.params.invoice_price" 
          :disabled="invoiceDisabled"
          v-on-enter="'correspond_order_no'"
          ref="invoice_price"
          @blur="getSelfCost"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="销售价" class="grid-content" prop="params.sale_price">
          <el-input size="mini" v-model="detailInfo.params.sale_price" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="付款方式" class="grid-content" prop="params.payment_method">
          <el-select size="mini" v-model="detailInfo.params.payment_method" placeholder="" ref="payment_method" 
          @change="paymentChange">
            <el-option
              v-for="(option, index) in paymentMethods"
              :key="index"
              :label="option"
              :value="option"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="是否预付" class="grid-content" prop="params.pre_arrive_pay">
          <el-select size="mini" v-model="detailInfo.params.pre_arrive_pay" placeholder="" ref='pre_arrive_pay' 
          @change='prepayChange'>
            <el-option label="预付" :value="0"></el-option>
            <el-option label="网络公司到付" :value="1"></el-option>
            <el-option label="收货人到付" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="发货去向" class="grid-content" prop="params.ship_whereabouts">
          <el-select size="mini" v-model="detailInfo.params.ship_whereabouts" placeholder="" ref='ship_whereabouts' 
          @focus="consignmentWhere"
          @change='whereaboutsChange'>
            <el-option
              v-for="(option, index) in selectValues"
              :key="index"
              :label="option"
              :value="option === '全部' ? undefined : option">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="对应单号" class="grid-content" prop="params.correspond_order_no">
          <el-input size="mini" v-model="detailInfo.params.correspond_order_no" placeholder="" class="operate" 
          @keyup.enter.native="toBind" 
          @blur="correspondBlur" ref="correspond_order_no"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="签收状态" class="grid-content" prop="params.sign_state">
          <el-select size="mini" v-model="detailInfo.params.sign_state" placeholder=""
          ref="sign_state" 
          @change="stateChange">
            <el-option label="未签收" :value="0"></el-option>
            <el-option label="已签收" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2" v-show="this.type === 'sub'">
        <el-form-item label="签收件数" class="grid-content" prop="params.sign_quantity">
          <el-input size="mini" v-on-enter="'joint_cargo_pieces'" v-model="detailInfo.params.sign_quantity" placeholder="" ref='sign_quantity'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" v-show="this.type === 'sub'">
        <el-form-item label="打印次数" class="grid-content" prop="params.print_num">
          <el-input size="mini" v-model="detailInfo.params.print_num" placeholder="" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" v-show="this.type === 'sub'">
        <el-form-item label="已拼货件数" class="grid-content" prop="params.joint_cargo_pieces">
          <el-input size="mini" v-on-enter="'service_record'" v-model="detailInfo.params.joint_cargo_pieces" placeholder="" ref="joint_cargo_pieces"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="开票时间" class="grid-content" prop="params.billing_time">
          <el-input size="mini" v-model="detailInfo.params.billing_time" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="开票人" class="grid-content" prop="params.issuer">
          <el-input size="mini" v-model="detailInfo.params.issuer" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="开票地点" class="grid-content" prop="params.billing_location">
          <el-input size="mini" v-model="detailInfo.params.billing_location" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="修改时间" class="grid-content must_color" prop="params.update_time">
          <el-input size="mini" v-model="detailInfo.params.update_time" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="修改人" class="grid-content must_color" prop="params.update_person">
          <el-input size="mini" v-model="detailInfo.params.update_person" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="客服记录" class="grid-content" prop="params.service_record">
          <el-input type="textarea" 
          :rows="2" size="mini" 
          v-model="detailInfo.params.service_record" placeholder="" class="operate" 
          ref="service_record"
          @focus="toCustom"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="btn_wrap">
    <el-row type="flex" justify="center">
      <print-order v-if="edit" :change="detailInfo.params.is_joint_change"/>
      <print-label v-if="edit && type === 'main'" :change="detailInfo.params.is_joint_change" :info="detailInfo.params"/>
      <sub-label v-if="edit && type === 'sub'" :change="detailInfo.params.is_joint_change" :info="detailInfo.params"/>
      <delivery-print v-if="edit && type === 'sub'"/>
      <el-button v-if="edit" type="primary" icon="el-icon-fa-clipboard" size="small" @click="jointOrder">拼单</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="valid" ref="save">保存</el-button>
      <el-button type="primary" v-if="!edit" icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
      <el-button type="primary" icon="el-icon-time" size="small" @click="history">历史记录</el-button>
      <el-button type="primary" v-if="edit" icon="el-icon-refresh" size="small" @click="changeTicket">作废并换单</el-button>                   
    </el-row>
  </div>
  <History :gridData="gridData" :title="title" :type="type" @close="close" @historyOk="historyOk" :visible="dialogTableVisible"/>
</div>
</template>

<script>
import {
  beforeEditRecive,
  searchJointCompany,
  searchPrice,
  searchCost,
  searchClearUnit,
  searchBindList,
  searchSpecialSet,
  searchStoreInfo,
  searchSummary,
  isOrderUsed,
  consignmentReceive, //发货去向
  getReciveList, // 历史记录
  cancelOrders, //换单
  getFlightNum, // 航班四字码
  getNoByFlightInfo,
  priceRate,
  searchPaymentMethod,
  bindFilterItem,
  // 新增始发站
  searchAirport,
} from "@/service"

import {
  getCity,
  getSenderReceiver,
  getAirport,
  getProduct,
  getProductCategory,
  getPackage,
  getCarrierCategory,
} from "@/linkQuery"

import { getTime, getDate, formatIptDate, formatIptTime } from "@/utils/time"
import { mapState } from "vuex"

import rules from "@/mode/rulesData"
import { isRequired, priceRequired, regPhone, regSpecial } from "@/mode/ruleMethods"

import mixin from "@/mixin/receiveMailMixin.js"
import filterMixin from "@/mixin/filterMethod.js"

import PrintOrder from "./mainPrint.vue"
import PrintLabel from "./labelPrint"
import SubLabel from "./subLabelPrint"
import SubPrint from "./subPrint.vue"
import DeliveryPrint from "./deliveryPrint"

// 历史记录
import History from "./history.vue"

export default {
  mixins: [mixin, filterMixin],

  data() {
    return {
      type: "main",
      order_no: "",
      title: "",
      edit: false,
      editIn: false,
      selectValues: [], //发货去向
      // 历史记录
      dialogTableVisible: false,
      currentRow: null,
      gridData: [
        {
          departure: "",
          sender: "",
          receiver: "",
          joint_network_company: "",
          product: "",
          product_category: "",
          packaging: "",
        },
      ],
      detailInfo: {
        params: {
          order_three_code: this.orderThreeCode(), // 单号三字码
          order_num: "", // 单号八位数字
          departure: this.$getStore("city") || "", // 始发站
          destination: "", // 目的站
          sender: "", // 发货人
          receiver: "", //  收货
          sender_name: "",
          sender_telephone: "", // 发货人电话
          sender_address: "", // 发货人地址
          receiver_name: "",
          receiver_telephone: "",
          receiver_address: "",
          delivery_mode: 1, // 提货方式
          is_domestic: 0, // 国内国际 0国内 1国际
          easy_flag: 0, // 制单类型
          carrier_storage_remark: "", // 承运人储运备注
          other_storage_remark: "", //其他储运备注
          billing_remark: "", // 结算备注
          starting_point_operation: this.$getStore("unit"), // 出发操作点
          first_transfer_process: "", // 第一程
          air_transit: 0, // 空运中转
          second_transfer_process: "", // 第二程
          expected_flight_time: getDate(), // 预计航班日期
          expected_flight_no: "", // 预计航班号
          insurance_value: 0, // 保险价值
          declared_value: 0, // 申明价值
          product: "", // 品名
          product_category: "", // 货物类别
          packaging: "", // 包装
          your_category: "", // 自分类别
          departure_priority: 0, // 出发优先级
          product_code: "", // 商品代码
          quantity: "", // 件数
          net_weight: "", // 实重
          volume: "", // 体积
          weight: "", // 计重
          price_species: "", // 价种
          clearing_unit: "", // 结算单位
          invoice_price: "", // 开票价
          correspond_order_no: "", // 对应单号
          payment_method: "现金", // 付款方式
          billing_time: "", // 开票时间
          issuer: "", // 开票人
          billing_location: this.$getStore("operateDepart"), // 开票地点
          update_time: "", // 修改时间
          update_person: "", // 修改人
          service_record: "", // 客服记录
          association_point: this.$getStore("city") || "", // 关联点
          transport_mode: 0, // 运输方式
          delivery_payee: 0, // 派送费付费方
          joint_network_company: "", // 拼货网络公司
          is_put: 1, // 是否放货
          ship_whereabouts: "BGS/本公司", // 发货去向
          signer_telephone: "", // 提货电话
          sale_price: "", // 销售价
          clear_price: "", // 结算价
          billing_cost: "",
          clear_cost: "",
          should_receive_cost: "",
          pay_total_cost: "",
          receive_total_cost: "",
          price_code: "",
          pre_arrive_pay: 0, // 是否预付
          sign_state: 0, // 签收状态
          sign_quantity: "0", // 签收件数
          print_num: "0", // 分单打印次数
          joint_cargo_pieces: "0", // 已拼货件数
          special_setting_id: "",
          volumeList: [],
          custServiceList: [],
          costItemList: [],
          allBindList: [],
          in_store_no: "",
          currentUnit: this.$getStore("unit"),
          absolute_cost: "",
        },
        priceItem: {},
      },
      rules: {
        ...rules,
        "params.sender": [{ required: true, message: "请选择发货人", trigger: "change" }],
        "params.receiver": [{ required: true, message: "请选择收货人", trigger: "change" }],
        "params.destination": [{ required: true, message: "请选择目的站", trigger: "change" }],
        "params.first_transfer_process": [{ required: true, message: "请选择第一程", trigger: "change" }],
        "params.product": [{ required: true, message: "请选择品名", trigger: "change" }],
        "params.product_category": [{ required: true, message: "请选择货物类别", trigger: "change" }],
        "params.packaging": [{ required: true, message: "请选择包装", trigger: "change" }],
        "params.volume": [{ required: true, validator: isRequired }],
        "priceItem": [{ required: true, validator: priceRequired }],
        "params.receiver_address": [{ validator: regSpecial }],
        "params.sender_address": [{ validator: regSpecial }],
      },
      departures: [],
      destinations: [],
      associationPoints: [],
      allCitys: [],
      senders: [],
      allSenders: [],
      receivers: [],
      allReceivers: [],
      receiverList: [],
      receiverNames: [],
      firstAirports: [],
      secondAirports: [],
      allAirports: [],
      products: [],
      allProducts: [],
      productCategorys: [],
      allProductCategorys: [],
      packages: [],
      allPackages: [],
      carrierCategorys: [],
      jointCompanys: [],
      allJointCompanys: [],
      prices: [],
      allPrices: [],
      paymentMethods: [],
      orders: [],
      priceId: "",
      routeItem: {
        name: this.type === "main" ? "收货主单管理" : "收货分单管理",
        route: this.type === "main" ? "/receive/main" : "/receive/sub",
        title: this.type === "main" ? "收货主单-查询" : "收货分单-查询",
      },
      loading: false,
      price: true,
      invoice_price: "",
      invoiceDisabled: true,
      jointCompanyDisabled: true,
      mutationType: {
        main: "CHANGE_RECEIVEMAIN",
        sub: "CHANGE_RECEIVESUB",
      },
      bindList: [], // 可拼单列表
      bindedList: [], // 已拼单列表
      inputBinded: [], // 输入的对应单号对应的已拼列表
      canNotBindOrder: "", // 不可拼单号
      hadReceiver: false,
      billing_cost: "",
      absoluteCash: "",
      priceItem: {},
      changePage: 0,
      isCancelTransit: false,
    }
  },

  components: {
    PrintOrder,
    SubPrint,
    PrintLabel,
    SubLabel,
    History,
    DeliveryPrint,
  },

  computed: {
    ...mapState([
      "bindOrder",
      "volumeList",
      "customList",
      "costList",
      "flightNo",
      "flightDate",
      "sumVolume",
      "sumWeight",
      "receiveMain",
      "receiveSub",
      "orderType",
      "bindedPiece",
      "allBindList",
      "costAbout",
      "orderNo",
      "checkAllcash",
      "bindFilterItems",
    ]),
  },

  watch: {
    "$route.params.type"() {
      if (this.type === "main") {
        this.type = this.$route.params.type
      }

      if (this.type === "sub") {
        this.type = this.$route.params.type
        this.detailInfo.params.order_three_code = this.orderThreeCode()
      }

      if (!this.$route.params.id) {
        this.hadReceiver = false
      }
      this.getPayMethod()
      this.title = this.type === "sub" ? "收货分单" : "收货主单"
    },
    "$route.params.id"() {
      this.beforeEdit()
    },
    "$route.query"(val) {
      switch (true) {
        case val.from === "volume":
          this.detailInfo.params.volume = this.sumVolume
          this.detailInfo.params.weight = Math.max(this.sumWeight, this.detailInfo.params.net_weight)
          this.$refs["priceItem"].focus()
          break
        case val.from === "bind" && this.orderType === 0:
          this.$refs["correspond_order_no"].focus()
          break
        case val.from === "bind" && this.orderType === 1:
          this.$refs["sign_state"].focus()
          break
        case val.from === "flight":
          this.getTransferProcess()
          setTimeout(() => {
            this.$refs["insurance_value"].focus()
          }, 300)
          break
        case val.from === "cost":
          this.$refs["correspond_order_no"].focus()
          break
        default:
          break
      }
    },
    bindOrder() {
      // 已拼单号
      this.detailInfo.params.correspond_order_no = this.bindOrder
    },
    bindedPiece() {
      // 已拼件数
      this.detailInfo.params.joint_cargo_pieces = this.bindedPiece
    },
    checkAllcash(abCost) {
      this.detailInfo.params.absolute_cost = abCost
    },
  },

  async mounted() {
    this.type = this.$route.params.type
    this.title = this.type === "sub" ? "收货分单" : "收货主单"
    if (this.type === "sub") {
      this.detailInfo.params.order_three_code = this.orderThreeCode()
    }
    this.getPayMethod()
    
    this.detailInfo.params.billing_location = this.$getStore("operateDepart")
    this.$store.commit("DEPARTURE", this.detailInfo.params.departure)
    this.edit
      ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
      : (this.detailInfo.params.issuer = this.$getStore("real_name"))
    this.getBindFilterItem().then(res => {
      this.beforeEdit()
    })

    document.addEventListener("keydown", this.keyBoardSave)
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.keyBoardSave)
  },

  beforeRouteEnter(to, from, next) {
    // 添加进入时判断是否有存储项,有则填充
    next(vm => {
      if (to.params.type === "main" && !to.params.id && vm.receiveMain) {
        // vm.popList(vm.receiveMain)
        vm.fillPage(vm.receiveMain)
      }
      if (to.params.type === "sub" && !to.params.id && vm.receiveSub) {
        // vm.popList(vm.receiveSub)
        vm.fillPage(vm.receiveSub)
      }
      if (to.params.type === "main" && !vm.receiveMain) {
        vm.reset()
      }
      if (to.params.type === "sub" && !vm.receiveSub) {
        vm.reset()
      }
    })
  },

  beforeRouteLeave(to, from, next) {
    // 判断是否从添加页面离开，是则保存当前页数据
    if (!this.edit) {
      this.getTabInfo()
      this.detailInfo.params.allBindList = JSON.parse(JSON.stringify(this.allBindList))
      this.$store.commit(this.mutationType[this.type], this.detailInfo.params)
    } else {
      this.reset()
    }
    next()
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.type !== from.params.type) {
      // 离开当前单页面
      if (!this.edit) {
        // 从添加页面离开,保存当前单数据
        this.getTabInfo()
        this.detailInfo.params.allBindList = JSON.parse(JSON.stringify(this.allBindList))
        this.$store.commit(this.mutationType[this.type], this.detailInfo.params)
      }

      if (to.params.type === "main") {
        // 进入主单页面,填充主单数据
        if (this.receiveMain) {
          // this.popList(this.receiveMain)
          this.fillPage(this.receiveMain)
        } else {
          this.reset()
          this.detailInfo.params.order_three_code = ""
        }
      }

      if (to.params.type === "sub") {
        // 进入分单页面,填充分单数据
        if (this.receiveSub) {
          // this.popList(this.receiveSub)
          this.fillPage(this.receiveSub)
        } else {
          this.reset()
          this.detailInfo.params.order_three_code = this.orderThreeCode()
        }
      }
    }

    if (to.params.type === from.params.type) {
      // 由当前单编辑页面跳到当前单添加页面时清空数据
      if (this.edit && !to.params.id) {
        this.reset()
      }
    }
    next()
  },

  methods: {
    getBindFilterItem() {
      return bindFilterItem().then(res => {
        if(res.data.status === 200) {
          
          let checkList = res.data.data.filter(item => {
            return item.is_select
          }).map(item => {
            return item.en_name
          })

          this.$store.commit("CHANGE_BINDFILTER", checkList)
          return true
        }else {
          return false
        }
      })
    },
    keyBoardSave(evt) {
      if (evt.keyCode === 83 && evt.ctrlKey) {
        evt.preventDefault()
        this.valid()
      }
    },
    iptOrderNo(no) {
      if (no.length === 3) {
        this.getClearUnit(no)
      }

      if (no.length > 3) {
        this.$notify({
          title: "警告",
          message: "不可超过3位",
          type: "warning",
        })
        this.detailInfo.params.order_three_code = ""
      }
    },
    iptOrderNum(num) {
      if (num.length > 8) {
        this.$notify({
          title: "警告",
          message: "不可超过8位",
          type: "warning",
        })
        this.detailInfo.params.order_num = ""
      }
    },
    fillStoreInfo(d) {
      let o = this.detailInfo.params
      o.departure = d.departure
      o.destination = d.destination
      o.sender = d.sender
      o.sender_name = d.sender_name
      o.receiver = d.receiver
      o.receiver_name = d.receiver_name
      o.product = d.product
      o.product_category = d.product_category
      o.volume = d.volume
      o.quantity = d.quantity
      o.net_weight = d.net_weight

      this.$store.commit("GET_WEIGHT", d.net_weight)
      this.$store.commit("GET_PIECE", d.quantity)
      this.$store.commit("GET_SENDER", d.sender)
    },
    consignmentWhere() {
      //发货去向
      if (this.detailInfo.params.destination) {
        consignmentReceive({ destination: this.detailInfo.params.destination }).then(res => {
          if (res.data.status === 200) {
            this.selectValues = res.data.data
          }
          this.formatSearchData()
        })
      }
    },
    formatSearchData() {
      if (this.selectValues) {
        this.selectValues.unshift("BGS/本公司")
        return this.selectValues
      } else {
        return this.selectValues
      }
    },
    getStoreInfo(no) {
      searchStoreInfo({ in_store_no: no }).then(res => {
        if (res.data.status === 200) {
          this.fillStoreInfo(res.data.data[0])
        }
      })
    },
    orderThreeCode() {
      if (this.$route.params.type === "sub") {
        if (this.$getStore("city")) {
          return this.$getStore("city").slice(0, 3) || "SJW"
        } else {
          return "SJW"
        }
      } else {
        return ""
      }
    },
    resetCost() {
      // 重置费用相关
      this.price = true
      this.$store.commit("GET_COSTLIST", [])
      this.$store.commit("GET_CLEARUNIT", [])
    },
    resetBind() {
      // 重置拼单相关
      this.$store.commit("GET_BINDLIST", [])
      this.$store.commit("GET_BINDEDLIST", [])
      this.$store.commit("GET_ALLBINDLIST", [])
      this.bindList = []
      this.bindedList = []
      this.inputBinded = []
      this.canNotBindOrder = ""
    },
    reset() {
      this.$refs["ruleForm"].resetFields()
      this.detailInfo.priceItem = {}
      this.getOrderNo()
      this.resetCost()
      this.resetBind()
      this.$store.commit("GET_PIECE", "")
      this.$store.commit("GET_VOLUMELIST", [])
      this.$store.commit("GET_CUSTOMLIST", [])
      this.isCancelTransit = false
      this.detailInfo.params.billing_location = this.$getStore("operateDepart")
      this.edit
        ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
        : (this.detailInfo.params.issuer = this.$getStore("real_name"))
    },
    fillPage(d) {
      // 填充页面
      this.reset()
      this.detailInfo.params = d
      this.getOrderNo()
      this.formatNull()
      this.detailInfo.priceItem.price_species = d.price_species
      this.prices.push({
        value: { price_species: d.price_species },
        label: d.price_species,
        name: d.price_species,
      })

      this.bindedList = d.ccaMainSingleList || []
      this.$store.commit("GET_VOLUMELIST", d.volumeList || [])
      this.$store.commit("GET_CUSTOMLIST", d.custServiceList || [])
      this.$store.commit("GET_BINDEDLIST", d.ccaMainSingleList || [])
      this.$store.commit("GET_CLEARUNIT", d.clearing_unit)
      this.$store.commit("GET_WEIGHT", d.net_weight)
      this.$store.commit("GET_PIECE", d.quantity)
      this.$store.commit("GET_SENDER", d.sender)
      this.$store.commit("GET_COSTLIST", d.costItemList || [])

      this.$store.commit("DEPARTURE", d.departure)
      this.$store.commit("DESTINATION", d.destination)
      this.$store.commit("GET_ISTRANSIT", d.is_air_transit_cargo)

      searchSummary({ costItem: d.costItemList, order_no: this.order_no }).then(res => {
        if (res.data.status === 200) {
          let d = res.data.data[0]
          this.$store.commit("GET_COSTSUMLIST", d.clearUnitCountList)
          this.$store.commit("CHANGE_COSTABOUT", {
            billing_cost: d.billing_cost,
            clear_cost: d.clear_cost,
            should_receive_cost: d.should_receive_cost,
            pay_total_cost: d.pay_total_cost,
            receive_total_cost: d.receive_total_cost,
            should_receive_sender: d.should_receive_sender,
            should_receive_receiver: d.should_receive_receiver,
            should_pay_transiter: d.should_pay_transiter,
          })
        }
      })

      if (d.allBindList) {
        this.$store.commit("GET_ALLBINDLIST", d.allBindList || [])
      }

      this.detailInfo.params.billing_location = this.$getStore("operateDepart")
    },
    contentChange() {
      // 当前页面对应单发生变化时，提示修改
      if (this.detailInfo.params.is_joint_change) {
        this.$notify({
          title: "警告",
          message: "对应单号件数发生变化,请更改当前件数,重量及价种",
          type: "warning",
        })
      }
      let nowType = this.type === "main" ? '主单' : '分单'
      let otherType = this.type === "main" ? '分单' : '主单'

      setTimeout(() => {
        if (this.detailInfo.params.state === -1) {
          this.$notify({
            title: "警告",
            message: `该${nowType}关联的${otherType}信息已修改，请及时修改该${nowType}`,
            type: "warning",
          })
        }
      }, 200)
    },
    beforeEdit() {
      
      // 编辑前查询
      this.reset()
      this.order_no = this.$route.params.id
      this.$store.commit("GET_ORDERNO", this.order_no)
      if (this.$route.params.id) {
        this.editIn = true
        this.edit = true
        this.hadReceiver = true

        beforeEditRecive({
          order_no: this.order_no,
          type: this.orderType,
        }).then(res => {
          let resData = res.data
          if (resData.status === 200) {
            this.fillPage(resData.data[0])
            this.getBindList()
            this.contentChange()
            console.log(this.detailInfo.params.is_air_transit_cargo)
      if(this.detailInfo.params.is_air_transit_cargo === 1){
        this.$store.commit("CHANGE_TOPTITLE", this.title + "-通单中转")
      }else if(this.detailInfo.params.is_air_transit_cargo === 2){
        this.$store.commit("CHANGE_TOPTITLE", this.title + "-换单中转")
      }
          }
        })

      }
    },
    getClearUnit() {
      // 获取结算单位
      this.mainPriceChange()
      searchClearUnit({
        carrier: this.detailInfo.params.order_three_code,
      }).then(res => {
        if (res.data.status === 200) {
          if (res.data.data[0]) {
            this.detailInfo.params.clearing_unit = res.data.data[0].name
            this.$store.commit("GET_CLEARUNIT", this.detailInfo.params.clearing_unit)
            this.$refs["order_num"].focus()
          } else {
            this.$notify({
              title: "警告",
              message: "三字码不存在",
              type: "warning",
            })
          }
        }
      })
    },
    bindParams(data) {
      let params = {
        type: this.type === "main" ? 0 : 1,
        order_no: this.order_no,
        departure: data.departure,
        destination: data.destination,
      }

      this.bindFilterItems && this.bindFilterItems.forEach(item => {
        params = {...params, [item]: data[item]}
      })

      return params
    },
    getBindList() {
      // 获取可拼单件数
      let data = this.detailInfo.params

      // let params = {
      //   type: this.type === "main" ? 0 : 1,
      //   order_no: this.order_no,
      //   billing_location: data.billing_location,
      //   departure: data.departure,
      //   destination: data.destination,
      //   product: data.product,
      //   product_category: data.product_category,
      //   expected_flight_no: data.expected_flight_no,
      // }

      return searchBindList(this.bindParams(data)).then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.bindList = resData.data
          this.$store.commit("GET_BINDLIST", resData.data || [])
          this.getAllBindList()
        }
      })
    },
    getAllBindList() {
      // 获取所有拼单数据
      let list = this.bindedList
        .map(item => {
          return {
            ...item,
            bind_status: 1,
          }
        })
        .concat(
          this.bindList.map(item => {
            return {
              ...item,
              bind_status: 0,
            }
          }),
        )
      this.$store.commit("GET_ALLBINDLIST", list || [])
      this.getNotBindOrder()
      if (this.canNotBindOrder) {
        return
      }
      this.bindInputBinded()
    },
    jointOrder() {
      this.iptBindedList()
      if (this.inputBinded[0].order_no) {
        this.$router.push(
          `/receive/${this.type === "main" ? "sub" : "main"}/billing/detail/${this.inputBinded[0].order_no}`,
        )
        this.$store.commit("ADD_FOOTNAV", this.routeItem)
      } else {
        this.$notify({
          title: "警告",
          message: "请输入对应单号",
          type: "warning",
        })
      }
    },
    saveSuccessHandle() {
      // 保存成功
      this.$confirm("是否继续开下一单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$router.push(`/receive/${this.type}/billing/detail`)
          this.reset()
        })
        .catch(() => {
          this.reset()
          this.$router.push(`/receive/${this.type === "main" ? "sub" : "main"}`)
          this.$store.commit("ADD_FOOTNAV", this.routeItem)
        })
    },
    iptBindedList() {
      // 获取输入的对应单号列表
      let iptOrder = this.detailInfo.params.correspond_order_no
      let orderArr = iptOrder.split("/")
      let regx = /\(([^)]*)\)/ // 匹配括号内的数字
      let q = this.detailInfo.params.quantity
      this.inputBinded = orderArr.map(item => {
        let res = regx.exec(item)
        if (res) {
          q = res[1]
        }
        return {
          order_no: item.split("(")[0],
          quantity: q * 1,
          bind_status: 1,
        }
      })
    },
    getNotBindOrder() {
      // 获取输入的对应单号内的不可拼单号列表
      this.iptBindedList()
      let list = this.inputBinded
        .filter(iptItem => {
          return !this.allBindList.some(item => item.order_no === iptItem.order_no)
        })
        .map(item => item.order_no)

      this.canNotBindOrder = list.join()
    },
    bindInputBinded() {
      // 将输入的对应单号与拼单明细相关联
      let list = this.allBindList.map(item => {
        let iptItem = this.inputBinded.filter(iptItem => {
          return iptItem.order_no === item.order_no
        })[0]

        if (iptItem) {
          return { ...item, ...iptItem }
        } else {
          return { ...item, bind_status: 0 }
        }
      })
      this.$store.commit("GET_ALLBINDLIST", list || [])
    },
    toBind() {
      if (!this.detailInfo.params.departure || !this.detailInfo.params.destination || !this.order_no) {
        this.$notify({
          title: "警告",
          message: "条件未输入完整，无法进行拼单操作",
          type: "warning",
        })
        return
      }

      this.getBindList().then(() => {
        // if (this.canNotBindOrder) {
        //   this.$notify({
        //     title: "警告",
        //     message: this.canNotBindOrder + "不可拼",
        //     type: "warning",
        //   })
        //   return
        // }
        if (this.detailInfo.params.correspond_order_no === "") {
          this.$router.push({ params: { item: "bind" } })
        } else {
          this.$refs["save"].$el.focus()
        }
      })
    },
    notBindDone() {
      // 判断当前单是否未拼完
      if (this.inputBinded) {
        let sumQuantity = this.inputBinded.reduce(
          (item1, item2) => {
            return {
              quantity: item1.quantity + item2.quantity,
            }
          },
          { quantity: 0 },
        ).quantity
        if (sumQuantity < this.detailInfo.params.quantity) {
          this.$notify({
            title: "警告",
            message: "当前单未拼完",
            type: "warning",
          })
        }
      }
    },
    correspondBlur() {
      // 对应单号失去焦点时判断输入单号情况
      if (!this.detailInfo.params.departure || !this.detailInfo.params.destination || !this.order_no) {
        return
      }

      this.getBindList().then(() => {
        if (this.canNotBindOrder) {
          // this.$notify({
          //   title: "警告",
          //   message: this.canNotBindOrder + "不可拼",
          //   type: "warning",
          // })
        } else {
          this.notBindDone()
        }
      })

      //wym-对应单号下是否有费用
      if (this.detailInfo.params.correspond_order_no) {
        this.getSelfsingle()
      }
    },
    getSenderInfo(query) {
      this.subPriceChange()
      getSenderReceiver(this, query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o && o.code === query) {
            this.detailInfo.params.sender = o.code
            this.detailInfo.params.sender_name = o.name
            this.detailInfo.params.sender_telephone = o.telephone
            this.detailInfo.params.sender_address = o.address

            if (this.type === "sub") {
              this.detailInfo.params.payment_method = o.start_payment_method || "现金"
            }

            this.renderReceiverName()
            this.$store.commit("GET_SENDER", o.code)
          } else {
            this.detailInfo.params.sender = query
            this.$store.commit("GET_SENDER", query)
            this.detailInfo.params.sender_name = query
            this.detailInfo.params.sender_telephone = ""
            this.detailInfo.params.sender_address = ""
            this.detailInfo.params.payment_method = "现金"

            this.detailInfo.params.receiver = ""
            this.detailInfo.params.receiver_name = ""
            this.detailInfo.params.receiver_telephone = ""
            this.detailInfo.params.receiver_address = ""
            this.$refs["sender_telephone"].focus()
          }
        }
      })
    },
    getReceiverInfo(query) {
      let item = this.filterReceiver(query)

      if (item) {
        this.detailInfo.params.receiver = item.receiver_name
        this.detailInfo.params.receiver_name = item.receiver_name
        this.detailInfo.params.receiver_telephone = item.receiver_telephone
        this.detailInfo.params.receiver_address = item.receiver_address
        this.detailInfo.params.other_storage_remark = item.storage_remark
        setTimeout(() => {
          this.$refs["other_storage_remark"].focus()
          // this.type === "main" ? this.$refs["expected_flight_time"].focus() : this.$refs["delivery_mode"].focus()
        }, 500)
      } else {
        this.detailInfo.params.receiver_name = ""
        this.detailInfo.params.receiver_telephone = ""
        this.detailInfo.params.receiver_address = ""
        this.detailInfo.params.other_storage_remark = ""
        setTimeout(() => {
          this.$refs["receiver_telephone"].focus()
        }, 500)
      }
    },
    renderProduct(query) {
      if (this.allProducts.length > 0) {
        return
      }

      getProduct(this, "").then(res => {
        this.products = res.map(item => {
          return { value: item.name, label: item.name }
        })

        this.allProducts = res.map(item => {
          return { value: item.name, label: item.name }
        })
      })
    },
    fillProductAbout(query) {
      this.priceChange()
      getProduct(this, query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o && query === o.name) {
            this.detailInfo.params.product_category = o.start_product_category
            this.detailInfo.params.packaging = o.pkg
            this.fillProductCategoryAbout(o.start_product_category)
            setTimeout(() => {
              this.$refs["packaging"].focus()
            }, 300)
          } else {
            this.detailInfo.params.product_category = ""
            this.detailInfo.params.packaging = ""
            setTimeout(() => {
              this.$refs["product_category"].focus()
            }, 300)
          }
        }
      })
    },
    renderProductCategory(query) {
      if (this.allProductCategorys.length > 0) {
        return
      }

      getProductCategory(this, "", 1).then(res => {
        this.productCategorys = res.map(item => {
          return { value: item.name, label: item.name }
        })

        this.allProductCategorys = res.map(item => {
          return { value: item.name, label: item.name }
        })
      })
    },
    fillProductCategoryAbout(query) {
      this.priceChange()
      getProductCategory(this, query, 1).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o) {
            this.detailInfo.params.departure_priority = o.departure_priority * 1 || 0
          }
        }
      })
    },
    productCategoryChange(query) {
      this.fillProductCategoryAbout(query)
      this.$refs["packaging"].focus()
    },
    renderCarrierCategory(query) {
      getCarrierCategory(this, "", 1).then(res => {
        if (res.status === 200) {
          this.carrierCategorys =
            res.data.length &&
            res.data.map(item => {
              return { value: item.name, label: item.name }
            })
        } else {
          this.loading = false
        }
      })
    },
    fillCarrierCategory(query) {
      this.mainPriceChange()
      getCarrierCategory(this, query, 1).then(res => {
        if (Array.isArray(res.data)) {
          let o = res.data[0]
          if (o) {
            this.detailInfo.params.departure_priority = o.departure_priority
          }
        }
      })
    },
    getJointCompany(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchJointCompany({
        code: query,
        association_city: this.detailInfo.params.destination,
        start_arrive: "",
        is_domestic: 0,
      }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data.map(item => {
            return { value: item.name, label: item.name }
          })
        }
      })
    },
    renderJointCpmpany(query) {
      if (this.allJointCompanys.length > 1) {
        return
      }

      this.getJointCompany("").then(res => {
        this.allJointCompanys = res
        this.jointCompanys = res
      })
    },
    priceParams() {
      let o = this.detailInfo.params
      return {
        type: this.type === "main" ? 0 : 1,
        destination: o.destination,
        weight: o.weight,
        product: o.product,
        product_category: o.product_category,
      }
    },
    mainPriceParams() {
      let o = this.detailInfo.params
      return {
        ...this.priceParams(),
        order_three_code: o.order_three_code,
        air_transit: o.air_transit,
        first_transfer: o.first_transfer_process,
        flight_no: o.expected_flight_no,
        your_category: o.your_category,
      }
    },
    subPriceParams() {
      let o = this.detailInfo.params
      return {
        ...this.priceParams(),
        transport_method: o.transport_mode,
        sender: o.sender,
        association_point: o.association_point,
        billing_location: o.billing_location,
      }
    },
    priceChange() {
      if (!this.price || this.edit) {
        this.detailInfo.priceItem = {}
        this.detailInfo.params.price_species = ""
        this.$message({ message: "价种关联数据发生变化,已重新查询", type: "warning" })
        this.price = true
        this.getPrice()
      }
    },
    mainPriceChange() {
      if (this.type === "main") {
        this.priceChange()
      }
    },
    subPriceChange() {
      if (this.type === "sub") {
        this.priceChange()
      }
    },
    getPrice() {
      if (!this.prices.length || (this.prices.length && this.prices[0] && !this.prices[0].label)) {
        this.price = true
      }

      setTimeout(() => {
        let params = this.type === "main" ? this.mainPriceParams() : this.subPriceParams()
        if (this.price) {
          searchPrice(params).then(res => {
            if (res.data.status === 200) {
              this.price = false
              this.prices = res.data.data.map(item => {
                return { value: item, label: item.selectStr, name: item.price_species }
              })
            }
          })
        }
      }, 100)
    },
    fillPriceAbout(item) {
      this.detailInfo.params.invoice_price = item.invoice_price
      this.priceId = item.id
      this.invoice_price = item.invoice_price
      this.detailInfo.params.price_species = item.price_species
      this.detailInfo.params.sale_price = item.sale_price
      this.detailInfo.params.clear_price = item.clear_price
      this.detailInfo.params.price_code = item.price_code
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
    mainCostParams() {
      let o = this.detailInfo.params
      return {
        ...this.costParams(),
        start_arrive: 0,
        easy_flag: o.easy_flag,
        flight_no: o.expected_flight_no,
        clearing_unit: o.clearing_unit,
        air_transit: o.air_transit,
        first_transfer_process: o.first_transfer_process,
      }
    },
    subCostParams() {
      let o = this.detailInfo.params
      return {
        ...this.costParams(),
        start_arrive: 0,
        transport_method: o.transport_mode,
        association_point: o.association_point,
        product: o.product,
        billing_location: o.billing_location,
        pick_up_pay: "",
      }
    },
    getCostItem(item) {
      this.priceItem = item
      this.getCost(item)
    },
    getCost(item) {
      this.fillPriceAbout(item)
      let params = this.type === "main" ? this.mainCostParams() : this.subCostParams()
      if (this.type === "main") {
        this.getSpecialSet()
      }

      if (params.price_species === "自定义价种") {
        this.invoiceDisabled = false
        setTimeout(() => {
          this.$refs["invoice_price"].focus()
        }, 100)

        return
      } else {
        this.invoiceDisabled = true
      }

      // 重新选择价种后再次对比运价
        if (this.detailInfo.params.correspond_order_no != "") {
          this.getSelfsingle()
        }
        setTimeout(() => {
          this.$refs["correspond_order_no"].focus()
        }, 100)

      searchCost(params).then(res => {
        if (res.data.status === 200) {
          let d = res.data.data[0]
          this.billing_cost = d.costItem.filter(item => item.cost_name === "开票运费")[0].absolute_cost

          this.$store.commit("GET_COSTLIST", d.costItem || [])
          this.$store.commit("GET_COSTSUMLIST", d.clearUnitCountList || [])

          this.detailInfo.params.billing_cost = d.billing_cost
          this.detailInfo.params.clear_cost = d.clear_cost
          this.detailInfo.params.should_receive_cost = d.should_receive_cost
          this.detailInfo.params.pay_total_cost = d.pay_total_cost
          this.detailInfo.params.receive_total_cost = d.receive_total_cost

          // this.$router.push({ params: { item: "cost" } })
        }
      })
    },
    getSelfCost() {
      // 选择自定义价种，在输完开票价后查询费用列表
      let params = this.type === "main" ? this.mainCostParams() : this.subCostParams()
      searchCost(params).then(res => {
        if (res.data.status === 200) {
          let d = res.data.data[0]
          this.$store.commit("GET_COSTLIST", d.costItem || [])
          this.$store.commit("GET_COSTSUMLIST", d.clearUnitCountList || [])
          // this.$router.push({ params: { item: "cost" } })
        }
      })
    },
    getSelfsingle() {
      //主单时对比开票价
      if (this.detailInfo.params.correspond_order_no.indexOf("()") != -1) {
      } else {
        this.absoluteCash = this.detailInfo.params.correspond_order_no + "(" + this.detailInfo.params.quantity + ")"
      }
      if (this.type === "main") {
        //处理对应单号
        if (this.detailInfo.params.invoice_price) {
          priceRate({ correspond_order_no: this.absoluteCash, mainCost: this.detailInfo.params.absolute_cost }).then(res => {
            if (res.data.status === 200) {
              this.$notify({
                title: "成功",
                message: res.data.message,
                type: "success",
              })
            }
          })
        } 
        // else {
        //   this.$notify({
        //     title: "警告",
        //     message: "请选择开票价",
        //     type: "warning",
        //   })
        // }
      } else if (this.type === "sub") {
        //分单时对比销售价
        if (this.detailInfo.params.sale_price) {
          priceRate({ correspond_order_no: this.absoluteCash, singleCost: this.detailInfo.params.absolute_cost }).then(res => {
            if (res.data.status === 200) {
              this.$notify({
                title: "成功",
                message: res.data.message,
                type: "success",
              })
            }
          })
        } else {
          this.$notify({
            title: "警告",
            message: "请选择销售价",
            type: "warning",
          })
        }
      }
    },
    specialSetParams() {
      let d = this.detailInfo.params
      return {
        type: this.orderType,
        sender: d.sender,
        is_domestic: d.is_domestic,
        destination: d.destination,
        clearing_unit: d.clearing_unit,
        flight_no: d.expected_flight_no,
        price_species: d.price_species,
        product: d.product,
        air_transit: d.air_transit,
        first_transfer: d.first_transfer_process,
        product_category: d.product_category,
        billing_cost: this.billing_cost,
      }
    },
    fillSpecialAbout(d) {
      this.detailInfo.params.carrier_storage_remark = d.carrier_storage_remark
      this.detailInfo.params.billing_remark = d.clearing_remark
      this.detailInfo.params.product_code = d.product_code
      if (!this.detailInfo.params.clearing_unit) {
        this.detailInfo.params.clearing_unit = d.clearing_unit
      }
    },
    getSpecialSet() {
      searchSpecialSet(this.specialSetParams()).then(res => {
        if (res.data.data) {
          this.$message({ message: "输入项符合特殊设置", type: "success" })
          this.fillSpecialAbout(res.data.data[0])
          this.detailInfo.params.special_setting_id = res.data.data[0].id
        }
      })
    },
    orderNumChange() {
      // 8位数字
      this.getOrderNo()
      setTimeout(() => {
        this.$refs["destination"].focus()
      }, 100)
    },
    departureChange(val) {
      // 始发站
      this.$store.commit("DEPARTURE", val)
      this.$refs["destination"].focus()
    },
    destinationChange(val) {
      // 目的站
      this.priceChange()
      this.$store.commit("DESTINATION", val)
      if (this.hadReceiver) {
        this.renderReceiverName()
      } else {
        this.$refs["sender"].focus()
      }
    },
    firstChange() {
      //第一程
      this.mainPriceChange()
      this.$refs["insurance_value"].focus()
    },
    productChange(query) {
      //品名
      this.fillProductAbout(query)
      setTimeout(() => {
        // if (this.type === "main") {
        //   this.$refs["product_code"].focus()
        // } else {
        //   this.$refs["product_category"].focus()
        // }
      }, 100)
    },
    categoryChange() {
      //自分类别
      this.fillCarrierCategory()
      this.$refs["departure_priority"].focus()
    },
    priorityChange() {
      //出发优先级
      this.$refs["quantity"].focus()
    },
    paymentChange() {
      //付款方式
      setTimeout(() => {
        this.type === "main" ? this.$refs["correspond_order_no"].focus() : this.$refs["pre_arrive_pay"].focus()
      }, 500)
    },
    transportChange() {
      //运输方式
      this.$refs["association_point"].focus()
    },
    pointChange() {
      //关联点
      this.subPriceChange()
      this.$refs["departure"].focus()
    },
    payeeChange() {
      //派送费付费方
      this.$refs["other_storage_remark"].focus()
    },
    companyChange(query) {
      //拼货网络公司
      searchJointCompany({
        code: query,
        association_city: this.detailInfo.params.destination,
        start_arrive: "",
        is_domestic: 0,
      }).then(res => {
        if (res.data.status === 200) {
          this.detailInfo.params.signer_telephone = res.data.data[0] && res.data.data[0].arrive_telephone
          if (this.detailInfo.params.signer_telephone) {
            this.$refs["is_put"].focus()
          } else {
            this.$refs["signer_telephone"].focus()
          }
        }
      })
    },
    putChange() {
      //是否放货
      this.$refs["expected_flight_time"].focus()
    },
    prepayChange() {
      //是否预付
      this.$refs["ship_whereabouts"].focus()
    },
    whereaboutsChange() {
      //发货去向
      this.$refs["correspond_order_no"].focus()
    },
    stateChange() {
      //签收状态
      this.$refs["sign_num"].focus()
    },
    quantityChange(num) {
      this.detailInfo.params.joint_cargo_pieces = num
      this.$store.commit("GET_PIECE", num)
    },
    deliveryModeChange(val) {
      if (val === 1) {
        this.jointCompanyDisabled = true
        this.detailInfo.params.joint_network_company = ""
      } else {
        this.jointCompanyDisabled = false
      }

      setTimeout(() => {
        this.$refs["other_storage_remark"].focus()
      }, 200)
    },
    packagingChange() {
      setTimeout(() => {
        this.$refs["quantity"].focus()
      }, 200)
    },
    countOrderNum() {
      let regx = /^\d{7}$/
      let n = this.detailInfo.params.order_num
      if (regx.test(n) && this.type === "main") {
        this.detailInfo.params.order_num = n + (~~n % 7 + "")
      }

      if (this.type === "main") {
        this.verOrderNo()
      } else {
        this.getOrderNo()
      }
    },
    verOrderNo() {
      if (this.detailInfo.params.order_num) {
        isOrderUsed({
          orderNo: this.detailInfo.params.order_num,
          orderPrefix: this.detailInfo.params.order_three_code,
          is_air_transit_cargo: this.detailInfo.params.is_air_transit_cargo ? this.detailInfo.params.is_air_transit_cargo : ""
        }).then(res => {
          if (res.data.status === 200) {
            this.getOrderNo()
          } else {
            this.$refs["order_num"].focus()
            this.detailInfo.params.order_num = ""
          }
        })
      }
    },
    // 历史记录
    history() {
      this.dialogTableVisible = true
      getReciveList({
        type: this.type === "main" ? 0 : 1,
        departure: this.detailInfo.params.departure,
        destination: this.detailInfo.params.destination,
        sender: this.detailInfo.params.sender,
        receiver: this.detailInfo.params.receiver,
      })
        .then(res => {
          if (res.status === 200) {
            setTimeout(() => {
              this.loading = false
              this.gridData = res.data.data[0].list.splice(0, 5)
            }, this.loadingTime)
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    close() {
      this.dialogTableVisible = false
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    // 确定
    historyOk(info) {
      let orderNo = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num
      this.$store.commit("GET_ORDERNO", orderNo)
      this.dialogTableVisible = false
      this.detailInfo.params = info
      this.detailInfo.params.order_three_code = orderNo.slice(0, 3)
      this.detailInfo.params.order_num = orderNo.slice(3, 12)
      this.detailInfo.params.correspond_order_no = ""
      this.detailInfo.params.in_store_no = ""
      this.detailInfo.params.issuer = ""
      this.detailInfo.params.billing_location = ""
      this.detailInfo.params.billing_time = ""
      this.detailInfo.params.update_time = ""
      this.detailInfo.params.update_person = ""
      this.detailInfo.params.service_record = ""
      this.detailInfo.params.quantity = ""
      this.detailInfo.params.volume = ""
      this.detailInfo.params.weight = ""
      this.detailInfo.params.net_weight = ""
      this.detailInfo.params.price_species = ""
      this.detailInfo.params.clearing_unit = ""
      this.detailInfo.params.invoice_price = ""
      this.detailInfo.params.sale_price = ""
      this.detailInfo.params.sign_state = ""
      this.detailInfo.params.sign_quantity = ""
      this.detailInfo.params.print_num = ""
      this.detailInfo.params.joint_cargo_pieces = ""
    },
    changeTicket() {
      var order_nos = []
      order_nos.push(this.detailInfo.params.order_no)
      this.$confirm("换单将作废本票运单,确定要换单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      }).then(() => {
        cancelOrders({
          order_nos: order_nos,
          type: this.type === "main" ? 0 : 1,
          currentUnit: this.$getStore("unit"),
          data_unit_id: this.detailInfo.params.data_unit_id,
          unitIds: [this.detailInfo.params.data_unit_id],
        }).then(res => {
          if (res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: "换单成功",
              type: "success",
            })
            this.isCancelTransit = true
            this.changePage = 1
            this.detailInfo.params.order_three_code = ""
            this.detailInfo.params.order_num = ""
            // this.detailInfo.params.order_no = ""
            this.$refs["order_three_code"].focus()
          } else {
            this.changePage = 1
            this.$notify({
              title: "警告",
              message: res.data.message,
              type: "warning",
            })
          }
        })
      })
    },
    flightNoChange() {
      this.mainPriceChange()
      getFlightNum({
        flight_num: this.detailInfo.params.expected_flight_no,
      }).then(res => {
        if (res.data.status === 200) {
          this.detailInfo.params.expected_flight_no = res.data.data[0]
          this.haveFlightNo()
          this.getTransferProcess()
        }
        if (res.data.status === 400) {
          // this.detailInfo.params.expected_flight_no = ''
          setTimeout(() => {
            this.$refs["expected_flight_no"].focus()
          }, 300)
        }
      })
    },
    haveFlightNo() {
      getNoByFlightInfo({
        flight_no: this.detailInfo.params.expected_flight_no,
        flight_date: this.detailInfo.params.expected_flight_time,
        departure: this.detailInfo.params.departure,
        destination: this.detailInfo.params.destination,
        is_air_transit_cargo: this.detailInfo.params.is_air_transit_cargo,
      }).then(res => {
        if (res.data.status === 200 && res.data.data[0]) {
          if (res.data.data[0].is_plan_fly === true) {
            this.$message({
              message: "飞机即将起飞，请您慎重操作",
              type: "warning",
            })
          }
          if (res.data.data[0].is_had_fly === true) {
            this.$message({
              message: "飞机已经起飞，无法操作",
              type: "warning",
            })
          }
        }

        if (res.data.status === 400) {
          this.detailInfo.params.expected_flight_no = ""
          setTimeout(() => {
            this.$refs["expected_flight_no"].focus()
          }, 300)
        }
      })
    },
    beforeChange() {
      // 换单前查询
      beforeEditRecive({
        order_no: this.isChangeNum,
        type: this.orderType,
      }).then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.fillPage(resData.data[0])
          this.getBindList()
          this.contentChange()
          this.detailInfo.params.order_three_code = ""
          this.detailInfo.params.order_num = ""
          this.$refs["order_three_code"].focus()
          // 删除-----------------
          deleteOrders({
            order_nos: [this.isChangeNum],
            type: this.orderType,
          }).then(res => {
            if (res.data.status === 200) {
            } else {
              this.$notify({
                title: "警告",
                message: res.data.message,
                type: "warning",
              })
            }
          })
          //删除----------------------
        }
      })
    },
    ischangeFn() {
      if (this.isChange === 0 && this.isChangeNum) {
        this.beforeChange()
      }
    },
    getPayMethod() {
      searchPaymentMethod({ related_type: 0, type: this.orderType }).then(res => {
        if (res.data.status === 200) {
          this.paymentMethods = res.data.data.map(item => item.name)
        }
      })
    },
  },
}
</script>
