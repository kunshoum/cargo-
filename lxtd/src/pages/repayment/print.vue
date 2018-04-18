<template>
	<el-dialog title="打印预览" :visible.sync="visible" width="70%" fullscreen :before-close="close">
    <div id="printTable">
      <h3 class="title">河北空港物流有限公司报表</h3>
      <el-form label-position="left" inline class="flightInfo">
        <el-form-item label="单号">
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
        </el-form-item>
      </el-form>
      <el-table :data="list" size="mini">
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
	export default {
		props: ['list', 'visible','data'],
		data() {
			return {
			}
    },
    mounted() {
      // console.log(this.list)
  },
		methods: {
			close() {
				this.$emit('close')
      },
      print() {
        console.log(this.data)
        $('#printTable').jqprint()
      },
		}, 
	}
</script>
<style lang="less">
  #printTable {
    .title{
      text-align: center;
      font-weight: normal;
    }
  }
</style>
