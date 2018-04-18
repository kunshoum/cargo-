<template>
  <el-col :span="3">
    <el-button type="primary" size="mini" @click="clear">批量结算</el-button>
    <el-dialog title="结算单" :visible.sync="visible" width="900px">
      <el-table :data="tableData" border style="width: 100%" size="small" show-summary :summary-method="getSummaries" class="repayment_table">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="clear_unit" label="结算单位"></el-table-column>
        <el-table-column prop="total_cost" label="应收金额" v-if="this.title === '收款结算单'"></el-table-column>
        <el-table-column prop="settlement_cost" label="已收金额" v-if="this.title === '收款结算单'"></el-table-column>
        <el-table-column prop="total_cost" label="应付金额" v-if="this.title === '付款结算单'"></el-table-column>
        <el-table-column prop="settlement_cost" label="已付金额" v-if="this.title === '付款结算单'"></el-table-column>
        <el-table-column prop="difference_cost" label="差额"></el-table-column>
        <el-table-column prop="actual_cost" label="实收金额" v-if="this.title === '收款结算单'">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.actual_cost" ref='payee'></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="actual_cost" label="实付金额" v-if="this.title === '付款结算单'">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.actual_cost" ref='payee'></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
        <el-row :gutter="10">
          <el-col :span="6" v-if="this.title === '收款结算单'">
            <el-form-item label="应收总金额" prop="params.total_cost" class="grid-content" width="180">
              <el-input size="mini" disabled v-model="searchInfo.params.total_cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="this.title === '付款结算单'">
            <el-form-item label="应付总金额" prop="params.total_cost" class="grid-content" width="180">
              <el-input size="mini" disabled v-model="searchInfo.params.total_cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="优惠" prop="params.discount" class="grid-content"  width="180">
              <el-input size="mini" v-model="searchInfo.params.discount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="this.title === '收款结算单'">
            <el-form-item label="实收总金额" prop="params.settlement_cost" class="grid-content"  width="180">
              <el-input size="mini" v-model="searchInfo.params.settlement_cost" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="this.title === '付款结算单'">
            <el-form-item label="实付总金额" prop="params.settlement_cost" class="grid-content"  width="180">
              <el-input size="mini" v-model="searchInfo.params.settlement_cost" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款方式" class="grid-content" prop="params.pay_method">
              <el-select size="mini" placeholder="" v-model="searchInfo.params.pay_method">
                <el-option 
                v-for="(item, index) in idsList"
                :key="index"
                :label="item.label"
                :value="item.value"></el-option>
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
        <el-button type="primary" size="mini" @click="sure" v-if="this.title === '收款结算单'">确认收款</el-button>
        <el-button type="primary" size="mini" @click="sure" v-if="this.title === '付款结算单'">确认付款</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
const { Decimal } = require("../../utils/count.js")

import { saveReceipt, singleTicketReceipt } from "@/service/index.js"
export default {
  props: ["title", "type", "array", "isSingle", "listData", "isAll", "list", "idsList"],
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
      if(this.array < 1) {
        this.visible = false
        this.$message({
          message: '请至少选择一条数据进行结算操作',
          type : 'warning'
        })
      }else {
        this.visible = true
        this.$emit("open")
      }
    },
    // 计算
    getSummaries(param) {
      const { data } = param
      let sumInfo = data.reduce(
        (item1, item2) => {
          // console.log(item2.actual_cost)
          let gettotal = Decimal.add([item1.total_cost || 0, item2.total_cost || 0]).toNumber()
          let settlement = Decimal.add([item1.settlement_cost || 0, item2.settlement_cost || 0]).toNumber()
          let getdifference = Decimal.add([item1.difference_cost || 0, item2.difference_cost || 0]).toNumber()
          let actualCost = Decimal.add([item1.actual_cost || 0, item2.actual_cost || 0]).toNumber()
          if(item2.actual_cost > item2.difference_cost) {
            this.$message({
              message: '实收金额大于应收金额',
              type: 'warning'
            });
          }
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
      
      this.searchInfo.params.total_cost = sumInfo.difference_cost
      this.searchInfo.params.settlement_cost = sumInfo.actual_cost - this.searchInfo.params.discount
      return ["合计", "", sumInfo.total_cost, sumInfo.settlement_cost, sumInfo.difference_cost, sumInfo.actual_cost]
    },
    sure() {
      if(!this.isSingle) {
        saveReceipt({
          is_all_select: 0,
          ...this.searchInfo.params,
          receive_pay_type: this.type === "recipt" ? 0 : 1,
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
          receive_pay_type: this.type === "recipt" ? 0 : 1,
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

