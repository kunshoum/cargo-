<template>
  <div class="MapSetting">
    <ul class="nav">
      <li class="nav_item" v-for="(item, index) in navList" :class="{active: item.active}" 
      :key="index" @click="changeActive(item.name)">{{item.name}}</li>
    </ul>
    <div class="pane" v-if="this.nowActive === '地图'">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item class="form_item" label="地图风格">
          <el-select v-model="form.region" @change="changeMapType" popper-class="setting_list">
            <el-option label="路线图" value="Roadmap"></el-option>
            <el-option label="卫星" value="Satellite"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="亮度">
          <drag-line />
        </el-form-item>
        <el-form-item class="form_item" label="飞行层">
          <el-switch
            :width="50"
            @change = "toggleFlightLayer"
            v-model="form.flightLayer"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="轮挡层">
          <el-switch
            :width="50"
            @change = "toggleTrackerLayer"
            v-model="form.trackerLayer"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="日/夜在线">
          <el-switch
            :width="50"
            v-model="form.showLine"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="管制界限">
          <el-switch
            :width="50"
            v-model="form.atc"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="海洋轨道">
          <el-switch
            :width="50"
            v-model="form.tracks"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="航空图">
          <el-select v-model="form.charts" popper-class="setting_list">
            <el-option label="无" value="None"></el-option>
            <el-option label="助航标志" value="Navaids"></el-option>
            <el-option label="低海拔" value="Low Altitude"></el-option>
            <el-option label="高海拔" value="High Altitude"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="机场销">
          <el-switch
            :width="50"
            v-model="form.pins"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="机场能见度销">
          <drag-line />
        </el-form-item>
        <el-form-item class="form_item" label="飞机图标大小">
          <el-select v-model="form.size" popper-class="setting_list">
            <el-option label="自动" value="Auto"></el-option>
            <el-option label="小" value="Small"></el-option>
            <el-option label="中" value="Medium"></el-option>
            <el-option label="大" value="Large"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="动态飞机">
          <el-switch
            :width="50"
            v-model="form.animate"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item label="飞机标签">
          <el-switch
            :width="50"
            v-model="form.labels"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <div class="labels_wrap">
          <!-- <img src="../../images/label_example.png" alt=""> -->
          <el-form-item>
            <el-select v-model="form.label1" popper-class="setting_list">
              <el-option label="呼号" value="Callsign"></el-option>
              <el-option label="登记处" value="Registration"></el-option>
              <el-option label="航班号" value="Flight Number"></el-option>
              <el-option label="机型 & 登记处" value="Type & Registration"></el-option>
              <el-option label="海拔高度 & 速度" value="Altitude & Speed"></el-option>
              <el-option label="目的站 & 始发站" value="To & From"></el-option>
              <el-option label="机型" value="Type"></el-option>
              <el-option label="海拔高度" value="Altitude"></el-option>
              <el-option label="速度" value="Speed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.label2" popper-class="setting_list">
              <el-option label="呼号" value="Callsign"></el-option>
              <el-option label="登记处" value="Registration"></el-option>
              <el-option label="航班号" value="Flight Number"></el-option>
              <el-option label="机型 & 登记处" value="Type & Registration"></el-option>
              <el-option label="海拔高度 & 速度" value="Altitude & Speed"></el-option>
              <el-option label="目的站 & 始发站" value="To & From"></el-option>
              <el-option label="机型" value="Type"></el-option>
              <el-option label="海拔高度" value="Altitude"></el-option>
              <el-option label="速度" value="Speed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.label3" popper-class="setting_list">
              <el-option label="呼号" value="Callsign"></el-option>
              <el-option label="登记处" value="Registration"></el-option>
              <el-option label="航班号" value="Flight Number"></el-option>
              <el-option label="机型 & 登记处" value="Type & Registration"></el-option>
              <el-option label="海拔高度 & 速度" value="Altitude & Speed"></el-option>
              <el-option label="目的站 & 始发站" value="To & From"></el-option>
              <el-option label="机型" value="Type"></el-option>
              <el-option label="海拔高度" value="Altitude"></el-option>
              <el-option label="速度" value="Speed"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.label4" popper-class="setting_list">
              <el-option label="呼号" value="Callsign"></el-option>
              <el-option label="登记处" value="Registration"></el-option>
              <el-option label="航班号" value="Flight Number"></el-option>
              <el-option label="机型 & 登记处" value="Type & Registration"></el-option>
              <el-option label="海拔高度 & 速度" value="Altitude & Speed"></el-option>
              <el-option label="目的站 & 始发站" value="To & From"></el-option>
              <el-option label="机型" value="Type"></el-option>
              <el-option label="海拔高度" value="Altitude"></el-option>
              <el-option label="速度" value="Speed"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="标签背景色">
          <el-switch
            :width="50"
            v-model="form.bg"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="pane" v-if="this.nowActive === '天气'">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item class="form_item" label="Volcanic喷发（适用时）" label-width="240px">
          <el-switch
            :width="50"
            v-model="form.eruption"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="基本天气">
          <el-switch
            :width="50"
            v-model="form.weather"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="云">
          <el-switch
            :width="50"
            v-model="form.cloud"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="总降水量" label-width="200px">
          <el-switch
            :width="50"
            v-model="form.precipitation"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="强降水" label-width="200px">
          <el-switch
            :width="50"
            v-model="form.Intense"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="风">
          <el-select v-model="form.winds" popper-class="setting_list">
            <el-option label="Off" value="Off"></el-option>
            <el-option label="On" value="On"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="闪电">
          <el-switch
            :width="50"
            v-model="form.Lightning"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="重要气象情报/低空重要气象情报">
          <el-switch
            :width="50"
            v-model="form.Sigmets"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="高水平的重大天气" label-width="240px">
          <el-switch
            :width="50"
            v-model="form.significant"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="pane" v-if="this.nowActive === '能见度'">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item class="form_item head" label="数据源" label-width="200px"></el-form-item>
        <el-form-item class="form_item" label="ADS-B (Live)">
          <el-switch
            :width="50"
            v-model="form.adsb"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="MLAT (Live)">
          <el-switch
            :width="50"
            v-model="form.mlat"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="FLARM (Live)">
          <el-switch
            :width="50"
            v-model="form.flarm"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="美国/加拿大雷达（实况）" label-width="200px">
          <el-switch
            :width="50"
            v-model="form.radar"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="评估">
          <el-select v-model="form.estimations" popper-class="setting_list">
            <el-option label="关闭" value="Off"></el-option>
            <el-option label="5 分钟" value="5 mins"></el-option>
            <el-option label="15 分钟" value="15 mins"></el-option>
            <el-option label="30 分钟" value="30 mins"></el-option>
            <el-option label="60 分钟" value="60 mins"></el-option>
            <el-option label="120 分钟" value="120 mins"></el-option>
            <el-option label="240 分钟" value="240 mins"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item head" label="业务类型" label-width="200px"></el-form-item>
        <el-form-item class="form_item" label="空中飞机">
          <el-switch
            :width="50"
            v-model="form.airborne"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="地面飞机" label-width="200px">
          <el-switch
            :width="50"
            v-model="form.ground"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item label="地面交通工具">
          <el-switch
            :width="50"
            v-model="form.vehicles"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item label="滑翔机">
          <el-switch
            :width="50"
            v-model="form.gliders"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="pane" v-if="this.nowActive === '杂项'">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item class="form_item" label="显示跟踪工具提示" label-width="220px">
          <el-switch
            :width="50"
            v-model="form.showLine"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="隐藏飞机照片" label-width="220px">
          <el-switch
            :width="50"
            v-model="form.showLine1"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="最新消息" label-width="220px">
          <el-switch
            :width="50"
            v-model="form.showLine2"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="最新博客文章" label-width="220px">
          <el-switch
            :width="50"
            v-model="form.showLine3"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="社会媒体按钮" label-width="220px">
          <el-switch
            :width="50"
            v-model="form.showLine4"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item head" label="单位" label-width="200px"></el-form-item>
        <el-form-item class="form_item" label="当地时间">
          <el-switch
            :width="50"
            v-model="form.animate"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item label="12小时时钟">
          <el-switch
            :width="50"
            v-model="form.labels"
            active-color="#f8c023"
            inactive-color="#eee">
          </el-switch>
        </el-form-item>
        <el-form-item class="form_item" label="温度">
          <el-select v-model="form.temperature" popper-class="setting_list">
            <el-option label="℃" value="℃"></el-option>
            <el-option label="℉" value="℉"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="飞机速度">
          <el-select v-model="form.aircraftSpeed" popper-class="setting_list">
            <el-option label="节" value="Knots"></el-option>
            <el-option label="公里/小时" value="Km/h"></el-option>
            <el-option label="每小时英里数" value="Mph"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="垂直速度">
          <el-select v-model="form.verticalSpeed" popper-class="setting_list">
            <el-option label="Fpm" value="Fpm"></el-option>
            <el-option label="米/秒" value="M/s"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="风速">
          <el-select v-model="form.windSpeed" popper-class="setting_list">
            <el-option label="节" value="Knots"></el-option>
            <el-option label="公里/小时" value="Km/h"></el-option>
            <el-option label="每小时英里数" value="Mph"></el-option>
            <el-option label="每秒英里数" value="M/s"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_item" label="海拔高度">
          <el-select v-model="form.altitude" popper-class="setting_list">
            <el-option label="英尺" value="Feet"></el-option>
            <el-option label="米" value="Meters"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="距离">
          <el-select v-model="form.distance" popper-class="setting_list">
            <el-option label="公里" value="Km"></el-option>
            <el-option label="米" value="Miles"></el-option>
            <el-option label="牛顿米" value="Nm"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="foot">
      <span>重置全部</span>
    </div>
  </div>
