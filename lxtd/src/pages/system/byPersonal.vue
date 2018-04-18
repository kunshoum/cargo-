<template>
<!-- 雷云朵 -->
  <div class="ByPersonal">
    <component :is="activeItem"></component>
  </div>
</template>

<script>
  import personalSearch from "./personalSearch.vue"
  

  export default {
    data() {
      return {
        activeItem: 'personalSearch',
      }
    },
    components: {
      personalSearch: personalSearch,
    },
    mounted() {
      this.activeItem = this.$route.params.item || 'personalSearch'
    },
    watch: {
      '$route'() {
        this.activeItem = this.$route.params.item || 'personalSearch'
      }
    },
  }
</script>

<style lang="less">
  
</style>