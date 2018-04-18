<template>
<!-- 雷云朵 -->
	<el-dialog title="打印预览" :visible.sync="visible" width="70%" fullscreen :before-close="close">
    <div id="printTable">
      <h3 class="title">河北空港物流有限公司{{ title }}报表</h3>
      <el-form label-position="left" inline class="flightInfo">
        <!-- <el-form-item label="日期">
          <span>{{ flightInfo.print_time_start }} 至 {{ flightInfo.print_time_end }}</span>
        </el-form-item>
        <br> -->
        <el-form-item label="">
          <span>{{ oneStyle }}</span>
        </el-form-item>
        <el-form-item label="制表人">
          <span>{{ this.$getStore("real_name") }}</span>
        </el-form-item>
        <el-form-item label="制表日期">
          <span>{{ this.thisTime }}</span>
        </el-form-item>
        <br>
        <el-form-item label="收款销账" v-if="this.id === '1064'">
          <span>{{ paySaleValue }}</span>
        </el-form-item>
        <el-form-item label="收货地点" v-if="this.id != '1055' && this.id != '1061'">
          <span>{{ receiveValue }}</span>
        </el-form-item>
        <el-form-item label="提货地点" v-if="this.id === '1061'">
          <span>{{ pickUpLocation }}</span>
        </el-form-item>
        <el-form-item label="单据类型" v-if="this.id != '1055'">
          <span>{{ orderSelect }}</span>
        </el-form-item>
        <el-form-item label="">
          <span>{{ domesticValue }}</span>
        </el-form-item>
        <el-form-item label="开票人" v-if="this.id != '1054' && this.id != '1055' && this.id != '1061' && this.id != '1064'">
          <span>{{ ticketValue }}</span>
        </el-form-item>
        <el-form-item label="状态" v-if="this.id === '1055'">
          <span>{{ statusValue }}</span>
        </el-form-item>
      </el-form>
      <el-table :data="list" border size="mini" class="printBorder">
        <el-table-column label="序号" prop="sequence"  width="50"></el-table-column>
      <el-table-column
       v-for="(item, index) in data"
      :key="index"
      v-if="!item.is_select"
      :prop="item.en_name" 
      :label="item.cn_name"></el-table-column>
      </el-table>
    </div>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="print" size="mini">确 定</el-button>
    </span>
	</el-dialog>
</template>

<script>
  import $ from "@/utils/printArea.js"
  import { getTime, getDate, formatTime, formatIptDate, } from "@/utils/time"
	export default {
		props: ['list', 'visible','flightInfo','data', 'title', 'id', 'pickUpLocation', 'paySaleValue', 'oneStyle', 'statusValue', 'orderSelect', 'receiveValue', 'ticketValue', 'domesticValue'],
		data() {
			return {
        thisTime: '',
			}
    },
    mounted() {
      this.thisTime = getTime()
    },
		methods: {
			close() {
				this.$emit('close')
      },
      print() {
        // console.log(this.data)
        $('#printTable').jqprint()
      },
		}, 
	}
</script>
<style lang="less">
  #printTable {
    .el-form{
      text-align: center;
      font-size: 12px;
    }
    .el-form-item__label{
      font-size: 14px;
    }
    .el-form-item__content{
      font-size: 12px;
    }
    .title{
      text-align: center;
      font-weight: normal;
      font-size: 18px;
    }
    
    .printBorder th,tr,td{
      border-color: black!important;
    }
  }
</style>
