/** 
* 马少良
*/

<template>
<el-menu class="el-menu-vertical-demo" 
  :collapse="false" 
  text-color="#bfcbd9"
  active-text-color="#95A5FB"
  :default-active="activeIndex"
  unique-opened
>
  <menu-items 
    v-for="(item,index) in menuData"
    :menuItem="item"
    :key="index"
  />
</el-menu>
</template>

<script>
import MenuItems from "./MenuItem.vue"
export default {
  data() {
    return {
      authList: [],
      menuData: [],
    }
  },
  components: {
    MenuItems,
  },
  computed: {
    activeIndex() {
      if (!this.authList.length) {
        return this.$route.path
      }

      return this.authList.filter(item => {
        if (item && item.route) {
          return this.$route.path.indexOf(item.route) > -1
        }
      })[0]
        ? this.authList.filter(item => {
            if (item && item.route) {
              return this.$route.path.indexOf(item.route) > -1
            }
          })[0].route
        : this.$route.path
    },
  },
  mounted() {
    this.authList = JSON.parse(this.$getStore("authList")).filter(item => {
      return item.is_select * 1 === 1 && item.page_item * 1 === 0
    })

    this.menuData = this.getMenuData()
  },
  methods: {
    getChild(parent) {
      // 获取父节点下的子节点
      let child = []
      let index = 1
      this.authList.forEach(item => {
        if (item && item.parent_id === parent.id) {
          child.push({ ...item, index: item.id })
        }
      })
      return child
    },
    formatData(data) {
      // 递归数据
      if (!data.length) {
        return
      }

      data.forEach(item => {
        item.children = this.getChild(item)
        this.formatData(item.children)
      })

      return data
    },
    getMenuData() {
      return this.formatData(this.getChild({ id: 0 }))
    },
  },
}
</script>

<style lang="less" scoped>
.el-menu {
  .el-submenu {
    background: #1E2247 !important;
  } 
}
.el-submenu__title:hover {
  background: #95A5FB !important;
}
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: auto;
//   min-width: 180px;
//   min-height: 400px;
//   border-right: none;
// }
// .el-menu-item,
// .el-submenu__title {
//   height: 50px;
//   line-height: 50px;
// }
</style>