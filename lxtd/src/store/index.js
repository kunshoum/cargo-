//马少良

//王艺蒙

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

import { getStore } from "../config/localStore"
import { getDate } from "@/utils/time"
Vue.use(Vuex)

const state = {
  topTitle: '首页', // 顶部标题
  sideBar: 'ShortCut', // 侧栏显示项
  type: 0,
  orderType: 0,
  loadingTime: 350,
  footNavs: [
    {
      name: '首页',
      noClose: true,
      route: '/home',
      title: '首页',
    },
  ], // 底部导航
  orderNo: '', // 当前单号
  bindOrder: '', // 对应单号
  isChange: '',//是否是换单
  isChangeNum: '',//换单单号
  volumeList: [{
    length: '',
    width: '',
    height: '',
    quantity: '',
    volume: '',
    volume_weight: '',
  }], // 体积列表数据,
  customList: [{entry_person: getStore('real_name')}], // 客服列表数据
  costList: [{}], // 费用列表数据
  bindedList: [], // 已拼单列表
  bindedPiece: '', // 已拼单件数
  nativeBindedList: [], // 原已拼单列表
  bindList: [], // 可拼单列表
  allBindList: [], // 所有拼单数据
  flightNo: '', // 预计航班号
  flightDate: '', // 预计航班日期
  sumVolume: '',  // 体积
  sumWeight: '',  // 重量
  sumPiece: '', // 件数
  sumCost: '', // 费用
  clearUnit: '', // 结算单位
  receiveMain: null,  // 主单数据
  receiveSub: null,   // 分单数据
  caeInfo: null, // 快件数据
  mailInfo: null, // 邮件数据
  arrivalMain: null, // 提货主单
  arrivalSub: null, // 提货分单
  arriveMainOrder: '',//进港主单
  mainOrderNo:'',
  bookingNo:'',   //航班号
  bookingData:'',  //航班日期
  departure:'',  //始发站
  destination:'',   //目的站
  nowStowageStep: 0, // 当前配载步骤
  flightInfo: {
    flight_no: '',
    flight_date: '',
    departure: '',
    destination: '',
  }, // 当前配载航班信息
  
  idList: [], // 票证操作的idList
  volumeLists: [{
    fromUnit: '',
    orderCategory:'',
    orderPrefix: '',
    startNum:'',
    endNum:'',
    getpre:'',
    orderCount:'',
  }],
  sender: '', 
  costSumList: [],
  costAbout: {
    billing_cost: "",
    clear_cost: "",
    should_receive_cost: "",
    pay_total_cost: "",
    receive_total_cost: "",
    should_receive_sender: "",
    should_receive_receiver: "",
    should_pay_transiter: "",
  },
  lookId:'',
  outLet:'',
  roomname:'',
  kuwe:'',
  payer: '',  // 付费方
  deliveryMode: '', // 提货方式
  agencyFund: '', // 代收款
  registerInfo: { // 不正常货物记录
    unusual_no: '', // 不正常货物-记录号
    unusual_qunatity: '', // 不正常货物-件数
    unusual_weight: '', // 不正常货物-重量
    unusual_record_desc: '', // 不正常货物-描述
    unusual_record_person: getStore('real_name'), // 不正常货物-登记操作员
    unusual_record_person_operate_epart: getStore('unit'), // 不正常货物-登记操作员所在营业部
    unusual_record_time: '', // 不正常货物-登记时间
  },
  dealInfo: { // 不正常货物处理
    unusual_handle_person: getStore('real_name'), // 不正常货物-处理操作员
    unusual_handle_person_operate_epart: getStore('unit'), // 不正常货物-登记操作员所在营业部
    unusual_handle_time: '', // 不正常货物-处理时间
    unusual_handle_detail: '', // 不正常货物-处理意见
    unusual_is_close: 0, // 不正常货物-是否结案 0未结案 1 已结案
  },
  planFlyDate: getDate(),
  checkAllcash: '',  //比运价的总费用
  bindFilterItems: ['expected_flight_no', 'expected_flight_time', 'product', 'product_category', 'billing_location'],
  isTransit: '', // 是否中转
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
