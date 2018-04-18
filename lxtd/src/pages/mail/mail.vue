/**
 * 马少良
 */
 
<template>
  <div class="Mail">
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
      name: '邮件管理',
      route: '/mail',
      title: '邮件-查询',
    })
  },
}
</script>

<style lang="less" scoped>
  
</style>
