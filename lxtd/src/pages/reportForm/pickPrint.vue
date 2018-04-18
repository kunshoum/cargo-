<template><!--王艺蒙-->
	<el-dialog title="打印预览" :visible.sync="visible" width="70%" fullscreen :before-close="close">
    <div id="printTable">
      <h3 class="title">河北空港物流有限公司{{ titleOne }}报表</h3>
      <el-form label-position="left" inline class="flightInfo">
        <!-- <el-form-item label="单号">
          <span></span>
        </el-form-item>
        <el-form-item label="汇总方式">
          <span></span>
        </el-form-item>
        <el-form-item label="制表人">
          <span></span>
        </el-form-item>
        <br>
        <el-form-item label="收货地点">
          <span></span>
        </el-form-item>
        <el-form-item label="单据类型">
          <span></span>
        </el-form-item>
        <el-form-item label="开票人">
          <span></span>
        </el-form-item>
        <el-form-item label="审核">
          <span></span>
        </el-form-item> -->
      </el-form>
      <el-table :data="list" size="mini" border>
          <el-table-column type="index"  label="序号"></el-table-column>
          <el-table-column prop="order_no" label="主单号"></el-table-column>
          <el-table-column prop="single_order_no" label="分单号"></el-table-column>
          <el-table-column prop="flight_no" label="航班号/车次"></el-table-column>
          <el-table-column prop="departure" label="出发"></el-table-column>
          <el-table-column prop="destination" label="到达"></el-table-column>
          <el-table-column prop="quantity" label="件数"></el-table-column>
          <el-table-column prop="net_weight" label="毛重"></el-table-column>
          <!-- <el-table-column prop="arrive_quantity" label="到达件数"></el-table-column>
          <el-table-column prop="arrive_weight" label="到达重量"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="is_batch" :formatter="batchFormat" label="分批">
          </el-table-column>
          <el-table-column prop="is_single" :formatter="singleFormat" label="分单">
          </el-table-column>
          <el-table-column prop="cargo_status" label="状态"></el-table-column> -->
          <el-table-column prop="arrive_time" label="到达时间"></el-table-column>
          <!-- <el-table-column prop="product" label="品名"></el-table-column> -->
          <el-table-column prop="sender" label="发货人"></el-table-column>
          <el-table-column prop="receiver" label="收货人"></el-table-column>
          <!-- <el-table-column prop="arrive_day" label="到达日期"></el-table-column>
          <el-table-column prop="sign_time" label="签收时间"></el-table-column> -->
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
export default {
  props: ["list", "visible", "data", 'titleOne'],
  data() {
    return {}
  },
  mounted() {
    // console.log(this.list)
  },
  methods: {
    close() {
      this.$emit("close")
    },
    print() {
      // console.log(this.data)
      $("#printTable").jqprint()
    },
    batchFormat(row, column, cellValue) {
      let stateArr = [<i class="el-icon-success" aria-hidden="true" />, <i class="el-icon-error" aria-hidden="true" />]
      return stateArr[cellValue]
    },
    singleFormat(row, column, cellValue) {
      let stateArr = [<i class="el-icon-success" aria-hidden="true" />, <i class="el-icon-error" aria-hidden="true" />]
      return stateArr[cellValue]
    },
  },
}
</script>
<style lang="less">
#printTable {
  
  .title {
    text-align: center;
    font-weight: normal;
    margin-bottom: 15px;
  }
}
</style>
