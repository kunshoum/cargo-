/**
 * 马少良
 */
 
<template>
<div class="Detail Billing_detail">
  <el-form :model="detailInfo" class="demo-form-inline detail_form" label-position="top" :rules="rules" ref="ruleForm">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form-item label="邮单号" class="grid-content break_line" required>
          <el-col :span="9">
            <el-form-item prop="params.order_three_code">
              <el-input size="mini" v-model="detailInfo.params.order_three_code" ref="order_three_code"  v-on-enter="'order_num'" placeholder="三字码" disabled
              @change="getClearUnit"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="14">
            <el-form-item prop="params.order_num" class="must_bg">
              <el-input size="mini" v-model="detailInfo.params.order_num" placeholder="八位数字"
              ref="order_num"
              :disabled="edit"
              @blur="getOrderNo"
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
          v-on-enter="'departure'"
          ref="in_store_no"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="始发站" class="grid-content" prop="params.departure">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder="" clearable
            v-model="detailInfo.params.departure"
            @focus="getAirports"
            v-on-enter="'destination'"
            :loading="loading" ref='departure' @change="departureChange">
            <el-option
              v-for="(item, index) in departures"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="目的站" class="grid-content must_bg" prop="params.destination" required>
          <el-select size="mini" filterable remote default-first-option allow-create placeholder="" clearable
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
          <el-input size="mini" v-on-enter="'sender_address'"  v-model="detailInfo.params.sender_telephone" placeholder="" ref="sender_telephone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="发货人地址" class="grid-content" prop="params.sender_address">
          <el-input size="mini" v-on-enter="'receiver'" v-model="detailInfo.params.sender_address" placeholder="" ref="sender_address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收货人" class="grid-content" prop="params.receiver">
          <el-select size="mini" v-on-enter="'receiver_telephone'" filterable remote default-first-option allow-create placeholder="" clearable
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
          <el-input size="mini" v-on-enter="'receiver_address'" v-model="detailInfo.params.receiver_telephone" placeholder="" ref="receiver_telephone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="收货人地址" class="grid-content" prop="params.receiver_address">
          <el-input size="mini" v-on-enter="'carrier_storage_remark'" v-model="detailInfo.params.receiver_address" placeholder="" ref="receiver_address"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="提货方式" class="grid-content" prop="params.delivery_mode">
          <el-select size="mini" v-on-enter="'carrier_storage_remark'" v-model="detailInfo.params.delivery_mode" placeholder="" ref="delivery_mode" @change="deliveryModeChange">
            <el-option label="配送" :value="0"></el-option>
            <el-option label="自提" :value="1"></el-option>
            <el-option label="中转" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="储运备注" class="grid-content" prop="params.carrier_storage_remark">
          <el-input size="mini" v-on-enter="'expected_flight_time'" v-model="detailInfo.params.carrier_storage_remark" placeholder="" ref="carrier_storage_remark"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="结算备注" class="grid-content" prop="params.billing_remark">
          <el-input size="mini" v-on-enter="'starting_point_operation'" v-model="detailInfo.params.billing_remark" placeholder="" ref="billing_remark"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="出发操作点" class="grid-content" prop="params.starting_point_operation">
          <el-input size="mini" v-on-enter="'expected_flight_time'" v-model="detailInfo.params.starting_point_operation" placeholder="" ref="starting_point_operation"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="预计航班日期" class="grid-content" prop="params.expected_flight_time">
          <el-input size="mini" v-model="detailInfo.params.expected_flight_time" placeholder="" class="operate" 
          v-on-enter="'expected_flight_no'" ref='expected_flight_time' @blur="formatDate"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="预计航班号" class="grid-content must_bg" prop="params.expected_flight_no">
          <el-input size="mini" v-on-enter="'insurance_value'"  v-model="detailInfo.params.expected_flight_no" placeholder="" 
          ref="expected_flight_no" @keyup.enter.native="toFlight" @change="priceChange" @blur="getTransferProcess"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="第一程" class="grid-content must_bg" prop="params.first_transfer_process">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder="" clearable
            v-model="detailInfo.params.first_transfer_process"
            @focus="getAirports"
            v-on-enter="'air_transit'"
            ref="first_transfer_process"
            :loading="loading" @change='firstChange'>
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
          <el-select size="mini" v-on-enter="'second_transfer_process'" v-model="detailInfo.params.air_transit" placeholder="" ref='air_transit' @change='transitChange'>
            <el-option label="中转" :value="1"></el-option>
            <el-option label="不中转" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="第二程" class="grid-content" prop="params.second_transfer_process">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            clearable
            v-model="detailInfo.params.second_transfer_process"
            @focus="getAirports"
            v-on-enter="'expected_flight_time'"
            :loading="loading" ref='second_transfer_process' @change='secondChange'>
            <el-option
              v-for="(item, index) in secondAirports"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="保险价值" class="grid-content" prop="params.insurance_value">
          <el-input size="mini" v-on-enter="'declared_value'" v-model="detailInfo.params.insurance_value" placeholder="" ref="insurance_value"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="申明价值" class="grid-content" prop="params.declared_value">
          <el-input size="mini" v-on-enter="'packaging'" v-model="detailInfo.params.declared_value" placeholder="" ref="declared_value"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="包装" class="grid-content" prop="params.packaging">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder="" clearable
            ref="packaging"
            v-model="detailInfo.params.packaging"
            @focus="queryPackage"
            :filter-method="filterPackage"
            :loading="loading" @change='packagingChange'>
            <el-option
              v-for="(item, index) in packages"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="件数" class="grid-content must_bg" prop="params.quantity">
          <el-input size="mini" v-on-enter="'net_weight'" v-model.number="detailInfo.params.quantity" 
          placeholder="" ref='quantity' @change="quantityChange"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="实重" class="grid-content must_bg" prop="params.net_weight">
          <el-input size="mini" v-on-enter="'volume'"  v-model.number="detailInfo.params.net_weight" placeholder="" ref="net_weight"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="体积" class="grid-content must_bg" prop="params.volume">
          <el-input size="mini" v-on-enter="'weight'"  v-model.number="detailInfo.params.volume" placeholder="" ref="volume" class="operate" @keyup.enter.native="toVolume"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="计重" class="grid-content must_bg" prop="params.weight">
          <el-input size="mini" v-on-enter="'priceItem'" v-model.number="detailInfo.params.weight" placeholder="" ref="weight" @change="priceChange"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="价种" class="grid-content must_bg" prop="priceItem">
          <el-select size="mini" class="operate" filterable default-first-option placeholder="" clearable
            remote allow-create
            v-on-enter="'clearing_unit'" 
            @focus="getPrice"
            v-model="detailInfo.priceItem"
            value-key="price_species"
            ref="priceItem"
            @change="getCostItem"
            :loading="loading">
            <el-option
              v-for="(item, index) in prices"
              :key="index"
              :name="item.label"
              :label="item.name"
              :value="item.value"
              :class="{range_color: item.value.is_in_range}"><span>{{item.label}}</span>
            </el-option>
          </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="结算单位" class="grid-content" prop="params.clearing_unit">
          <el-input size="mini" v-on-enter="'sale_price'"  v-model="detailInfo.params.clearing_unit" ref="clearing_unit"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="开票价" class="grid-content" prop="params.invoice_price">
          <el-input size="mini" v-model="detailInfo.params.invoice_price" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="销售价" class="grid-content" prop="params.sale_price">
          <el-input size="mini" v-model="detailInfo.params.sale_price" ref="sale_price" @keyup.enter.native="toSave"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="付款方式" class="grid-content" prop="params.payment_method">
          <el-select size="mini" v-on-enter="'service_record'" v-model="detailInfo.params.payment_method" ref="payment_method" placeholder="" @change='paymentChange'>
            <el-option label="现金" value="现金"></el-option>
            <el-option label="月结" value="月结"></el-option>
          </el-select>
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
        <el-form-item label="修改时间" class="grid-content" prop="params.update_time">
          <el-input size="mini" v-model="detailInfo.params.update_time" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="修改人" class="grid-content" prop="params.update_person">
          <el-input size="mini" v-model="detailInfo.params.update_person" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="客服记录" class="grid-content" prop="params.service_record">
          <el-input type="textarea" :rows="2" size="mini" ref="service_record" v-model="detailInfo.params.service_record" placeholder="" class="operate" 
          @focus="toCustom"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="btn_wrap">
    <el-row  type="flex" justify="center">
      <mail-print v-if="edit"/>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="valid" ref="save">保存</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
      <el-button type="primary" icon="el-icon-time" size="small" @click="history">历史记录</el-button>
      <el-button type="primary" v-if="edit" icon="el-icon-refresh" size="small" @click="changeTicket">作废并换单</el-button>   
    </el-row>
  </div>
  <History :gridData="gridData" :title="title" @close="close" @historyOk="historyOk" :visible="dialogTableVisible"/>
