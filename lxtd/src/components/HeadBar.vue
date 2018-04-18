/** 
* 马少良
*/

<template>
  <div class="HeadBar">
    <div class="left">
      <div class="menu" @click="toggleSideBar">
        <i class="iconfont icon-liebiaoshitucaidan" v-if="this.nowBar === 'ShortCut'"></i>
        <i class="iconfont icon-gonggeshitu" v-if="this.nowBar === 'LMenu'"></i>
      </div>
      <div class="logo">
        <img src="../images/big_logo.png">
      </div>
    </div>
    <div class="name">{{topTitle}}</div>
    <el-popover
      popper-class="user_info"
      ref="popover5"
      placement="top"
      width="150"
      trigger="hover">
      <el-button size="mini" type="primary">帮助手册</el-button>
      <el-button size="mini" @click="login_out" class="tuichu">退出</el-button>
    </el-popover>
    <div class="avatar"><i class="el-icon-fa-user-circle-o" v-popover:popover5></i></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {loginOut} from '../service'
  import {end} from "@/utils/sessionTimeOut"

  export default {
    data() {
      return {
        nowBar: 'ShortCut',
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.commit('TOGGLE_SIDEBAR', this.nowBar)
        this.nowBar = this.nowBar === 'ShortCut' ? 'LMenu' : 'ShortCut'
      },
      out() {
        loginOut().then(res => {
          if(res.data.status === 200) {
            end()
            this.$clearStore()
            this.$router.push('/login')
            window.location.reload()
          }
        })
      },
      login_out() {
        this.$confirm('确认要退出吗?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.out()
        }).catch(() => {
          return false         
        })
      },
    },
    computed: {
      ...mapState(['topTitle'])
    }
  }
</script>

<style lang="less">
  @import "../style/mixin.less";
  .el-header {
    background: #AAB2DE !important;
    border-bottom: 1px solid #FFFFFF;
  }
  .HeadBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-right: 40px;

    .name {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #4A4A4A;
    }
    
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 260px;

      .menu {
        i {
          font-size: 30px !important;
          cursor: pointer;
          color: #FFFFFF;
        }
      }

      .logo {
        width: 200px;
        img {
          .fillFull;
          width: 120px;
          height: 40px;
          margin: 10px 0 0 20px;
        }
      }
    }
    .avatar {
      i {
        font-size: 30px !important;
        color: #FFFFFF;
        padding-top: 15px;
      }
    }
  }
  .user_info {
    width: 80px !important;
    min-width: 80px !important;
    .el-button{
      margin-top: 5px!important;
      background-color: #8768FF!important;
      color: #000 !important;
      // border: 1px solid #4A4A4A!important;
    }
  }
  .tuichu {
    color: #fff;
  }
  .tuichu:hover {
    color: #fff;
  }
  
</style>