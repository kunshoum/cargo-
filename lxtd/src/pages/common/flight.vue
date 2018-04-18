/**
 * 马少良
 */
 
<template>
	<!--相关航班信息-->
  	<div class="flightHome billing_common">
			<div class="h3">相关航班信息</div>
    	<el-table size="small" align='center' :data="flightList" 
			highlight-current-row @current-change="select" border max-height="320" ref="flightTable">
	    	<el-table-column prop="index" fixed type="index" :index="indexMethod" label="序号" align='left'></el-table-column>
    		<el-table-column prop="plan_fly_date" fixed label="出发日期" align='left'></el-table-column>
    		<el-table-column prop="flight_no" label="航班号" align='left'></el-table-column>
    		<el-table-column prop="departure_airport" label="起飞机场" align='left' width="100"></el-table-column>
    		<el-table-column prop="plan_fly_time" label="起飞" align='left'></el-table-column>
    		<el-table-column prop="plan_fly_time" label="计飞" align='left'></el-table-column>
    		<el-table-column prop="destination_airport" label="降落机场" align='left'></el-table-column>
    		<el-table-column prop="plan_drop_time" label="降落" align='left'></el-table-column>
    		<el-table-column prop="plan_drop_time" label="计降" align='left'></el-table-column>
				<el-table-column prop="stop_info" label="经停信息" align='left'></el-table-column>
    		<el-table-column prop="is_domestic" label="有货" align='left'></el-table-column>
    		<el-table-column prop="model_code" label="机型" align='left'></el-table-column>
    		<el-table-column prop="in_stock" label="客货机" align='left'></el-table-column>
  		</el-table>
	  	<div align="center">
				<el-pagination
					v-if="total > 10"
					@current-change="handleCurrentChange"
					:current-page="currPage"
					layout="total, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
			</div>
			<div class="button back_detail">
				<el-button type="primary" class="save" size="small" @click="backDetail">保存并返回开单明细</el-button>
			</div>

			<book-info />
		</div>
</template>
<script>
import {getFlightInfo} from '../../service'
import {mapState} from 'vuex'

import BookInfo from './book'
export default {
	data() {
		return {
			flightList: [],
			currPage: 1,
			total: '',
			nowIndex: 0,
		}
	},
	components: {
		BookInfo,
	},
	computed: {
		...mapState(['orderNo', 'departure', 'destination', 'planFlyDate', 'isTransit'])
	},
	watch: {
		'$route.params.item'(item) {
			if(this.orderNo && item === 'flight') {
				this.getFlight()
			}
		}
	},
	mounted() {
		if(!this.orderNo) {
			this.$notify({
				title: "警告",
				message: '请输入单号',
				type: "warning",
			})
			return
		}
		this.getFlight()
		document.addEventListener('keydown', this.keyBoardCheck)
		document.addEventListener('keydown', this.enterBack)
	},
	beforeDestroy() {
		document.removeEventListener('keydown', this.keyBoardCheck)
		document.removeEventListener('keydown', this.enterBack)
	},
	methods: {
		keyBoardCheck(evt) {
			if(evt.keyCode === 38 && this.flightList.length) {
				this.nowIndex--
				if(this.nowIndex < 0) {
					this.nowIndex = 0
				}
				this.$refs.flightTable.setCurrentRow(this.flightList[this.nowIndex])
			}
			if(evt.keyCode === 40 && this.flightList.length) {
				this.nowIndex++
				if(this.nowIndex > (this.flightList.length - 1)) {
					this.nowIndex = this.flightList.length - 1
				}
				this.$refs.flightTable.setCurrentRow(this.flightList[this.nowIndex])
			}
		},
		getFlight() {
			let params = {
				currPage: this.currPage,
				order_three_code: this.orderNo.slice(0,3),
				departure: this.departure,
				destination: this.destination,
				plan_fly_date_start: this.planFlyDate,
				is_air_transit_cargo: this.isTransit,
			}
			
			getFlightInfo(params).then(res => {
				if(res.data.status === 200) {
					this.flightList = res.data.data[0].list
					this.total = res.data.data[0].total

					this.$nextTick(() => {
						this.$refs.flightTable.setCurrentRow(res.data.data[0].list[0]);
					})
				}
			})
		},
		handleCurrentChange: function(currentPage){ 
			this.currPage = currentPage; 
			this.getFlight()
		},
		indexMethod(index) {
			return (this.currPage - 1)*10 + index + 1
		},
		select(item) {
			if(item) {
				this.$store.commit('GET_FLIGHTNO', '')
				this.$store.commit('GET_FLIGHTDATE', '')

				this.$store.commit('GET_FLIGHTNO', item.flight_no)
				this.$store.commit('GET_FLIGHTDATE', item.plan_fly_date)
			}
		},
		backDetail() {
			this.$router.push({params: {item: 'detail'}, query: {from: 'flight'}})
		},
		enterBack(evt) {
			if(evt.keyCode === 13 && this.$route.params.item === "flight") {
				this.backDetail()
			}
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
		margin-top: 32px;
	}
</style>
