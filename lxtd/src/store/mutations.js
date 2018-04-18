//马少良

//王艺蒙
import {
  TOGGLE_SIDEBAR,
  CHANGE_TOPTITLE,
  ADD_FOOTNAV,
  CLOSE_FOOTNAV,
  CHANGE_RECEIVEMAIN,
  CHANGE_RECEIVESUB,
  CHANGE_CAEINFO,
  CHANGE_MAILINFO,
  GET_BINDORDER,
  GET_VOLUMELIST,
  GET_CUSTOMLIST,
  GET_COSTLIST,
  GET_BINDEDLIST,
  GET_BINDLIST,
  GET_FLIGHTNO,
  GET_FLIGHTDATE,
  GET_VOLUME,
  GET_WEIGHT,
  GET_ORDERNO,
  GET_SUMCOST,
  GET_CLEARUNIT,
  GET_NATIVE_BINDEDLIST,
  CHANGE_TYPE,
  CHANGE_ORDER_TYPE,
  CHANGE_BINDEDPIECE,
  ARRIVE_MAIN_ORDER,
  GET_PIECE,
  GET_ALLBINDLIST,
  BOOKING_NO,   //航班号
  BOOKING_DATA,  //航班日期
  DEPARTURE,   //始发站
  DESTINATION,   //目的站
  CHANGE_STOWAGESTEP,
  CHANGE_FLIGHTINGO,
  TICKET_BATCH,
  TICKET_ENTRY,
  GET_SENDER,
  GET_COSTSUMLIST,
  CHANGE_COSTABOUT,
  LOOK_ID,
  OUT_LET,
  ROOM_NAME,
  KU_WE,
  GET_MAINORDERNO,
  CHANGE_ARRIVALMAIN,
  CHANGE_ARRIVALSUB,
  GET_PAYER,
  GET_DELIVERTMODE,
  GET_AGENCYFUND,
  CHANGE_REGISTERINFO,
  CHANGE_DEALINFO,
  IS_CHANGE,
  IS_CHANGE_NUM,
  PLAN_FLYDATE,
  CHECK_ALLCASH,
  CHANGE_BINDFILTER,
  GET_ISTRANSIT,
} from './mutation-types.js'

import {getStore} from "../config/localStore"
import { splitCodeName } from "@/utils/split"

