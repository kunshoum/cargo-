/**
 * 马少良
 */
 
<template>
	<!--开单费用-->
	<div class="cost billing_common">
		<div class="h3">费用</div>
		<el-table :data="costList" style="width: 100%" align='center' size="small" max-height="350" class="cost_table last_insert" 
    border
		show-summary 
		:summary-method="getSum">
			<el-table-column label="序号" align='left' type="index" :index="indexMethod" fixed></el-table-column>
			<el-table-column label="费用名称" prop="cost_name" align='left' width="130" fixed>
				<template slot-scope="scope">
					<el-select v-model="scope.row.cost_name" size="mini" @change="getCostItem(scope.row, scope.$index)" ref="cost_names">
						<el-option
							v-for="item in costNames"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="收款单位" prop="payee" align='left' width="130">
				<template slot-scope="scope">
					<el-input size="mini" v-model="scope.row.payee" ref='payee'
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="付款单位" prop="payer" align='left' width="150">
				<template slot-scope="scope">
					<el-input size="mini" v-model="scope.row.payer" ref='payer'
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="关联性" prop="relevance_name" align='left' width="120">
				<template slot-scope="scope">
					<el-input size="mini" v-model="scope.row.relevance_name" ref='relevance_name'
          :class="{ must_color: scope.row.relevance_name === '与计重相关'}"
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="费率" prop="invoice_price" align='left'>
				<template slot-scope="scope">
					<el-input size="mini" v-model="scope.row.invoice_price" ref='invoice_price'
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="取舍方式" prop="invoice_choice_way" align='left' width="160">
				<template slot-scope="scope">
					<el-select v-model="scope.row.invoice_choice_way" size="mini"
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)">
						<el-option
              v-for="item in choiceWays"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="绝对费用" prop="absolute_cost" align='left'>
				<template slot-scope="scope">
					<el-input size="mini" v-model="scope.row.absolute_cost" ref='absolute_cost'
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="实际费用" prop="actual_cost" align='left'>
				<template slot-scope="scope">
					<el-input size="mini" v-model="scope.row.actual_cost" ref='actual_cost'
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="锁定" prop="is_lock" align='left' width="120">
				<template slot-scope="scope">
					<el-select v-model="scope.row.is_lock" size="mini" 
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)">
						<el-option label="未锁定" :value="1"></el-option>
						<el-option label="锁定" :value="0"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="影响最低应收总费用" prop="impact" align='left' width="130">
				<template slot-scope="scope">
					<el-select v-model.number="scope.row.impact" size="mini" 
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)"
          :class="{ must_color: scope.row.impact === 1}">
						<el-option label="是" :value="1" class="must_color"></el-option>
						<el-option label="否" :value="0"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="备注" prop="remark" align='left' width="130">
				<template slot-scope="scope">
					<el-input size="mini" v-model="scope.row.remark" ref='remark'
					@keyup.enter.native="costAdd(scope.$index,scope.row)"
					:disabled="scope.row.is_lock === 0 && scope.$index !== (costList.length - 1)"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="操作" align='left' fixed="right">
				<template slot-scope="scope" v-if="scope.$index !== (costList.length - 1)">
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div align="center" class="button back_detail">
			<el-button type="primary" size="small" class="save" @click="backDetail">保存并返回开单明细</el-button>
		</div>
		<cost-sum v-if="type !== 2"/>
	</div>
</template>

<script>
import CostSum from "./costSum"
const { Decimal } = require("../../utils/count.js")
import { mapState } from "vuex"
import { splitCodeName } from "@/utils/split"
import { searchChoiceWay, searchCostName, searchSummary } from "../../service"

