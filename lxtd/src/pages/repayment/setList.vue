<template>
  <el-col :span="5">
    <el-button type="primary" size="mini" @click="clear">结算</el-button>
    <el-dialog title="结算单" :visible.sync="visible" width="900px">
      <el-table :data="tableData" border style="width: 100%" size="small" show-summary :summary-method="getSummaries" class="repayment_table">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="clear_unit" label="结算单位"></el-table-column>
        <el-table-column prop="total_cost" label="应收金额"></el-table-column>
        <el-table-column prop="settlement_cost" label="已收金额"></el-table-column>
        <el-table-column prop="difference_cost" label="差额"></el-table-column>
        <el-table-column prop="actual_cost" label="实收金额" disabled>
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.actual_cost" ref='payee' disabled></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="应收总金额" prop="params.total_cost" class="grid-content" width="180">
              <el-input size="mini" disabled v-model="searchInfo.params.total_cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="优惠" prop="params.discount" class="grid-content"  width="180">
              <el-input size="mini" v-model="searchInfo.params.discount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实收总金额" prop="params.settlement_cost" class="grid-content"  width="180">
              <el-input size="mini" v-model="searchInfo.params.settlement_cost" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款方式" class="grid-content" prop="params.pay_method">
              <el-select size="mini" placeholder="" v-model="searchInfo.params.pay_method">
                <el-option label="现金" value="现金"></el-option>
                <el-option label="转账" value="转账"></el-option>
                <el-option label="微信" value="微信"></el-option>
                <el-option label="支付宝"value="支付宝"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isSingle">
          <el-checkbox v-model="checked">确认自动生成账单并已核账无误</el-checkbox>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="primary" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="sure">确认收款</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
const { Decimal } = require("../../utils/count.js")

import { saveReceipt, singleTicketReceipt } from "@/service/index.js"
export default {
  props: ["title", "type", "array", "isSingle", "listData", "isAll", "list"],
  data() {
    return {
      visible: false,
      searchInfo: {
        params: {
          total_cost: "",
          discount: "0",
          settlement_cost: "",
          pay_method: "现金",
        }
      },
      checked: true,
      getdifference: "",
      gettotal: "",
      settlement: "",
      actualCost: "",
    }
  },
  mounted() {
    
  },
  computed: {
    tableData() {
      if(this.listData) {
        return this.listData.map(item => {
          return {...item, actual_cost: item.difference_cost }
        })
      }else {
        return []
      }
    }
  },
  methods: {
    clear() {
      this.$emit("open")
      if(this.array < 1) {
        this.visible = false
        this.$message({
          message: '请至少选择一条数据进行结算操作',
          type : 'warning'
        })
      }else {
        this.visible = true
      }
      
    },
    // 计算
    getSummaries(param) {
      const { data } = param
      let sumInfo = data.reduce(
        (item1, item2) => {
          
          let gettotal = Decimal.add([item1.total_cost || 0, item2.total_cost || 0]).toNumber()
          let settlement = Decimal.add([item1.settlement_cost || 0, item2.settlement_cost || 0]).toNumber()
          let getdifference = Decimal.add([item1.difference_cost || 0, item2.difference_cost || 0]).toNumber()
          let actualCost = Decimal.add([item1.actual_cost || 0, item2.actual_cost || 0]).toNumber()
          item2.actual_cost = item2.total_cost
          return {
            difference_cost: getdifference,
            total_cost: gettotal,
            settlement_cost: settlement,
            actual_cost: actualCost,
          }
        },
        {
          difference_cost: 0,
          total_cost: 0,
          settlement_cost: 0,
          actual_cost: 0,
        },
      )
      this.getdifference = sumInfo.difference_cost
      this.gettotal = sumInfo.total_cost
      this.settlement = sumInfo.settlement_cost
      this.actualCost = sumInfo.actual_cost
      this.searchInfo.params.total_cost = sumInfo.total_cost
      this.searchInfo.params.settlement_cost = sumInfo.actual_cost - this.searchInfo.params.discount
      return ["合计", "", sumInfo.total_cost, sumInfo.settlement_cost, sumInfo.difference_cost, sumInfo.actual_cost]
    },
    sure() {
      if(!this.isSingle) {
        saveReceipt({
          is_all_select: 0,
          ...this.searchInfo.params,
          receive_pay_type: 0,
          settlementList: this.tableData
        }).then(res => {
          if(res.data.status === 200) {
            this.$message({
              message:res.data.message,
              type: "success"
            })
            this.$router.push(`/repayment/${this.type}/cash`)
          }
        })
      }else {
        singleTicketReceipt({
          receivePaymentOrderList: this.tableData,
          ...this.searchInfo.params,
          receive_pay_type: 0,
        }).then(res => {
          if(res.data.status === 200) {
            this.$message({
              message:res.data.message,
              type: "success"
            })
            this.visible = false
          }
        })
      }
    },
    cancel() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
  .repayment_table {
    margin-bottom: 15px;
  }
</style>

