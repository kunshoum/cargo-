/**
 * 马少良
 */
 
<template>
  <div class="Departure">
    <div class="h3">出发情况</div>
    <el-table ref="singleTable" border align='center' size="small" :data="outData">
      <el-table-column type="index" label="序号" align='left'></el-table-column>
      <el-table-column prop="order_no" label="支出单号" align='left'></el-table-column>
      <el-table-column prop="flight_no" label="航班号" align='left'></el-table-column>
      <el-table-column prop="departure" label="起点" align='left'></el-table-column>
      <el-table-column prop="destination" label="终点" align='left'></el-table-column>
      <el-table-column prop="main_quantity" label="支出单件数" align='left'></el-table-column>
      <el-table-column prop="single_quantity" label="销售单件数" align='left'></el-table-column>
      <el-table-column prop="sender" label="支出单收货人" align='left'></el-table-column>
      <el-table-column prop="transport_mode" :formatter="modeFormat" label="运输方式" align='left'></el-table-column>
      <el-table-column prop="billing_time" label="开票日期" :formatter="dateFormat" align='left' width="120"></el-table-column>
      <el-table-column prop="issuer" label="开票人" align='left'></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getStart} from '../../service'
import {mapState} from 'vuex'
import { getTime, getDate } from "../../utils/time"

export default {
	data() {
    return {
      outData:[],
    }
  },
  computed: {
    ...mapState(['orderNo', 'orderType']),
  },
	mounted() {
    if(!this.orderNo) {
      return
    }

    getStart({
      order_no: this.orderNo,
    }).then(res => {
      if(res.status === 200) {
        let resData = res.data
        if(resData.status === 200) {
          this.outData = resData.data
        }
      }
    })
  },
  methods: {
    modeFormat(row, column, cellValue) {
      return '航空'
    },
    dateFormat(row, column, cellValue) {
      return getDate(cellValue)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tabBox{
    position: absolute;
    height:100%;
    width:100%;
    display: none;
    border: 1px solid #D4D4D5;
    border-top: none;
    overflow-y: auto;
    padding:15px 15px 0 15px;
  }
  .tabBox.active{
      display: block;
  }
  h3{
    padding-bottom: .21428571rem;
    margin-bottom: .2rem;
    border-bottom: 1px solid rgba(34,36,38,.15);
  }
  .record{
    margin-top: .8rem;
  }
  .button{
    text-align: center;
    margin-top: .8rem;
  }
</style>
