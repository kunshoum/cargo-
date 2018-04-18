<template>
    <header>
    <div class="logo">
      <img src="@/images/logo.png" alt="">
    </div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo_map"
      mode="horizontal"
      @select="handleSelect"
      text-color="#929292">
      <el-menu-item index="index" class="home">首页</el-menu-item>
      <!--<el-menu-item index="statistics">统计</el-menu-item>-->
      <el-submenu index="flightInfo">
        <template slot="title">航班动态</template>
        <el-menu-item index="Arrivals">进港航班</el-menu-item>
        <el-menu-item index="Departures">出港航班</el-menu-item>
        <el-menu-item index="HistoryMsg">历史记录</el-menu-item>
      </el-submenu>
      <el-submenu index="wheelTracker">
        <template slot="title">轮挡动态</template>
        <el-menu-item index="Active">使用中的轮挡</el-menu-item>
        <el-menu-item index="Sleep">休眠中的轮挡</el-menu-item>
        <el-menu-item index="History">历史记录</el-menu-item>
      </el-submenu>
      <el-submenu index="statistics">
        <template slot="title">统计</template>
        <el-menu-item index="Arrivalstat">进出港航班统计</el-menu-item>
        <!--<el-menu-item index="Departurestat">出港航班统计</el-menu-item>-->
        <el-menu-item index="PunctualityRate">航班准点率</el-menu-item>
      </el-submenu>
      <el-submenu index="basicData">
        <template slot="title">基础数据</template>
        <el-menu-item index="TrackerData">轮挡数据</el-menu-item>
        <el-menu-item index="FlightData">航班数据</el-menu-item>
      </el-submenu>
      <div class="login">
        <img src="@/images/icon-login.png" alt="">
        <span>Log&nbsp;in&nbsp;&nbsp;{{nowTime}}</span>
      </div>
    </el-menu>
    </header>
</template>  

<script>
  import { getTime } from "@/utils/time"

  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        time: getTime(),
      };
    },
    
    computed: {
      nowTime() {
        return this.time
      }
    },

    mounted() {
      setInterval(() => {
        this.time = getTime()
      }, 500)
    },
    
    methods: {
      handleSelect(key, keyPath) {
        let res = key*1
        if((typeof res === "number") && (res=== res)) {
          return
        }

        let path = keyPath.join("/")
        this.$router.push('/' + path)
      }
    }
  }
</script>

<style lang="less">
    .logo{
      position: fixed;
      z-index: 99999;
      padding-top: 8px;
      top: 0;
      left: 18px;
      img {
        width: 50px;
        height: 50px;
      }
    }
  .el-menu-demo_map{
    position: fixed !important;
    background: #00335D !important;
    z-index: 9999;
    width: 100%;
    left: 0;
    top: 0;
    font-size: 14px;
    li{
      width: 110px;
      text-align: center;
      color: #F0F3F5 !important;
      .el-submenu__title{
        color:#F0F3F5 !important;
      }
      i{
        color:#F0F3F5 !important;
      }
    }
    li:nth-child(1){
      margin-left: 320px;
    }
    .el-submenu:hover .el-submenu__title{
      color:#466B7B !important;
      background-color: #99ADBE !important;
      border-bottom: 2px solid orange ;
    }
    

    
    .home {
      width: 80px;
    }
    .home:hover{
      color:#466B7B !important;
      background-color: #99ADBE !important;
      border-bottom: 2px solid #FFDF00 ;
    }

    .login{
      float: right;
      height: 52px;
      img{
        width: 30px;
        height: 30px;
        margin-top: 15px;
      }
      span{
        font-size: 14px !important;
        line-height: 60px !important;
        color: #F0F3F5 !important;
        margin-left: 10px;
        margin-right: 21px;
      }
    }
  }
  .el-menu--horizontal {
    border: 0 !important;
  }
  .home:focus, .home:hover {
    outline: 0;
    color:#466B7B !important;
    background-color: #99ADBE !important;
    border-bottom: 2px solid #FFDF00 ;
}
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #FFDF00 ;
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border-bottom: 2px solid #FFDF00 !important;
  }
</style>
