<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './style/element_reset.less';
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
}

#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
</style>
