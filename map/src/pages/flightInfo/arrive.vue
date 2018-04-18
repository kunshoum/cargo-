<template>
  <div id="flight-arrive">
    <div id="content-flightapp">
      <div class="section-arrive">
        <!-- <h3>进港航班</h3> -->
        <el-table :data="tableData" style="width: 100%" :height="this.height - 450" @row-click="showIcon">
          <el-table-column prop="date" label="到达时间/计划到达时间" width="180">
          </el-table-column>
          <el-table-column prop="flight_no" label="航班号" width="180">
          </el-table-column>
          <el-table-column prop="departure" label="始发站" width="180">
          </el-table-column>
          <el-table-column prop="aviation" label="航空公司">
          </el-table-column>
          <el-table-column prop="aircraft" label="飞机型号" width="180">
          </el-table-column>
          <el-table-column prop="latlng" label="经度/纬度" width="180">
          </el-table-column>
          <el-table-column prop="status" label="轮挡使用状态">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          flight_no: "JD3217",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          status: "慢车",
        },
        {
          date: "2016-12-03",
          flight_no: "HU3578",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "34°",
          status: "慢车",
        },
        {
          date: "2018-01-11",
          flight_no: "DL6552",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "25°",
          status: "慢车",
        },
        {
          date: "2017-08-30",
          flight_no: "MU2102",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "37°",
          status: "慢车",
        },
        {
          date: "2017-12-02",
          flight_no: "NZ3995",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "33°",
          status: "慢车",
        },

        {
          date: "2018-03-02",
          flight_no: "HU3595",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "39°",
          status: "慢车",
        },{
          date: "2016-09-12",
          flight_no: "TV6213",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "23°",
          status: "慢车",
        },
        {
          date: "2018-02-02",
          flight_no: "CA1231",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "27°",
          status: "慢车",
        },
        {
          date: "2016-04-12",
          flight_no: "3U3161",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "25°",
          status: "慢车",
        },
        {
          date: "2018-02-02",
          flight_no: "G55237",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "22°",
          status: "慢车",
        },
        {
          date: "2018-01-30",
          flight_no: "MF1069",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "22°",
          status: "慢车",
        },
        {
          date: "2017-02-22",
          flight_no: "CA1235",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "28°",
          status: "慢车",
        },
        {
          date: "2017-01-02",
          flight_no: "MU2114",
          departure: "上海市",
          aviation: "西安航空公司",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          status: "慢车",
        },
        

      ],
      height: window.innerHeight,
    }
  },

  methods: {
    showIcon(row) {
      this.$router.push({query: {flight_no: row.flight_no}})
    }
  }
}
</script>
<style lang="less">
#flight-arrive {
  background: #fff;
  width: 100%;
  .section-arrive {
    margin-top: 20px;
    box-sizing: border-box;
    padding-top: 30px;
  }
  .el-table th>.cell {
    color: #00548A !important;
  }
  .el-form-item__label {
    color: #00548A !important;
  }
  #content-flightapp {
    box-sizing: border-box;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 3px 3px 20px 0 #BEC2C9;
    border-radius: 30px;
    padding: 0 3.3%;
    text-align: center;
    padding-bottom: 20px;

    h3 {
      color: #00335D;
      display: block;
      font-size: 30px;
      margin-top: 20px;
      opacity: 100%;
      padding-top: 20px;
    }

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
    }
  }
}
</style>

