<template>
<!-- 雷云朵 -->
<div class="Search">
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/booking/byflight' }">航班列表</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ params: {item: 'bookinglist'} }">订舱明细</el-breadcrumb-item>
    <el-breadcrumb-item>按单号订舱</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
    <el-row :gutter="10">
      <el-col :span="4">
        <el-form-item label="运单号" class="grid-content break_line">
          <el-col :span="9">
            <el-form-item prop="params.order_three_code">
              <el-input size="mini" v-model="searchInfo.params.order_three_code" placeholder="三字码"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="14">
            <el-form-item prop="params.order_num">
              <el-input size="mini" v-model="searchInfo.params.order_num" placeholder="八位数字"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="单据类型" class="grid-content" prop="params.receipt_type">
          <el-select clearable size="mini" v-model="searchInfo.params.receipt_type" placeholder="">
            <el-option label="全部" value=""></el-option>
            <el-option label="及时" value="0"></el-option>
            <el-option label="事后" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="制单类型" class="grid-content" prop="params.easy_flag">
          <el-select clearable size="mini" v-model="searchInfo.params.easy_flag" placeholder="">
            <el-option label="全部" value=""></el-option>
            <el-option label="正常制单" value="0"></el-option>
            <el-option label="简易制单" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="出港状态" class="grid-content" prop="params.departure_status">
          <el-select clearable size="mini" v-model="searchInfo.params.departure_status" placeholder="">
            <el-option label="全部" value=""></el-option>
            <el-option label="未出港" value="0"></el-option>
            <el-option label="部分出港" value="1"></el-option>
            <el-option label="已出港" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="始发站" class="grid-content" prop="params.departure">
          <el-input size="mini" v-model="searchInfo.params.departure" placeholder="始发站代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="目的站" class="grid-content" prop="params.destination">
          <el-input size="mini" v-model="searchInfo.params.destination" placeholder="目的站代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="发货人" class="grid-content" prop="params.sender">
          <el-input size="mini" v-model="searchInfo.params.sender" placeholder="发货人代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="收货人" class="grid-content" prop="params.receiver">
          <el-input size="mini" v-model="searchInfo.params.receiver" placeholder="收货人代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开票日期" class="grid-content" prop="timeValue">
          <el-date-picker
            size="mini"
            v-model="searchInfo.timeValue"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%;"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="btn_wrap">
    <el-row>
      <el-col :span="3" :offset="1">
        <el-button type="primary" size="mini">确认订舱</el-button>
      </el-col>
      <el-col :span="4" :offset="16">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </div>
  <div class="receive_list">
    <el-table :data="tableData" border style="width: 100%" max-height="370" size="small" 
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
      <el-table-column prop="order_no" label="运单号" width="100">></el-table-column>
      <el-table-column prop="departure" label="始发站" width="100"></el-table-column>
      <el-table-column prop="destination" label="目的站" width="100"></el-table-column>
      <el-table-column prop="state" label="单号状态" :formatter="stateFormat"></el-table-column>
      <el-table-column prop="sender_name" label="发货人名称" width="150"></el-table-column>
      <el-table-column prop="receiver_name" label="收货人名称" width="150"></el-table-column>
      <el-table-column prop="billing_time" label="开票时间" width="140" :formatter="timeFormat"></el-table-column>
      <el-table-column prop="receiver_telephone" label="收货人电话" width="120"></el-table-column>
      <el-table-column prop="departure_status" label="出港状态" :formatter="depStateFormat"></el-table-column>
      <el-table-column prop="sender_telephone" label="发货人电话" width="120"></el-table-column>
      <el-table-column prop="correspond_order_no" label="对应单号" width="200"></el-table-column>
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
</template>

<script>
import { getReciveList } from "../../../service";
import { formatTime } from "../../../utils/time.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "按作业航班订舱",
      searchInfo: {
        params: {
          type: 0,
          order_three_code: "", // 单号三字码
          order_num: "", // 单号八位数字
          receipt_type: "", // 单据类型
          easy_flag: "", // 制单类型
          departure_status: "", // 出港状态
          departure: "", // 始发站
          destination: "", // 目的站
          sender: "", // 发货人,
          receiver: "", // 收货人,
          billing_time_start: "", // 开始日期
          billing_time_end: "", // 结束日期
          currPage: 1
        },
        timeValue: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [],
      total: "",
      loading: false
    };
  },
  watch: {
    $route() {
      this.load();
    }
  },
  mounted() {
    this.load();
  },
  computed: {
    ...mapState(["loadingTime"])
  },
  methods: {
    load() {
      this.$store.commit("CHANGE_TOPTITLE", this.title);
      this.search();
    },
    search() {
      this.loading = true;
      this.searchInfo.params.billing_time_start = this.searchInfo.timeValue[0] || "";
      this.searchInfo.params.billing_time_end = this.searchInfo.timeValue[1] || "";
      getReciveList(this.searchInfo.params).then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            this.loading = false;
            this.tableData = res.data.data[0].list;
            this.total = res.data.data[0].total;
          }, this.loadingTime);
        }else {
						this.loading = false
						this.$message({ message: res.data.message, type: "warning" })
					}
      });
    },
    reset() {
      this.$refs["searchForm"].resetFields();
    },
    stateFormat(row, column, cellValue) {
      return cellValue ? "已使用" : "未使用";
    },
    depStateFormat(row, column, cellValue) {
      let stateArr = ["未出港", "部分出港", "已出港"];
      return stateArr[cellValue];
    },
    timeFormat(row, column, cellValue) {
      return formatTime(cellValue);
    },
    pageChange(val) {
      this.searchInfo.params.currPage = val;
      this.search();
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1;
    }
  }
};
</script>

<style lang="less">

</style>
