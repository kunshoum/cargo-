<template>
  <el-col :span="5">
    <el-button type="primary" size="mini" @click="clear">生成结算单</el-button>
    <el-dialog title="生成结算单" :visible.sync="visible">
      <el-table :data="listData" border style="width: 100%" size="small" >
          <el-table-column prop="clear_unit" label="结算单位"></el-table-column>
          <el-table-column prop="count_order" label="运单数"></el-table-column>
          <el-table-column prop="total_cost" label="合计应收总费用" v-if="this.title === '收款运单'"></el-table-column>
          <el-table-column prop="total_cost" label="合计应付总费用" v-if="this.title === '付款运单'"></el-table-column>
        </el-table>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="sure">确认</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import { saveSettlementOrder } from "@/service/index.js"
export default {
  props: ["title", "type", "array", "isAll", "listData"],
  data() {
    return {
      visible: false,
    }
  },
  mounted() {
  },
  methods: {
    clear() {
      console.log(this.array)
      if( this.array.some(item => item.is_clear) ) {
        this.$notify({
          type: "warning",
          message: "已有生成结算单"
        })
        return
      }
      if(this.array < 1) {
        this.visible = false
      }else {
        this.visible = true
      } 
      this.$emit("open")
    },
    sure() {
      saveSettlementOrder({
        is_all_select: 0,
        receive_pay_type: this.type === "recipt" ? 0 : 1,
        receivePaymentOrderList: this.array
      }).then(res => {
        if(res.data.status === 200) {
          this.$message({ message: res.data.message, type: "success" })
          this.$router.push(`/repayment/${this.type}/list`)
        }
      })
    },
    cancel() {
      this.visible = false
    }
  },
}
</script>
