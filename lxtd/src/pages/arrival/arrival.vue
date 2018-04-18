<template>
<!-- 雷云朵 -->
  <div class="arrival">
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  props: ['type', 'order_type'],
  created() {
    this.$store.commit('CHANGE_TYPE', this.type)
    this.$store.commit('CHANGE_ORDER_TYPE', this.order_type)
  },
  mounted() {
    this.$store.commit('ADD_FOOTNAV', {
      name:  this.order_type === 0 ? '进港主单管理' : '进港分单管理',
      route: this.order_type === 0 ? '/arrival/main' : '/arrival/sub',
      title: this.order_type === 0 ? '进港主单-查询' : '进港分单-查询',
    })
  },
  watch: {
    '$route.params.type'() {
      this.$store.commit('CHANGE_ORDER_TYPE', this.order_type)
    }
  },
}
</script>

<style lang="less" scoped>
 
</style>
