<template>
  <div id="flight-history">
    <div id="content-flight-history">
      <div class="section-history">
        <!-- <h3>历史记录</h3> -->
        <el-table :data="tableData" style="width: 100%" :height="this.height - 450" @row-click="showIcon">
           <el-table-column fixed type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="date" label="日期" width="120">
          </el-table-column>
          <el-table-column prop="from" label="始发站" width="140">
          </el-table-column>
          <el-table-column prop="to" label="目的站" width="140">
          </el-table-column>
          <el-table-column prop="aircraft" label="机型">
          </el-table-column>
          <el-table-column prop="flighttime" label="飞行时间">
          </el-table-column>
          <el-table-column prop="std" label="计划出发时间" width="120">
          </el-table-column>
          <el-table-column prop="atd" label="实际出发时间" width="120">
          </el-table-column>
          <el-table-column prop="sta" label="计划到达时间" width="120">
          </el-table-column>
          <el-table-column prop="status" label="轮挡状态">
          </el-table-column>
          <el-table-column  label="回放">
            <template slot-scope="scope">
              <img src="@/assets/record.png" alt="">
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
          date: "28 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "321",
          flighttime: "-",
          std: "8:30 AM",
          atd: "-",
          sta: "10:25 AM",
          status: "未使用",
        },
        {
          date: "27 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "321",
          flighttime: "-",
          std: "8:30 AM",
          atd: "-",
          sta: "10:25 AM",
          status: "已使用",
        },
        {
          date: "26 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "321",
          flighttime: "-",
          std: "8:30 AM",
          atd: "-",
          sta: "10:25 AM",
          status: "已使用",
        },
        {
          date: "25 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "321",
          flighttime: "-",
          std: "8:30 AM",
          atd: "-",
          sta: "10:25 AM",
          status: "已使用",
        },
        {
          date: "24 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "321",
          flighttime: "-",
          std: "8:40 AM",
          atd: "-",
          sta: "10:35 AM",
          status: "未使用",
        },
        {
          date: "23 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "321",
          flighttime: "-",
          std: "8:40 AM",
          atd: "-",
          sta: "10:35 AM",
          status: "已使用",
        },
        {
          date: "22 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "321",
          flighttime: "-",
          std: "8:40 AM",
          atd: "-",
          sta: "10:35 AM",
          status: "已使用",
        },
        {
          date: "21 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "321",
          flighttime: "-",
          std: "8:40 AM",
          atd: "-",
          sta: "10:35 AM",
          status: "已使用",
        },
        {
          date: "20 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "A321 (B-6792)",
          flighttime: "1:31",
          std: "8:40 AM",
          atd: "8:52AM",
          sta: "10:35 AM",
          status: "未使用",
        },
        {
          date: "19 Mar 2018",
          from: "Xi'an(XIY)",
          to: "Beijing(PEK)",
          aircraft: "A321 (B-6363)",
          flighttime: "1:26",
          std: "8:40 AM",
          atd: "8:51AM",
          sta: "10:35 AM",
          status: "已使用",
        },
      ],
      height: window.innerHeight,
    }
  },

  methods: {
    showIcon(row) {
      this.$router.push({query: {date: row.date}})
    }
  }
}
</script>
<style lang="less">
#flight-history {
  background: #fff;
  width: 100%;
  // overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
  .section-history {
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

  #content-flight-history {
    box-sizing: border-box;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 0 #BEC2C9;
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

