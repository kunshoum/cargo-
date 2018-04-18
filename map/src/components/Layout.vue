<template>
  <section id="Layout">
    <head-bar />
    <router-view />
  </section>
</template>

<script>
  import HeadBar from "./HeadBar.vue"

  export default {
    data() {
      return {

      }
    },

    components: {
      HeadBar,
    }
  }
</script>

<style lang="less">
  #Layout {
    width: 100%;
    height: 100%;
  }
</style>
