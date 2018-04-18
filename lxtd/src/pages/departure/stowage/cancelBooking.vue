/**
 * 马少良
 */
 
<template>
	<el-dialog :title="status === 1 ? '配载订舱取消' : '拉下'" :visible.sync="visible" width="70%" :before-close="close">
		<el-table :data="tableData" border style="width: 100%" max-height="300" size="small">
      <el-table-column fixed type="index" label="序号"></el-table-column>
      <el-table-column prop="order_no" label="运单号" width="120"></el-table-column>
      <el-table-column prop="batch" label="批次"></el-table-column>
      <el-table-column prop="quantity" label="件数" ></el-table-column>
      <el-table-column prop="stowage_quantity" label="已配载件数" width="110"></el-table-column>
      <el-table-column prop="stowage_weight" label="已配载重量" width="110"></el-table-column>
      <el-table-column prop="weight" label="重量"></el-table-column>
      <el-table-column prop="volume" label="体积"></el-table-column>
      <el-table-column prop="product" label="品名"></el-table-column>
      <el-table-column prop="departure" label="始发站" ></el-table-column>
      <el-table-column prop="destination" label="目的站"></el-table-column>
      <el-table-column prop="special_order_code" label="特货代码"></el-table-column>
      <el-table-column fixed prop="cancel_reason" :label="status === 1 ? '取消原因' : '拉下原因'" width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.cancel_reason"></el-input>
        </template>
      </el-table-column>
      <el-table-column v-if="status !== 1" fixed prop="pull_down_quantity" label="拉下件数" width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.pull_down_quantity" @blur="isBeyond(scope.row)" @input="countWeight(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column v-if="status !== 1" fixed prop="pull_down_weight" label="拉下重量" width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.pull_down_weight"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-form class="demo-form-inline" :model="mutiCancel">
      <el-form-item :label="status === 1 ? '取消原因一致' : '拉下原因一致'">
        <el-switch v-model="mutiCancel.is_same"></el-switch>
      </el-form-item>
      <el-form-item :label="status === 1 ? '取消原因' : '拉下原因一致'" v-show="mutiCancel.is_same">
        <el-input type="textarea" v-model="mutiCancel.same_reason"></el-input>
      </el-form-item>
    </el-form>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="cancelBooking" size="mini">确 定</el-button>
    </span>
	</el-dialog>
</template>

<script>
  import { cancelStowageBooking } from "@/service/stowage.js"
  const { Decimal } = require("@/utils/count.js")

	export default {
		props: ['list', 'visible', 'status'],
		data() {
			return {
        mutiCancel: {
          is_same: false,
          same_reason: '',
        },
			}
    },
    computed: {
      tableData() {
        return this.list.map(item => {
          let w = Decimal.add(0,item.pull_down_quantity || 0).mul(item.weight || 0).div(item.quantity || 1).toNumber().toFixed(2)
          return {...item, cancel_reason: '', pull_down_weight: w,}
        })
      },
      orderIdList() {
        return this.tableData.map(item => {
          if(this.status === 1) {
            return {
              id: item.id,
              order_no: item.order_no, 
              cancel_reason: item.cancel_reason,
              stowage_quantity: item.stowage_quantity,
              stowage_weight: item.stowage_weight,
            }
          }else {
            return {
              id: item.id,
              order_no: item.order_no, 
              cancel_reason: item.cancel_reason,
              stowage_quantity: item.stowage_quantity,
              pull_down_quantity: item.pull_down_quantity,
              pull_down_weight: item.pull_down_weight * 1,
            }
          }
        })
      },
    },
    watch: {
      'mutiCancel.same_reason'(val) {
        if(this.mutiCancel.is_same) {
          this.tableData.forEach(item => {
            item.cancel_reason = val
          })
        }
      },
      'mutiCancel.is_same'(val) {
        if(!val) {
          this.mutiCancel.same_reason = ''
        }
      },
    },
		methods: {
			close() {
        this.mutiCancel.same_reason = ''
        this.mutiCancel.is_same = false
        this.tableData.forEach(item => {
          item.cancel_reason = ''
        })
				this.$emit('close')
      },
      cancelParams() {
        return {
          status: this.status,
          orderIdList: this.orderIdList
        }
      },
      cancelBooking() {
        cancelStowageBooking(this.cancelParams()).then(res => {
          if(res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: this.status === 1 ? "取消配载订舱成功" : "拉下成功",
              type: "success",
            })

            this.close()
            this.$emit('search')
          }
        })
      },
      isBeyond(row) {
        if(row.pull_down_quantity > row.stowage_quantity) {
          row.pull_down_quantity = row.stowage_quantity
          this.countWeight(row)
          this.$notify({
            title: "警告",
            message: "超出已配载件数,请重新输入",
            type: "warning",
          })
        }
      },
      countWeight(row) {
        row.pull_down_weight = Decimal.add(0,row.pull_down_quantity).mul(row.weight).div(row.quantity).toNumber().toFixed(2)
      },
		},
	}
</script>