<template><!--王艺蒙50%-->
<div class="Detail">
  <el-form :model="detailInfo" class="demo-form-inline detail_form" label-position="top" :rules="rules" ref="ruleForm">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item label="快递单号" class="grid-content break_line" required>
          <el-col :span="9">
            <el-form-item prop="params.order_three_code">
              <el-input size="mini" v-model="detailInfo.params.order_three_code" placeholder="三字码"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="14">
            <el-form-item prop="params.order_num">
              <el-select size="mini" filterable remote default-first-option
                placeholder="九位数字"
                v-model="detailInfo.params.order_num"
                :remote-method="queryOrder"
                @change="getOrderNo"
                :loading="loading">
                <el-option
                  v-for="item in orders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="始发站" class="grid-content break_line" prop="params.departure" >
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            v-model="detailInfo.params.departure"
            :remote-method="getDepartures"
            :loading="loading" ref='departure' @change="departureChange">
            <el-option
              v-for="item in departures"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="目的站" class="grid-content break_line" prop="params.destination" >
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            v-model="detailInfo.params.destination"
            :remote-method="getDestination"
            :loading="loading"  @change="destinationChange" ref="destination">
            <el-option
              v-for="item in destinations"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
       <el-col :span="4">
        <el-form-item label="区域" class="grid-content" prop="params.area_code">
         
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            v-model="detailInfo.params.area_code"
            :loading="loading">
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="发货人名称" class="grid-content" prop="params.sender_name"> 
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            ref="sender"
            v-model="detailInfo.params.sender_name"
            :remote-method="getSenders"
            @change="getSenderInfo"
            :loading="loading">
            <el-option
              v-for="item in senders"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="发货人电话" class="grid-content break_line" prop="params.sender_telephone" >
          <el-input size="mini" v-model="detailInfo.params.sender_telephone" placeholder="" ref="sender_telephone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="发货人地址" class="grid-content break_line" prop="params.sender_address" >
          <el-input size="mini" v-model="detailInfo.params.sender_address" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="收货人名称" class="grid-content" prop="params.receiver_name">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            ref="receiver"
            v-model="detailInfo.params.receiver_name"
            :remote-method="getReceivers"
            @change="getReceiverInfo"
            :loading="loading">
            <el-option
              v-for="item in receivers"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="收货人电话" class="grid-content break_line" prop="params.receiver_telephone" >
          <el-input size="mini" v-model="detailInfo.params.receiver_telephone" placeholder="" ref="receiver_telephone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收货人地址" class="grid-content break_line" prop="params.receiver_address" >
          <el-input size="mini" v-model="detailInfo.params.receiver_address" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="派送要求" class="grid-content" prop="params.delivery_requirements">
         <el-input size="mini" v-model="detailInfo.params.delivery_requirements" placeholder="" ref='delivery_requirements'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="储运备注" class="grid-content break_line" prop="params.other_storage_remark" >
          <el-input size="mini" v-model="detailInfo.params.other_storage_remark" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="结算备注" class="grid-content" prop="params.billing_remark">
          <el-input size="mini" v-model="detailInfo.params.billing_remark"  placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="出发操作点" class="grid-content" prop="params.starting_point_operation">
          <el-input size="mini" v-model="detailInfo.params.starting_point_operation" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
      <el-form-item label="发货去向" class="grid-content" prop="params.ship_whereabouts">
          <el-input size="mini" v-model="detailInfo.params.ship_whereabouts" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="申明价值" class="grid-content" prop="params.declared_value">
          <el-input size="mini" v-model.number="detailInfo.params.declared_value" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="预付/到付" class="grid-content" prop="params.pre_arrive_pay">
          <el-select size="mini" v-model="detailInfo.params.is_put" placeholder="" @change='prepayChange'>
            <el-option label="预付" :value="1"></el-option>
            <el-option label="到付" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="品名" class="grid-content" prop="params.product">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            v-model="detailInfo.params.product"
            :remote-method="renderProduct"
            @change="fillProductAbout" ref='product'
            :loading="loading">
            <el-option
              v-for="item in products"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="货物类别" class="grid-content" prop="params.product_category">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            v-model="detailInfo.params.product_category"
            :remote-method="renderProductCategory"
            @change="fillProductCategoryAbout"
            :loading="loading">
            <el-option
              v-for="item in productCategorys"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="包装" class="grid-content" prop="params.packaging">
          <el-select size="mini" filterable remote default-first-option allow-create placeholder=""
            ref="packaging"
            v-model="detailInfo.params.packaging"
            :remote-method="getPackage"
            :loading="loading">
            <el-option
              v-for="item in packages"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="预计航班日期" class="grid-content" prop="params.expected_flight_time">
          <el-input size="mini" v-model="detailInfo.params.expected_flight_time" placeholder="" class="operate" @keyup.enter.native="toFlight" ref='expected_flight_time'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="预计航班号" class="grid-content break_line" prop="params.expected_flight_num" >
          <el-input size="mini" v-model="detailInfo.params.expected_flight_no" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="件数" class="grid-content" prop="params.quantity">
          <el-input size="mini" v-model.number="detailInfo.params.quantity" placeholder="" ref="quantity"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="实重" class="grid-content" prop="params.net_weight">
          <el-input size="mini" v-model.number="detailInfo.params.net_weight" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="体积" class="grid-content" prop="params.volume">
          <el-input size="mini" v-model.number="detailInfo.params.volume" placeholder="" class="operate" @keyup.enter.native="toVolume"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="计重" class="grid-content" prop="params.weight">
          <el-input size="mini" v-model.number="detailInfo.params.weight" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="价种" class="grid-content" prop="priceItem">
          <el-select size="mini" class="operate" filterable default-first-option placeholder=""
            @focus="getPrice"
            v-model="detailInfo.priceItem"
            value-key="price_species"
            @change="getCost"
            ref="priceItem"
            :loading="loading">
            <el-option
              v-for="item in prices"
              :key="item.value.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" >
        <el-form-item label="基价" class="grid-content break_line" prop="params.base_price" >
          <el-input size="mini" v-model="detailInfo.params.base_price" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="开票递增价" class="grid-content break_line" prop="params.billing_incr_price" >
          <el-input size="mini" v-model="detailInfo.params.billing_incr_price" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3" >
        <el-form-item label="销售递增价" class="grid-content break_line" prop="params.sales_incr_price" >
          <el-input size="mini" v-model="detailInfo.params.sales_incr_price" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3" >
        <el-form-item label="基本重量" class="grid-content break_line" prop="params.base_weight" >
          <el-input size="mini" v-model="detailInfo.params.base_weight" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3" >
        <el-form-item label="递增重量" class="grid-content break_line" prop="params.incr_weight" >
          <el-input size="mini" v-model="detailInfo.params.incr_weight" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      
      <el-col :span="3" >
        <el-form-item label="已拼货件数" class="grid-content break_line" prop="params.joint_cargo_pieces" >
          <el-input size="mini" v-model="detailInfo.params.sale_price" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="对应单号" class="grid-content" prop="params.correspond_order_no">
          <el-input size="mini" 
          v-model="detailInfo.params.correspond_order_no" placeholder="" class="operate" 
          @keyup.enter.native="toBind"
          @blur="correspondBlur"
          ref="correspond_order_no"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="付款方式" class="grid-content" prop="params.payment_method">
          <el-select size="mini" v-model="detailInfo.params.payment_method" placeholder=""
          ref="payment_method"  
          @change='paymentChange'>
            <el-option label="现金" :value="0"></el-option>
            <el-option label="预付" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3" >
        <el-form-item label="签收件数" class="grid-content" prop="params.sign_quantity">
          <el-input size="mini" v-model="detailInfo.params.sign_quantity" placeholder="" ref='sign_quantity'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3" >
        <el-form-item label="签收状态" class="grid-content" prop="params.sign_state">
          <el-select size="mini" v-model="detailInfo.params.sign_state" placeholder="">
            <el-option label="未签收" :value="0"></el-option>
            <el-option label="已签收" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="开票时间" class="grid-content" prop="params.billing_time">
          <el-input size="mini" v-model="detailInfo.params.billing_time" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="开票人" class="grid-content" prop="params.issuer">
          <el-input size="mini" v-model="detailInfo.params.issuer" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="开票地点" class="grid-content" prop="params.billing_location">
          <el-input size="mini" v-model="detailInfo.params.billing_location" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="修改时间" class="grid-content" prop="params.update_time">
          <el-input size="mini" v-model="detailInfo.params.update_time" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="修改人" class="grid-content" prop="params.update_person">
          <el-input size="mini" v-model="detailInfo.params.update_person" placeholder="" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="客服记录" class="grid-content" prop="params.service_record">
          <el-input type="textarea" :rows="2" size="mini" 
          v-model="detailInfo.params.service_record" placeholder="" class="operate"
          ref="service_record" 
          @keyup.enter.native="toCustom"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="btn_wrap">
    <el-row>
      <el-col :span="6" :offset="9">
      <div class="grid-content bg-purple">
        <!--<print-order v-if="edit"/>-->
        <el-button type="primary" icon="el-icon-plus" size="small" @click="save">保存</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
      </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
