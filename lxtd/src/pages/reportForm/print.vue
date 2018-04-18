<!--王艺蒙-->
<template>
	<el-dialog title="打印预览" :visible.sync="visible" width="70%" fullscreen :before-close="close">
    <div id="printTable">
      <h3 class="title">河北空港物流有限公司{{ profiTitle }}报表</h3>
      <el-form label-position="left" inline class="flightInfo">
        <!-- <el-form-item label="日期" v-if="this.id != '1059'　&& this.id != '1060'">
          <span>{{flightInfo.startDate}} 至 {{flightInfo.endDate}}</span>
        </el-form-item> -->
        <!-- <el-form-item label="日期" v-if="this.id === '1074' || this.id === '1075'">
          <span>{{startDates}} 至 {{endDates}}</span>
        </el-form-item>
        <br> -->
        <el-form-item label="">
          <span>{{ summary }}</span>
        </el-form-item>
        <el-form-item label="制表人" v-if="this.id != '1060'">
          <span>{{this.$getStore("real_name")}}</span>
        </el-form-item>
        <el-form-item label="制表日期" v-if="this.id != '1060'">
          <span>{{ this.thisTime }}</span>
        </el-form-item>
        <br>
        <el-form-item label="提货地点" v-if="this.id != '1060' && this.id != '1070'">
          <span>{{ deliveryUp }}</span>
        </el-form-item>
        <el-form-item label="单据类型" v-if="this.id != '1070'">
          <span>{{ billValue }}</span>
        </el-form-item>
        <el-form-item label="" v-if="this.id != '1060'">
          <span>{{ domesticVal }}</span>
        </el-form-item>
        <el-form-item label="开票人" v-if="this.id != '1060' && this.id != '1074'  && this.id != '1075' && this.id != '1070'">
          <span>{{ isSuerVal }}</span>
        </el-form-item>
        <el-form-item label="修改人" v-if="this.id != '1060' && this.id != '1074'  && this.id != '1075' && this.id != '1070'">
          <span>{{ updateVal }}</span>
        </el-form-item>
        <el-form-item label="状态" v-if="this.id != '1060' && this.id != '1074'  && this.id != '1075' && this.id != '1070'">
          <span>{{ cargoVal }}</span>
        </el-form-item>
      </el-form>
      <el-table :data="list" border size="mini" class="printBorder">
        <el-table-column label="序号" prop="_index"  width="50"></el-table-column>
      <el-table-column
       v-for="item in data"
      :key="item.enName"
      v-if="!item.isSelect"
      :prop="item.enName" 
      :label="item.name"></el-table-column>
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
		props: ['list', 'startDates', 'endDates', 'visible','data', 'id', 'profiTitle', 'oneStyle', 'flightInfo', 'summary', 'billValue', 'deliveryUp', 'domesticVal', 'isSuerVal', 'updateVal', 'cargoVal'],
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
