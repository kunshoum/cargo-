

//王艺蒙
//马少良

import Vue from "vue"
import Router from "vue-router"

import Layout from "@/components/Layout"
import Login from "@/components/Login"
import Welcome from "@/components/Welcome"
import Home from "@/components/Home"

// Common
import Cost from "@/pages/common/cost"
import Bind from "@/pages/common/bind"
import Volume from "@/pages/common/volume"
import Deparr from "@/pages/common/deparr"
import Flight from "@/pages/common/flight"

// 收货
import Receive from "@/pages/receive/receive"
import ReceiveSearch from "@/pages/receive/search"
import ReceiveBilling from "@/pages/receive/billing"
import ReceiveDetail from "@/pages/receive/detail"

// 民航快递
import Cae from "@/pages/cae/cae"
import CaeSearch from "@/pages/cae/search"
import CaeBilling from "@/pages/cae/billing"
import CaeDetail from "@/pages/cae/detail"

// 邮件
import Mail from "@/pages/mail/mail"
import MailSearch from "@/pages/mail/search"
import MailBilling from "@/pages/mail/billing"
import MailDetail from "@/pages/mail/detail"

// 出港-订舱
import Booking from "@/pages/departure/booking/booking"
import BookingByFlight from "@/pages/departure/booking/byFlight"
import NormalBooking from "@/pages/departure/booking/normal"
import BookingList from "@/pages/departure/booking/bookingList"
import BookingLog from "@/pages/departure/booking/log"

// 出港-配载
import Stowage from "@/pages/departure/stowage/stowage"
import StowageBooking from "@/pages/departure/stowage/booking"
import StowageList from "@/pages/departure/stowage/list"
import StowageStart from "@/pages/departure/stowage/start"
import StowageEnd from "@/pages/departure/stowage/end"
import FlightClose from "@/pages/departure/stowage/close"
import StowageByFlight from "@/pages/departure/stowage/byFlight" // 按航班配载

// 进港主单
import Arrival from "@/pages/arrival/arrival"
import ArrSearch from "@/pages/arrival/search"
import ArrBilling from "@/pages/arrival/billing"
import ArrDetail from "@/pages/arrival/detail"
import AbnormalGoods from "@/pages/arrival/abnormalGoods"

// delivery提货主单
import Delivery from "@/pages/delivery/delivery"
import DeliverySearch from "@/pages/delivery/search"
import DeliveryBilling from "@/pages/delivery/billing"
import DeliveryDetail from "@/pages/delivery/detail"

//基础数据
import BasicData from "@/pages/basicData/basicData"
import BasicDataSearch from "@/pages/basicData/search"

// 报表
import Report from "@/pages/reportForm/report"

import ReportSale from "@/pages/reportForm/reportSale"
import ReportProfit from "@/pages/reportForm/reportProfit"
import ReportPickup from "@/pages/reportForm/arrivePickup"

//仓库
import storeRoom from "@/pages/storeRoom/storeRoom"
import storeSearch from "@/pages/storeRoom/search"
import storeDetail from "@/pages/storeRoom/detail"

//系统设置
import System from "@/pages/system/system"
import ByUser from "@/pages/system/byUser" //用户
import ByDepart from "@/pages/system/byDepart" //部门
import ByPersonal from "@/pages/system/byPersonal" //个人
import LoginDaily from "@/pages/system/loginDaily" //登陆日志

//票证管理
import Ticket from "@/pages/ticket/ticket"
import Management from "@/pages/ticket/management" //票证状态管理
import CurrentOperation from "@/pages/ticket/currentOperation" //票证操作
import Entry from "@/pages/ticket/entry" //票证入库
import Division from "@/pages/ticket/division" //票证分领
import Daily from "@/pages/ticket/daily" //票证日志
import difDaily from "@/pages/ticket/difdaily" //异常票证日志

