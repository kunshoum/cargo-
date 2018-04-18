<template>
<!-- 雷云朵 -->
	<el-dialog title="航班信息" :visible.sync="visible" width="70%" :before-close="close">
    <div v-if="detailInfo">
      <p class="flight_info">
        <span>全程{{ detail.full_mileage }}公里</span>
        <span>{{ detail.plan_fly_duration }}</span>
        <span>历史准点率:{{ detail.his_on_time_probability }}</span>
        <span>机型:{{ detail.model_code }}</span>
        <span>机龄:{{ detail.model_age }}年</span>
      </p>
      <div class="flight_thumb">
        <div class="flight_line"></div>
        <div class="station">
          <span class="blue_circle"></span>
          <span>{{ detailInfo[0].city.split('/')[1] }}</span>
          <span>{{ detailInfo[0].city.split('/')[0] }}</span>
        </div>
        <div class="station">
          <span class="blue_circle"></span>
          <span>{{ detailInfo[1].city.split('/')[1] }}</span>
          <span>{{ detailInfo[1].city.split('/')[0] }}</span>
        </div>
        <div class="station" v-if="detailInfo[2]">
          <span class="blue_circle"></span>
          <span>{{ detailInfo[2].city.split('/')[1] }}</span>
          <span>{{ detailInfo[2].city.split('/')[0] }}</span>
        </div>
      </div>
      <dl class="flight_list">
        <dt>
          <div>
            <p class="weather">{{ detailInfo[0].air[0] }}</p>  
            <p>
              <span>{{ detailInfo[0].air[1] }}</span>
              <span>{{ detailInfo[0].air[2] }}</span>
            </p>
          </div>
          <div>
            <p class="weather">{{ detailInfo[1].air[0] }}</p>  
            <p>
              <span>{{ detailInfo[1].air[1] }}</span>
              <span>{{ detailInfo[1].air[2] }}</span>
            </p>
          </div>
          <div v-if="detailInfo[2]">
            <p class="weather">{{ detailInfo[2].air[0] }}</p>  
            <p>
              <span>{{ detailInfo[2].air[1] }}</span>
              <span>{{ detailInfo[2].air[2] }}</span>
            </p>
          </div>
        </dt>
        <dd>
          <div>{{ detailInfo[0].A.replace(/null/g,"暂无") }}</div>
          <div>{{ detailInfo[1].A.replace(/null/g,"暂无") }}</div>
          <div v-if="detailInfo[2]">{{ detailInfo[2].A.replace(/null/g,"暂无") }}</div>
        </dd>
        <dd>
          <div>{{ detailInfo[0].B.replace(/null/g,"暂无") }}</div>
          <div>{{ detailInfo[1].B.replace(/null/g,"暂无") }}</div>
          <div v-if="detailInfo[2]">{{ detailInfo[2].B.replace(/null/g,"暂无") }}</div>
        </dd>
        <dd>
          <div>{{ detailInfo[0].C.replace(/null/g,"暂无") }}</div>
          <div>{{ detailInfo[1].C.replace(/null/g,"暂无") }}</div>
          <div v-if="detailInfo[2]">{{ detailInfo[2].C.replace(/null/g,"暂无") }}</div>
        </dd>  
      </dl>
    </div>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="sure" size="mini">确 定</el-button>
    </span>
	</el-dialog>
</template>

<script>
	export default {
    props: ['detailInfo', 'detail', 'visible'],
    mounted() {
    },
		methods: {
			close() {
        this.$emit('close')
      },
      sure() {
        this.$emit('close')
      }
		},
	}
</script>

<style lang="less" scoped>
  .flight_info {
    text-align: center;
    margin-bottom: 20px;
  }

  .flight_thumb {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .flight_line {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      height: 5px;
      background-color: #00bbff;
    }
    .station {
      width: 100px;
      span {
        display: block;
        text-align: center;
      }
      .blue_circle {
        position: relative;
        border-radius: 50%;
        border: 5px solid #00bbff;
        width: 30px;
        height: 30px;
        margin: 0 auto 10px;
        background-color: #fff;
        z-index: 100;
      }
    }
  }

  .flight_list {
    dt {
      border-radius: 5px 5px 0 0;
      border-top: .2em solid #00B5AD !important;
      font-weight: bold;
      div {
        .weather {
          line-height: 48px;
          margin-right: 25px;
        }
        display: flex;
        p {
          span {
            display: block;
          }
        }
      }
    }
    dt, dd{
      display: flex;
      justify-content: space-around;
      padding: 7px 0;
      border: 1px solid rgba(34,36,38,.1);
    }
  }
  
</style>
