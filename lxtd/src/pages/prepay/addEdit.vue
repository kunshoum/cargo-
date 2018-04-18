/**
 * 马少良
 */
 
<template>
	<el-dialog :title="title" :visible.sync="visible" width="70%" :before-close="close">
		<el-form class="demo-form-inline" label-position="top" ref="addForm" :model="addInfo">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="出发/到达" class="grid-content" prop="start_arrive">
            <el-select size="mini"
              v-model="addInfo.start_arrive">
              <el-option label="出发" :value="0"></el-option>
              <el-option label="到达" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收/付款单位" class="grid-content" prop="receive_pay_type">
            <el-select size="mini"
              v-model="addInfo.receive_pay_type">
              <el-option label="收款单位" :value="0"></el-option>
              <el-option label="付款单位" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算单位" class="grid-content" prop="clearing_unit">
            <el-input size="mini" v-model="addInfo.clearing_unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预警金额" class="grid-content" prop="danger_cost">
            <el-input size="mini" v-model="addInfo.danger_cost"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="停办业务金额" class="grid-content" prop="stop_cost">
            <el-input size="mini" v-model="addInfo.stop_cost"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="接受预警短信手机号" class="grid-content" prop="receive_danger_tel">
            <el-input size="mini" v-model="addInfo.receive_danger_tel"></el-input>
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
    addItem,
    updateItem,
    beforeEdit,
  } from "@/service/prepay"

	export default {
		props: ['list', 'visible', 'type', 'id', 'timeStamp'],
		data() {
			return {
				addInfo: {
          start_arrive: 0,
          receive_pay_type: 0,
          clearing_unit: '',
          danger_cost: '',
          stop_cost: '',
          receive_danger_tel: '',
        },
			}
    },
    computed: {
      title() {
        return this.type === 'add' ? '预付款客户添加' : '预付款客户编辑'
      }
    },
    watch: {
      timeStamp() {
        if(this.type === "edit" || this.type === "add") {
          this.$nextTick(() => {
            this.$refs["addForm"].resetFields()
          })
        }
        
        if(this.type === "edit") {
          beforeEdit({id: this.id}).then(res => {
            if(res.status === 200) {
              this.fillEdit(res.data.data[0])
            }
          })
        }
      }
    },
		methods: {
      fillEdit(d) {
        let o = this.addInfo
        o.start_arrive = d.start_arrive
        o.receive_pay_type = d.receive_pay_type
        o.clearing_unit = d.clearing_unit
        o.danger_cost = d.danger_cost
        o.stop_cost = d.stop_cost
        o.receive_danger_tel = d.receive_danger_tel
        o.data_unit_id = d.data_unit_id
      },
			close() {
        this.$emit('close')
      },
			sure() {
        if(this.type === 'add') {
          this.add()
        }else {
          this.edit()
        }
      },
      add() {
        addItem(this.addInfo).then(res => {
          if(res.data.status === 200) {
            this.$emit('success')
            this.$notify({
              title: "成功",
              message: '添加成功',
              type: "success",
            })
            this.$refs["addForm"].resetFields()
          }
        })
      },
      edit() {
        updateItem({...this.addInfo, id: this.id}).then(res => {
          if(res.data.status === 200) {
            this.$emit('success')
            this.$notify({
              title: "成功",
              message: '编辑成功',
              type: "success",
            })
            this.$refs["addForm"].resetFields()
          }
        })
      },
		},
	}
</script>