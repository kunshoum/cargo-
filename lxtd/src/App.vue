<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  @import './style/icon.less';
  @import './style/element_reset.less';
  @import "./style/pages/layout.less";
  @import "./style/searchStyle.less";
  @import "./style/billing_detail.less";
  @import "./style/billing_common.less";

  #app{
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    
  }
  .el-container {
    .main {
      background-image: linear-gradient(-1deg, #F4F4FF 0%, #AAB2DE 100%);
    }
  }
</style>