export default {
  [TOGGLE_SIDEBAR] (state, nowBar) {
    if(nowBar === 'ShortCut') {
      state.sideBar = 'LMenu'
    }

    if(nowBar === 'LMenu') {
      state.sideBar = 'ShortCut'
    }
  },
  [CHANGE_TOPTITLE] (state, title) {
    state.topTitle = title
  },
  [ADD_FOOTNAV] (state, item) {
    let isHave = state.footNavs.filter(nav => {
      return nav.name === item.name
    }).length

    if(!isHave) {
      state.footNavs.push(item)
    }
  },
  [CLOSE_FOOTNAV] (state, name) {
    state.footNavs.forEach((item, index) => {
      if(item.name === name) {
        state.footNavs.splice(index, 1)
      }
    })
  },
  [CHANGE_RECEIVEMAIN] (state, info) {
    state.receiveMain = JSON.parse(JSON.stringify(info))
  },
  [CHANGE_RECEIVESUB] (state, info) {
    state.receiveSub = JSON.parse(JSON.stringify(info))
  },
  [CHANGE_CAEINFO] (state, info) {
    state.caeInfo = JSON.parse(JSON.stringify(info))
  },
  [CHANGE_MAILINFO] (state, info) {
    state.mailInfo = JSON.parse(JSON.stringify(info))
  },
  [GET_BINDORDER] (state, bindOrder) {
    state.bindOrder = bindOrder
  },
  [GET_VOLUMELIST] (state, volumeList) {
    state.volumeList = volumeList
    state.volumeList.push({
      length: '',
      width: '',
      height: '',
      quantity: '',
      volume: '',
      volume_weight: '',
    })
  },
  [GET_CUSTOMLIST] (state, customList) {
    state.customList = customList
    state.customList.push({entry_person: getStore('real_name')})
  },
  [GET_COSTLIST] (state, costList) {
    state.costList = costList
    state.costList.push({
      cost_name: "",
      payee: getStore('unit'),
      payer: splitCodeName(state.sender),
      relevance_name: "",
      invoice_price: "",
      invoice_choice_way: "",
      absolute_cost: "",
      actual_cost: "",
      is_lock: "",
      remark: "",
      impact: 1,
      is_sys_cost: 1,
      related_type: 0,
      relevance_id: '',
    })
  },
  [GET_BINDEDLIST] (state, bindedList) {
    state.bindedList = bindedList
  },
  [GET_FLIGHTNO] (state, flightNo) {
    state.flightNo = flightNo
  },
  [GET_FLIGHTDATE] (state, flightDate) {
    state.flightDate = flightDate
  },
  [GET_VOLUME] (state, volume) {
    state.sumVolume = volume
  },
  [GET_WEIGHT] (state, weight) {
    state.sumWeight = weight
  },
  [GET_ORDERNO] (state, orderNo) {
    state.orderNo = orderNo
  },
  [GET_BINDLIST] (state, bindList) {
    state.bindList = bindList
  },
  [GET_SUMCOST] (state, sumCost) {
    state.sumCost = sumCost
  },
  [GET_CLEARUNIT] (state, clearUnit) {
    state.clearUnit = clearUnit
  },
  [GET_NATIVE_BINDEDLIST] (state, list) {
    state.nativeBindedList = list
  },
  [CHANGE_TYPE] (state, type) {
    state.type = type
  },
  [CHANGE_ORDER_TYPE] (state, orderType) {
    state.orderType = orderType
  },
  [CHANGE_BINDEDPIECE] (state, piece) {
    state.bindedPiece = piece
  },
  [ARRIVE_MAIN_ORDER] (state, orderNo) {
    state.arriveMainOrder = orderNo
  },
  [GET_PIECE] (state, piece) {
    state.sumPiece = piece
  },
  
  [GET_ALLBINDLIST] (state, list) {
    state.allBindList = list
  },
  [BOOKING_NO] (state, bookingNo) {
  	state.bookingNo = bookingNo
  },
  [BOOKING_DATA] (state, bookingData) {
  	state.bookingData = bookingData
  },
  [DEPARTURE] (state, departure) {
  	state.departure = departure
  },
  [DESTINATION] (state, destination) {
  	state.destination = destination
  },
  [CHANGE_STOWAGESTEP] (state, step) {
    state.nowStowageStep = step
  },
  [TICKET_BATCH] (state, idList) {
    state.idList = idList
  },
  [CHANGE_FLIGHTINGO] (state, info) {
    state.flightInfo = JSON.parse(JSON.stringify(info))
  },
  [GET_SENDER] (state, sender) {
    state.sender = sender
  },
  [GET_COSTSUMLIST] (state, list) {
    state.costSumList = list
  },
  [CHANGE_COSTABOUT] (state, info) {
    state.costAbout = info
  },
  [LOOK_ID] (state, info) {
    state.lookId = info
  },
  [OUT_LET] (state, info) {
    state.outLet = info
  },
  [ROOM_NAME] (state, info) {
    state.roomname = info
  },
  [KU_WE] (state, info) {
    state.kuwe = info
  },
  [IS_CHANGE] (state, info) {
    state.isChange = info
  },
  [IS_CHANGE_NUM] (state, info) {
    state.isChangeNum = info
  },
  [GET_MAINORDERNO] (state, mainOrderNo) {
    state.mainOrderNo = mainOrderNo
  },
  [CHANGE_ARRIVALMAIN] (state, info) {
    state.arrivalMain = JSON.parse(JSON.stringify(info))
  },
  [CHANGE_ARRIVALSUB] (state, info) {
    state.arrivalSub = JSON.parse(JSON.stringify(info))
  },
  [GET_PAYER] (state, payer) {
    state.payer = payer
  },
  [GET_DELIVERTMODE] (state, deliveryMode) {
    state.deliveryMode = deliveryMode
  },
  [GET_AGENCYFUND] (state, agencyFund) {
    state.agencyFund = agencyFund
  },
  [CHANGE_REGISTERINFO] (state, registerInfo) {
    state.registerInfo = registerInfo
  },
  [CHANGE_DEALINFO] (state, dealInfo) {
    state.dealInfo = dealInfo
  },
  [PLAN_FLYDATE] (state, date) {
    state.planFlyDate = date
  },
  [CHECK_ALLCASH] (state, checkAllcash) {
    state.checkAllcash = checkAllcash
  },
  [CHANGE_BINDFILTER] (state, fliterList) {
    state.bindFilterItems = fliterList
  },
  [GET_ISTRANSIT] (state, isTransit) {
    state.isTransit = isTransit
  }
}