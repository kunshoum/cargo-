<template>
  <div id="statistics">
    <div id="content">
      <div class="nav">
        <router-view name="Arrivalstat" v-if="activeItem === 'Arrivalstat'"></router-view>
        <router-view name="PunctualityRate" v-if="activeItem === 'PunctualityRate'"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: "Active",
    }
  },
  watch: {
    $route() {
      this.activeItem = this.$route.params.item
    },
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
#statistics {
  text-rendering: optimizeSpeed;
  height: 100% !important;
  width: 100% !important;
  position: relative;
  padding: 0px;
  font: normal 14px Helvetica Neue, Arial, sans-serif;
  color: #333;
  background: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;

  #content {
    width: 100%;
    margin-top: 80px;
    height: 100%;
    background: #fff;
  }
}
</style>
