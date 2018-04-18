/**
 * 马少良
 */
<template>
  <div class="StowageBook">
    <router-view></router-view>
    <div class="step_wrap" v-if="$route.name !== 'StowageByFlight'">
      <el-steps :active="nowStowageStep" align-center>
        <el-step 
        v-for="(item, index) in steps" 
        :key="index"
        :title="item.title"
        @click.native="toStep(item.name)"
        class="stepItem"></el-step>
      </el-steps>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        steps: [
          {
            name: 'StowageBooking',
            title: '配载订舱',
          }, 
          {
            name: 'StowageList',
            title: '配载列表',
          }, 
          {
            name: 'StowageStart', 
            title: '初舱单',
          },
          {
            name: 'StowageEnd', 
            title: '终舱单',
          },
          {
            name: 'FlightClose',
            title: '航班关闭',
          },
        ]
      }
    },
    computed: {
      ...mapState(["nowStowageStep"]),
    },
    methods: {
      toStep(item) {
        this.$router.push({name: item})
      }
    }
  }
</script>

<style lang="less">
  .StowageBook {
    position: relative;
    padding: 40px 20px 20px 20px;
    height: 100%;
    background: #fff;
    overflow-y: auto;
    box-sizing: border-box;
    .step_wrap {
      position: absolute;
      z-index: 10;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 50px;

      .stepItem {
        cursor: pointer;
        
        .el-step__line {
          background-color: #7489FF;
        }
        .el-step__title {
          font-size: 12px;
          color: #9B9B9B !important;
        }
        .el-step__icon {
          width: 24px;
          height: 24px;
          border: 1px solid;
          font-family: ArialMT;
          font-size: 14px;
        }

        .is-process {
          color: #7489FF !important;
          .el-step__icon {
            border-color: #7489FF;
          }
        }

        .is-wait {
          color: #fff;
          .el-step__icon {
            background: #54A2FD;
            border-color: #54A2FD;
          }
        }

        .is-finish {
          color: #9B9B9B;
          .el-step__icon {
            border-color: #9B9B9B;
          }
        }

        &:last-child {
          .is-process {
            color: #FF7777 !important;
            .el-step__icon {
              border-color: #FF7777;
            }
          }

          .is-wait {
            color: #fff;
            .el-step__icon {
              background: #FF7777;
              border-color: #FF7777;
            }
          }
        }
      }
    }
  }
</style>
