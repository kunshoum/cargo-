<template>
<!-- 雷云朵 -->
  <div class="Billing">
    <el-tabs v-model="activeItem" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="开单明细" name="detail"></el-tab-pane>
      <el-tab-pane label="开单费用" name="cost"></el-tab-pane>
      <el-tab-pane label="出发/到达信息" name="deparr"></el-tab-pane>
      <el-tab-pane label="不正常货物信息" name="abnormalGoods"></el-tab-pane>
    </el-tabs>
    <i class="el-icon-circle-close-outline closeBilling" @click="backSearch"></i>
    <keep-alive>
      <router-view name="detail" v-if="activeItem === 'detail'"></router-view>
      <router-view name="cost" v-if="activeItem === 'cost'"></router-view>
      <router-view name="deparr" v-if="activeItem === 'deparr'"></router-view>
      <router-view name="abnormalGoods" v-if="activeItem === 'abnormalGoods'"></router-view>
    </keep-alive>
  </div>

</template>

<script>
export default {
  data() {
    return {
      activeItem: 'detail',
      type: 'main',
    }
  },
  mounted() {
    this.type = this.$route.params.type
    this.title = this.type === 'main' ? '进港主单' : '进港分单'
    this.activeItem = this.$route.params.item
    this.$route.params.id ? 
    this.$store.commit('CHANGE_TOPTITLE', this.title + ' - 编辑') :
    this.$store.commit('CHANGE_TOPTITLE', this.title + ' - 添加')
  },
  watch: {
    '$route'() {
      this.type = this.$route.params.type
      this.activeItem = this.$route.params.item
      this.title = this.type === 'main' ? '进港主单' : '进港分单' 
      this.$route.params.id ? 
      this.$store.commit('CHANGE_TOPTITLE', this.title + ' - 编辑') :
      this.$store.commit('CHANGE_TOPTITLE', this.title + ' - 添加')
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({params: {item: tab.name}})
    },
    backSearch() {
      this.$router.push(`/arrival/${this.type}`)
    },
  }
}
</script>

<style lang="less" scoped>
  .Billing {
    position: relative;
    padding: 0 120px;

    .closeBilling {
      position: absolute;
      top: 0px;
      right: 30px;
      font-size: 24px !important;
      color: #878D99;
      &:hover {
        color: #FA5555;
      }
    }
  }
</style>
