<template><!-- 王艺蒙 -->
	<el-dialog :visible.sync="visible" width="70%" fullscreen :before-close="close">
    <div id="printTable">
      <h1 style="text-align:center;line-height: 40px;">{{data.outBillName}}</h1>
      <el-form label-position="left" inline class="flightInfo">
        <el-form-item label="航班">
          <span>{{data.flight_no}}</span>
        </el-form-item>
        <el-form-item label="飞机号">
          <span>{{data.aircraft_no}}</span>
        </el-form-item>
        <el-form-item label="起飞时间">
          <span>{{data.actual_fly_time}}</span>
        </el-form-item>
        <el-form-item label="出发站">
          <span>{{data.departure}}</span>
        </el-form-item>
        <el-form-item label="目的站">
          <span>{{data.destination}}</span>
        </el-form-item>
      </el-form>
      <el-table :data="list" size="mini">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="order_no" label="运单号" width="240"></el-table-column>
        <el-table-column prop="quantity" label="件数" ></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column prop="departure" label="始发站" width="100"></el-table-column>
        <el-table-column prop="destination" label="目的站" width="100"></el-table-column>
        <el-table-column prop="sender" label="发货人" width="350"></el-table-column>
        <el-table-column prop="product" label="品名" width="150"></el-table-column>
        <el-table-column prop="departure_priority" width="100" label="优先级"></el-table-column>
        <el-table-column prop="transfer_station" label="中转站"></el-table-column>
        <el-table-column prop="is_batch" label="分发" width="100"></el-table-column>
        <el-table-column prop="cabin" label="预配舱位" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" width="100"></el-table-column>
      </el-table>
      <p style="padding: 30px 0;">
        装载位置及重量
        <span>{{data.storageInfo && data.storageInfo.replace(/,/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}}</span>
      </p>
      <div class="stowage_detail" v-if="status === 'end'">
        <el-table :data="stowageData" border style="width: 49%; float: left;" size="small">
          <el-table-column prop="box_order" label="箱板号"  width="100"></el-table-column>
          <el-table-column prop="" label="总重"></el-table-column>
          <el-table-column prop="" label="板重" ></el-table-column>
          <el-table-column prop="native_weight" label="净重" width="100"></el-table-column>
          <el-table-column prop="" label="舱位"></el-table-column>
          <el-table-column prop="" label="合计"></el-table-column>
        </el-table>
        <el-table :data="stowagerightData" border style="width: 49%; float: right;" size="small">
          <el-table-column prop="box_order" label="箱板号" width="100"></el-table-column>
          <el-table-column prop="" label="总重"></el-table-column>
          <el-table-column prop="" label="板重" ></el-table-column>
          <el-table-column prop="native_weight" label="净重" width="100"></el-table-column>
          <el-table-column prop="" label="舱位"></el-table-column>
          <el-table-column prop="" label="合计"></el-table-column>
        </el-table>
      </div>
      <el-form label-position="left" inline class="sum_info">
        <el-form-item label="制表">
          <span>{{data.creater}}</span>
        </el-form-item>
        <el-form-item label="吨控复核">
          <span></span>
        </el-form-item>
        <el-form-item label="货物">
          <span>{{data.orderQuantityTotal}}</span>
          <span>{{data.orderWeightTotal}}</span>
        </el-form-item>
        <el-form-item label="领单人">
          <span></span>
        </el-form-item>
        <el-form-item label="配载">
          <span></span>
        </el-form-item>
        <el-form-item label="邮件">
          <span>{{data.mailQuantityTotal}}</span>
          <span>{{data.mailWeightTotal}}</span>
        </el-form-item>
        <el-form-item label="装卸">
          <span></span>
        </el-form-item>
        <el-form-item label="监装监卸">
          <span></span>
        </el-form-item>
        <el-form-item label="公务货">
          <span>{{data.businessCargoQuantityTotal}}</span>
          <span>{{data.businessCargoWeightTotal}}</span>
        </el-form-item>
        <el-form-item label="制表日期">
          <p>{{data.create_time}}</p>
        </el-form-item>
        <el-form-item label="">
          <span></span>
        </el-form-item>
        <el-form-item label="总计">
          <span>{{data.totalQuantity}}</span>
          <span>{{data.totalWeight}}</span>
        </el-form-item>
      </el-form>
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
  props: ["list", "visible", "flightInfo", "status", "data"],
  data() {
    return {
      stowageData: [{}, {}, {}, {}, {}, { box_order: "出库人:", native_weight: "出库复核人:" }],
      stowagerightData: [{}, {}, {}, {}, {}, { box_order: "装卸交接人:", native_weight: "交接时间:" }],
      printTit: "",
    }
  },
   watch: {
    data() {
      this.data.actual_fly_time = this.data.actual_fly_time.replace(/null/g,"")
    },
  },
  methods: {
    close() {
      this.$emit("close")
    },
    print() {
      $("#printTable").jqprint()
    },
  },
}
</script>
<style lang="less">
.el-dialog__body{
    padding: 0px 20px!important;
}
#printTable {
  .stowage_detail {
    margin-bottom: 20px;
    
  }
  .sum_info {
    
    .el-form-item {
      .el-form-item__label {
        width: 38%;
        font-size: 12px!important;
      }
      .el-form-item__content {
        width: 62%;
        
        span {
          display: inline-block;
          font-size: 12px!important;
          width: 45%;
        }
        p {
          display: inline-block;
          font-size: 12px!important;
          width: 95%;
        }
      }
      width: 25%;
      margin-bottom: 0px;
    }
  }
}
</style>
