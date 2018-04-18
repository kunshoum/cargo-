/**
 * 马少良
 */
 
<template>
	<el-dialog title="预付款充值" :visible.sync="visible" width="70%" :before-close="close">
		<el-form class="demo-form-inline" label-position="top" ref="chargeForm" :model="chargeInfo">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="出发/到达" class="grid-content" prop="start_arrive">
            <el-select size="mini" disabled
              v-model="chargeInfo.start_arrive">
              <el-option label="出发" :value="0"></el-option>
              <el-option label="到达" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收/付款单位" class="grid-content" prop="receive_pay_type">
            <el-select size="mini" disabled
              v-model="chargeInfo.receive_pay_type">
              <el-option label="收款单位" :value="0"></el-option>
              <el-option label="付款单位" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算单位" class="grid-content" prop="clearing_unit">
            <el-input size="mini" v-model="chargeInfo.clearing_unit" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="缴费时间" class="grid-content" prop="receive_cost_time">
            <el-input size="mini" v-model="chargeInfo.receive_cost_time"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收预付款人" class="grid-content" prop="receive_cost_person">
            <el-input size="mini" v-model="chargeInfo.receive_cost_person"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预付款金额" class="grid-content" prop="pre_payment_cost">
            <el-input size="mini" v-model="chargeInfo.pre_payment_cost"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="sure" size="mini">确 定</el-button>
    </span>
	</el-dialog>
</template>

<script>
  import {
    charge,
    beforeEdit,
  } from "@/service/prepay"

  import { getTime } from '@/utils/time'

	export default {
		props: ['list', 'visible', 'type', 'id', 'timeStamp'],
		data() {
			return {
				chargeInfo: {
          start_arrive: 0,
          receive_pay_type: 0,
          clearing_unit: '',
          receive_cost_time: '',
          receive_cost_person: this.$getStore('real_name'),
          pre_payment_cost: '',
        },
			}
    },
    watch: {
      timeStamp() {
        if(this.type === "charge") {
          this.$nextTick(() => {
            this.$refs["chargeForm"].resetFields()
          })

          beforeEdit({id: this.id}).then(res => {
            if(res.status === 200) {
              this.fillCharge(res.data.data[0])
              this.chargeInfo.receive_cost_time = getTime()
            }
          })
        }
      }
    },
		methods: {
      fillCharge(d) {
        let o = this.chargeInfo
        o.start_arrive = d.start_arrive
        o.receive_pay_type = d.receive_pay_type
        o.clearing_unit = d.clearing_unit
      },
			close() {
        this.$emit('close')
      },
      params() {
        let o = this.chargeInfo
        return {
          clearing_unit_id: this.id,
          pre_payment_cost: o.pre_payment_cost,
          receive_cost_person: o.receive_cost_person,
          receive_cost_time: o.receive_cost_time,
        }
      },
			sure() {
        charge(this.params()).then(res => {
          if(res.data.status === 200) {
            this.$emit('success')
            this.$notify({
              title: "成功",
              message: '充值成功',
              type: "success",
            })
            this.$refs["chargeForm"].resetFields()
          }
        })
      },
		},
	}
</script>