<template>
<!-- 雷云朵 -->
  <div class="Byflight">
    <component :is="activeItem"></component>
  </div>
</template>

<script>
  import flightList from "./flightList.vue"
  import bookingList from "./bookingList.vue"
  import orderList from "./orderList.vue"
  

  export default {
    data() {
      return {
        activeItem: 'flightlist',
      }
    },
    components: {
      flightlist: flightList,
      bookinglist: bookingList,
      orderlist: orderList,
    },
    mounted() {
      this.activeItem = this.$route.params.item || 'flightlist'
    },
    watch: {
      '$route'() {
        this.activeItem = this.$route.params.item || 'flightlist'
      }
    },
  }
</script>

<style lang="less">
  
</style>