// import PrintOrder from "../receive/mainPrint.vue"
import {
  // 判断单号
  isOrderUsed,
  // 添加
  saveRecive,
  // 编辑前查询
  beforeEditRecive,
  // 编辑保存
  editRecive,
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
  searchPrice,
  searchPriceCA,
  searchCostCA,
  searcharea,
  searchBindList,
  searchOrderNo,
} from "../../service"

import { getTime } from "../../utils/time"
import { mapState } from "vuex"
import rules from "../../mode/rulesData"

export default {
  components: {
    // PrintOrder,
  },
  data() {
    return {
      order_no: "",
      edit: false,
      detailInfo: {
        params: {
          order_three_code: "CAE", // 运单号三字码
          order_num: "", // 运单号8位数字
          departure: "", // 始发站名称
          destination: "", // 目的站名称
          sender_name: "", // 发货人名称
          receiver_name: "", // 收货人名称
          area_code: "", // 区域
          delivery_requirements: "", //派送要求
          //============================================================================================ 发货人、收货人信息
          sender_telephone: "", // 发货人电话
          receiver_telephone: "", // 收货人电话
          sender_address: "", // 发货人地址
          receiver_address: "", // 收货人地址
          other_storage_remark: "", // 储运备注
          billing_remark: "", // 结算备注
          starting_point_operation: "", // 出发操作点
          ship_whereabouts: "", // 发货去向
          declared_value: 0, // 申明价值
          pre_arrive_pay: "", // 预付、到付
          product: "", // 品名名称
          product_category: "", // 货物类别名称
          your_category: "", //自分类别
          packaging: "", // 包装名称
          expected_flight_time: "", // 预计航班日期
          expected_flight_num: "", // 预计航班号
          //============================================================================================ 货物信息
          quantity: "", // 件数
          net_weight: "", // 实重
          volume: "", // 体积
          weight: "", // 计重
          price_species: "", //价种
          base_price: "", //基价
          billing_incr_price: "", //开票递增价
          sales_incr_price: "", //销售递增价
          base_weight: "", // 基本重量
          incr_weight: "", // 递增重量
          joint_cargo_pieces: "", // 已拼货件数
          correspond_order_no: "", // 对应单号
          payment_method: "", // 付款方式
          sign_quantity: "", // 签收件数
          sign_state: "", // 签收状态
          billing_time: "", // 开票时间
          issuer: "", // 开票人
          billing_location: "", // 开票地点
          update_time: "", // 修改时间
          update_person: "", // 修改人
          service_record: "", // 客服记录
          volumeList: [],
          custServiceList: [],
          costItemList: [],
        },
        priceItem: {},
      },
      rules: {
        ...rules,
      },
      departures: [],
      destinations: [],
      associationPoints: [],
      senders: [],
      receivers: [],
      receiverNames: [],
      firstAirports: [],
      secondAirports: [],
      products: [],
      productCategorys: [],
      packages: [],
      carrierCategorys: [],
      jointCompanys: [],
      prices: [],
      orders: [],
      priceId: "",
      loading: false,
      areas: [],
      loading: false,
      price: true,
      invoice_price: "",
      bindList: [], // 可拼单列表
      bindedList: [], // 已拼单列表
      inputBinded: [], // 输入的对应单号对应的已拼列表
      canNotBindOrder: "", // 不可拼单号
    }
  },
  mounted() {
    this.detailInfo.params.order_three_code = "CAE"

    this.beforeEdit()
    this.detailInfo.params.billing_location = this.$getStore("depart_name")
    this.edit
      ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
      : (this.detailInfo.params.issuer = this.$getStore("real_name"))
  },
  beforeRouteEnter: (to, from, next) => {
    // 添加进入时判断是否有存储项,有则填充
    next(vm => {
      if (!to.params.id && vm.caeInfo) {
        vm.popList(vm.caeInfo)
        vm.fillPage(vm.caeInfo)
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    // 判断是否从添加页面离开，是则保存当前页数据
    if (!this.edit) {
      this.$store.commit("CHANGE_CAEINFO", this.detailInfo.params)
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
  watch: {
    bindOrder() {
      this.detailInfo.params.correspond_order_no = this.bindOrder
    },
    flightNo() {
      this.detailInfo.params.expected_flight_no = this.flightNo
    },
    flightDate() {
      this.detailInfo.params.expected_flight_time = this.flightDate
    },
    sumVolume() {
      this.detailInfo.params.volume = this.sumVolume
    },
    sumWeight() {
      this.detailInfo.params.weight = Math.max(this.sumWeight, this.detailInfo.params.net_weight)
    },
    customList() {
      let contentArr = this.customList.map(item => item.content)
      this.detailInfo.params.service_record = contentArr.join(";")
    },
    "$route.query"(val) {
      switch (true) {
        case val.from === "volume":
          this.$refs["priceItem"].focus()
          break
        case val.from === "bind" || val.from === "custom":
          this.$refs["payment_method"].focus()
          break
        case val.from === "flight":
          this.$refs["quantity"].focus()
          break
        case val.from === "cost":
          this.$refs["correspond_order_no"].focus()
          break
        default:
          break
      }
    },
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
      "caeInfo",
      "bindedPiece",
      "orderType",
      "allBindList",
    ]),
  },
  methods: {
    queryOrder(query) {
      searchOrderNo({ order_three_code: this.detailInfo.params.order_three_code, order_num: query }).then(res => {
        if (res.data.status === 200) {
          this.orders = res.data.data.map(item => {
            return { label: item, value: item }
          })
        }
      })
    },
    getArea(value) {
      searcharea({ destination: value }).then(res => {
        if (res.data.status === 200) {
          this.detailInfo.params.area_code = res.data.data[0]
        }
      })
    },
    getOrderNo() {
      if (this.detailInfo.params.order_three_code && this.detailInfo.params.order_num) {
        this.order_no = this.detailInfo.params.order_three_code + this.detailInfo.params.order_num
        this.$store.commit("GET_ORDERNO", this.order_no)
        this.$refs["departure"].focus()
      } else {
        this.order_no = ""
        this.$store.commit("GET_ORDERNO", this.order_no)
      }
    },
    haveThisOrder() {
      this.$confirm("该单号已被占用, 是否进入编辑页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          this.$router.push({
            params: { id: this.detailInfo.params.order_three_code + this.detailInfo.params.order_num },
          })
          this.$store.commit("CHANGE_TOPTITLE", this.title + "-编辑")
        })
        .catch(() => {
          this.detailInfo.params.order_num = ""
          this.$message({
            type: "info",
            message: "请重新输入单号",
          })
        })
    },
    // 单号
    testOrder() {
      if (!this.edit && this.detailInfo.params.order_three_code && this.detailInfo.params.order_num) {
        isOrderUsed({
          order_no: this.detailInfo.params.order_three_code + this.detailInfo.params.order_num,
        }).then(res => {
          if (res.data.status === 400) {
            if (res.data.data[0] === 0) {
              this.haveThisOrder()
            } else {
              this.detailInfo.params.order_num = ""
              this.$message({
                type: "info",
                message: res.data.message + "请重新输入单号",
              })
            }
          } else {
            this.getOrderNo()
          }
        })
      }
    },
    formatNull() {
      let o = this.detailInfo.params
      o.payment_method === null ? (o.payment_method = 0) : (o.payment_method = o.payment_method)
    },
    reset() {
      this.$refs["ruleForm"].resetFields()
      this.getOrderNo()
      this.detailInfo.priceItem.price_species = ""
      this.prices = []
      this.$store.commit("GET_VOLUMELIST", [])
      this.$store.commit("GET_CUSTOMLIST", [])
      this.$store.commit("GET_BINDLIST", [])
      this.$store.commit("GET_BINDEDLIST", [])
      this.$store.commit("GET_NATIVE_BINDEDLIST", [])
      this.$store.commit("GET_COSTLIST", [])
      this.$store.commit("GET_CLEARUNIT", [])
      this.detailInfo.params.billing_location = this.$getStore("depart_name")
      this.edit
        ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
        : (this.detailInfo.params.issuer = this.$getStore("real_name"))
    },
    popList(d) {
//    d.costItemList.pop()
//    d.volumeList.pop()
//    d.custServiceList.pop()
    },
    fillPage(d) {
      this.reset()
      this.detailInfo.params = d
      this.getOrderNo()
      this.formatNull()
      this.detailInfo.priceItem.price_species = d.price_species
      this.prices.push({ value: { price_species: d.price_species }, label: d.price_species })
      this.$store.commit("GET_VOLUMELIST", d.volumeList)
      this.$store.commit("GET_CUSTOMLIST", d.custServiceList)
      this.$store.commit("GET_BINDEDLIST", d.ccaMainSingleList)
      this.$store.commit("GET_NATIVE_BINDEDLIST", d.ccaMainSingleList)
      this.$store.commit("GET_COSTLIST", d.costItemList || [])
      this.$store.commit("GET_CLEARUNIT", d.clearing_unit)
      this.getCorreOrderNo(d.ccaMainSingleList)
      this.bindedList = d.ccaMainSingleList || []
      this.detailInfo.params.billing_location = this.$getStore("depart_name")
      this.edit
        ? (this.detailInfo.params.update_person = this.$getStore("real_name"))
        : (this.detailInfo.params.issuer = this.$getStore("real_name"))
    },
    beforeEdit() {
      this.order_no = this.$route.params.id
      this.$store.commit("GET_ORDERNO", this.order_no)
      if (this.$route.params.id) {
        this.edit = true
        beforeEditRecive({ order_no: this.order_no, type: this.orderType }).then(res => {
          let resData = res.data
          resData.status === 200
            ? this.fillPage(resData.data[0])
            : this.$message({ message: res.data.message, type: "warning" })
            this.getBindList()
        })
      }
    },
    getClearUnit() {
      searchClearUnit({ carrier: this.detailInfo.params.order_three_code }).then(res => {
        if (res.data.status === 200) {
          res.data.data[0] && (this.detailInfo.params.clearing_unit = res.data.data[0].name)
          this.$store.commit("GET_CLEARUNIT", this.detailInfo.params.clearing_unit)
        }
      })
    },
    getCorreOrderNo(data) {
      if (data && data.length) {
        this.detailInfo.params.correspond_order_no = data.map(item => item.order_no).join()
        this.$store.commit("GET_BINDORDER", this.detailInfo.params.correspond_order_no)
      }
    },
    getBindList() {
      // 获取可拼单件数
      let data = this.detailInfo.params
      let params = {
        type: this.type === "main" ? 0 : 1,
        order_no: this.order_no,
        billing_location: data.billing_location,
        departure: data.departure,
        destination: data.destination,
        product: data.product,
        expected_flight_time: data.expected_flight_time,
        expected_flight_no: data.expected_flight_no,
      }
      return searchBindList(params).then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.bindList = resData.data
          this.$store.commit("GET_BINDLIST", resData.data)
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
      this.$store.commit("GET_ALLBINDLIST", list)
      this.getNotBindOrder()
      if (this.canNotBindOrder) {
        return
      }
      this.bindInputBinded()
    },
    iptBindedList() {
      // 获取输入的对应单号列表
      let iptOrder = this.detailInfo.params.correspond_order_no
      let orderArr = iptOrder.split("/")
      let regx = /\(([^)]*)\)/
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
      this.$store.commit("GET_ALLBINDLIST", list)
    },
    getVolumeList() {
      this.detailInfo.params.volumeList = this.volumeList.map(item => {
        return { ...item, order_no: this.order_no }
      })
//    this.detailInfo.params.volumeList.pop()
    },
    getCustomList() {
      let cust_service_type = this.orderType
      this.detailInfo.params.custServiceList = this.customList.map(item => {
        return { ...item, order_no: this.order_no, cust_service_type }
      })

//    this.detailInfo.params.custServiceList.pop()
    },
    getCostList() {
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
          related_type: item.related_type,
          impact: item.impact,
          order_no: this.order_no,
        }
      })

