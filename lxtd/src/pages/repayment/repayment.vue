<template>
  <div class="Receive">
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  data() {
    return {
      type: "",
    }
  },
  mounted() {
    this.type = this.$route.params.type
    this.$store.commit("ADD_FOOTNAV", {
      name: this.type === "recipt" ? "收款运单" : "付款运单",
      route: this.type === "recipt" ? "/repayment/recipt/billSearch" : "/repayment/payment/billSearch",
      title: this.type === "recipt" ? "收款运单-查询" : "付款运单-查询",
    })
  },
}
</script>

