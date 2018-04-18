/**
 * 马少良
 */
<template>
	<el-dialog title="拉下" :visible.sync="visible" width="70%" :before-close="close">
		<el-table :data="tableData" border style="width: 100%" max-height="300" size="small">
      <el-table-column fixed type="index" label="序号"></el-table-column>
      <el-table-column fixed prop="cancel_reason" label="拉下原因" width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.cancel_reason"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed prop="pull_down_quantity" label="拉下件数" width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.pull_down_quantity"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed prop="pull_down_weight" label="拉下重量" width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.pull_down_weight"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="order_no" label="运单号"></el-table-column>
      <el-table-column prop="batch" label="批次"></el-table-column>
      <el-table-column prop="quantity" label="件数" ></el-table-column>
      <el-table-column prop="stowage_quantity" label="已配载件数"></el-table-column>
      <el-table-column prop="weight" label="重量"></el-table-column>
      <el-table-column prop="volume" label="体积"></el-table-column>
      <el-table-column prop="product" label="品名"></el-table-column>
      <el-table-column prop="departure" label="始发站" ></el-table-column>
      <el-table-column prop="destination" label="目的站"></el-table-column>
      <el-table-column prop="special_order_code" label="特货代码"></el-table-column>
    </el-table>
    <el-form class="demo-form-inline" :model="mutiCancel">
      <el-form-item label="拉下原因一致">
        <el-switch v-model="mutiCancel.is_same"></el-switch>
      </el-form-item>
      <el-form-item label="拉下原因" v-show="mutiCancel.is_same">
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
		props: ['list', 'visible'],
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
          let w = Decimal.add(0,item.pull_down_quantity).mul(item.weight).div(item.quantity).toNumber().toFixed(2)
          return {...item, cancel_reason: '', pull_down_weight: w,}
        })
      },
      orderIdList() {
        return this.tableData.map(item => {
          return {
            id: item.id, 
            pull_down_reason: item.cancel_reason,
            stowage_quantity: item.stowage_quantity,
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
				this.$emit('close')
      },
      cancelParams() {
        return {
          status: 2,
          orderIdList: this.orderIdList
        }
      },
      cancelBooking() {
        cancelStowageBooking(this.cancelParams()).then(res => {
          if(res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: "拉下成功",
              type: "success",
            })
            this.$emit('close')
            this.$emit('search')
          }
        })
      },
		},
	}
</script>