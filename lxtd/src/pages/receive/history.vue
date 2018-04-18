<template>
	<el-dialog title="历史记录" :visible.sync="visible" append-to-body width="70%" :before-close="close">
		<el-table :data="gridData" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column fixed type="index" label="序号"></el-table-column>
        <el-table-column property="destination" label="目的站"></el-table-column>
        <el-table-column property="sender" label="发货人"></el-table-column>
        <el-table-column property="receiver" label="收货人"></el-table-column>
        <el-table-column property="joint_network_company" label="拼货网络公司" v-if="type === 'sub'"></el-table-column>
        <el-table-column property="product" label="品名"></el-table-column>
        <el-table-column property="product_category" label="货物类别"></el-table-column>
        <el-table-column property="packaging" label="包装"></el-table-column>
      </el-table>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="historyOk" size="mini">确 定</el-button>
    </span>
	</el-dialog>
</template>

<script>
export default {
  props: ["gridData", "visible", "title", "type" ],
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    headTitle() {
      return this.title
    },
  },
  methods: {
    // 取消
    close() {
      this.$emit("close")
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 确定
    historyOk() {
      this.$emit("historyOk", this.currentRow)
    },
  },
}
</script>

<style lang="less">

</style>