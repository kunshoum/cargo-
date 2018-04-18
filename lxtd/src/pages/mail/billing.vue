/**
 * 马少良
 */
 
<template>
  <div class="Billing">
    <el-tabs v-model="activeItem" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="开单明细" name="detail"></el-tab-pane>
      <el-tab-pane label="开单费用" name="cost"></el-tab-pane>
      <el-tab-pane label="体积" name="volume"></el-tab-pane>
      <el-tab-pane label="出发/到达信息" name="deparr"></el-tab-pane>
      <el-tab-pane label="相关航班信息" name="flight"></el-tab-pane>
    </el-tabs>
    <i class="el-icon-circle-close-outline closeBilling" @click="backSearch"></i>
    <keep-alive>
      <router-view name="detail" v-if="activeItem === 'detail'"></router-view>
      <router-view name="cost" v-if="activeItem === 'cost'"></router-view>
      <router-view name="volume" v-if="activeItem === 'volume'"></router-view>
      <router-view name="deparr" v-if="activeItem === 'deparr'"></router-view>
      <router-view name="flight" v-if="activeItem === 'flight'"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: 'detail',
    }
  },
  mounted() {
    this.activeItem = this.$route.params.item
    this.$route.params.id ? 
    this.$store.commit('CHANGE_TOPTITLE', '邮件管理 - 编辑') :
    this.$store.commit('CHANGE_TOPTITLE', '邮件管理 - 添加')
  },
  watch: {
    '$route'() {
      this.activeItem = this.$route.params.item
      this.$route.params.id ? 
      this.$store.commit('CHANGE_TOPTITLE', '邮件管理 - 编辑') :
      this.$store.commit('CHANGE_TOPTITLE', '邮件管理 - 添加')
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({params: {item: tab.name}})
    },
    backSearch() {
      this.$router.push('/mail')
    },
  }
}
</script>

<style lang="less">
  
</style>
