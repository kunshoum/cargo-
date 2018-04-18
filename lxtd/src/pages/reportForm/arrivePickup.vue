<template><!--王艺蒙-->
<div class="Search">
  <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
    <el-row :gutter="10">
       <el-col :span="4">
         <el-form-item label="是否国内" class="grid-content" prop="is_domestic">
          <el-select size="mini" v-model="searchInfo.is_domestic" placeholder="">
            <el-option label="全部" value=""></el-option>
            <el-option label="国内" value="0"></el-option>
            <el-option label="国际" value="1"></el-option>
          </el-select>
         </el-form-item>
      </el-col>
      <el-col :span="4">
          <el-form-item label="运单号" class="grid-content" prop="order_no" >
          <el-input size="mini" v-model="searchInfo.order_no" ref="order_no" placeholder="运单号"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="btn_wrap">
    <el-row>
       <el-col :span="11">
        <el-col :span="4" :offset="1">
          <el-button type="primary" size="mini" @click="print">打印</el-button>  
        </el-col>  
      </el-col>
      <el-col :span="5" :offset="5">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="reset" size="mini">重置</el-button>
      </el-col>
    </el-row>
  </div>
  <div id="end_list">
    <el-table :data="tableData" border style="width: 100%" height="200" @row-click="detail" size="small">
        <el-table-column type="index"  label="序号"></el-table-column>
        <el-table-column sortable prop="order_no" label="主单号"></el-table-column>
        <el-table-column sortable prop="single_order_no" label="分单号"></el-table-column>
        <el-table-column sortable prop="flight_no" label="航班号/车次"></el-table-column>
        <el-table-column sortable prop="departure" label="出发"></el-table-column>
        <el-table-column sortable prop="destination" label="到达"></el-table-column>
        <el-table-column sortable prop="quantity" label="件数"></el-table-column>
        <el-table-column sortable prop="net_weight" label="毛重"></el-table-column>
        <el-table-column sortable prop="arrive_quantity" label="到达件数"></el-table-column>
        <el-table-column sortable prop="arrive_weight" label="到达重量"></el-table-column>
        <el-table-column sortable prop="remark" label="备注"></el-table-column>
        <el-table-column sortable prop="is_batch" :formatter="batchFormat" label="分批">
        </el-table-column>
        <el-table-column sortable prop="is_single" :formatter="singleFormat" label="分单">
        </el-table-column>
        <el-table-column sortable prop="cargo_status" label="状态"></el-table-column>
        <el-table-column sortable prop="arrive_time" label="到达时间"></el-table-column>
        <el-table-column sortable prop="product" label="品名"></el-table-column>
        <el-table-column sortable prop="sender" label="发货人"></el-table-column>
        <el-table-column sortable prop="receiver" label="收货人"></el-table-column>
        <el-table-column sortable prop="arrive_day" label="到达日期"></el-table-column>
        <el-table-column sortable prop="sign_time" label="签收时间"></el-table-column>
    </el-table>
  </div>
  <div class="detail">
    <el-form :model="detailInfo" class="demo-form-inline detail_form" label-position="top" ref="detailform">
      <el-row :gutter="10">
        <el-col :span="4">
            <el-form-item label="签收单号" class="grid-content" prop="sign_no">
            <el-input size="mini" v-model="detailInfo.sign_no" :disabled="true" placeholder="签收单号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="主单号" class="grid-content" prop="order_no">
            <el-input size="mini" v-model="detailInfo.order_no" :disabled="true" placeholder="主单号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="分单号" class="grid-content" prop="single_order_no">
            <el-input size="mini" v-model="detailInfo.single_order_no" :disabled="true" placeholder="分单号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="件数" class="grid-content" prop="quantity">
            <el-input size="mini" v-model="detailInfo.quantity" :disabled="true" placeholder="件数"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="实重" class="grid-content" prop="net_weight">
            <el-input size="mini" v-model="detailInfo.net_weight" :disabled="true" placeholder="实重"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="计重" class="grid-content" prop="weight">
            <el-input size="mini" v-model="detailInfo.weight" :disabled="true" placeholder="计重"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="终点" class="grid-content" prop="destination">
            <el-input size="mini" v-model="detailInfo.destination" :disabled="true" placeholder="终点"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="国内" class="grid-content" prop="is_domestic">
            <el-input size="mini" v-model="detailInfo.is_domestic" :disabled="true" placeholder="国内"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="品名" class="grid-content" prop="product">
            <el-input size="mini" v-model="detailInfo.product" :disabled="true" placeholder="品名"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="货物类别" class="grid-content" prop="product_category">
            <el-input size="mini" v-model="detailInfo.product_category" :disabled="true" placeholder="货物类别"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="包装" class="grid-content" prop="packaging">
            <el-input size="mini" v-model="detailInfo.packaging" :disabled="true" placeholder="包装"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="起点" class="grid-content" prop="departure">
            <el-input size="mini" v-model="detailInfo.departure" :disabled="true" placeholder="起点"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="运输方式" class="grid-content" prop="transport_mode">
            <el-input size="mini" v-model="detailInfo.transport_mode" :disabled="true" placeholder="运输方式"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="货物状态" class="grid-content" prop="cargo_status">
            <el-input size="mini" v-model="detailInfo.cargo_status" :disabled="true" placeholder="货物状态"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="提货方式" class="grid-content" prop="delivery_mode">
            <el-input size="mini" v-model="detailInfo.delivery_mode" :disabled="true" placeholder="提货方式"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="付费方" class="grid-content" prop="payer">
            <el-input size="mini" v-model="detailInfo.payer" :disabled="true" placeholder="付费方"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="代收款" class="grid-content" prop="agency_fund">
            <el-input size="mini" v-model="detailInfo.agency_fund" :disabled="true" placeholder="代收款"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="实付发货人费用" class="grid-content" prop="actual_pay_sender">
            <el-input size="mini" v-model="detailInfo.actual_pay_sender" :disabled="true" placeholder="实付发货人费用"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="收货人" class="grid-content" prop="receiver">
            <el-input size="mini" v-model="detailInfo.receiver" :disabled="true" placeholder="收货人"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="收货人电话" class="grid-content" prop="receiver_telephone">
            <el-input size="mini" v-model="detailInfo.receiver_telephone" :disabled="true" placeholder="收货人电话"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="结算方式" class="grid-content" prop="payment_method">
            <el-input size="mini" v-model="detailInfo.payment_method" :disabled="true" placeholder="结算方式"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="收货人证件类别" class="grid-content" prop="receiver_certificate_category">
            <el-input size="mini" v-model="detailInfo.receiver_certificate_category" :disabled="true" placeholder="收货人证件类别"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="收货人证件号" class="grid-content" prop="receiver_certificate_no">
            <el-input size="mini" v-model="detailInfo.receiver_certificate_no" :disabled="true" placeholder="收货人证件号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="收货人地址" class="grid-content" prop="receiver_address">
            <el-input size="mini" v-model="detailInfo.receiver_address" :disabled="true" placeholder="收货人地址"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="区域" class="grid-content" prop="area">
            <el-input size="mini" v-model="detailInfo.area" :disabled="true" placeholder="区域"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="线路" class="grid-content" prop="line">
            <el-input size="mini" v-model="detailInfo.line" :disabled="true" placeholder="线路"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="车号" class="grid-content" prop="car_number">
            <el-input size="mini" v-model="detailInfo.car_number" :disabled="true" placeholder="车号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="司机" class="grid-content" prop="driver">
            <el-input size="mini" v-model="detailInfo.driver" :disabled="true" placeholder="司机"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="是否放货" class="grid-content" prop="is_relay">
            <el-input size="mini" v-model="detailInfo.is_relay" :disabled="true" placeholder="是否放货"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="备注" class="grid-content" prop="remark">
            <el-input size="mini" v-model="detailInfo.remark" :disabled="true" placeholder="备注"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="签收人" class="grid-content" prop="signer">
            <el-input size="mini" v-model="detailInfo.signer" :disabled="true" placeholder="签收人"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="签收人证件类别" class="grid-content" prop="signer_certificate_category">
            <el-input size="mini" v-model="detailInfo.signer_certificate_category" :disabled="true" placeholder="签收人证件类别"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="签收人证件号" class="grid-content" prop="signer_certificate_no">
            <el-input size="mini" v-model="detailInfo.signer_certificate_no" :disabled="true" placeholder="签收人证件号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="签收时间" class="grid-content" prop="sign_time">
            <el-input size="mini" v-model="detailInfo.sign_time" :disabled="true" placeholder="签收时间"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="有无原件签收单" class="grid-content" prop="is_original_receipt">
            <el-input size="mini" v-model="detailInfo.is_original_receipt" :disabled="true" placeholder="有无原件签收单"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="签收单是否返回" class="grid-content" prop="is_return_receipt">
            <el-input size="mini" v-model="detailInfo.is_return_receipt" :disabled="true" placeholder="签收单是否返回"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="返回时间" class="grid-content" prop="return_time">
            <el-input size="mini" v-model="detailInfo.return_time" :disabled="true" placeholder="返回时间"></el-input>
            </el-form-item>
        </el-col>
				<el-col :span="4">
					<el-form-item label="发货人" class="grid-content" prop="sender">
						<el-input size="mini" v-model="detailInfo.sender" :disabled="true" placeholder="发货人"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="提货地点" class="grid-content" prop="pick_up_location">
						<el-input size="mini" v-model="detailInfo.pick_up_location" :disabled="true" placeholder="提货地点"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="入库时间" class="grid-content" prop="input_storeroom_time">
						<el-input size="mini" v-model="detailInfo.input_storeroom_time" :disabled="true" placeholder="入库时间"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="库房" class="grid-content" prop="storeroom">
						<el-input size="mini" v-model="detailInfo.storeroom" :disabled="true" placeholder="库房"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="入库人" class="grid-content" prop="input_storeroom_person">
						<el-input size="mini" v-model="detailInfo.input_storeroom_person" :disabled="true" placeholder="入库人"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="4">
					<el-form-item label="终止保管时间" class="grid-content" prop="store_termination">
						<el-input size="mini" v-model="detailInfo.store_termination" :disabled="true" placeholder="终止保管时间"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="出库时间" class="grid-content" prop="out_storeroom_time">
						<el-input size="mini" v-model="detailInfo.out_storeroom_time" :disabled="true" placeholder="出库时间"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="出库人" class="grid-content" prop="out_storeroom_person">
						<el-input size="mini" v-model="detailInfo.out_storeroom_person" :disabled="true" placeholder="出库人"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="出库状态" class="grid-content" prop="out_storeroom_status">
						<el-input size="mini" v-model="detailInfo.out_storeroom_status" :disabled="true" placeholder="出库状态"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="到达操作点" class="grid-content" prop="arrive_point_operation">
						<el-input size="mini" v-model="detailInfo.arrive_point_operation" :disabled="true" placeholder="到达操作点" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="发票类型" class="grid-content" prop="invoice_type">
						<el-input size="mini" v-model="detailInfo.invoice_type" :disabled="true" placeholder="发票类型" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="本地中转人" class="grid-content" prop="local_transfer">
						<el-input size="mini" v-model="detailInfo.local_transfer" :disabled="true" placeholder="本地中转人"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="关联点" class="grid-content" prop="association_point">
						<el-input size="mini" v-model="detailInfo.association_point" :disabled="true" placeholder="关联点"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="开票人" class="grid-content" prop="issuer">
						<el-input size="mini" v-model="detailInfo.issuer" :disabled="true" placeholder="开票人"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="开票时间" class="grid-content" prop="billing_time">
						<el-input size="mini" v-model="detailInfo.billing_time" placeholder="开票时间" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="修改人" class="grid-content" prop="update_person">
						<el-input size="mini" v-model="detailInfo.update_person" placeholder="修改人" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="修改时间" class="grid-content" prop="update_time">
						<el-input size="mini" v-model="detailInfo.update_time" placeholder="修改时间" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="生成人" class="grid-content" prop="creater">
						<el-input size="mini" v-model="detailInfo.creater" placeholder="生成人" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="生成时间" class="grid-content" prop="create_time">
						<el-input size="mini" v-model="detailInfo.create_time" placeholder="生成时间" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="签收单打印次数" class="grid-content" prop="sign_print_num">
						<el-input size="mini" v-model="detailInfo.sign_print_num" placeholder="签收单打印次数":disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="应收发货方费用" class="grid-content" prop="should_receive_sender">
						<el-input size="mini" v-model="detailInfo.should_receive_sender" placeholder="应收发货方费用" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="实收发货方费用" class="grid-content" prop="actual_receive_sender">
						<el-input size="mini" v-model="detailInfo.actual_receive_sender" placeholder="实收发货方费用" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="应收收货人费用" class="grid-content" prop="should_receive_receiver">
						<el-input size="mini" v-model="detailInfo.should_receive_receiver" placeholder="应收收货人费用" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="实收收货人费用" class="grid-content" prop="actual_receive_receiver">
						<el-input size="mini" v-model="detailInfo.actual_receive_receiver" placeholder="实收收货人费用" :disabled="true"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="4">
					<el-form-item label="应付中转人" class="grid-content" prop="should_pay_transiter">
						<el-input size="mini" v-model="detailInfo.should_pay_transiter" placeholder="应付中转人" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="客服记录" class="grid-content" prop="service_record">
						<el-input type="textarea" v-model="detailInfo.service_record" :disabled="true" :rows="2" size="mini" placeholder="客服记录" class="operate"></el-input>
					</el-form-item>
				</el-col>
      </el-row>
    </el-form>
  </div>
   <end-print :data="tableQuery" :titleOne='title' :visible="printVisible" :ids='id' :flightInfo="searchInfo" :list="list" status="end" @close="close"/>
  </div>