// 预付款管理
import Prepay from "@/pages/prepay" // 预付款管理
import PrepayManagement from "@/pages/prepay/management" // 预付款管理
import PrepayLog from "@/pages/prepay/log" // 预付款日志

// 收付款管理
import Repayment from "@/pages/repayment/repayment" // 收付款管理
import RepaymentbillQuery from "@/pages/repayment/billquery" // 运单查询
import RepaymentList from "@/pages/repayment/list" // 结算单查询
import RepaymentCash from "@/pages/repayment/cash" // 收、付款单
import RepaymentCollect from "@/pages/repayment/collect" // 单票收付款

// 航班管理
import Flights from "@/pages/flight"
import FlightManagement from "@/pages/flight/management"

// 平衡表
import BalanceTable from "@/pages/balance/table"

// echarts
import ChartDemo from "@/pages/echarts/demo"

// 特殊设置
import SpecialSetting from "@/pages/SpecialSetting/special"

Vue.use(Router)

import { getStore } from "../config/localStore.js"

export const router = new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/",
      name: "Welcome",
      component: Welcome,
      meta: { requiresAuth: true },
    },
    {
      path: "/index",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/home",
          name: "Home",
          component: Home,
        },
        {
          path: "/receive/:type", // 主单
          component: Receive,
          props: route => ({
            type: 0,
            order_type: route.params.type === "main" ? 0 : 1,
          }),
          children: [
            { path: "", component: ReceiveSearch },
            { path: "search", component: ReceiveSearch, name: "ReceiveSearch" },
            {
              path: "billing/:item/:id?",
              component: ReceiveBilling,
              children: [
                {
                  path: "",
                  components: {
                    detail: ReceiveDetail,
                    cost: Cost,
                    bind: Bind,
                    volume: Volume,
                    deparr: Deparr,
                    flight: Flight,
                  },
                },
              ],
            },
          ],
        },
        {
          path: "/cae", // 民航快递
          component: Cae,
          props: { type: 0, order_type: 3 },
          children: [
            { path: "", component: CaeSearch },
            { path: "search", component: CaeSearch, name: "CaeSearch" },
            {
              path: "billing/:item/:id?",
              component: CaeBilling,
              children: [
                {
                  path: "",
                  components: {
                    detail: CaeDetail,
                    cost: Cost,
                    bind: Bind,
                    volume: Volume,
                    deparr: Deparr,
                    flight: Flight,
                  },
                },
              ],
            },
          ],
        },
        {
          path: "/mail", // 邮件
          component: Mail,
          props: { type: 0, order_type: 2 },
          children: [
            { path: "", component: MailSearch },
            { path: "search", component: CaeSearch, name: "MailSearch" },
            {
              path: "billing/:item/:id?",
              component: MailBilling,
              children: [
                {
                  path: "",
                  components: {
                    detail: MailDetail,
                    cost: Cost,
                    bind: Bind,
                    volume: Volume,
                    deparr: Deparr,
                    flight: Flight,
                  },
                },
              ],
            },
          ],
        },
        {
          path: "/booking", // 订舱
          component: Booking,
          children: [
            { path: "byflight/:item?/:id?", component: BookingByFlight },
            { path: "normal", name: "Normal", component: NormalBooking },
            { path: "list", component: BookingList },
            { path: "log", component: BookingLog },
          ],
        },
        {
          path: "/stowage", // 配载
          component: Stowage,
          children: [
            { path: "booking", component: StowageBooking, name: "StowageBooking" },
            { path: "list", component: StowageList, name: "StowageList" },
            { path: "start", component: StowageStart, name: "StowageStart" },
            { path: "end", component: StowageEnd, name: "StowageEnd" },
            { path: "close", component: FlightClose, name: "FlightClose" },
            { path: "byFlight", component: StowageByFlight, name: "StowageByFlight" },
          ],
        },
        {
          path: "/arrival/:type", // 进港主单
          component: Arrival,
          props: route => ({
            type: 2,
            order_type: route.params.type === "main" ? 0 : 1,
          }),
          children: [
            { path: "", component: ArrSearch },
            { path: "search", component: ArrSearch, name: "ArrSearch" },
            {
              path: "billing/:item/:id?",
              component: ArrBilling,
              children: [
                {
                  path: "",
                  components: {
                    detail: ArrDetail,
                    cost: Cost,
                    deparr: Deparr,
                    flight: Flight,
                    abnormalGoods: AbnormalGoods,
                  },
                },
              ],
            },
          ],
        },
        {
          path: "/delivery/:type", // 提货主单
          component: Delivery,
          props: route => ({
            type: 3,
            order_type: route.params.type === "main" ? 0 : 1,
          }),
          children: [
            { path: "", component: DeliverySearch },
            {
              path: "search",
              component: DeliverySearch,
              name: "DeliverySearch",
            },
            {
              path: "billing/:item/:id?",
              component: DeliveryBilling,
              children: [
                {
                  path: "",
                  components: {
                    detail: DeliveryDetail,
                    cost: Cost,
                    deparr: Deparr,
                  },
                },
              ],
            },
          ],
        },
        {
          path: "/basicData/:id", // 基础数据
          component: BasicData,
          children: [{ path: "", component: BasicDataSearch }],
        },
        {
          path: "/report/:id", // 报表
          component: Report,
        },
        {
          path: "/reportSale/:id", // 报表    云朵
          component: ReportSale,
        },
        {
          path: "/reportProfit/:id", // 报表     M
          component: ReportProfit,
        },
        {
          path: "/arrivePickup/:id", // 报表     M
          component: ReportPickup,
        },
        {
          path: "/storeRoom/:type", // 仓库
          component: storeRoom,

          children: [
            {
              path: "",
              component: storeSearch,
            },
            {
              path: "search",
              component: storeSearch,
              name: "storeSearch",
            },
            {
              path: "detail",
              component: storeDetail,
              name: "storeDetail",
            },
          ],
        },
        {
          path: "/repayment/:type", // 收付款管理
          component: Repayment,
          children: [
            {
              path: "",
              component: RepaymentbillQuery,
            },
            {
              path: "billSearch",
              component: RepaymentbillQuery,
              name: "RepaymentbillQuery",
            },
            {
              path: "list",
              component: RepaymentList,
              name: "RepaymentList",
            },
            {
              path: "cash",
              component: RepaymentCash,
              name: "RepaymentCash",
            },
            {
              path: "collect",
              component: RepaymentCollect,
              name: "RepaymentCollect",
            },
          ],
        },
        {
          path: "/system", // 系统设置
          component: System,
          children: [
            { path: "byUser/:item?/:id?", component: ByUser },
            { path: "byDepart/:item?/:id?", component: ByDepart },
            { path: "byPersonal/:item?/:id?", component: ByPersonal },
            { path: "loginDaily", component: LoginDaily },
          ],
        },
        {
          path: "/ticket", // 票证管理
          component: Ticket,
          children: [
            { path: "management", component: Management },
            { path: "currentOperation", component: CurrentOperation },
            { path: "entry", component: Entry },
            { path: "division", component: Division },
            { path: "daily", component: Daily },
            { path: "difdaily", component: difDaily },
          ],
        },
        {
          path: "/prepay", // 预付款管理
          component: Prepay,
          children: [{ path: "management", component: PrepayManagement }, { path: "log", component: PrepayLog }],
        },
        {
          path: "/flight", // 航班管理
          component: Flights,
          children: [{ path: "management", component: FlightManagement }],
        },
        {
          path: "/balance",
          component: BalanceTable,
        },
        {
          path: "/chart",
          component: ChartDemo,
        },
        {
          path: "/specialSetting",
          component: SpecialSetting,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!getStore("authList")) {
      next({
        path: "/login",
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
