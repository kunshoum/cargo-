<template>
  <div id="active">
    <div id="content-active">
      <div class="section-active">
        <!-- <h3>使用中的轮挡</h3> -->
        <el-table :data="tableData" style="width: 100%" :height="this.height - 450" @row-click="showIcon">
          <el-table-column prop="gearNumber" label="轮挡编号">
          </el-table-column>
          <el-table-column prop="factoryNumber" label="出厂编号">
          </el-table-column>
          <el-table-column prop="airport" label="所属机场">
          </el-table-column>
          <el-table-column prop="flightNumber" label="对应航班号">
          </el-table-column>
          <el-table-column prop="aircraft" label="飞机型号">
          </el-table-column>
          <el-table-column prop="latlng" label="经度/纬度">
          </el-table-column>
          <el-table-column prop="OpeningTime" label="开启时间">
          </el-table-column>
          <el-table-column prop="lengthOf" label="本次使用时长">
          </el-table-column>
          <el-table-column prop="electricity" label="电量">
            <template slot-scope="scope">
              <div class="electricity">
                <div class="electricityBg"></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="equipmenTure" label="设备温度">
          </el-table-column>
          <el-table-column prop="airportTure" label="机场温度">
          </el-table-column>
          <el-table-column prop="alarmNormal" label="报警/正常">
            <template slot-scope="scope">
              <i class="el-icon-error" v-show="alarmNormal === 1"></i>
              <i class="el-icon-success" v-show="alarmNormal === 0"></i>
            </template>
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
          gearNumber: "9898",
          factoryNumber: "JD8",
          airport: "西安航空公司",
          flightNumber: "HR9632",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          OpeningTime: "2018-03-05",
          lengthOf: "60分钟",
          electricity: "",
          equipmenTure: "20°",
          airportTure: "20°",
          alarmNormal: 1,
        },
        {
          gearNumber: "9899",
          factoryNumber: "MU2",
          airport: "西安航空公司",
          flightNumber: "MU2114",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          OpeningTime: "2018-03-07",
          lengthOf: "60分钟",
          electricity: "",
          equipmenTure: "20°",
          airportTure: "20°",
          alarmNormal: 1,
        },
        {
          gearNumber: "9908",
          factoryNumber: "CA1",
          airport: "西安航空公司",
          flightNumber: "CA1235",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          OpeningTime: "2018-03-09",
          lengthOf: "60分钟",
          electricity: "",
          equipmenTure: "20°",
          airportTure: "20°",
          alarmNormal: 1,
        },
        {
          gearNumber: "9001",
          factoryNumber: "MF1",
          airport: "西安航空公司",
          flightNumber: "MF1069",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          OpeningTime: "2018-03-15",
          lengthOf: "60分钟",
          electricity: "",
          equipmenTure: "25°",
          airportTure: "25°",
          alarmNormal: 1,
        },
        {
          gearNumber: "9905",
          factoryNumber: "G55",
          airport: "西安航空公司",
          flightNumber: "G55237",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          OpeningTime: "2018-03-20",
          lengthOf: "60分钟",
          electricity: "",
          equipmenTure: "27°",
          airportTure: "27°",
          alarmNormal: 1,
        },
        {
          gearNumber: "9888",
          factoryNumber: "3U3",
          airport: "西安航空公司",
          flightNumber: "3U3161",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          OpeningTime: "2018-03-24",
          lengthOf: "60分钟",
          electricity: "",
          equipmenTure: "23°",
          airportTure: "23°",
          alarmNormal: 1,
        },
        {
          gearNumber: "9889",
          factoryNumber: "CA1",
          airport: "西安航空公司",
          flightNumber: "CA1231",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          OpeningTime: "2018-02-25",
          lengthOf: "60分钟",
          electricity: "",
          equipmenTure: "15°",
          airportTure: "15°",
          alarmNormal: 1,
        },
        {
          gearNumber: "9878",
          factoryNumber: "HU3",
          airport: "西安航空公司",
          flightNumber: "HU3595",
          aircraft: "大型宽体飞机",
          latlng: "30°",
          OpeningTime: "2018-03-26",
          lengthOf: "60分钟",
          electricity: "",
          equipmenTure: "23°",
          airportTure: "23°",
          alarmNormal: 1,
        },

      ],
      alarmNormal: 1,
      height: window.innerHeight
    }
  },
  mounted() {
    // console.log(this.height)
  },
  methods: {
    showIcon(row) {
      this.$router.push({query: {tracker_no: row.gearNumber}})
    }
  }
}
</script>
<style lang="less">
#active {
  background: #fff;
  width: 100%;
  text-align: center;

  .el-table th>.cell {
    color: #00548A !important;
    white-space: nowrap !important;
  }
  .el-form-item__label {
    color: #00548A !important;
  }
  #content-active {
    height: 100%;

    .section-active {
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

      .el-table {
        margin-top: 4.1%;
        text-align: center;
      }
    }
  }

  .electricity {
    position: relative;
    width: 30px;
    height: 10px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #000;
    margin-left: 22px;
  }
  .electricityBg {
    width: 20px;
    height: 6px;
    margin-top: 1px;
    margin-left: 1.2px;
    background: #333;
    border-radius: 10px 0 0 10px;
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
</style>

