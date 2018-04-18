/**
 * 马少良
 */
 
<template>
  <div>
		<div class="h3">订舱情况</div>
		<el-table ref="singleTable" :data="bookList" border size="small" max-height="280" border>
			<el-table-column prop="booking_no" label="订舱号" align="left"></el-table-column>
			<el-table-column prop="sender" label="发货人" align="left"></el-table-column>
			<el-table-column prop="product" label="品名" align="left"></el-table-column>
			<el-table-column prop="stowage_quantity" label="实际出发件数" align="left"></el-table-column>
			<el-table-column prop="stowage_weight" label="实际出发重量" align="left"></el-table-column>
			<el-table-column prop="sender_weight_rate" label="实发比率" align="left"></el-table-column>
			<el-table-column prop="booking_contact_person" label="订舱人" align="left"></el-table-column>
			<el-table-column prop="booking_contact_person_tel" label="订舱电话" align="left"></el-table-column>
			<el-table-column prop="reply_quatity" label="批复件数" align="left"</el-table-column>
			<el-table-column prop="reply_weight" label="批复重量" align="left"></el-table-column>
			<el-table-column prop="reply_volume" label="批复体积" align="left"></el-table-column>
			<el-table-column prop="reply_person" label="批复人" align="left"></el-table-column>
			<el-table-column prop="reply_time" label="批复日期" align="left"></el-table-column>
		</el-table>
	</div>
</template>

<script>
import {getBookingByOrder} from '../../service'
import {mapState} from 'vuex'

export default {
	data() {
		return {
			bookList: []
		}
	},
	mounted(){
		this.getBooking()
	},
	computed: {
    ...mapState(['orderNo']),
  },
	methods: {
		getBooking() {
			if(!this.orderNo) {
				return
			}
			getBookingByOrder({order_no: this.orderNo}).then((res) =>{
				if(res.data.status === 200) {
					this.bookList = res.data.data
				}
			})
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
