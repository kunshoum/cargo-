<template>
  <div class="Billing">
    <el-tabs v-model="activeItem" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="开单明细" name="detail"></el-tab-pane>
      <el-tab-pane label="开单费用" name="cost"></el-tab-pane>
      <el-tab-pane label="拼单明细" name="bind"></el-tab-pane>
      <el-tab-pane label="体积" name="volume"></el-tab-pane>
      <el-tab-pane label="出发/到达信息" name="deparr"></el-tab-pane>
      <el-tab-pane label="相关航班信息" name="flight"></el-tab-pane>
    </el-tabs>
    <i class="el-icon-circle-close closeBilling" @click="backSearch"></i>
    <keep-alive>
      <router-view name="detail" v-if="activeItem === 'detail'"></router-view>
      <router-view name="cost" v-if="activeItem === 'cost'"></router-view>
      <router-view name="bind" v-if="activeItem === 'bind'"></router-view>
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
    
    if(this.$route.params.id) {
      this.$store.commit('CHANGE_TOPTITLE', '民航快递 - 编辑')
    }else {
      this.$store.commit('CHANGE_TOPTITLE', '民航快递 - 添加')
    }
  },
  watch: {
    '$route.params.item'() {
      this.activeItem = this.$route.params.item
    },
    '$route.params.id'(id) {
      if(id) {
        this.$store.commit('CHANGE_TOPTITLE', '民航快递 - 编辑')
      }else {
        this.$store.commit('CHANGE_TOPTITLE', '民航快递 - 添加')
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({params: {item: tab.name}})
    },
    backSearch() {
      this.$router.push(`/cae`)
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
