<template>
  <div id="filght">
    <div id="content-filght" :style="{height: height  + 'px'}">
      <!-- <h3 class="h3-history">航班数据</h3> -->
      <el-form :model="searchInfo" :inline="true" class="demo-form-inline search_form">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="航班号" class="grid-content" prop="params.flight_no">
              <el-input size="mini" v-model="searchInfo.params.flight_no" placeholder="航班号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="始发站" class="grid-content" prop="params.departure">
              <el-input size="mini" v-model="searchInfo.params.departure" placeholder="始发站"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="目的站" class="grid-content" prop="params.destination">
              <el-input size="mini" v-model="searchInfo.params.destination" placeholder="目的站"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn_wrap">
        <el-row>
          <el-col :span="8" :offset="15">
            <div class="grid-content bg-purple" style="float: right; margin-bottom: 20px;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="install">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="receive_list">
        <el-table :data="tableData" style="width: 100%" :height="height - 160 + 'px'">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
          <!-- <el-table-column prop="" label="操作" width="70">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看" placement="right">
              </el-tooltip>
            </template>
          </el-table-column> -->
          <el-table-column sortable prop="flight_no" label="航班号"></el-table-column>
          <el-table-column sortable prop="departure" label="始发站"></el-table-column>
          <el-table-column sortable prop="destination" label="目的站"></el-table-column>
          <el-table-column sortable prop="plan_fly_date" label="计划起飞"></el-table-column>
          <el-table-column sortable prop="actual_fly_date" label="实际起飞"></el-table-column>
          <el-table-column sortable prop="plan_drop_date" label="计划到达"></el-table-column>
          <el-table-column sortable prop="actual_drop_date" label="实际到达"></el-table-column>
        </el-table>
        <el-pagination
          v-if="total"
          @current-change="pageChange"
          :current-page="searchInfo.params.currPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <install-add :visible="installVisible" :title="title" @close="close" ></install-add> 
  </div>
</template>

<script>
  import InstallAdd from "./install.vue"
  export default {
    data() {
      return {
        height: window.innerHeight - 200,
        title: '航班数据',
        installVisible: false,
        searchInfo: {
          params: {
            currPage: 1,
            flight_no: '',
            departure: '',
            destination: '',
          },
        },
        tableData: [
          {
            flight_no: 'HU3578',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-03-26',
            actual_fly_date: '2018-03-26',
            plan_drop_date: '2018-03-26 10:00:00',
            actual_drop_date: '2018-03-26 13:00:00',
          },
          {
            flight_no: 'DL6552',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-03-28',
            actual_fly_date: '2018-03-28',
            plan_drop_date: '2018-03-28 02:00:00',
            actual_drop_date: '2018-03-28 06:40:00',
          },
          {
            flight_no: 'MU2102',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-03-09',
            actual_fly_date: '2018-03-09',
            plan_drop_date: '2018-03-09 09:00:00',
            actual_drop_date: '2018-03-09 11:00:00',
          },
          {
            flight_no: 'NZ3995',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-02-27',
            actual_fly_date: '2018-02-27',
            plan_drop_date: '2018-02-27 12:00:00',
            actual_drop_date: '2018-02-27 13:45:00',
          },
          {
            flight_no: 'HU3595',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-02-17',
            actual_fly_date: '2018-02-17',
            plan_drop_date: '2018-02-17 05:05:00',
            actual_drop_date: '2018-02-17 07:00:00',
          },
          {
            flight_no: 'TV6213',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-03-05',
            actual_fly_date: '2018-03-06',
            plan_drop_date: '2018-03-05 22:00:00',
            actual_drop_date: '2018-03-06 00:05:00',
          },
          {
            flight_no: 'HU3595',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-03-22',
            actual_fly_date: '2018-03-22',
            plan_drop_date: '2018-03-22 12:00:00',
            actual_drop_date: '2018-03-22 13:40:00',
          },
          {
            flight_no: 'CA1231',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-01-27',
            actual_fly_date: '2018-01-27',
            plan_drop_date: '2018-01-27 02:00:00',
            actual_drop_date: '2018-01-27 06:00:00',
          },
          {
            flight_no: '3U3161',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-01-07',
            actual_fly_date: '2018-01-07',
            plan_drop_date: '2018-01-07 09:00:00',
            actual_drop_date: '2018-01-07 10:00:00',
          },
          {
            flight_no: 'G55237',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-02-25',
            actual_fly_date: '2018-02-25',
            plan_drop_date: '2018-02-25 11:00:00',
            actual_drop_date: '2018-02-25 13:05:00',
          },
          {
            flight_no: 'MF1069',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-03-01',
            actual_fly_date: '2018-03-01',
            plan_drop_date: '2018-03-01 02:00:00',
            actual_drop_date: '2018-03-01 06:00:00',
          },
          {
            flight_no: 'CA1235',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-03-11',
            actual_fly_date: '2018-03-11',
            plan_drop_date: '2018-03-11 17:15:00',
            actual_drop_date: '2018-03-11 19:25:00',
          },
          {
            flight_no: 'MU2114',
            departure: '北京',
            destination: '西安',
            plan_fly_date: '2018-03-28',
            actual_fly_date: '2018-03-28',
            plan_drop_date: '2018-03-28 17:05:00',
            actual_drop_date: '2018-03-28 19:20:00',
          },
        ],
        total: '',
      }
    },
    mounted() {
    },
    components: {
      InstallAdd
    },
    methods: {
      // 点击查询，页面为第一页
      searchHandler() {
      },
      install() {
        this.installVisible = true
      },
      indexMethod(index) {
        return (this.searchInfo.params.currPage - 1) * 10 + index + 1
      },
      close() {
        this.installVisible = false
      },
    }
  }
</script>
<style lang="less">
#filght {
  text-rendering: optimizeSpeed;
  height: 100% !important;
  width: 100% !important;
  min-width: 320px;
  min-height: 264px;
  margin: 0px;
  padding: 0px;

  .el-table th>.cell {
    color: #00548A !important;
  }
  .el-form-item__label {
    color: #00548A !important;
  }

  #content-filght {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    margin-top: 80px;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 0 #BEC2C9;
    border-radius: 30px;
    padding: 0 3.3%;
    text-align: center;
    padding-bottom: 50px;

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

      .el-table th>.cell {
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #00548A;
      }
    }
  }
}

.el-table {
  .cell {
    white-space: nowrap !important;
  }
}
</style>