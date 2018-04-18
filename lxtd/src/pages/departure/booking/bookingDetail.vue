<template>
<!-- 雷云朵 -->
	<el-dialog title="订舱详情" :visible.sync="visible" append-to-body width="65%" :before-close="close">
			<el-form label-position="left" inline class="bookingDetail">
				<el-form-item label="订舱号">
					<span>{{detail.booking_no}}</span>
				</el-form-item>
				<el-form-item label="运单号">
					<span>{{detail.order_no}}</span>
				</el-form-item>
				<el-form-item label="发货人">
					<span>{{detail.sender}}</span>
				</el-form-item>
				<el-form-item label="发货人电话">
					<span>{{detail.sender_telephone}}</span>
				</el-form-item>
				<el-form-item label="收货人">
					<span>{{detail.receiver}}</span>
				</el-form-item>
				<el-form-item label="收货人电话">
					<span>{{detail.receiver_telephone}}</span>
				</el-form-item>
				<el-form-item label="始发站">
					<span>{{detail.departure}}</span>
				</el-form-item>
				<el-form-item label="目的地">
					<span>{{detail.destination}}</span>
				</el-form-item>
				<el-form-item label="出发日期">
					<span>{{detail.flight_date}}</span>
				</el-form-item>
				<el-form-item label="航班号">
					<span>{{detail.flight_no}}</span>
				</el-form-item>
				<el-form-item label="品名">
					<span>{{detail.product}}</span>
				</el-form-item>
				<el-form-item label="申请件数">
					<span>{{detail.apply_quatity}}</span>
				</el-form-item>
				<el-form-item label="申请重量">
					<span>{{detail.apply_weight}}</span>
				</el-form-item>
				<el-form-item label="申请体积">
					<span>{{detail.apply_volume}}</span>
				</el-form-item>
				<el-form-item label="批复状态">
					<span>{{state[detail.reply_status]}}</span>
				</el-form-item>
				<el-form-item label="批复件数">
					<span>{{detail.reply_quatity}}</span>
				</el-form-item>
				<el-form-item label="批复重量">
					<span>{{detail.reply_weight}}</span>
				</el-form-item>
				<el-form-item label="批复体积">
					<span>{{detail.reply_volume}}</span>
				</el-form-item>
				<el-form-item label="批复不通过原因">
					<span>{{detail.unreply_reason}}</span>
				</el-form-item>
				<el-form-item label="批复时间">
					<span>{{detail.reply_time}}</span>
				</el-form-item>
				<el-form-item label="批复人">
					<span>{{detail.reply_person}}</span>
				</el-form-item>
				<el-form-item label="出发时间">
					<span>{{detail.create_time | formatTime}}</span>
				</el-form-item>
				<el-form-item label="实际出发重量">
					<span>{{detail.actual_departure_weight}}</span>
				</el-form-item>
				<el-form-item label="实际出发件数">
					<span>{{detail.actual_departure_quantity}}</span>
				</el-form-item>
				<el-form-item label="退仓人">
					<span>{{detail.booking_cancel_person}}</span>
				</el-form-item>
				<el-form-item label="退仓时间">
					<span>{{detail.booking_cancel_time | formatTime}}</span>
				</el-form-item>
				<el-form-item label="录入时间">
					<span>{{detail.create_time | formatTime}}</span>
				</el-form-item>
				<el-form-item label="录入人">
					<span>{{detail.creater}}</span>
				</el-form-item>
				<el-form-item label="录入地点">
					<span>{{detail.create_location}}</span>
				</el-form-item>
				<el-form-item label="修改时间">
					<span>{{detail.update_time | formatTime}}</span>
				</el-form-item>
				<el-form-item label="修改人">
					<span>{{detail.update_person}}</span>
				</el-form-item>
				<el-form-item label="备注">
					<span>{{detail.remark}}</span>
				</el-form-item>
			</el-form>
	</el-dialog>
</template>

<script>
	import { bookingDetail } from "../../../service"

	export default {
		props: ['detail', 'visible'],
		data() {
			return {
				state: ['待审核',  '审核通过', '审核不通过']
			}
		},
		methods: {
			close(done) {
				this.$emit('close')
			}
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
		width: 45%;
	}
	.bookingDetail{
		max-height: 400px;
		overflow: auto;
	}
</style>