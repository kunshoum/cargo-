/**
 * 马少良
 */
 
<template>
  	<div class="balance">
			<div>
				<div class="h2 text_center">营业平衡收入汇总表</div>
				<p class="text_center title_info">
					<span>出票日期</span>
					<span>2017 10 10</span>
					<span>订单类型</span>
					<span>国内 国际</span>
					<span>其他产品</span>
					<span>客户级别: 全部</span>
					<span>模式: 模式一</span>
				</p>
				<p class="text_center">
					<span class="create_person">制表人: 杨占勇</span>
					<span class="create_date">制表日期: 2017. 10. 10 14:45:20</span>
				</p>
			</div>
    	<el-table size="mini" align='center' :data="list1" border height="460" class="balance_table">
    		<el-table-column prop="pzlx" label="票证类型" align='center'></el-table-column>
    		<el-table-column prop="jplx" label="运单类型" width="50" align='center'></el-table-column>
    		<el-table-column prop="dds" label="订单数" width="50" align='center'></el-table-column>
    		<el-table-column prop="ps" label="票数" width="50" align='center'></el-table-column>
    		<el-table-column prop="xsj" label="销售价" width="50" align='center'></el-table-column>
    		<el-table-column prop="jj" label="机建" width="50" align='center'></el-table-column>
    		<el-table-column prop="sf" label="税费" width="50" align='center'></el-table-column>
    		<el-table-column prop="bxje" label="保险金额" width="50" align='center'></el-table-column>
				<el-table-column prop="qt" label="其他" width="50" align='center'></el-table-column>
    		<el-table-column prop="fwf" label="服务费" width="50" align='center'></el-table-column>
    		<el-table-column prop="jl" label="净利" width="50" align='center'></el-table-column>
    		<el-table-column prop="dlf" label="代理费" width="50" align='center'></el-table-column>
        <el-table-column prop="yfhs" label="应付航司" width="50" align='center'></el-table-column>
        <el-table-column prop="ysje" label="应收金额" width="50" align='center'></el-table-column>
  		</el-table>
			<el-table size="mini" align='center' :data="list2" border height="460" class="receive_table"
			:span-method="table2SpanMethod">
    		<el-table-column prop="" label="收入项">
					<el-table-column prop="type" label="类型" width="30"></el-table-column>
					<el-table-column prop="srx" label="明细"></el-table-column>
				</el-table-column>
    		<el-table-column prop="sr" label="收入" width="55" align='center'></el-table-column>
    		<el-table-column prop="zc" label="支出" width="55" align='center'></el-table-column>
    		<el-table-column prop="fc" label="反冲" width="55" align='center'></el-table-column>
    		<el-table-column prop="je" label="金额" width="55" align='center'></el-table-column>
  		</el-table>
		</div>
</template>
<script>
export default {
	data() {
		return {
			list1: [
				{pzlx: 'BSP票款', jplx: '', yfhs: '现返小计: 0.00'},
				{pzlx: 'SJW121', jplx: '正常票'}, 
				{pzlx: 'SJW121', jplx: '退票'}, 
				{pzlx: '小计'},
				{pzlx: 'B2B票款', jplx: '', yfhs: '现返小计: 0.00'},
			],
			list2: [
				{type: '当日已收账款', srx: '现金_现金', sr: '', zc: '', fc: '', je: '',  bs: 0},
				{srx: '现金_现金', sr: '31250', zc: '-2880', fc: '0', je: '28370', },
				{srx: '现金_现金 小计', sr: '31250', zc: '-2880', fc: '0', je: '28370', },
				{srx: 'chinapay', sr: '', zc: '', fc: '', je: '', },
				{srx: 'chinapay-银行存款_银行卡账户 小计', sr: '31250', zc: '-2880', fc: '0', je: '28370', },
				{srx: 'chinapay 小计', sr: '31250', zc: '-2880', fc: '0', je: '28370', },
				{type: '提前已收账款', srx: '', sr: '', zc: '', fc: '', je: '', bs: 1},
				{type: '应收账款', srx: '现金_现金', sr: '', zc: '', fc: '', je: '', bs: 0},
				{srx: '应收账款_已出票未送', sr: '31250', zc: '-2880', fc: '0', je: '28370', },
				{srx: '应收账款_已送票未收', sr: '31250', zc: '-2880', fc: '0', je: '28370', },
				{srx: '应收账款_散客临时挂账-应收账款_临时挂账', sr: '', zc: '', fc: '', je: '', },
				{srx: '应收账款_应收账款 小计', sr: '31250', zc: '-2880', fc: '0', je: '28370', },
			],
		}
	},
	methods: {
		table2SpanMethod({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				if (row.bs === 0) {
					return {
						rowspan: 6,
						colspan: 1
					};
				} else if (row.bs === 1) {
					return {
						rowspan: 1,
						colspan: 6
					};
				}else {
					return {
						rowspan: 0,
						colspan: 0
					}
				}
			}
		}
	}
}
</script>

<style lang="less">
	.balance {
		.el-table {
			.cell {
				white-space: normal !important;
				font-size: 8px !important;
			}
		}
		
		.el-table--mini td, .el-table--mini th {
			padding: 2px 0 !important;
		}

		.text_center {
			text-align: center;
		}
		.title_info {
			color: #6c6c6c;
		}
		.create_person {
			margin-right: 20px;
		}
		.create_date {
			margin-left: 20px;
		}
		.balance_table {
			display: inline-block;
			width: 54%;
		}
		.receive_table {
			display: inline-block;
			width: 42%;
		}
	}
</style>



