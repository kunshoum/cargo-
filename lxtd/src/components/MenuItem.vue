/** 
* 马少良
*/

<template>
  <el-submenu :index="menuItem.index + ''">
    <template slot="title" v-if="menuItem.icon">
      <i :class="menuItem.icon"></i>
      <span slot="title">{{menuItem.name}}</span>
    </template>
    <span slot="title" v-if="!menuItem.icon">{{menuItem.name}}</span>
    <el-submenu
      v-for="(item,index) in menuItem.children" 
      v-if="item.children.length"
      :index="item.index + ''"
      :key="index"
    >
      <span slot="title">{{item.name}}</span>
      <menu-items
        v-for="(subitem,index) in item.children"
        v-if="subitem.children.length"
        :menuItem="subitem"
        :key="index"
      />
      <el-menu-item
        v-for="(subitem,index) in item.children" 
        v-if="!subitem.children.length"
        :index="subitem.route"
        :key="index"
        @click.native="goto(subitem)"
      >
        {{subitem.name}}
      </el-menu-item>
    </el-submenu>
    <el-menu-item
      v-for="(item,index) in menuItem.children" 
      v-if="!item.children.length"
      :index="item.route"
      :key="index"
      @click.native="goto(item)"
    >
      {{item.name}}
    </el-menu-item>
  </el-submenu>
</template>
<script>
  export default {
    name: 'menu-items',
    props: ['menuItem'],
    mounted() {
      
    },
    data() {
      return {

      }
    },
    methods: {
      goto(item) {
        this.$store.commit('ADD_FOOTNAV', item)
        this.$router.push(item.route)
      },
    },
  }
</script>
<style lang="less" >
.el-submenu__title {
  
  span {
    font-family: SIL-Hei-Med-Jian;
    font-size: 14px;
    color: #FFFFFF;
  }
  .iconfont {
    font-size: 30px;
    color: #fff;
  }
}
.el-menu-item {
  background: #1E2247;
}
.el-submenu {
  background: #1E2247;
}
.el-submenu__icon-arrow {
    color: #fff !important;
}
.el-submenu__title:hover {
  background: #95A5FB !important;
}
.el-menu-item:hover {
  background: #95A5FB !important;
}
.el-menu-item.is-active {
  color: #fff !important;
  background: #95A5FB;
}
</style>