<template>
<!-- 雷云朵 -->
  <div class="ByUser">
    <component :is="activeItem"></component>
  </div>
</template>

<script>
  import userSearch from "./userSearch.vue"
  import user from "./user.vue"
  

  export default {
    data() {
      return {
        activeItem: 'userSearch',
      }
    },
    components: {
      userSearch: userSearch,
      user: user,
    },
    mounted() {
      this.activeItem = this.$route.params.item || 'userSearch'
    },
    watch: {
      '$route'() {
        this.activeItem = this.$route.params.item || 'userSearch'
      }
    },
  }
</script>

<style lang="less">
  
</style>