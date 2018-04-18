<template>
  <div class="Main">
    <div id="map"></div>
    <flight-info v-show="flightInfoVisible" @close="close" :info="flightInfo"/>
    <wheel-info v-show="wheelInfoShow" @close="close" :devCode="devCode" :trackerStatus="trackerStatus"/>
    <map-setting v-show="settingVisible" @changeMapType="changeMapType" @toggleFlightLayer="toggleFlightLayer" @toggleTrackerLayer="toggleTrackerLayer"/>
    <right-menu @changeSettingVisible="changeSettingVisible" @zoom="zoomMap" @showSearch="showSearch"/>
    <el-input
      v-show="searchVisible"
      class="search"
      placeholder="Search"
      v-model="searchInfo"
      @keyup.enter.native="search">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
</template>

<script>
import WheelInfo from "@/pages/wheelTracker/WheelInfo.vue"
import FlightInfo from "@/pages/flightInfo/flightInfo.vue"
import MapSetting from "@/pages/mapSetting"
import RightMenu from "@/pages/mapSetting/rightMenu"

import { resetApi, getFlightDetail, getFlightInfo } from "@/service"
import resetCoordinate from "@/utils/resetCoordinate"
import { flatten } from "@/utils/dataMethods"
import { baseUrl } from "@/config/env"