</template>

<script>
  import DragLine from "./dragLine.vue"

  export default {
    data() {
      return {
        navList: [
          {
            name: "地图",
            active: true,
          },
          {
            name: "天气",
            active: false,
          },
          {
            name: "能见度",
            active: false,
          },
          {
            name: "杂项",
            active: false,
          },
        ],
        form: {
          name: 'Terrain',
          region: 'Roadmap',
          flightLayer: true,
          trackerLayer: true,
          charts: 'None',
          size: 'Auto',
          label1: '呼号',
          label2: '登记处',
          label3: '机型 & 登记处',
          label4: '航班号',
          winds: 'Off',
          estimations: '240 mins',
          temperature: '℃',
          aircraftSpeed: 'Knots',
          verticalSpeed: 'Fpm',
          windSpeed: 'Knots',
          altitude: 'Feet',
          distance: 'Km',
          showLine: false,
          atc: false,
          tracks: false,
        },
        nowActive: "地图",
      }
    },

    components: {
      DragLine,
    },

    methods: {
      changeActive(name) {
        this.nowActive = name
        this.navList.forEach(item => {
          if(name === item.name) {
            item.active = true
          }else {
            item.active = false
          }
        })
      },

      changeMapType(val) {
        this.$emit("changeMapType", val)
      },

      toggleFlightLayer(state) {
        this.$emit("toggleFlightLayer", state)
      },

      toggleTrackerLayer(state) {
        this.$emit("toggleTrackerLayer", state)
      }
    },
  }
