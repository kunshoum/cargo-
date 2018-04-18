<template>
  <div id="sleep">
    <div id="content-sleep">
      <div class="section-sleep">
        <!-- <h3>休眠中的轮挡</h3> -->
        <el-table :data="tableData" style="width: 100%" :height="this.height"  @row-click="showIcon">
          <el-table-column prop="gearNumber" label="轮挡编号">
          </el-table-column>
          <el-table-column prop="factoryNumber" label="出厂编号">
          </el-table-column>
          <el-table-column prop="airport" label="所属机场">
          </el-table-column>
          <el-table-column prop="closingTime" label="关闭时间">
          </el-table-column>
          <el-table-column prop="latlng" label="经度/纬度">
          </el-table-column>
          <el-table-column prop="lengthTime" label="使用总时长">
          </el-table-column>
          <el-table-column prop="electricity" label="电量">
            <template slot-scope="scope">
              <div class="electricity">
                <div class="electricityBg"></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="AlarmNormal" label="报警/正常">
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
          gearNumber: "1221",
          factoryNumber: "D3233",
          airport: "西安航空公司",
          closingTime: "2018-03-15",
          latlng: "20°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
        {
          gearNumber: "1222",
          factoryNumber: "D3253",
          airport: "西安航空公司",
          closingTime: "2018-03-15",
          latlng: "20°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
        {
          gearNumber: "1223",
          factoryNumber: "D3233",
          airport: "西安航空公司",
          closingTime: "2018-03-16",
          latlng: "24°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
        {
          gearNumber: "1224",
          factoryNumber: "Z3233",
          airport: "西安航空公司",
          closingTime: "2018-03-16",
          latlng: "20°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
        {
          gearNumber: "1225",
          factoryNumber: "M6233",
          airport: "西安航空公司",
          closingTime: "2018-03-16",
          latlng: "26°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
        {
          gearNumber: "1226",
          factoryNumber: "K3203",
          airport: "西安航空公司",
          closingTime: "2018-03-17",
          latlng: "21°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
        {
          gearNumber: "1227",
          factoryNumber: "JD563",
          airport: "西安航空公司",
          closingTime: "2018-03-17",
          latlng: "20°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
        {
          gearNumber: "1228",
          factoryNumber: "D5603",
          airport: "西安航空公司",
          closingTime: "2018-03-18",
          latlng: "21°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
        {
          gearNumber: "1229",
          factoryNumber: "X3443",
          airport: "西安航空公司",
          closingTime: "2018-03-18",
          latlng: "20°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
        {
          gearNumber: "1230",
          factoryNumber: "D3260",
          airport: "西安航空公司",
          closingTime: "2018-03-18",
          latlng: "23°",
          lengthTime: "30分钟",
          electricity: "",
          AlarmNormal: "正常",
        },
      ],
      height: window.innerHeight - 450 + 'px',
      alarmNormal: 0,
    }
  },
  methods: {
    showIcon(row) {
      this.$router.push({query: {tracker_no: row.gearNumber}})
    }
  }
}
</script>
<style lang="less">
#sleep {
  background: #fff;
  width: 100%;
  text-align: center;

  .el-table th>.cell {
    color: #00548A !important;
  }
  .el-form-item__label {
    color: #00548A !important;
  }
  #content-sleep {
    height: 100%;

    .section-sleep {
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
    margin-left: 45px;
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
.el-table {
  .cell {
    white-space: nowrap !important;
  }
}
</style>

