<template><!--王艺蒙-->
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
      name: this.type === "departure" ? "出港仓库管理" : "进港仓库管理",
      route: this.type === "departure" ? "/storeRoom/departure/search" : "/storeRoom/arrive/search",
      title: this.type === "departure" ? "出港仓库管理-查询" : "进港仓库管理-查询",
    })
  },
}
</script>

