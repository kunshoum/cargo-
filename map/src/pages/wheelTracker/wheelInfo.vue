<template>
  <div class="Wheel_aside">
    <div class="header">
      <strong>轮挡信息</strong>
      <i class="el-icon-close close" @click="close"></i>
    </div>
    <div class="slide_wrap">
      <div class="sidebar_section">
        <ul>
          <li>
            <p class="title_info">轮挡编号</p>
            <p class="info_content">{{devCode}}</p>
          </li>
          <li>
            <p class="title_info">出场编号</p>
            <p class="info_content">A23-63-21-22</p>
          </li>
          <li>
            <p class="title_info">所属机场</p>
            <p class="info_content">咸阳国际机场</p>
          </li>
        </ul>
      </div>
      <div class="nav_section">
        <div class="nav_h3">
          <h3>当前状态</h3>
        </div>
        <div class="now_states">
          <dl>
            <dt>
              <img class="wheel_icon" :src="trackerStatus ? normalImg : unNormalImg" alt="">
            </dt>
            <dd>
              <p class="tracker_status">{{trackerStatus ? "使用中" : "休眠中"}}</p>
            </dd>
          </dl>
        </div>
      </div>
      <div class="nav_section">
        <div class="nav_h2">
          <h3>全部状态</h3>
        </div>
        <div class="all_states">
          <dl>
            <dt>
              <img class="wheel_icon" src="@/images/wheel_tracker_normal.png" alt="">
            </dt>
            <dd>
              <p class="tracker_status">正常</p>
            </dd>
          </dl>
          <dl>
            <dt>
              <img class="wheel_icon" src="@/images/wheel_tracker_warn.png" alt="">
            </dt>
            <dd>
              <p class="tracker_status">报警</p>
            </dd>
          </dl>
          <dl>
            <dt>
              <img class="wheel_icon" src="@/images/wheel_tracker.png" alt="">
            </dt>
            <dd>
              <p class="tracker_status">休眠中</p>
            </dd>
          </dl>
        </div>
      </div>
      <div class="sidebar_section">
        <ul>
          <li>
            <p class="title_info">对应航班号</p>
            <p class="info_content">南方航空CZ3698</p>
          </li>
          <li>
            <p class="title_info">对应飞机型号</p>
            <p class="info_content">空中客车 A320(中型)</p>
          </li>
          <li>
            <p class="title_info">开启时间</p>
            <p class="info_content">2018-03-06 13:22PM</p>
          </li>
          <li>
            <p class="title_info">关闭时间</p>
            <p class="info_content">2018-03-06 13:30PM</p>
          </li>
          <li class="power_info">
            <p class="title_info power_title">当前电量</p>
            <div class="power_wrap">
              <div class="now_power">
                <div class="ball"></div>
              </div>
              <span class="power_text">88%</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="nav_section section2">
        <div class="nav_h2 device">
          <h3>设备参数</h3>
          <h3>环境参数</h3>
        </div>
        <div class="dl_list device_info">
          <div>
            <p class="degree">50℃</p>
            <p>设备温度</p>
          </div>
          <div>
            <p class="degree">23℃</p>
            <p>机场温度</p>
          </div>
        </div>
      </div>
      <div class="nav_section section2">
        <div class="nav_h2">
          <h3>信号来源</h3>
        </div>
        <div class="dl_list device_info">
          <div>
            <p>雷达</p>
            <p>F-44923</p>
          </div>
          <div>
            <p>纬度</p>
            <p>34.238</p>
          </div>
          <div>
            <p>经度</p>
            <p>108.832</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["devCode", "trackerStatus"],
  data() {
    return {
      normalImg: require("@/images/wheel_tracker_normal.png"),
      unNormalImg: require("@/images/wheel_tracker.png"),
    }
  },

  mounted() {
    
  },

  methods: {
    close() {
      this.$emit("close")
      console.log(this.trackerStatus)
    },
  },
}
</script>

<style lang="less">
.Wheel_aside {
  position: fixed;
  z-index: 999;
  top: 60px;
  width: 260px;
  height: 100%;
  background: #dddcdc;

  .slide_wrap {
    height: calc(~'100% - 104px');
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0px;
    }

    .section2 {
      height: auto !important;
      padding-bottom: 10px;
    }

    .nav_section {
      width: 100%;
      height: 95px;
      border-bottom: 1px solid #eaeaea;

      .wheel_icon {
        width: 32px;
        height: 32px;
      }

      .nav_h3, .nav_h2 {
        width: 100%;
        height: 24px;
        background: rgb(170, 168, 168);
        text-align: center;
        line-height: 24px;

        h3 {
          font-size: 14px;
          text-align: center;
          font-weight: normal;
        }
      }

      .device, .device_info {
        display: flex;
        justify-content: space-around;
      }

      .device_info {
        font-size: 14px;
        p {
          text-align: center;
        }
        .degree {
          font-size: 16px;
          color: #6abcf3;
          font-weight: bold;
        }
      }
      
      .tracker_status {
        font-size: 14px;
      }

      .now_states, .all_states {
        height: 80px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .dl_list {
        .el-icon-info {
          font-size: 30px;
        }

        dl {
          margin-top: 10px;
          float: left;
          width: 50%;
          text-align: center;

          p {
            margin-top: 5px;
          }
        }
      }
      
    }
  }

  .header {
    padding: 0 12px;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #c3c3c3;
    background: #265c92;
    color:#F7FAFB;

    .close {
      font-size: 20px;
      float: right;
      margin-top: 14px;
      cursor: pointer;
      color: #fff;

      &:hover {
        background: rgb(36, 118, 240);
      }
    }
  }

  .sidebar_section {
    padding: 0 12px;
    ul {
      li {
        border-bottom: 1px solid #eaeaea;
        position: relative;
        padding: 6px 0;
        overflow: hidden;
      }
    }

    .title_info {
      font-size: 12px;
      margin-bottom: 5px;
    }

    .info_content {
      font-size: 14px;
      font-weight: 550;
    }

    .power_title {
      margin-bottom: 10px;
    }

    .power_wrap {
      position: relative;
      width: 80%;
      height: 4px;
      margin-left: 10%;
      border-radius: 2px;
      background: rgb(148, 147, 147);
      margin-bottom: 10px;

      .now_power {
        position: absolute;
        top: 0;
        right: 0;
        width: 88%;
        height: 4px;
        border-radius: 2px;
        background: #6abcf3;

        .ball {
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgb(32, 99, 155);
        }
      }

      .power_text {
        position: absolute;
        right: 0px;
        top: 110%;
        font-size: 12px;
      }
    }
  }
}
</style>
