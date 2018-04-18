<template>
  <div id="basic">
    <router-view name="TrackerData" v-if="activeItem === 'TrackerData'" />
    <router-view name="FlightData" v-if="activeItem === 'FlightData'"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: "BasicData",
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
}
</script>
<style lang="less" scoped>
#basic {
  background: #fff;
  width: 100%;

  #content {
    height: 100%;
    padding: 50px 30px;

    .section {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
