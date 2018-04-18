/** 
* 马少良
*/

<template>
  <el-menu class="el-menu-vertical-demo" :collapse="true" :default-active="activeIndex">
    <div class="short-a">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <el-menu-item v-for="(item,index) in shortCutData" :index="item.s_route" :key="index" @click.native="goto(item)" class="shortCut_item">
      <!-- <i :class="item.icon" class="shortcut_icon"></i> -->
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="item.id"></use>
      </svg>
      <span slot="title">{{item.s_name}}</span>
    </el-menu-item>
  </el-menu>
</template>

<style>

</style>

<script>
export default {
  data() {
    return {
      data: [
        {
          s_name: "收货主单添加",
          s_route: "/receive/main/billing/detail",
          name: "收货主单管理",
          route: "/receive/main",
          icon: "iconfont icon-shouhuo-zhu",
          id: '#icon-shouhuo-zhu',
        },
        {
          s_name: "收货分单添加",
          s_route: "/receive/sub/billing/detail",
          name: "收货分单管理",
          route: "/receive/sub",
          icon: "iconfont icon-shouhuo-fen",
          id: '#icon-shouhuo-fen',
        },
        {
          s_name: "邮件添加",
          s_route: "/mail/billing/detail",
          name: "邮件管理",
          route: "/mail",
          icon: "iconfont icon-xin",
          id: '#icon-xin',
        },
        // {
        //   s_name: "民航快递添加",
        //   s_route: "/cae/billing/detail",
        //   name: "民航快递",
        //   route: "/cae",
        //   icon: "el-icon-fa-rocket",
        // },
        {
          s_name: "进港主单添加",
          s_route: "/arrival/main/billing/detail",
          name: "进港主单管理",
          route: "/arrival/main",
          icon: "iconfont icon-jingang-zhu",
          id: "#icon-jingang-zhu",
        },
        {
          s_name: "进港分单添加",
          s_route: "/arrival/sub/billing/detail",
          name: "进港分单管理",
          route: "/arrival/sub",
          icon: "iconfont icon-jingang-fen",
          id: "#icon-jingang-fen",
        },
        {
          s_name: "提货主单添加",
          s_route: "/delivery/main/billing/detail",
          name: "提货主单管理",
          route: "/delivery/main",
          icon: "iconfont icon-tihuo-zhu",
          id: "#icon-tihuo-zhu",
        },
        {
          s_name: "提货分单添加",
          s_route: "/delivery/sub/billing/detail",
          name: "提货分单管理",
          route: "/delivery/sub",
          icon: "iconfont icon-tihuo-fen",
          id: "#icon-tihuo-fen",
        },
        {
          s_name: "按作业航班订舱",
          s_route: "/booking/byflight",
          name: "按作业航班订舱",
          route: "/booking/byflight",
          icon: "iconfont icon-web-dingcangguanli",
          id: "#icon-web-dingcangguanli",
        },
        {
          s_name: "按作业航班配载",
          s_route: "/stowage/byFlight",
          name: "按作业航班配载",
          route: "/stowage/byFlight",
          icon: "iconfont icon-peizaizhuangche",
          id: "#icon-peizaizhuangche",
        },
      ],
      shortCutData: [],
      authList: [],
    }
  },
  computed: {
    activeIndex() {
      if (this.$route.path.indexOf("billing") > -1) {
        return this.$route.path.split("billing")[0] + "billing/detail"
      } else if(this.$route.path.indexOf("/booking/byflight") > -1){
        return this.$route.path
      } else if(this.$route.path.indexOf("/stowage/booking") > -1){
        return this.$route.path
      }else {
        return ""
      }
    },
  },
  mounted() {
    this.authList = JSON.parse(this.$getStore("authList"))
    this.filterData()
  },
  methods: {
    goto(item) {
      this.$store.commit("ADD_FOOTNAV", item)
      this.$router.push(item.s_route)
    },
    filterData() {
      this.shortCutData = this.data.filter(item => {
        return this.authList.filter(authItem => authItem.is_select).some(authItem => {
          return authItem.route === item.route
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .shortcut_icon {
    font-size: 20px;
  }
  .shortCut_item {
    color: #fff !important;
  }
  .el-menu--collapse {
    width: 100%;
  }
  .el-menu {
    .icon {
      margin-left: 10px !important;
    }
  }
  
  .short-a {
    position: absolute;
    width: 10px;
    height: 100%;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 666;

    ul {
      width: 10px;
      height: 100%;
      margin-left: 0 !important;
      li {
        width: 10px;
        height: 56px;
      }
      li:nth-child(1),li:nth-child(2),li:nth-child(4),li:nth-child(5),li:nth-child(9) {
        background: #54A2FD;
      }
      li:nth-child(3),li:nth-child(8) {
        background: #50E3C2;
      }
      li:nth-child(6),li:nth-child(7) {
        background: #E5E5E5;
      }
    }
  }
  .icon {
    /* 通过设置 font-size 来改变图标大小 */
    width: 2em; height: 2em;
    /* 图标和文字相邻时，垂直对齐 */
    vertical-align: -0.8em;
    /* 通过设置 color 来改变 SVG 的颜色/fill */
    fill: currentColor;
    /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
        normalize.css 中也包含这行 */
    overflow: hidden;
    /* margin-left: -0.3em; */
    color: #fff !important;
  }
  .is-active {
    // color: #409cff !important;
    background: #95A5FB !important;
  }
  .el-menu {
    background: #1E2247;
  }
  .shortCut_item:hover {
    background: #95A5FB;
  }
</style>