</template>

<script>
import { searchpickupReportm } from "../../service"
import formatParams from "../../utils/formatParams"

import EndPrint from "./pickPrint"

import { mapState } from "vuex"
export default {
  data() {
    return {
      printVisible: false,
      id: this.$route.params.id,
      table: "",
      list: [],
      tableQuery: [],
      tableData: [],
      type: "",
      searchInfo: {
        is_domestic: "",
        order_no: "",
      },
      detailInfo: {
        order_no: "",
        sign_no: "",
        single_order_no: "",
        quantity: "",
        net_weight: "",
        weight: "",
        departure: "",
        is_domestic: "",
        product: "",
        packaging: "",
        destination: "",
        is_domestic: "", //国内
        product: "", //品名
        product_category: "", //货物类别
        packaging: "", //包装
        departure: "", //始发站
        transport_mode: "", //运输方式
        delivery_mode: "", //提货方式
        destination_delivery_mode: "", //目的站提货方式
        cargo_status: "", //货物状态
        payer: "", //付款方
        agency_fund: "", //代收款
        receiver: "", //收货人
        receiver_telephone: "", //收货人电话
        receiver_address: "", //收货人地址
        receiver_certificate_category: "", //收货人证件类别
        receiver_certificate_no: "", //收货人证件号
        area: "", //区域
        line: "", //路线
        car_number: "", //车号
        driver: "", //司机
        is_relay: "", //是否放货 0未放货 1 已放货
        payment_method: "", //结算方式
        remark: "", //备注
        signer: "", //签收人
        signer_certificate_category: "", //签收人证件类别
        signer_certificate_no: "", //签收人证件号
        sign_time: "", //签收时间
        is_original_receipt: "", //是无原件签收单
        is_return_receipt: "", //签收单是否返回
        return_time: "", //返回时间
        sender: "", //发货人
        pick_up_location: "", //提货地点
        storeroom: "", //库房
        input_storeroom_time: "", //入库时间
        input_storeroom_person: "", //入库人
        store_termination: "", //终止保管时间
        out_storeroom_person: "", //出库人
        out_storeroom_time: "", //出库时间
        out_storeroom_status: "", //出库状态
        is_lock: "", //是否锁定
        arrive_point_operation: "", //到达操作点
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
        invoice_type: "", //发票类型
        local_transfer: "", //本地中转人
        association_point: "", //关联点
        issuer: "", //开票人
        billing_time: "", //开票时间
      },
      authList: '',
    }
  },
  components: {
    EndPrint,
  },
  mounted() {
    this.load()
    // console.log(this.id)
  },
  computed: {
    title() {
      // 由登陆权限信息根据当前id筛选出当前页面标题
      if (this.authList && this.authList.filter(item => item.id === this.id * 1)[0]) {
        return this.authList.filter(item => item.id === this.id * 1)[0].name
      }
    },
  },
  watch: {
    "$route.params.id"() {
      this.id = this.$route.params.id
    },
  },
  methods: {
    batchFormat(row, column, cellValue) {
      let stateArr = [<i class="el-icon-success" aria-hidden="true" />, <i class="el-icon-error" aria-hidden="true" />]
      return stateArr[cellValue]
    },
    singleFormat(row, column, cellValue) {
      let stateArr = [<i class="el-icon-success" aria-hidden="true" />, <i class="el-icon-error" aria-hidden="true" />]
      return stateArr[cellValue]
    },
    load() {
      this.authList = JSON.parse(this.$getStore("authList"))
      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.$store.commit("ADD_FOOTNAV", {
        name: this.title,
        route: this.$route.path,
      })
      this.search()
    },
    reset() {
      this.$refs["searchForm"].resetFields()
      this.$refs["detailform"].resetFields()
      this.tableData = []
    },
    search() {
      //查询到达提货单
      if (this.searchInfo.order_no) {
        searchpickupReportm({ ...this.searchInfo }).then(res => {
          if (res.data.status === 200) {
            this.tableData = res.data.data
          } else {
            this.tableData = []
          }
        })
      } else {
        this.$message({
          message: "请输入提货单号",
          type: "warning",
        })
        this.$refs["order_no"].focus()
      }
    },
    detail(row) {
      this.detailInfo.order_no = row.order_no
      this.detailInfo.sign_no = row.sign_no
      this.detailInfo.single_order_no = row.single_order_no
      this.detailInfo.quantity = row.quantity
      this.detailInfo.net_weight = row.net_weight
      this.detailInfo.weight = row.weight
      this.detailInfo.departure = row.departure
      this.detailInfo.is_domestic = row.is_domestic ? "国内" : "国际"
      this.detailInfo.product = row.product
      this.detailInfo.product_category = row.product_category
      this.detailInfo.packaging = row.packaging
      this.detailInfo.departure = row.departure
      this.detailInfo.destination = row.destination
      this.detailInfo.transport_mode = row.transport_mode ? "航空" : "公路"
      if (row.delivery_mode === 1) {
        this.detailInfo.delivery_mode = "自提"
      } else if (row.delivery_mode === 2) {
        this.detailInfo.delivery_mode = "派送"
      } else if (row.delivery_mode === 3) {
        this.detailInfo.delivery_mode = "中转"
      }
      if (row.destination_delivery_mode === 1) {
        this.detailInfo.destination_delivery_mode = "自提"
      } else if (row.destination_delivery_mode === 2) {
        this.detailInfo.destination_delivery_mode = "派送"
      }
      if (row.cargo_status === -1) {
        this.detailInfo.cargo_status = "已录入"
      } else if (row.cargo_status === 0) {
        this.detailInfo.cargo_status = "可提货"
      } else if (row.cargo_status === 1) {
        this.detailInfo.cargo_status = "已自提"
      } else if (row.cargo_status === 2) {
        this.detailInfo.cargo_status = "已派送"
      } else if (row.cargo_status === 3) {
        this.detailInfo.cargo_status = "已中转"
      }
      this.detailInfo.payer = row.payer
      this.detailInfo.agency_fund = row.agency_fund
      this.detailInfo.receiver = row.receiver
      this.detailInfo.receiver_telephone = row.receiver_telephone
      this.detailInfo.receiver_address = row.receiver_address
      this.detailInfo.receiver_certificate_category = row.receiver_certificate_category
      this.detailInfo.receiver_certificate_no = row.receiver_certificate_no
      this.detailInfo.area = row.area
      this.detailInfo.line = row.line
      this.detailInfo.car_number = row.car_number
      this.detailInfo.driver = row.driver
      this.detailInfo.is_relay = row.is_relay ? "不放货" : "放货"
      this.detailInfo.payment_method = row.payment_method
      this.detailInfo.remark = row.remark
      this.detailInfo.signer = row.signer
      this.detailInfo.signer_certificate_category = row.signer_certificate_category
      this.detailInfo.signer_certificate_no = row.signer_certificate_no
      this.detailInfo.sign_time = row.sign_time
      this.detailInfo.is_original_receipt = row.is_original_receipt ? "无" : "有"
      this.detailInfo.is_return_receipt = row.is_return_receipt ? "不返回" : "返回"
      this.detailInfo.return_time = row.return_time
      this.detailInfo.sender = row.sender
      this.detailInfo.pick_up_location = row.pick_up_location
      this.detailInfo.storeroom = row.storeroom
      this.detailInfo.input_storeroom_time = row.input_storeroom_time
      this.detailInfo.input_storeroom_person = row.input_storeroom_person
      this.detailInfo.store_termination = row.store_termination
      this.detailInfo.out_storeroom_person = row.out_storeroom_person
      this.detailInfo.out_storeroom_time = row.out_storeroom_time
      if (row.out_storeroom_status === 2) {
        this.detailInfo.out_storeroom_status = "部分出库"
      }
      this.detailInfo.out_storeroom_status = row.out_storeroom_status ? "未出库" : "已出库"
      this.detailInfo.is_lock = row.is_lock
      this.detailInfo.arrive_point_operation = row.arrive_point_operation
      this.detailInfo.update_person = row.update_person
      this.detailInfo.update_time = row.update_time
      this.detailInfo.creater = row.creater
      this.detailInfo.create_time = row.create_time
      this.detailInfo.sign_print_num = row.sign_print_num
      this.detailInfo.should_receive_sender = row.should_receive_sender
      this.detailInfo.actual_receive_sender = row.actual_receive_sender
      this.detailInfo.should_receive_receiver = row.should_receive_receiver
      this.detailInfo.actual_receive_receiver = row.actual_receive_receiver
      this.detailInfo.should_pay_transiter = row.should_pay_transiter
      this.detailInfo.service_record = row.service_record
      if (row.invoice_type === 2) {
        this.detailInfo.invoice_type = "收据"
      }
      this.detailInfo.invoice_type = row.invoice_type ? "普票" : "专票"
      this.detailInfo.local_transfer = row.local_transfer
      this.detailInfo.association_point = row.association_point
      this.detailInfo.issuer = row.issuer
      this.detailInfo.billing_time = row.billing_time
    },

    print() {
      if (this.tableData.length > 0) {
        this.printStatus = "end"
        this.printVisible = true
        this.list = this.tableData
      }else{
        this.$notify({
          title: "警告",
          message: "请先查询提货单数据",
          type: "warning",
        })
      }
    },
    close() {
      this.printVisible = false
    },
  },
}
</script>
<style>
.Search{
  background-color: #ffffff!important;
}
.detail {
  margin-top: 30px;
  border-top: 1px solid #eeeeee;
  padding: 15px 0;
}
.detail input,
textarea {
  /* font-weight: bolder; */
  color: black !important;
}
</style>

