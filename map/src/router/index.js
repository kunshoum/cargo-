import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout'
import MapDemo from '@/components/MapDemo'
import ActiveDemo from '@/components/activeDemo'
//统计
import Statistics from '@/pages/statistics/stat'
import Arrivalstat from '@/pages/statistics/arrivalstat'
//import Departurestat from '@/pages/statistics/departurestat'
import PunctualityRate from '@/pages/statistics/punctualityRate'

import FlightInfo from '@/pages/flightInfo/flight'
import Arrival from "@/pages/flightInfo/arrive"
import Departure from "@/pages/flightInfo/departure"
import HistoryMsg from "@/pages/flightInfo/history"

import WheelTracker from "@/pages/wheelTracker/tracker"
import Active from "@/pages/wheelTracker/active"
import Sleep from "@/pages/wheelTracker/sleep"
import History from "@/pages/wheelTracker/history"

// 基础数据
import BasicData from "@/pages/basicData/basicData"
import TrackerData from "@/pages/basicData/trackerData"
import FlightData from "@/pages/basicData/flightData"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      alias: '/',
      component: Layout,
      children: [
        {
          path: "/",
          component: MapDemo,
        },
        {
          path: "/active",
          component: ActiveDemo,
        },
        {
          path: "/flightInfo/:item?",
          component: FlightInfo,
          children: [
            {
              path: "/",
              components: {
                Arrivals: Arrival,
                Departures: Departure,
                HistoryMsg: HistoryMsg,
              },
            },
          ],
        },
        {
          path: "/wheelTracker/:item?",
          component: WheelTracker,
          children: [
            {
              path: "/",
              components: {
                Active: Active,
                Sleep: Sleep,
                History: History,
              },
            },
          ],
        },
        {
          path: "/Statistics/:item?",
          component: Statistics,
          children: [
            {
              path: "/",
              components: {
                Arrivalstat: Arrivalstat,
//              Departurestat: Departurestat,
                PunctualityRate: PunctualityRate,
              },
            },
          ],
        },
        {
          path: "/basicData/:item?",
          component: BasicData,
          children: [
            {
              path: "/",
              components: {
                TrackerData: TrackerData,
                FlightData: FlightData,
              },
            },
          ],
        },
      ]
    }
  ]
})
