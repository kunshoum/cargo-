/** 
* 马少良
*/

<template>
  <div class="Welcome">
    <div class="version">1.5.0</div>
    <div class="welcome_logo"><img  src="../images/welcome_logo.png"></div>
    <div class="start">
      <span @click="start">Get Start</span>
      <span>帮助手册</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {

    }
  },
  methods: {
    start() {
      this.$router.push({
        name: "Home",
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../style/pages/welcome.less";
</style>