export default {
  data() {
    return {
      choiceWays: [],
      costNames: [],
      costNameList: [],
      nowCostItem: null,
    }
  },

  components: {
    CostSum,
  },

  computed: {
    ...mapState(["costList", "type", "orderType", "sender", "orderNo", "payer", "deliveryMode", "agencyFund",]),
  },

  mounted() {
    searchChoiceWay().then(res => {
      if (res.data.status === 200) {
        this.choiceWays = res.data.data.map(item => {
          return {
            value: item.id,
            label: item.name,
          }
				})
				this.$nextTick(function() {
          this.$refs["cost_names"].focus()
        })
      }
    })

    searchCostName({ type: this.type, order_type: this.orderType }).then(res => {
      if (res.data.status === 200) {
        this.costNameList = res.data.data
        this.costNames = res.data.data.map(item => {
          return {
            value: item.cost_name,
            label: item.cost_name,
          }
        })

        this.$nextTick(function() {
          this.$refs["cost_names"].focus()
        })
      }
    })
  },
  
  methods: {
    handleDelete(index, row) {
      if (this.costList.length > 1) {
        this.costList.splice(index, 1)
        this.getCostSumList()
      }
    },
    costAdd(index, row) {
      if (index == this.costList.length - 1) {
        this.costList.push({
          cost_name: "",
          payee: this.$getStore("unit"),
          payer: splitCodeName(this.sender),
          relevance_name: "",
          invoice_price: "",
          invoice_choice_way: "",
          absolute_cost: "",
          actual_cost: "",
          is_lock: "",
          remark: "",
          impact: 1,
          is_sys_cost: 1,
          related_type: 0,
          relevance_id: "",
        })

        this.$nextTick(function() {
          this.$refs["payee"].focus()
        })
        this.getCostSumList()
      }
    },
    getCostSumList() {
      if(this.type === 2) {
        return
      }
      
      let costItem = this.costList
        .filter((item, index) => {
          return index < this.costList.length - 1
        })
        .map(item => {
          return {
            order_no: this.orderNo,
            cost_name: item.cost_name,
            payer: item.payer,
            relevance_id: item.relevance_id,
            invoice_price: item.invoice_price,
            invoice_choice_way: item.invoice_choice_way,
            is_lock: item.is_lock,
            absolute_cost: item.absolute_cost,
            actual_cost: item.actual_cost,
            remark: item.remark,
            is_sys_cost: item.is_sys_cost,
            payee: item.payee,
            related_type: item.related_type,
            impact: item.impact,
          }
        })

      searchSummary(
        { 
          costItem: costItem,
          order_no: this.orderNo,
          payer: this.payer,
          agency_fund: this.agencyFund,
          delivery_mode: this.deliveryMode,
        }
      ).then(res => {
        if (res.data.status === 200) {
					let d = res.data.data[0]
					this.$store.commit("GET_COSTSUMLIST", d.clearUnitCountList)
					this.$store.commit("CHANGE_COSTABOUT", {
						billing_cost: d.billing_cost,
						clear_cost: d.clear_cost,
						should_receive_cost: d.should_receive_cost,
						pay_total_cost: d.pay_total_cost,
            receive_total_cost: d.receive_total_cost,
            should_receive_sender: d.should_receive_sender,
            should_receive_receiver: d.should_receive_receiver,
            should_pay_transiter: d.should_pay_transiter,
					})
        }
      })
    },
    getCostItem(row, index) {
      this.nowCostItem = this.costNameList.filter(item => {
        return item.cost_name === row.cost_name
      })[0]

      this.costList[index].relevance_name = this.nowCostItem.relevance_name
      this.costList[index].relevance_id = this.nowCostItem.relevance_id
    },
    indexMethod(index) {
      if (index === this.costList.length - 1) {
        return "输入"
      } else {
        return index + 1
      }
    },
    backDetail() {
      
      this.$router.push({ params: { item: "detail" }, query: { from: "cost" } })
    },
    getSum(param) {
      const { data } = param
      let sumInfo = data.reduce(
        (item1, item2) => {
          let sumAbCost = Decimal.add([item1.absolute_cost || 0, item2.absolute_cost || 0]).toNumber()
          let sumAcCost = Decimal.add([item1.actual_cost || 0, item2.actual_cost || 0]).toNumber()

          return {
            absolute_cost: sumAbCost,
            actual_cost: sumAcCost,
          }
        },
        { absolute_cost: 0, actual_cost: 0 },
      )

      this.$store.commit("GET_SUMCOST", sumInfo.actual_cost)
      this.$store.commit("CHECK_ALLCASH", sumInfo.absolute_cost)
      return ["合计", "", "", "", "", "", "", sumInfo.absolute_cost, sumInfo.actual_cost]
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.cost_table {
  .el-select {
    width: auto;
  }
  .tabBox {
    position: absolute;
    height: 100%;
    width: 100%;
    display: none;
    border: 1px solid #d4d4d5;
    border-top: none;
    overflow-y: auto;
    padding: 15px 15px 0 15px;
  }
  .tabBox.active {
    display: block;
  }
  h3 {
    padding-bottom: 0.21428571rem;
    margin-bottom: 0.2rem;
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  }
  .record {
    margin-top: 0.8rem;
  }
  .button {
    margin-top: 0.8rem;
  }
}
</style>