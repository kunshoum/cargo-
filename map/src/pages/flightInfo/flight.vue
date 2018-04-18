<template>
  <div id="flight_page">
    <div id="cnt-data-content">
      <div class="row header">
          <div class="left">
            <h1> XIY 国际机场 </h1>
            <h3> CHINA </h3>
          </div>
          <div class="right">
            <div class="top" v-show="false">
              <el-row :gutter="20">
                <el-col :span="6" style="padding: 0 0 0 10px;" class="col">
                  <div class="grid-content bg-purple">
                    <div class="cnt-chart" id="rating-overall">
                      <img src="../../images/icon-01.png" alt="">
                    </div>  
                    <div class="chart-value chart-label">我的系统</div>
                    <div class="chart-value charts-label">评分 <i class="el-icon-question"></i></div>
                  </div>
                </el-col>
                <el-col :span="10" style="padding: 0;" class="col">
                  <div class="grid-content bg-purple">
                    <el-row type="flex" class="row-bg">
                      <el-col :span="8">
                        <div class="grid-content bg-purple sum">
                           <img src="../../images/icon3.png" alt="">
                          <div class="weather-value ng-binding">8℃</div>
                          <div class="weathers-value">WEATHER</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple sum">
                           <img src="../../images/icon4.png" alt="">
                          <div class="weather-value ng-binding">8℃</div>
                          <div class="weathers-value">WEATHER</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple sum">
                           <img src="../../images/icon6.png" alt="">
                          <div class="weather-value ng-binding">8℃</div>
                          <div class="weathers-value">WEATHER</div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="8" style="padding: 0 10px 0 0;" class="colle">
                  <div class="grid-content bg-purple">
                    <div class="rightTop">
                      <span class="clock-label">当地时间:</span>
                      <span class="clock-time">10:58 AM</span>
                    </div>
                    <div class="rightBottom">
                      <el-row type="flex" class="row-bg">
                        <el-col :span="12">
                          <div class="num">
                            <img src="../../images/icon5.png" alt="">
                            <div class="weather-value ng-binding">8℃</div>
                            <div class="weathers-value">WEATHER</div>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="num">
                            <img src="../../images/icon5.png" alt="">
                            <div class="weather-value ng-binding">8℃</div>
                            <div class="weathers-value">WEATHER</div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>  
      </div>
      <div class="nav">
        <el-tabs v-model="activeItem" @tab-click="handleClick" class="flight_tabs">
          <!-- <el-tab-pane label="General" name="General"></el-tab-pane> -->
          <el-tab-pane label="进港航班" name="Arrivals"></el-tab-pane>
          <el-tab-pane label="出港航班" name="Departures"></el-tab-pane>
          <el-tab-pane label="历史记录" name="HistoryMsg"></el-tab-pane>
          <!-- <el-tab-pane label="On Ground" name="Ground"></el-tab-pane>
          <el-tab-pane label="Reviews" name="Reviews"></el-tab-pane>
          <el-tab-pane label="Routes" name="Routes"></el-tab-pane>
          <el-tab-pane label="Weather" name="Weather"></el-tab-pane> -->
        </el-tabs>
        <keep-alive>
          <router-view name="Arrivals" v-if="activeItem === 'Arrivals'"></router-view>
        </keep-alive>
        <!-- <router-view name="General" v-if="activeItem === 'General'"></router-view> -->
        <router-view name="Departures" v-if="activeItem === 'Departures'"></router-view>
        <router-view name="HistoryMsg" v-if="activeItem === 'HistoryMsg'"></router-view>
        <!-- <router-view name="Ground" v-if="activeItem === 'Ground'"></router-view>
        <router-view name="Reviews" v-if="activeItem === 'Reviews'"></router-view>
        <router-view name="Routes" v-if="activeItem === 'Routes'"></router-view>
        <router-view name="Weather" v-if="activeItem === 'Weather'"></router-view> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: "Arrivals",
      showIcon: false,
    }
  },

  watch: {
    $route() {
      this.activeItem = this.$route.params.item
    },
    '$route.query'(val) {
      let arr = Object.entries(val)
      if(arr.length) {
        this.showIcon = true
      }else {
        this.showIcon = false
      }
    }
  },

  mounted() {
    this.activeItem = this.$route.params.item
  },

  methods: {
    handleClick(tab, event) {
      this.$router.push({ params: { item: tab.name } })
    },
  },
}
</script>
<style lang="less">
#flight_page {
  text-rendering: optimizeSpeed;
  height: 100% !important;
  width: 100% !important;
  min-width: 320px;
  position: relative;
  margin: 0px;
  padding: 0px;
  font: normal 14px Helvetica Neue, Arial, sans-serif;
  color: #333;
  background: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
  #flightapp{
    width: 1200px !important;
    margin:5% -10%;
    height: 620px;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 0 #BEC2C9;
    border-radius: 30px;
  }
  #cnt-data-content {
    width: 100%;
    // max-width: 1150px;
    margin: auto;
    margin-top: 60px;
    height: 100%;

    .header {
      background: url(../../images/banerbgi.png) no-repeat;
      background-size: 100% 100%;
      min-height: 230px;
      margin: 0;
      position: relative;

      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
      }

      .left {
        float: left;
        width: 20%;
        height: 100%;
        // background: #f8c023;

        h1 {
          margin-top: 50px;
        }

        h1,
        h2,
        h3 {
          margin-left: 60px;
          color: #fff;
          font-family: MicrosoftYaHeiUI-Bold;
          font-size: 20px;
          color: #ffffff;
          text-shadow: 2px 2px 10px #828282;
        }
      }
      .right {
        float: right;
        width: 77%;
        height: 100%;

        .top {
          .col {
            text-align: center;
            margin-top: 50px !important;
          }

          .cnt-chart {
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
          }
          #rating-overall {
            width: 50px;
            height: 50px;
            margin: 0 auto;
          }

          .chart-label {
            margin-top: 0.6em;
            text-align: center;
            color: #fff;
          }
          .charts-label {
            text-align: center;
            color: #fff;
          }

          .sum {
            text-align: center;
          }

          .el-icon-star-off:before {
            font-size: 55px;
            color: #fff;
          }
          .el-icon-download:before {
            font-size: 55px;
            color: #fff;
          }
          .el-icon-sort:before {
            font-size: 55px;
            color: #fff;
          }
          .weather-value {
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #ffffff;
            text-shadow: 2px 2px 10px #828282;
          }
          .weathers-value {
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #ffffff;
            text-shadow: 2px 2px 10px #828282;
          }

          .rightTop {
           width: 200px;
           margin-left: 250px;
            .clock-label {
              font-family: MicrosoftYaHeiUI;
              font-size: 12px;
              color: #828282;
            }
            .clock-time {
              font-family: MicrosoftYaHeiUI-Bold;
              font-size: 13px;
              color: #FFFFFF;
            }
          }
          .num {
            text-align: center;
          }
          .rightBottom {
            margin-top: 24px;
          }
          .colle {
            margin: 15px 0 !important;
          }
        }
      }
    }

    .nav {
      background: rgba(255, 255, 255, 0.7);
      width: 954px;
      margin: -40px auto;

      .el-tabs--top {
        width: 100%;
        background: rgba(255, 255, 255, 0.7);
      }

      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__nav {
        width: 100%;
      }

      .flight_tabs {
        .el-tabs__item {
          width: 318px;
          height: 40px;
          text-align: center;
          padding: 0;
        }
      }

      .el-tabs__item:hover {
        background: rgba(0, 51, 93, 1);
        font-family: MicrosoftYaHeiUI-Bold;
        font-size: 14px;
        font-weight: bold;
        color: #ffdf00;
      }
      .el-tabs__item.is-active {
        background: rgba(0, 51, 93, 1);
        font-family: MicrosoftYaHeiUI-Bold;
        font-size: 14px;
        font-weight: bold;
        color: #ffdf00;
      }
      .el-tabs__active-bar {
        background: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
.cnt-airport-details {
  color: #a4a1a1;
}
</style>
