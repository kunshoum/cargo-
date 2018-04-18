/** 
* 马少良
*/

<template>
<div class="FootNav">
  <div class="footNavSlider clearfix" ref="footNavSlider" :style="styleObject">
    <router-link 
      v-for="(item, index) in footNavs"
      :key="index"
      :to="item.route" 
      tag="span" 
      class="nav_item" 
      active-class="active"
    >
      {{item.name}}
      <i class="el-icon-close close" v-if="!item.noClose" @click.stop="close(item.name, index)"></i>
    </router-link>
  </div>
  <i class="el-icon-d-arrow-right move moveRight" v-if="limitLen < 0" @click="moveRight"></i>
  <i class="el-icon-d-arrow-left move moveLeft" v-if="limitLen < 0" @click="moveLeft"></i>
</div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        moveLen: 0,
        limitLen: 0,
      }
    },
    watch: {
      footNavs() {
        this.$nextTick(function () {
          this.moveLen = (window.innerWidth - this.$refs["footNavSlider"].offsetWidth)
          this.limitLen = (window.innerWidth - this.$refs["footNavSlider"].offsetWidth)
				})
      }
    },
    computed: {
      ...mapState(['footNavs']),
      styleObject() {
        if(this.moveLen < 0) {
          return {
            transform: `translateX(${this.moveLen}px)`
          }
        }else {
          return {
            transform: 'translateX(0px)'
          }
        }
      },
    },
    methods: {
      close(name, index) {
        this.$store.commit('CLOSE_FOOTNAV', name)
        this.$router.push(this.footNavs[index - 1].route)
      },
      moveLeft() {
        if(this.moveLen < 150) {
          this.moveLen += 150
        }
      },
      moveRight() {
        if((this.moveLen - 130) > this.limitLen) {
          this.moveLen -= 150
        }
      },
    },
  }
</script>

<style lang="less" scoped>
@import "../style/mixin.less";
.FootNav {
  height: 100%;
  position: relative;
  background: #141736;
  .footNavSlider {
    white-space: nowrap;
    position: relative;
    transition: transform .3s;
    float: left;
    z-index: 2;
    background: #141736;
    // border: 1px solid #8668FE;
  }
  .move {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #E6EBF5;
    z-index: 10;
    &:hover {
      color: #fff;
    }
  }
  .moveRight {
    right: 0;
  }
  .moveLeft {
    left: 0;
  }
  .nav_item {
    display: inline-block;
    height: 100%;
    line-height: 32px;
    padding: 0 23px;
    box-sizing: border-box;
    border: 1px solid #8668FE;
    cursor: pointer;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #fff;

    .close {
      border-radius: 50%;
      &:hover {
        background: #B4BCCC;
        color: #E6EBF5;
      }
    }

    &:hover {
      background: #fff;
      color: #828282;
    }
  }
  .nav_item.active {
    background: #fff;
    color: #828282;
  }
}
</style>