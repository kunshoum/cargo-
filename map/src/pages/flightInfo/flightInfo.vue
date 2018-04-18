<template>
  <div class="Map_aside">
    <div class="header">
      <strong>{{info.flight_no}}</strong>
      <i class="el-icon-close close" @click="close"></i>
    </div>
    <div class="slide_wrap">
      <div class="flight_thumbs" :style="flightBg">
        <span class="expand" @click="expand">
          <i class="el-icon-more"></i>
        </span>
      </div>
      <div class="sidebar_section">
        <ul>
          <li class="route_header">
            <el-col :span="8">
              <div class="dep_apt apt_name">
                <span class="apt_city airport_city_label">{{info.departure && info.departure.split("/")[1]}}</span>
                <span class="apt_code airport_code_label">{{info.departure && info.departure.split("/")[0]}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="status_circle" :style="flightIcon"></div>
            </el-col>
            <el-col :span="8">
              <div class="arr_apt apt_name">
                <span class="apt_city airport_city_label">{{info.destination && info.destination.split("/")[1]}}</span>
                <span class="apt_code airport_code_label">{{info.destination && info.destination.split("/")[0]}}</span>
              </div>
            </el-col>
          </li>
          <li class="time_info">
            <div class="departure_time">
              <el-col :span="6">附表</el-col>
              <el-col :span="6">21:32</el-col>
              <el-col :span="6">附表</el-col>
              <el-col :span="6">13:00</el-col>
            </div>
            <div class="destination_time">
              <el-col :span="6">行为</el-col>
              <el-col :span="6">21:34</el-col>
              <el-col :span="6">东部时区</el-col>
              <el-col :span="6">12:50</el-col>
            </div>
          </li>
          <li class="current_info">
            <div class="time">
              <span>{{nowHour}} 前</span>
              <span>in {{lastHour}}</span>
            </div>
            <el-progress :percentage="percentage" status="success" :show-text="false"></el-progress>
            <div class="miles">
              <span>{{nowMiles}} 英里</span>
              <span>{{lastMiles}} 英里</span>
            </div>
          </li>
          <li class="now_info">
            <el-col :span="8">
              <div>
                <span class="title">规则</span>
                <span class="info">EC-MOM</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="title">航班号.</span>
                <span class="info">{{info.flight_no}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="title">呼号</span>
                <span class="info">AEA194</span>
              </div>
            </el-col>
          </li>
          <li class="now_info">
            <el-col :span="8">
              <div>
                <span class="title">海拔高度</span>
                <span class="info">39,000ft</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="title">速度</span>
                <span class="info">535kts</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="title">航线</span>
                <span class="info">58°</span>
              </div>
            </el-col>
          </li>
          <li class="flight_type">
            <div class="title">机型</div>
            <div class="info">Boeing 787-8</div>
          </li>
          <li class="now_info">
            <el-col :span="8">
              <div>
                <span class="Age">海拔高度</span>
                <span class="info">5 years</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="title">首航</span>
                <span class="info">14-07-13</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="title">编号</span>
                <span class="info">040045</span>
              </div>
            </el-col>
          </li>
          <li class="air_line">
            <div class="title">航线</div>
            <div class="info">咸阳航空公司</div>
          </li>
          <li class="operation_day">
            <div class="key_value_container">
              <span class="key">运转天数</span>
              <div class="days_of_operation">
                <span class="day_of_operation">M</span>
                <span class="day_of_operation">T</span>
                <span class="day_of_operation">W</span>
                <span class="day_of_operation">T</span>
                <span class="day_of_operation">F</span>
                <span class="day_of_operation active">S</span>
                <span class="day_of_operation active single" data-day="7">S</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog
      title="Photo"
      :visible.sync="photoVisible"
      width="40%"
      append-to-body
      class="photo_dialog">
      <div class="big_image" :style="flightBg"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["code", "image", "info"],
  data() {
    return {
      photoVisible: false,
      allTime: 7200,
      allMiles: 1500,
      nowTime: 1000,
      flightIcon: {
        backgroundImage: 'url(' + require("@/images/plane.png") + ')',
      },
    }
  },
  computed: {
    flightBg() {
      return {
        backgroundImage: 'url(' + require("@/images/flight1.jpg") + ')',
      }
    },
    nowHour() {
      let h = parseInt(this.nowTime / 3600)
      let m = parseInt((this.nowTime - h * 3600) / 60)
      if(m < 10) {
        m = "0" + m
      }

      return '0' + h + ':' + m
    },
    lastHour() {
      let lastTime = this.allTime - this.nowTime
      let h = parseInt(lastTime / 3600)
      let m = parseInt((lastTime - h * 3600) / 60)
      if(m < 10) {
        m = "0" + m
      }

      return '0' + h + ':' + m
    },
    nowMiles() {
      return (this.nowTime * (this.allMiles / this.allTime)).toFixed(1)
    },
    lastMiles() {
      return  (this.allMiles - this.nowMiles).toFixed(1)
    },
    percentage() {
      return (this.nowTime / this.allTime) * 100
    }
  },
  mounted() {
    let timer = setInterval(() => {
      if(this.nowTime >= this.allTime) {
        clearInterval(timer)
        return
      }
      this.nowTime++
    }, 1000)
  },
  methods: {
    close() {
      this.$emit("close")
    },
    expand() {
      this.photoVisible = true
    },  
  },
}
</script>

<style lang="less">
.Map_aside {
  position: fixed;
  z-index: 999;
  top: 60px;
  width: 260px;
  height: 100%;
  background: #c3c3c3;

  .slide_wrap {
    height: calc(~'100% - 104px');
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  .header {
    padding: 0 12px;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #c3c3c3;
    background: #464b55;
    color:#F7FAFB;

    .close {
      font-size: 20px;
      float: right;
      margin-top: 14px;
      cursor: pointer;
      color: #409eff;

      &:hover {
        background: rgb(36, 118, 240);
      }
    }
  }

  .flight_thumbs {
    height: 162px;
    background-size: cover;
    background-color: #66acec;
    background-repeat: no-repeat;
    background-position: 50% 100%;
    position: relative;

    .expand {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 42px;
      height: 42px;
      background: rgba(0, 0, 0, 0.7);
      text-align: center;
      cursor: pointer;

      i {
        color: #fff;
        font-size: 24px;
        line-height: 42px;
      }
    }
  }
  .sidebar_section {
    padding: 0 12px;
    ul {
      li {
        border-bottom: 1px solid #eaeaea;
        position: relative;
        padding: 12px 0;
        overflow: hidden;
      }
    }

    .route_header {
      .apt_name {
        span {
          display: block;
        }
        .apt_city {
          color:#242525;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .apt_code {
          font-weight: 400;
          font-size: 20px;
        }
      }
      .status_circle {
        width: 50px;
        height: 50px;
        background-color: #fa596b;
        background-size: 30px 30px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        border-radius: 25px;
        display: block;
      }
    }

    .time_info {
      font-size: 12px;
      color: #242525;
      div {
        overflow: hidden;
      }
      .departure_time {
        margin-bottom: 5px;
      }
    }

    .current_info {
      .time,.miles {
        display: flex;
        justify-content: space-between;
        color: #242525;
        font-size: 12px;
        padding: 5px 0;
      }
    }

    .now_info {
      span {
        display: block;
        font-size: 14px;
      }
      .title {
        font-weight: 400;
        margin-bottom: 5px;
      }
      .info {
        color: #242525;
      }
    }

    .flight_type, .air_line {
      .title {
        font-weight: 400;
        margin-bottom: 5px;
      }
      .info {
        color: #242525;
      }
    }

    .operation_day {
      .key {
        display: block;
        margin-bottom: 5px;
      }
      .days_of_operation {
        background: #F7FAFB;
        color: #D4E1E5;
        border-radius: 10px;
        font-size: 0px;

        span {
          display: inline-block;
          text-align: center;
          line-height: 20px;
          width: 14.2%;
          height: 20px;
          border-radius: 10px 0 0 10px;
          font-size: 14px;
        }

        .active {
          color: #fff;
          background-color: #40BFDB;
          border-radius: 10px;
        }
      }
    }
  }
}

.photo_dialog {
  .el-dialog {
    background: #eaeaea !important;
    .el-dialog__body {
      padding: 0;
      img {
        width: 100%;
      }
    }
  }

  .big_image {
    height: 370px;
    background-size: cover;
    background-color: #66acec;
    background-repeat: no-repeat;
  }
}
</style>
