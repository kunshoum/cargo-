<template>
	<el-dialog title="" :visible.sync="visible" append-to-body width="65%" :before-close="close">
    <div id="batches">
      <h1 style="text-align:center;line-height: 40px;margin-bottom:20px">分批发运单</h1>
			<el-form label-position="left" inline class="bookingDetail">
				<el-form-item label="运单号">
					<span>{{detail.order_no}}</span>
				</el-form-item>
        <el-form-item label="运单总件数">
					<span>{{detail.totalQuantity}}</span>
				</el-form-item>
				<el-form-item label="运单总重量">
					<span>{{detail.totalWeight}}</span>
				</el-form-item>
				<el-form-item label="批次号">
					<span>{{detail.batch}}</span>
				</el-form-item>
        <el-form-item label="本批件数">
					<span>{{detail.thisQuantity}}</span>
				</el-form-item>
				<el-form-item label="本批重量">
					<span>{{detail.thisWeight}}</span>
				</el-form-item>
				<el-form-item label="品名">
					<span>{{detail.product_name}}</span>
				</el-form-item>
        <el-form-item label="未出港件数">
					<span>{{detail.noOutQuantity}}</span>
				</el-form-item>
				<el-form-item label="未出港重量">
					<span>{{detail.noOutWeight}}</span>
				</el-form-item>
				<el-form-item label="航班号">
					<span>{{detail.flight_no}}</span>
				</el-form-item>
				<el-form-item label="飞机号">
					<span>{{detail.aircraft_no}}</span>
				</el-form-item>
        <el-form-item label="飞行日期">
					<span>{{detail.plan_Date}}</span>
				</el-form-item>
				<el-form-item label="起点" style="width:238px">
					<span>{{detail.departure_airport}}</span>
				</el-form-item>
				<el-form-item label="终点" style="width:238px">
					<span>{{detail.destination_airport}}</span>
				</el-form-item>
				<el-form-item label="操作人" style="width:320px">
					<span>{{detail.oper}}</span>
				</el-form-item>
				<el-form-item label="操作日期" style="width:280px">
					<span>{{detail.op_time}}</span>
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
		props: ['detail', 'visible'],
		data() {
			return {
			}
		},
		methods: {
    close() {
      this.$emit("close")
    },
    print() {
      $("#batches").jqprint()
    },
    },
	}
</script>

<style lang="less">
	.bookingDetail label {
		width: 110px;
		color: #99a9bf;
	}
	
	.bookingDetail .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 32%;
	}
	.bookingDetail{
		max-height: 400px;
		overflow: auto;
	}
</style>