export default {
  name: 'MapDemo',

  data () {
    return {
      map: null,
      // 116.602502, 40.080596 北京
      // 108.768563, 34.441817 西安
      center: [108.768563, 34.441817],
      phoneMarkers: [],
      phonePosList: [],
      flightMarkers: [],
      flightPosList: [],
      trackerLines: [],
      flightLines: [],
      flightPosData: [],
      phonePosData: [],
      iconImage: require("@/images/wheel_tracker.png"),
      activeIconImage: require("@/images/wheel_tracker_normal.png"),
      flightImage: require("@/images/flight.png"),
      hasPhoneMarker: false,
      hasFlightMarker: false,
      flightInfoVisible: false,
      wheelInfoShow: false,
      settingVisible: false,
      devCode: "",
      zoom: 15,
      trackerGroups: [],
      calcAngleArr: [],
      angleArr: [],
      historyAngleArr: [],
      flightInfo: {},
      flightPath: null,
      nowZoom: 15,
      airSocket: null,
      trackerSocket: null,
      routeSocket: null,
      routeItem: null,
      initSize: 20,
      nowSize: 20,
      activeIcon: null,
      showPath: false,
      showFlight: true,
      showTracker: true,
      trackerStatus: "",
      searchVisible: false,
      searchInfo: "",
    }
  },

  components: {
    FlightInfo,
    WheelInfo,
    MapSetting,
    RightMenu,
  },

  mounted() {
    this.loadMap()
    // this.phoneSocket()
    this.flightSocket()
    this.openRouteSocket()
  },

  beforeDestroy() {
    this.airSocket && this.airSocket.close()
    this.trackerSocket && this.trackerSocket.close()
    this.routeSocket && this.routeSocket.close()
  },

  watch: {
    "phonePosList.length"(len) {
      if(len) {
        this.hasPhoneMarker = false
      }
    },
    "flightPosList.length"(len) {
      if(len) {
        this.hasFlightMarker = false
      }
    }
  },

  methods: {
    showSearch() {
      this.settingVisible = false
      this.searchVisible = !this.searchVisible
    },
    setCenter(center) {
      this.map.setCenter(center)
    },
    search() {
      console.log("search")
      getFlightInfo({flightNo: this.searchInfo}).then(res => {
        if(res.data.status === 200) {
          let info = res.data.data[0]
          let center = new AMap.LngLat(info.longitude*1, info.latitude*1)
          this.setCenter(center)
          this.getFlightRouter(info)
        }
      })
      // console.log(item)
    },
    // 展示隐藏飞机图层
    toggleFlightLayer(state) {
      console.log(state)
      this.showFlight = state
      if(state) {
        // this.showPath && this.flightPath && this.flightPath.setMap(this.map)
        this.showFlightMarker()
      }else {
        this.flightPath && this.flightPath.setMap(null)
        this.clearFlightMarker()
        this.flightInfoVisible = false
      }
    },
    // 展示隐藏轮挡图层
    toggleTrackerLayer(state) {
      console.log(state)
      this.showTracker = state
      if(state) {
        this.showPhoneMarker()
      }else {
        this.clearPhoneMarker()
        this.wheelInfoShow = false
      }
    },
    getDis(nativeArr) {
      // 用线连接同一组轮挡
      let arr = JSON.parse(JSON.stringify(nativeArr))
      this.trackerGroups = []
      this.getWheelTrackerGroup(arr)
      this.trackerLines = this.trackerGroups.map(path => {
        return new AMap.Polygon({
          path: path,
          strokeColor: "#99CCFF",
          fillColor: "#FFFFCC",
          fillOpcity: 0.1,
        })
      })

      this.isInRange()
    },
    getWheelTrackerGroup(arr) {
      // 将位置相近的三个轮挡分为一组
      if(arr.length < 3) {
        return
      }

      let res = []
      let firstPoint = arr.splice(0, 1)
      res.push(firstPoint[0])
      let disToPointArr = arr.map((item, index) => {
        return {
          dis: AMap.GeometryUtil.distance(item, firstPoint[0]),
          index: index
        }
      }).sort((a, b) => {
        return a.dis - b.dis
      })
      
      res.push(arr.splice(disToPointArr[0].index, 1)[0], arr.splice(disToPointArr[1].index - 1, 1)[0])
      this.trackerGroups.push(res)
      this.getWheelTrackerGroup(arr)
    },
    close() {
      this.flightInfoVisible = false
      this.wheelInfoShow = false
    },
    changeSettingVisible() {
      this.searchVisible = false
      this.settingVisible = !this.settingVisible
    },
    // 缩放地图
    zoomMap(type) {
      if(type === "add") {
        this.map.zoomIn()
      }else {
        this.map.zoomOut()
      }
    },
    // 改变地图类型
    changeMapType(type) {
      console.log(type)
      if(type === "Satellite") {
        this.map.setLayers([new AMap.TileLayer(), new AMap.TileLayer.Satellite()])
        return
      }

      if(type === "Roadmap") {
        this.map.setLayers([new AMap.TileLayer(), new AMap.IndoorMap()])
        return
      }
    },
    openRouteSocket() {
      let This = this
      let url = "ws://" + baseUrl.split("//")[1] + "/flight_route_send"
      this.routeSocket = new WebSocket(url)
      this.routeSocket.onopen = () => {
        console.log('route socket connect')
      }
      this.routeSocket.onmessage = function(evt) {
        This.routeItem = JSON.parse(evt.data)
        if(This.routeItem && This.showPath && This.showFlight) {
          This.showFlightPath()
        }
      }
    },
    // 转换坐标数据
    resetNativeData(data, type) {
      let param = data.map(v => {
        if(type === "flight") {
          return [v.longitude*1, v.latitude*1]
        }

        if(type === "tracker") {
          return [v.lng*1, v.lat*1]
        }
      })

      return resetCoordinate(param)
    },
    flightSocket() {
      let This = this
      let url = "ws://" + baseUrl.split("//")[1] + "/ads_b_send"
      this.airSocket = new WebSocket(url)
      this.airSocket.onopen = () => {
        console.log('flight socket connect')
        let isDebug = JSON.stringify({is_debug: 0})
        This.airSocket.send(isDebug)
      }

      this.airSocket.onmessage = async function(evt) {
        if(!This.showFlight) {
          return
        }

        This.flightPosList = JSON.parse(evt.data)
        // let flightPosData = await This.resetNativeData(This.flightPosList, "flight") || []
        // This.flightPosData = flatten(flightPosData)

        This.getCalcAngleArr()
        This.changeFlightMarkers()
        This.updateFlightMarkerPos()
      }
    },
    phoneSocket() {
      let This = this
      let url = "ws://" + baseUrl.split("//")[1] + "/wheel_block_send"
      this.trackerSocket = new WebSocket(url)
      this.trackerSocket.onopen = () => {
        console.log('socket connect')
        let isDebug = JSON.stringify({is_debug: 0})
        This.trackerSocket.send(isDebug)
      }

      this.trackerSocket.onmessage = async function(evt) {
        if(!This.showTracker) {
          return
        }

        This.phonePosList = JSON.parse(evt.data)
        // let phonePosData = await This.resetNativeData(This.flightPosList, "flight") || []
        // This.phonePosData = flatten(phonePosData)
        // let arr = This.phonePosList.map(item => {
        //   return [item.lng*1, item.lat*1]
        // })

        // This.clearTrackerLine()
        // This.getDis(arr)
        This.changePhoneMarkers()
        This.updatePhoneMarkerPos()
      }
    },
    // 筛选出与飞机坐标重叠的轮挡组，并连接
    isInRange() {
      if(this.flightPosList.length && this.trackerLines.length) {
        let posList = this.flightPosList.map(item => new AMap.LngLat(item.longitude*1, item.latitude*1))
        this.trackerLines.filter(item => posList.some(pos => item.contains(pos)))
                         .forEach(item => { item.setMap(this.map) })
      }
    },
    // 实时计算飞机角度
    getCalcAngleArr() {
      if(!this.flightPosList.length) {
        return
      }

      let calcItemArr = this.flightPosList.map(item => {
        return {
          x: item.latitude*1, 
          y:item.longitude*1,
        }
      })

      this.calcAngleArr.push(calcItemArr)
      if(this.calcAngleArr.length > 2) {
        this.calcAngleArr.shift()
      }

      this.calcAngle()
    },
    calcAngle() {
      let calc = (p_start, p_end) => {
        if(p_start && p_end) {
          let diff_x = p_end.x - p_start.x
          let diff_y = p_end.y - p_start.y
          return 360*Math.atan2(diff_y, diff_x)/(2*Math.PI) + 135
        }
      }
      
      if(this.angleArr) {
        this.historyAngleArr = this.angleArr
      }

      let arr = this.calcAngleArr
      if(arr.length === 2) {
        this.angleArr = arr[0].map((item, index) => {
          return calc(arr[0][index], arr[1][index])
        })

        this.angleArr.forEach((angle, index) => {
          if((angle - 135) === 0) {
            this.historyAngleArr[index] ? this.angleArr[index] = this.historyAngleArr[index] : this.angleArr[index] = 135
          }
        })
      }
    },
    // 点击轮挡图标时触发
    markerClick(e) {
      this.devCode = e.target.content.devCode
      this.trackerStatus = e.target.content.dev_status
      this.flightInfoVisible = false
      this.wheelInfoShow = true
    },
    // 点击飞机图标时触发
    getFlightRouter(info) {
      getFlightDetail({icao: info.icao, generated_date: info.generated_date, is_debug: 0}).then(res => {
        if(res.data.status === 200) {
          this.flightInfo = res.data.data[0]
          this.wheelInfoShow = false
          this.flightInfoVisible = true
        }
      })

      this.routeSocket.close()
      this.openRouteSocket()
      let sendInfo = {
        icao: info.icao, 
        generated_date: info.generated_date,
        is_debug: 0
      }
      sendInfo = JSON.stringify(sendInfo)

      let This = this
      this.routeSocket.onopen = function(evt) { 
        This.routeSocket.send(sendInfo)
      }
      
      this.showPath = true
    },
    flightClick(e) {
      let info = e.target.content
      this.getFlightRouter(info)
    },
    // 展示航班轨迹
    showFlightPath() {
      if(!this.routeItem.ruteList) {
        return
      }

      if(this.flightPath) {
        this.flightPath.setMap(null)
      }
      let path = this.routeItem.ruteList.map(item => {
        return [item.longitude*1, item.latitude*1]
      })

      this.flightPath = new AMap.Polyline({
        map: this.map,
        path: path,
        strokeColor: "#FFCC00",
      })
    },
    // 标记数变化时清除之前标记
    clearPhoneMarker() {
      if(this.phoneMarkers.length) {
        this.phoneMarkers.forEach(item => {
          item.setMap(null)
        })
      }
    },
    // 清除飞机图标
    clearFlightMarker() {
      if(this.flightMarkers.length) {
        this.flightMarkers.forEach(item => {
          item.setMap(null)
        })
      }
    },
    showPhoneMarker() {
      if(this.phoneMarkers.length) {
        this.phoneMarkers.forEach(item => {
          item.setMap(this.map)
        })
      }
    },
    showFlightMarker() {
      if(this.flightMarkers.length) {
        this.flightMarkers.forEach(item => {
          item.setMap(this.map)
        })
      }
    },
    // 清除轮挡连线
    clearTrackerLine() {
      if(this.trackerLines.length) {
        this.trackerLines.forEach(item => {
          item.setMap(null)
        })
      }
    },
    // 飞机图标
    flightMarker() {
      let icon = new AMap.Icon({
        image : this.flightImage,
        imageSize : new AMap.Size(this.nowSize,this.nowSize),
        size: new AMap.Size(this.nowSize,this.nowSize),
      })

      return new AMap.Marker({
        icon: icon,
        map: this.map,
        offset : new AMap.Pixel(-this.nowSize/2,-this.nowSize/2),
      })
    },
    // 更新飞机状态(位置，角度)
    updateFlightMarkerPos() {
      if(!this.flightPosList.length) {
        return
      }
      
      this.flightPosList.forEach((item, index) => {
        let pos = new AMap.LngLat(item.longitude*1, item.latitude*1)
        let marker = this.flightMarkers[index]

        if(marker) {
          marker.setPosition(pos)
          typeof this.angleArr[index] === "number" && marker.setAngle(this.angleArr[index])
          marker.content = item
          marker.on('click', this.flightClick)
        }
      })
    },
    // 飞机数量发生变化
    changeFlightMarkers() {
      if(this.flightPosList.length && !this.hasFlightMarker) {
        console.log("changeFlightMarkers")
        this.clearFlightMarker()
        this.flightMarkers = this.flightPosList.map(item => {
          return this.flightMarker()
        })
        this.hasFlightMarker = true
      }
    },
    // 创建标记
    phoneMarker(state) {
      let icon = null
      if(!state) {
        icon = this.unActiveIcon
      }else if(state === "active") {
        icon = this.activeIcon
      }else if(state === "unActiveIcon") {
        icon = this.unActiveIcon
      }
      
      return new AMap.Marker({
        icon: icon,
        map: this.map,
        offset : new AMap.Pixel(-12,-12),
      })
    },
    // 更新轮挡状态(位置，图标)
    updatePhoneMarkerPos() {
      this.phonePosList.forEach((item, index) => {
        let pos = new AMap.LngLat(item.lng*1, item.lat*1)
        let marker = this.phoneMarkers[index]
        if(this.phonePosList[index].dev_status === 1)  {
          this.phoneMarkers[index] && this.phoneMarkers[index].setIcon(this.activeIcon)
        }else {
          this.phoneMarkers[index] && this.phoneMarkers[index].setIcon(this.unActiveIcon)
        }
        
        if(marker) {
          marker.setPosition(pos)
          marker.content= item
          marker.on('click', this.markerClick)
        }
      })
    },
    // 轮挡数量发生变化
    changePhoneMarkers() {
      if(this.phonePosList.length && !this.hasPhoneMarker) {
        console.log("changePhoneMarkers")
        this.clearPhoneMarker()
        this.phoneMarkers = this.phonePosList.map(item => {
          if(item.dev_status === 1) {
            return this.phoneMarker("active")
          }else {
            return this.phoneMarker("unActiveIcon")
          }
        })
        this.hasPhoneMarker = true
      }
    },
    // 改变飞机图标尺寸
    changeFlightMarkerSize() {
      if(this.nowZoom > 15) {
        this.nowSize = this.initSize * Math.pow(2, (this.nowZoom - 15)) * 0.8
      }else {
        this.nowSize = 20
      }

      let icon = new AMap.Icon({
        image : this.flightImage,
        imageSize : new AMap.Size(this.nowSize,this.nowSize),
        size: new AMap.Size(this.nowSize,this.nowSize),
      })

      this.flightMarkers.forEach(item => {
        item.setOffset(new AMap.Pixel(-this.nowSize/2,-this.nowSize/2))
        item.setIcon(icon)
      })
    },
    addMapEvent() {
      let This = this
      this.map.on('click', function(e) {
        console.log(e.lnglat.getLng(), e.lnglat.getLat())
        This.wheelInfoShow = false
        This.flightInfoVisible = false

        This.showPath = false
        This.flightPath && This.flightPath.setMap(null)
        This.routeSocket && This.routeSocket.close()
      })

      this.map.on('zoomchange', function(e) {
        This.nowZoom = This.map.getZoom()
        console.log(This.nowZoom)
        This.changeFlightMarkerSize()
      })
    },
    loadTool() {
      let toolBar = new AMap.ToolBar({
        offset: new AMap.Pixel(10, 80)
      })
      this.map.addControl(toolBar)

      let scale = new AMap.Scale()
      this.map.addControl(scale)
    },
    loadMap() {
      this.map = new AMap.Map('map', {
        resizeEnable: true,
        // expandZoomRange:true,
        // zooms:[3,20],
        zoom: this.zoom,
        center: this.center,
        // layers: [new AMap.TileLayer(), new AMap.TileLayer.Satellite()],
      })

      this.addMapEvent()
      this.loadTool()
      
      this.activeIcon = new AMap.Icon({
        image : this.activeIconImage,
        imageSize : new AMap.Size(24,24),
        size: new AMap.Size(24,24),
      })

      this.unActiveIcon = new AMap.Icon({
        image : this.iconImage,
        imageSize : new AMap.Size(24,24),
        size: new AMap.Size(24,24),
      })
    },
  },
}
</script>

<style lang="less">
  .Main {
    height: 100%;
    .search {
      position: absolute;
      top: 88px;
      right: 68px;
      width: 348px;
      height: 60px;
      z-index: 999;

      .el-input__inner {
        background: rgba(0,84,138,0.8) !important;
        border: 1px solid #00335D !important;
        border-radius: 20px !important;
        color: #f2f2f2 !important;
        text-align: center;
        font-size: 20px !important;

        &::-webkit-input-placeholder{
          color:#ccc !important;
        }
      }

      .el-input__prefix {
        left: 20px;
        top: -10px;
      }

      .el-icon-search {
        color: #fff !important;
        font-size: 20px;
        font-weight: bold;
      }
    }
    #map {
      height: 100%;
    }
  }
</style>
