<template>
  <div class="Receive">
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
      name:  '民航快递',
      route: '/cae',
    })
  },
}
</script>