</div>
</template>

<script>
import {
  beforeEditRecive,
  searchPrice,
  searchCost,
  searchClearUnit,
  searchSpecialSet,
  searchStoreInfo,
  getReciveList,
  searchSummary,
  cancelOrders, //换单
} from "@/service"

// 历史记录
import History from "../receive/history.vue"
import { getCity, getSenderReceiver, getAirport, getPackage } from "../../linkQuery"

import { getTime, getDate } from "@/utils/time"
import { mapState } from "vuex"
import rules from "@/mode/rulesData"
import { isRequired, priceRequired, regPhone, regSpecial } from "@/mode/ruleMethods"
import mixin from "@/mixin/receiveMailMixin"
import filterMixin from "@/mixin/filterMethod.js"
import MailPrint from "./print.vue"

export default {
  mixins: [mixin, filterMixin],
  data() {
    return {
      type: "main",
      order_no: "",
      title: "",
      edit: false,
      editIn: false,
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
          order_three_code: "000", // 单号三字码
          order_num: "", // 单号八位数字
          departure: this.$getStore("city") || "", // 始发站
          destination: "", // 目的站
          sender: "",
          sender_name: "",
          sender_telephone: "", // 发货人电话
          sender_address: "", // 发货人地址
          receiver: "",
          receiver_name: "",
          receiver_telephone: "",
          receiver_address: "",
          delivery_mode: 1, // 提货方式
          is_domestic: 0, // 国内国际 0国内 1国际
          easy_flag: 0, // 制单类型
          carrier_storage_remark: "", // 承运人储运备注
          billing_remark: "", // 结算备注
          starting_point_operation: this.$getStore("unit"), // 出发操作点
          first_transfer_process: "", // 第一程
          air_transit: 0, // 空运中转
          second_transfer_process: "", // 第二程
          expected_flight_time: getDate(), // 预计航班日期
          expected_flight_no: "", // 预计航班号
          insurance_value: 0, // 保险价值
          declared_value: 0, // 申明价值
          product: 'K/快件',
          product_category: 'K/快件',
          packaging: "", // 包装
          quantity: "", // 件数
          net_weight: "", // 实重
          volume: "", // 体积
          weight: "", // 计重
          price_species: "", // 价种
          clearing_unit: "", // 结算单位
          invoice_price: "", // 开票价
          payment_method: "现金", // 付款方式
          billing_time: "", // 开票时间
          issuer: "", // 开票人
          billing_location: "", // 开票地点
          update_time: "", // 修改时间
          update_person: "", // 修改人
          service_record: "", // 客服记录
          sale_price: "", // 销售价
          clear_price: "", // 结算价
          billing_cost: "",
          clear_cost: "",
          should_receive_cost: "",
          pay_total_cost: "",
          receive_total_cost: "",
          price_code: "",
          special_setting_id: "",
          in_store_no: "",
          volumeList: [],
          custServiceList: [],
          costItemList: [],
          currentUnit: this.$getStore("unit"),
        },
        priceItem: {},
      },
      rules: {
        ...rules,
        "params.destination": [{ required: true, message: "请选择目的站", trigger: "change" }],
        "params.sender": [{ required: true, message: "请选择发货人", trigger: "change" }],
        "params.first_transfer_process": [{ required: true, message: "请选择第一程", trigger: "change" }],
        "params.expected_flight_no": [{ required: true, message: "航班号不能为空", trigger: "blur" }],
        "params.volume": [{ required: true, validator: isRequired }],
        priceItem: [{ required: true, validator: priceRequired }],
        "params.receiver_address": [{ validator: regSpecial }],
        "params.sender_address": [{ validator: regSpecial }],
      },
      departures: [],
      destinations: [],
      allCitys: [],
      senders: [],
      allSenders: [],
      receivers: [],
      allReceivers: [],
      receiverList: [],
      firstAirports: [],
      secondAirports: [],
      allAirports: [],
      packages: [],
      prices: [],
      orders: [],
      priceId: "",
      loading: false,
      price: true,
      invoice_price: "",
      hadReceiver: false,
      priceItem: {},
    }
  },
  components: {
    MailPrint,
    History,
  },
  computed: {
    ...mapState([
      "volumeList",
      "customList",
      "costList",
      "flightNo",
      "flightDate",
      "sumVolume",
      "sumWeight",
      "orderType",
      "mailInfo",
    ]),
  },
  watch: {
    "$route.query"(val) {
      switch (true) {
        case val.from === "volume":
          this.detailInfo.params.volume = this.sumVolume
          this.detailInfo.params.weight = Math.max(this.sumWeight, this.detailInfo.params.net_weight)
          this.$refs["priceItem"].focus()
          break
        case val.from === "flight":
          this.getTransferProcess()
          setTimeout(() => {
            this.$refs["insurance_value"].focus()
          }, 300)
         
          break
        default:
          break
      }
    },
  },
  mounted() {
    this.title = "邮件"
    this.beforeEdit()
    this.detailInfo.params.billing_location = this.$getStore("operateDepart")
    this.$store.commit("DEPARTURE", this.detailInfo.params.departure)

    this.edit
      ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
      : (this.detailInfo.params.issuer = this.$getStore("real_name"))

    document.addEventListener('keydown', this.keyBoardSave)
  },
  beforeDestroy() {
		document.removeEventListener('keydown', this.keyBoardSave)
	},
  beforeRouteEnter: (to, from, next) => {
    // 添加进入时判断是否有存储项,有则填充
    next(vm => {
      if (!to.params.id && vm.mailInfo) {
        // vm.popList(vm.mailInfo)
        vm.fillPage(vm.mailInfo)
      } else {
        vm.reset()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    // 判断是否从添加页面离开，是则保存当前页数据
    if (!this.edit) {
      this.getTabInfo()
      this.$store.commit("CHANGE_MAILINFO", this.detailInfo.params)
    }
    next()
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.type === from.params.type) {
      // 由当前单编辑页面跳到当前单添加页面时清空数据
      if (this.edit && !to.params.id) {
        this.reset()
      }
    }
    next()
  },
  methods: {
    keyBoardSave(evt) {
      if(evt.keyCode === 83 && evt.ctrlKey) {
        evt.preventDefault()
        this.valid()
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
      o.volume = d.volume
      o.quantity = d.quantity
      o.net_weight = d.net_weight

      this.$store.commit("GET_WEIGHT", d.net_weight)
      this.$store.commit("GET_PIECE", d.quantity)
      this.$store.commit("GET_SENDER", d.sender)
    },
    getStoreInfo(no) {
      searchStoreInfo({ in_store_no: no }).then(res => {
        if (res.data.status === 200) {
          this.fillStoreInfo(res.data.data[0])
        }
      })
    },
    resetCost() {
      // 重置费用相关
      this.price = true
      this.$store.commit("GET_COSTLIST", [])
      this.$store.commit("GET_CLEARUNIT", [])
    },
    reset() {
      this.$refs["ruleForm"].resetFields()
      this.getOrderNo()
      this.resetCost()

      this.$store.commit("GET_VOLUMELIST", [])
      this.$store.commit("GET_CUSTOMLIST", [])
      this.$store.commit("GET_CLEARUNIT", [])
      this.detailInfo.params.billing_location = this.$getStore("operateDepart")
      this.edit
        ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
        : (this.detailInfo.params.issuer = this.$getStore("real_name"))
    },
    fillPage(d) {
      this.reset()
      this.detailInfo.params = d
      this.getOrderNo()
      this.formatNull()
      this.detailInfo.priceItem.price_species = d.price_species

      this.detailInfo.params.product = 'K/快件'
      this.detailInfo.params.product_category = 'K/快件'
      this.prices.push({
        value: { price_species: d.price_species },
        label: d.price_species,
        name: d.price_species,
      })
      this.$store.commit("GET_VOLUMELIST", d.volumeList || [])
      this.$store.commit("GET_CUSTOMLIST", d.custServiceList || [])
      this.$store.commit("GET_COSTLIST", d.costItemList || [])
      this.$store.commit("GET_CLEARUNIT", d.clearing_unit)
      this.$store.commit("GET_SENDER", d.sender)
      this.detailInfo.params.billing_location = this.$getStore("operateDepart")
      this.edit
        ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
        : (this.detailInfo.params.issuer = this.$getStore("real_name"))

      searchSummary({ costItem: d.costItemList, order_no: this.order_no }).then(res => {
        if (res.data.status === 200) {
          let d = res.data.data[0]
          this.$store.commit("GET_COSTSUMLIST", d.clearUnitCountList)
        }
      })
    },
    beforeEdit() {
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
          resData.status === 200
            ? this.fillPage(resData.data[0])
            : this.$message({ message: res.data.message, type: "warning" })
        })
      }
    },
    getClearUnit() {
      searchClearUnit({
        carrier: this.detailInfo.params.order_three_code,
      }).then(res => {
        if (res.data.status === 200) {
          res.data.data[0] && (this.detailInfo.params.clearing_unit = res.data.data[0].name)
          this.$store.commit("GET_CLEARUNIT", this.detailInfo.params.clearing_unit)
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
          this.$router.push("/mail/billing/detail")
          this.reset()
        })
        .catch(() => {
          this.reset()
          this.$router.push(`/mail`)
        })
    },
    getSenderInfo(query) {
      this.priceChange()
      getSenderReceiver(this, query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o && o.code === query) {
            this.detailInfo.params.sender = o.code
            this.detailInfo.params.sender_name = o.name
            this.detailInfo.params.sender_telephone = o.telephone
            this.detailInfo.params.sender_address = o.address
            this.detailInfo.params.payment_method = o.start_payment_method || "现金"
            this.$store.commit("GET_SENDER", o.code)
            this.renderReceiverName()
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
        setTimeout(() => {
          this.$refs["carrier_storage_remark"].focus()
        }, 500)
      } else {
        this.detailInfo.params.receiver_name = ""
        this.detailInfo.params.receiver_telephone = ""
        this.detailInfo.params.receiver_address = ""
        this.$refs["receiver_telephone"].focus()
      }
    },
    priceParams() {
      let o = this.detailInfo.params
      return {
        type: this.orderType,
        sender: o.sender,
        flight_no: o.expected_flight_no,
        destination: o.destination,
        weight: o.weight,
      }
    },
    priceChange() {
      if (!this.price) {
        this.$message({ message: "价种关联数据发生变化,已重新查询", type: "warning" })
        this.price = true
        this.getPrice()
      }
    },
    getPrice() {
      if (!this.prices.length || (this.prices.length && this.prices[0] && !this.prices[0].label)) {
        this.price = true
      }

      let params = this.priceParams()
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
    },
    fillPriceAbout(item) {
      this.detailInfo.params.invoice_price = item.invoice_price
      this.priceId = item.id
      this.invoice_price = item.invoice_price
      this.detailInfo.params.sale_price = item.sale_price
      this.detailInfo.params.clear_price = item.clear_price
      this.detailInfo.params.price_species = item.price_species
      this.detailInfo.params.clearing_unit = item.clearing_unit
      this.detailInfo.params.price_code = item.price_code
    },
    costParams() {
      let o = this.detailInfo.params
      return {
        start_arrive: 0,
        type: this.orderType,
        id: this.priceId,
        weight: o.weight,
        sender: o.sender,
      }
    },
    getCostItem(item) {
      this.priceItem = item
      this.getCost(item)
    },
    getCost(item) {
      this.fillPriceAbout(item)
      let params = this.costParams()
      searchCost(params).then(res => {
        if (res.data.status === 200) {
          let d = res.data.data[0]
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
      this.getSpecialSet()
    },
    specialSetParams() {
      let d = this.detailInfo.params
      return {
        type: this.orderType,
        destination: d.destination,
        flight_no: d.expected_flight_no,
        price_species: d.price_species,
      }
    },
    fillSpecialAbout(d) {
      this.detailInfo.params.carrier_storage_remark = d.carrier_storage_remark
      this.detailInfo.params.billing_remark = d.clearing_remark
    },
    getSpecialSet() {
      searchSpecialSet(this.specialSetParams()).then(res => {
        if (res.data.data && res.data.data.length === 1) {
          this.$message({ message: "输入项符合特殊设置", type: "success" })
          this.fillSpecialAbout(res.data.data[0])
          d.special_setting_id = res.data.data[0].id
        }
      })
    },
    orderNumChange() {
      this.getOrderNo()
      this.$refs["departure"].focus()
    },
    //始发站
    departureChange(val) {
      this.$store.commit("DEPARTURE", val)
      this.$refs["destination"].focus()
    },
    //目的站
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
    //第一程
    firstChange() {
      this.$refs["insurance_value"].focus()
    },
    //包装
    packagingChange() {
      setTimeout(() => {
        this.$refs["quantity"].focus()
      }, 300)
    },
    //付款方式
    paymentChange() {
      this.toSave()
    },
    deliveryModeChange() {
      setTimeout(() => {
        this.$refs["expected_flight_time"].focus()
      }, 500)
    },
    toSave() {
      this.$refs["save"].$el.focus()
    },
    // 历史记录
    history() {
      this.dialogTableVisible = true
      getReciveList({
        type: 2,
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
      // console.log(val)
      this.currentRow = val
    },
    // 确定
    historyOk(info) {
      this.dialogTableVisible = false
      this.detailInfo.params = info
      this.detailInfo.params.order_three_code = ""
      this.detailInfo.params.order_num = ""
      this.detailInfo.params.in_store_no = ""
      this.detailInfo.params.insurance_value = ""
      this.detailInfo.params.declared_value = ""
      this.detailInfo.params.quantity = ""
      this.detailInfo.params.volume = ""
      this.detailInfo.params.weight = ""
      this.detailInfo.params.net_weight = ""
      this.detailInfo.params.price_species = ""
      this.detailInfo.params.clearing_unit = ""
      this.detailInfo.params.issuer = ""
      this.detailInfo.params.invoice_price = ""
      this.detailInfo.params.sale_price = ""
      this.detailInfo.params.billing_location = ""
      this.detailInfo.params.billing_time = ""
      this.detailInfo.params.update_time = ""
      this.detailInfo.params.update_person = ""
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
            this.detailInfo.params.order_three_code = ""
            this.detailInfo.params.order_num = ""
            this.$refs["order_num"].focus()
          } else {
            this.$notify({
              title: "警告",
              message: res.data.message,
              type: "warning",
            })
          }
        })
      })
    },
    quantityChange(num) {
      this.$store.commit("GET_PIECE", num)
    },
  },
}
</script>

<style lang="less" scoped>

</style>
