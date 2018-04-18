<template><!-- 王艺蒙 -->
	<el-dialog :visible.sync="visible" width="70%" fullscreen :before-close="close" class="printLoad">
    <div id="printTables">
      <h1 style="text-align:center;line-height: 40px;">装载申请单</h1>
      <center>
         <table border="1" cellpadding="10" cellspacing="0" >
          <tr>
            <th colspan="2">航班号</th>
            <th colspan="2">飞机号</th>
            <th colspan="2">日期</th>
            <th colspan="4">起飞时间</th>
          </tr>
          <tr>
            <td colspan="2">{{data.flight_no}}</td>
            <td colspan="2">{{data.aircraft_no}}</td>
            <td colspan="2">{{data.currDate}}</td>
            <td colspan="4">{{data.plan_fly_date}}</td>
          </tr>
          <tr>
            <td>申请人</td>
            <td colspan="3">张丹</td>
            <td>确认人</td>
            <td></td>
            <td>制单号</td>
            <td></td>
          </tr>
          <tr>
            <td>到达站</td>
            <td>件数</td>
            <td>重量</td>
            <td>类别</td>
            <td>舱位</td>
            <td>体积</td>
            <td colspan="2">备注（箱板号）</td>
          </tr>
          <tbody class="render">
            <tr v-for="(item,index) in thisdata">
              <td>{{item.destination_airport}}</td>
              <td>{{item.quantity}}</td>
              <td>{{item.weight}}</td>
              <td>{{item.type}}</td>
              <td>{{item.cabin}}</td>
              <td>{{item.volume}}</td>
              <td colspan="2"></td>
            </tr>
            <tr style="display:none;">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          

      </table>
      </center>  
    </div> 
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="print" size="mini">确 定</el-button>
    </span>                         
	</el-dialog>
</template>

<script>
import $ from "@/utils/printArea.js"
export default {
  props: ["visible", "data"],
  data() {
    return {
      list: [],
      thisdata:[]
    }
  },
  watch: {
    data() {
      var arr=[]
      for(var i in this.data.stowageApplyList){
        for(var j in this.data.stowageApplyList[i]){
           arr.push(this.data.stowageApplyList[i][j])
        }
      }
      this.data.stowageApplyList[0] = arr ? arr : []
      this.thisdata = this.data.stowageApplyList[0]
    },
  },
  methods: {
    close() {
      this.$emit("close")
    },
    print() {
      $("#printTables").jqprint()
    },
  },
}
</script>
<style lang="less">
.printLoad {
  padding: 0px 20px !important;
  table {
    width: 100%;
    tr,
    td,
    th {
      border: 1px solid #000000;
      font-weight: bold;
    }
  }
}
</style>