</script>

<style lang="less">
  .MapSetting {
    position: absolute;
    top: 88px;
    right: 68px;
    width: 348px;
    height: auto;
    border-radius: 10px;
    z-index: 2000;
    background: rgba(0,107,176,0.7);
    box-shadow: 0 2px 10px 0 #E5E5E5;

    .nav {
      height: 40px;
      border-radius: 10px;
      background: #00335D;
      .nav_item {
        display: inline-block;
        height: 40px;
        width: 67px;
        color: #e5e5e5;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
      }
      .nav_item.active {
        background-color: rgba(0,107,176,0.7);
        color: #FFDF00;
      }
    }

    .pane {
      padding: 0 14px;
      height: calc(100% - 80px);
      max-height: 560px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0px;
      }
      // overflow-y: auto;
      .el-form {
        .form_item {
          border-bottom: 1px solid #00548A;
        }

        .head {
          .el-form-item__label {
            color: #FFDF00 !important;
          }
        }

        .el-form-item {
          height: 35px;
          margin-bottom: 0px;
          overflow: hidden;
          box-sizing: border-box;
          padding: 0 6px;

          .el-form-item__label {
            text-align: left;
            color: #fff;
            font-size: 14px;
            line-height: 34px;
          }

          .el-form-item__content {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 34px;
            .el-input {
              input {
                height: 24px;
                width: 168px;
                border: 1px solid #00548A;
                border-radius: 10px;
                background: #eee;
                color: #949494;
              }
            }
            .el-switch {
              width: 45px;
              height: 20px;
            }

            .el-input__inner {
              font-size: 12px !important;
            }
          }

          .el-switch {
            width: 50px !important;
          }
        }

        .labels_wrap {
          position: relative;
          img {
            position: absolute;
            width: 110px;
            height: 135px;
          }
        }
      }
    }

    .foot {
      height: 40px;
      background: #00335D;
      border-radius: 10px;
      text-align: center;
      line-height: 40px;
      color: #4A90E2;
      font-family: SIL-Hei-Med-Jian;
      font-size: 14px;

      span {
        cursor: pointer;
      }
    }
  }

  .setting_list {
    transform: translateY(-10px);
    .popper__arrow {
      display: none;
    }
    border-radius: 10px;
    .el-scrollbar__view {
      box-shadow: 1px 1px 10px 0 rgba(216,216,216,0.50);
    }
    .el-select-dropdown__item {
      height: 24px;
      border-radius: 12px;
      margin-bottom: 6px;
      font-family: SIL-Hei-Med-Jian;
      font-size: 14px;
      color: #9C9C9A;
      span {
        display: inline-block;
        height: 24px;
        line-height: 24px !important;
        vertical-align: top;
      }
    }
    .el-select-dropdown__item.hover {
      background: #F1FBFD;
      color: #4A90E2;
    }
    .el-select-dropdown__item.selected {
      color: #4A90E2;
      font-weight: normal;
    }
  }
</style>
