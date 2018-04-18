<template>
	<el-dialog :title="headTitle" :visible.sync="visible" append-to-body width="70%" :before-close="close">
		<el-form label-position="top" :model="detail" class="demo-form-inline editDetail" ref="ruleForm">
			<el-row :gutter="10">
				<el-col :span="4">
					<el-form-item label="航班号" class="grid-content" prop="flight_no">
						<el-input size="mini" v-model="detail.flight_no" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="始发站" class="grid-content break_line" prop="departure">
						<el-input size="mini" v-model="detail.departure" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="目的站" class="grid-content break_line" prop="destination">
						<el-input size="mini" v-model="detail.destination" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<!-- <el-col :span="4">
					<el-form-item label="航班日期" class="grid-content" prop="flight_date">
						<el-input size="mini" v-model="detail.flight_date" placeholder="" ref='flight_date'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="联系人" class="grid-content" prop="booking_contact_person">
						<el-input size="mini" v-model="detail.booking_contact_person" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="联系电话" class="grid-content" prop="booking_contact_person_tel">
						<el-input size="mini" v-model="detail.booking_contact_person_tel" ref='booking_contact_person_tel' placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注" class="grid-content" prop="remark">
						<el-input type="textarea" :rows="2" size="mini" v-model="detail.remark"></el-input>
					</el-form-item>
				</el-col> -->
			</el-row>
		</el-form>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="insert" size="mini">确 定</el-button>
    </span>
	</el-dialog>
</template>

<script>

export default {
  props: ["visible", 'title' ],
  data() {
    return {
      detail: {
        flight_no: '',
        departure: '',
        destination: '',
      }
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
    // 添加
    insert() {},
  },
}
</script>

<style lang="less">

</style>