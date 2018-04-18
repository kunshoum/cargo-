/** 
* 马少良
*/

<template>
  <el-container class="Layout">
    <el-header class="head" height="54px">
      <head-bar />
    </el-header>
    <el-container class="main_wrap">
      <el-aside class="aside" :class="{ menu: sideBar === 'LMenu', shortCut: sideBar === 'ShortCut'}">
        <component :is="this.sideBar"></component>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <!-- <right-info /> -->
    </el-container>
    <el-footer class="foot" height="32px">
      <foot-nav />
    </el-footer>
  </el-container>
</template>

<script>
  import {mapState} from 'vuex'

  import Menu from "./Menu.vue"
  import ShortCut from "./ShortCut.vue"
  import HeadBar from "./HeadBar.vue"
  import FootNav from "./FootNav.vue"
  // import RightInfo from "./Info.vue"

  export default {
    components: {
      LMenu: Menu,
      ShortCut: ShortCut,
      HeadBar: HeadBar,
      FootNav: FootNav,
      // RightInfo,
    },
    computed: {
      ...mapState(['sideBar'])
    },
  }
</script>

<style lang="less" scoped>
  .shortCut {
    width: 80px !important;
    background: #1E2247;
    transition: 200ms;
  }
  .aside {
    .el-menu {
      border-right-width: 0px;
    }
  }
  .menu {
    width: 200px !important;
    background: #1E2247 !important;
    transition: 200ms;
  }
  .foot {
    padding: 0;
    background: #141736;
  }
</style>