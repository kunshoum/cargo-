<template>
<!-- 雷云朵 -->
  <div class="ByDepart">
    <component :is="activeItem"></component>
  </div>
</template>

<script>
  import departSearch from "./departSearch.vue"
  import department from "./department.vue"
  

  export default {
    data() {
      return {
        activeItem: 'departSearch',
      }
    },
    components: {
      departSearch: departSearch,
      department: department,
    },
    mounted() {
      this.activeItem = this.$route.params.item || 'departSearch'
    },
    watch: {
      '$route'() {
        this.activeItem = this.$route.params.item || 'departSearch'
      }
    },
  }
</script>

<style lang="less">
  
</style>