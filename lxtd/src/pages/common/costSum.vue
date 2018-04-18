/**
 * 马少良
 */
 
<template>
	<!--按结算单位汇总-->
  <div class="CostSum">
    <div class="h3">按结算单位汇总</div> 
    <el-table :data="costSumList" border style="width: 100%" max-height="200" size="small">
      <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
      <el-table-column prop="clearUnit" label="结算单位"></el-table-column>
      <el-table-column prop="type" label="类型" :formatter="typeFormat" width="100"></el-table-column>
      <el-table-column prop="costCount" label="费用小计" width="100"></el-table-column>
      <el-table-column prop="difference" label="差额" width="100"></el-table-column>
      <el-table-column prop="receivedPaycost" label="已收(付)" width="100"></el-table-column>
      <el-table-column prop="sale_person" label="销账人"></el-table-column>
      <el-table-column prop="check_person" label="核对人"></el-table-column>
      <el-table-column prop="receivePayItem" label="收付款明细"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState(['costSumList'])
  },
  methods: {
    typeFormat(row, column, cellValue) {
      if(cellValue === 0) {
        return '收款'
      }else if(cellValue === 1){
        return '付款'
      }else {
        return ''
      }
    },
    indexMethod(index) {
      if(index < this.costSumList.length - 1) {
        return index + 1
      }else {
        return '总计'
      }
    },
  },
}
</script>