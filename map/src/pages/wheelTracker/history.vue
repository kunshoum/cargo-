<template>
  <div id="historys">
    <div id="content-history">
      <div class="section-history" :style="{height: height + 'px'}">
        <!-- <h3 class="h3-history">历史记录</h3> -->
        <div class="history-search">
          <el-form :model="searchInfo" :inline="true" class="demo-form-inline">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="始发站" prop="params.departure">
                  <el-input size="mini" v-model="searchInfo.params.departure" placeholder="始发站"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="航班号" prop="params.flight_no">
                  <el-input size="mini" v-model="searchInfo.params.flight_no" placeholder="航班号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="btn_wrap">
            <el-row>
              <el-col :span="6" :offset="17">
                <div class="grid-content bg-purple" style="float: right">
                  <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
                  <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div>
          <el-table :data="tableData" style="width: 100%" :height="height - 160 + 'px'" @row-click="showIcon">
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="flight_no" label="航班号">
            </el-table-column>
            <el-table-column prop="departure" label="始发站">
            </el-table-column>
            <el-table-column prop="departion" label="目的站">
            </el-table-column>
            <el-table-column prop="lengthTime" label="使用时长">
            </el-table-column>
            <el-table-column prop="openTime" label="开启时间">
            </el-table-column>
            <el-table-column prop="closingTime" label="关闭时间">
            </el-table-column>
            <el-table-column prop="latlng" label="经度/纬度">
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <i class="el-icon-error" v-show="alarmNormal === 1"></i>
                <i class="el-icon-success" v-show="alarmNormal === 0"></i>
              </template>
            </el-table-column>
            <el-table-column  label="回放">
            <template slot-scope="scope">
              <img class="playback" src="@/assets/record.png" alt="">
            </template>
          </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: window.innerHeight - 350,
      tableData: [
        {
          date: "2016-05-02",
          flight_no: "JD3217",
          departure: "上海市",
          departion: "西安",
          lengthTime: "1分钟",
          openTime: "30s",
          closingTime: "8s",
          latlng: "33°",
          status: "正常",
        },
        {
          date: "2016-05-09",
          flight_no: "HU3578",
          departure: "上海市",
          departion: "西安",
          lengthTime: "2分钟",
          openTime: "30s",
          closingTime: "7s",
          latlng: "29°",
          status: "正常",
        },
        {
          date: "2017-02-02",
          flight_no: "DL6552",
          departure: "上海市",
          departion: "西安",
          lengthTime: "1分钟",
          openTime: "33s",
          closingTime: "7s",
          latlng: "30°",
          status: "正常",
        },
        {
          date: "2017-03-02",
          flight_no: "MU2102",
          departure: "上海市",
          departion: "西安",
          lengthTime: "1分钟",
          openTime: "30s",
          closingTime: "6s",
          latlng: "30°",
          status: "正常",
        },
        {
          date: "2017-07-02",
          flight_no: "NZ3995",
          departure: "上海市",
          departion: "西安",
          lengthTime: "2分钟",
          openTime: "30s",
          closingTime: "5s",
          latlng: "30°",
          status: "正常",
        },
        {
          date: "2017-12-07",
          flight_no: "HU3595",
          departure: "上海市",
          departion: "西安",
          lengthTime: "1分钟",
          openTime: "35s",
          closingTime: "8s",
          latlng: "30°",
          status: "正常",
        },
        {
          date: "2018-01-02",
          flight_no: "TV6213",
          departure: "上海市",
          departion: "西安",
          lengthTime: "1分钟",
          openTime: "30s",
          closingTime: "8s",
          latlng: "23°",
          status: "正常",
        },
        {
          date: "2018-03-03",
          flight_no: "CA1231",
          departure: "上海市",
          departion: "西安",
          lengthTime: "2分钟",
          openTime: "30s",
          closingTime: "5s",
          latlng: "30°",
          status: "正常",
        },
        {
          date: "2017-03-08",
          flight_no: "3U3161",
          departure: "上海市",
          departion: "西安",
          lengthTime: "1分钟",
          openTime: "26s",
          closingTime: "7s",
          latlng: "30°",
          status: "正常",
        },
        {
          date: "2018-01-01",
          flight_no: "G55237",
          departure: "上海市",
          departion: "西安",
          lengthTime: "1分钟",
          openTime: "30s",
          closingTime: "9s",
          latlng: "28°",
          status: "正常",
        },
        {
          date: "2017-03-24",
          flight_no: "MF1069",
          departure: "上海市",
          departion: "西安",
          lengthTime: "1分钟",
          openTime: "30s",
          closingTime: "6s",
          latlng: "31°",
          status: "正常",
        },

      ],
      searchInfo: {
        params: {
          departure: "", //始发站
          flight_no: "", //航班号
        },
      },
      alarmNormal: 1,
    }
  },

  methods: {
    searchHandler() {},
    reset() {},
    showIcon(row) {
      this.$router.push({query: {date: row.date}})
    }
  },
}
</script>
<style lang="less">
#historys {
  background: #fff;
  width: 100%;
  text-align: center;
  .el-table th>.cell {
    color: #00548A !important;
  }
  .el-form-item__label {
    color: #00548A !important;
  }
  #content-history {
    height: 100%;

    .section-history {
      box-sizing: border-box;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 3px 3px 20px 0 #BEC2C9;
      border-radius: 30px;
      padding: 10px 3.3% 0 3.3%;
      padding-bottom: 50px;
      margin-top: 20px;

      h3 {
        color: #00335D;
        display: block;
        font-size: 30px;
        margin-top: 20px;
        opacity: 100%;
        padding-top: 20px;
      }

      .history-search {
        .el-col {
          .el-form-item {
            margin-top: 9%;
          }
          // 按钮
          .el-button--mini {
            width: 100px;
            height: 30px;
            background: #54A1FB !important;
            border-radius: 10px !important;
          }

          .el-table th>.cell {
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #00548A;
          }
        }
        
      } 
    .playback {
      width: 20px;
      height: 15px;
    }

    }
  }
  .el-icon-error {
    color: red;
    font-size: 15px;
  }
  .el-icon-success {
    color: rgb(11, 245, 31);
    font-size: 15px;
  }
}
.el-table {

  .cell {
    white-space: nowrap !important;
  }
}
 


</style>

