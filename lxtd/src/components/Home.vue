/** 
* 马少良
*/

<template>
  <div class="Home">
    <el-row :gutter="20">
      <el-col :span="4" class="nav_wrap" v-for="(item,index) in homeData" :key="index">
        <div class="nav_cards grid-content" @click="goto(item)">
          <img :src="item.images">
          <div class="info">
            <p class="name">{{item.h_name}}</p>
            <p class="path">{{item.nav}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from "../service"
export default {
  name: "Home",
  data() {
    return {
      data: [
        {
          images: require("../images/chart1.gif"),
          h_name: "收货国内主单管理",
          nav: "收货-国内-收货主单管理",
          tabName: "收货主单管理",
          name: "收货主单管理",
          route: "/receive/main",
        },
        {
          images: require("../images/chart2.gif"),
          h_name: "收货国内分单管理",
          nav: "收货-国内-收货分单管理",
          tabName: "收货分单管理",
          name: "收货分单管理",
          route: "/receive/sub",
        },
        {
          images: require("../images/chart3.gif"),
          h_name: "邮件管理",
          name: "邮件管理",
          nav: "快件-国内-邮件管理",
          tabName: "邮件管理",
          route: "/mail",
        },
        // {
        //   images: require("../images/chart4.gif"),
        //   h_name: "民航快递管理",
        //   name: "民航快递",
        //   nav: "快件-国内-民航快递",
        //   tabName: "民航快递",
        //   route: "/cae",
        // },
        // {
        //   id: 1011,
        //   images: require("../images/chart4.gif"),
        //   name: "按作业航班订舱管理",
        //   nav: "出港-订舱-按作业航班订舱",
        //   tabName: "按作业航班订舱"
        // },
        // {
        //   id: 1014,
        //   images: require("../images/chart5.gif"),
        //   name: "配载订舱管理",
        //   nav: "出港-配载-配载订舱",
        //   tabName: "配载订舱"
        // },
        // {
        //   id: 1007,
        //   images: require("../images/chart6.gif"),
        //   name: "民航快递管理",
        //   nav: "快件-国内-民航快递管理",
        //   tabName: "民航快递管理"
        // },
        // {
        //   id: 1023,
        //   images: require("../images/chart7.gif"),
        //   name: "进港主单管理",
        //   nav: "进港-国内-进港主单管理",
        //   tabName: "进港主单管理"
        // }
      ],
      homeData: [],
      authList: [],
    }
  },
  mounted() {
    this.$store.commit('CHANGE_TOPTITLE', '首页')
    this.authList = JSON.parse(this.$getStore("authList"))
    this.filterData()
  },
  methods: {
    goto(item) {
      this.$store.commit("ADD_FOOTNAV", item)
      this.$router.push(item.route)
    },
    filterData() {
      this.homeData = this.data.filter(item => {
        return this.authList.filter(authItem => authItem.is_select).some(authItem => {
          return authItem.route === item.route
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
// @import "../style/pages/home.less";
  @import '../style/index.less';

</style>