//    this.detailInfo.params.costItemList.pop()
    },
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.getVolumeList()
          this.getCustomList()
          this.getCostList()

          this.edit
            ? (this.detailInfo.params.update_time = getTime())
            : (this.detailInfo.params.billing_time = getTime())
          if (this.edit) {
            editRecive({ ...this.detailInfo.params, order_no: this.order_no, type: this.orderType }).then(res => {
              if (res.data.status === 200) {
                this.$message({ message: "编辑成功", type: "success" })
                this.saveSuccessHandle()
              } else {
                this.$message({ message: res.data.message, type: "warning" })
              }
            })
          } else {
            saveRecive({ ...this.detailInfo.params, type: 3 }).then(res => {
              if (res.data.status === 200) {
                this.$message({ message: "添加成功", type: "success" })
                this.saveSuccessHandle()
              } else {
                this.$message({ message: res.data.message, type: "warning" })
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
          this.$router.push(`/cae/sub/billing/detail`)
          this.reset()
        })
        .catch(() => {
          this.$router.push(`/receive/main`)
          this.$store.commit("ADD_FOOTNAV", this.routeItem)
        })
    },
    toFlight() {
      this.$router.push({ params: { item: "flight" } })
    },
    toVolume() {
      this.$router.push({ params: { item: "volume" } })
    },
    toCustom() {
      this.$router.push({ params: { item: "deparr" } })
    },
    toCost() {
      this.$router.push({ params: { item: "cost" } })
    },
    toBind() {
      this.$store.commit("GET_WEIGHT", this.detailInfo.params.net_weight)
      this.$store.commit("GET_PIECE", this.detailInfo.params.quantity)

      this.getBindList().then(() => {
        if (this.canNotBindOrder) {
          this.$notify({
            title: "警告",
            message: this.canNotBindOrder + "不可拼",
            type: "warning",
          })
          return
        }
        this.$router.push({ params: { item: "bind" } })
      })
    },
    notBindDone() {
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
      this.$store.commit("GET_WEIGHT", this.detailInfo.params.net_weight)
      this.$store.commit("GET_PIECE", this.detailInfo.params.quantity)

      this.getBindList().then(() => {
        if (this.canNotBindOrder) {
          this.$notify({
            title: "警告",
            message: this.canNotBindOrder + "不可拼",
            type: "warning",
          })
        } else {
          this.notBindDone()
        }
      })
    },
    getCity(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchCity({ code: query }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data.map(item => {
            return { value: item.cn_name, label: item.cn_name }
          })
        }
      })
    },
    getDepartures(query) {
      this.getCity(query).then(res => {
        this.departures = res
      })
    },
    getDestination(query) {
      this.getCity(query).then(res => {
        this.destinations = res
      })
    },
    getAssociationPoints(query) {
      this.getCity(query).then(res => {
        this.associationPoints = res
      })
    },
    getSenderReceiver(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchSenderReceiver({ code: query, is_start_relate: 1 }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data
        }
      })
    },
    getSenders(query) {
      this.getSenderReceiver(query).then(res => {
        this.senders = res.map(item => {
          return { value: item.name, label: item.name }
        })
      })
    },
    getSenderInfo(query) {
      this.getSenderReceiver(query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o && o.name === query) {
            this.detailInfo.params.sender_telephone = o.telephone
            this.detailInfo.params.sender_address = o.address
            this.renderReceiverName()
          }else {
            this.detailInfo.params.sender_telephone = ''
            this.detailInfo.params.sender_address = ''
            this.$refs["sender_telephone"].focus()
          }
        }
      })
    },
    getReceivers(query) {
      this.getSenderReceiver(query).then(res => {
        this.receivers = res.map(item => {
          return { value: item.name, label: item.name }
        })
      })
    },
    getReceiverBySender() {
      let params = {
        receiver_name: this.detailInfo.params.receiver_name,
        sender_name: this.detailInfo.params.sender_name,
        destination: this.detailInfo.params.destination,
      }
      return searchReceiver(params).then(res => {
        return res.data.data
      })
    },
    renderReceiverName() {
      this.getReceiverBySender().then(res => {
        this.receiverNames = res.map(item => {
          return { value: item.receiver_name, label: item.receiver_name }
        })
        if (!this.receiverNames.length) {
          this.detailInfo.params.receiver_name = ""
        }
        this.$refs['receiver'].focus()
      })
    },
    getReceiverInfo(query) {
      this.getSenderReceiver(query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o && o.name === query) {
            this.detailInfo.params.receiver_telephone = o.telephone
            this.detailInfo.params.receiver_address = o.address
            this.detailInfo.params.delivery_mode = o.delivery_mode
            this.$refs["delivery_requirements"].focus()
          }else {
            this.detailInfo.params.receiver_telephone = ''
            this.detailInfo.params.receiver_address = ''
            this.$refs["receiver_telephone"].focus()
          }
        }
      })
    },
    correspondBlur() {
      this.$store.commit("GET_WEIGHT", this.detailInfo.params.net_weight)
      this.$store.commit("GET_PIECE", this.detailInfo.params.quantity)

      this.getBindList().then(() => {
        if (this.canNotBindOrder) {
          this.$notify({
            title: "警告",
            message: this.canNotBindOrder + "不可拼",
            type: "warning",
          })
        } else {
          this.notBindDone()
        }
      })
    },
    getAirport(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchAirport({ code: query }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data.map(item => {
            return { value: item.airport_name, label: item.airport_name }
          })
        }
      })
    },
    getFirstAirport(query) {
      this.getAirport(query).then(res => {
        this.firstAirports = res
      })
    },
    getSecondAirport(query) {
      this.getAirport(query).then(res => {
        this.secondAirports = res
      })
    },
    getProduct(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchProduct({ code: query }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data
        }
      })
    },
    renderProduct(query) {
      this.getProduct(query).then(res => {
        this.products = res.map(item => {
          return { value: item.name, label: item.name }
        })
      })
    },
    fillProductAbout(query) {
      this.getProduct(query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o) {
            this.detailInfo.params.product_category = o.start_product_category
            this.detailInfo.params.packaging = o.pkg
            this.$refs["expected_flight_time"].focus()
          }
        }
      })
    },
    getProductCategory(query) {
      if (query !== "") {
        this.loading = true
      }
      return searchProductCategory({ code: query }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          return res.data.data
        }
      })
    },
    renderProductCategory(query) {
      this.getProductCategory(query).then(res => {
        this.productCategorys = res.map(item => {
          return { value: item.name, label: item.name }
        })
      })
    },
    fillProductCategoryAbout(query) {
      this.getProductCategory(query).then(res => {
        if (Array.isArray(res)) {
          let o = res[0]
          if (o) {
            this.detailInfo.params.departure_priority = o.departure_priority
            // this.$refs['packaging'].focus()
          }
        }
      })
    },
    getPackage(query) {
      if (query !== "") {
        this.loading = true
      }
      searchPackage({ code: query,type:1 }).then(res => {
        if (res.data.status === 200) {
          this.loading = false
          this.packages = res.data.data.map(item => {
            return { value: item, label: item }
          })
        }
      })
    },
    priceParams() {
      let o = this.detailInfo.params
      return {
        area: o.area_code,
        sender: o.sender_name,
        order_no: o.order_three_code + o.order_num,
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
      let params = this.priceParams()
      searchPriceCA(params).then(res => {
        if (res.data.status === 200) {
          this.price = false
          this.prices = res.data.data.map(item => {
            return { value: item, label: item.price_species }
          })
        }
      })
    },
    costParams() {
      let o = this.detailInfo.params
      return {
        id: this.priceId,
        weight: o.weight,
        order_no: o.order_three_code + o.order_num,
      }
    },
    getCost(item) {
      this.priceId = item.id
      console.log(item.weight_base)
      this.detailInfo.params.price_species = item.price_species
      this.detailInfo.params.base_weight = item.weight_base
      this.detailInfo.params.incr_weight = item.weight_incr
      this.detailInfo.params.base_price = item.invoice_price_base
      this.detailInfo.params.billing_incr_price = item.invoice_price_incr
      this.detailInfo.params.sales_incr_price = item.sale_price_incr
      let params = this.costParams()
      searchCostCA(params).then(res => {
        if (res.data.status === 200) {
          this.$store.commit("GET_COSTLIST", res.data.data)
          this.$router.push({ params: { item: "cost" } })
        }
      })
    },
    //始发站
    departureChange() {
      this.$refs["destination"].focus()
    },
    //目的站
    destinationChange() {
      this.getArea()
      this.priceChange()
      this.$refs["sender"].focus()
    },
    //预付/到付
    prepayChange() {
      this.$refs["product"].focus()
    },
    //付款方式
    paymentChange() {
      this.$refs["sign_quantity"].focus()
    },
  },
}
</script>

<style lang="less" scoped>

</style>
