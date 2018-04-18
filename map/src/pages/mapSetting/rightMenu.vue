<template>
  <ul class="right_menu">
    <li @click="showSetting">
      <img src="@/images/right_menu/icon-setting.png">
    </li>
    <li @click="fullScreen">
      <img src="@/images/right_menu/icon-more.png">
    </li>
    <li @click="showSearch">
      <img src="@/images/right_menu/icon-search.png">
    </li>
    <li>
      <img src="@/images/right_menu/icon-save.png">
    </li>
    <li class="filter">
      <img src="@/images/right_menu/icon-time.png">
    </li>
    <li @click="zoomOut">
      <img src="@/images/right_menu/icon-add.png">
    </li>
    <li @click="zommIn">
      <img src="@/images/right_menu/icon-minu.png">
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      zoomOut() {
        this.$emit("zoom", 'add')
      },
      zommIn() {
        this.$emit("zoom", 'sub')
      },
      showSetting() {
        this.$emit("changeSettingVisible")
      },
      fullScreen() {
        document.requestFullscreen()
      },
      showSearch() {
        this.$emit("showSearch")
      }
    },
  }
</script>

<style lang="less">
  .right_menu {
    position: absolute;
    top: 88px;
    right: 21px;
    width: 40px;
    z-index: 9999;

    li {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #006BB0;
      box-shadow: 2px 2px 10px 0 #9C9C9A;
      margin-bottom: 9px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      i {
        color: #fff;
        font-size: 24px;
        font-weight: bold;
      }

      .el-icon-rank {
        transform: rotate(45deg);
      }
    }

    .filter {
      margin-bottom: 45px;
    }
  }
</style>
