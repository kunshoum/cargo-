/**
 * 马少良
 */
<template>
	<el-dialog title="配载订舱修改" :visible.sync="visible" width="70%" top="23vh" :before-close="close">
    <el-form class="demo-form-inline" label-position="top" :model="newFlightInfo">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="新航班号" class="grid-content" prop="flight_no">
            <el-input size="mini" v-model="newFlightInfo.flight_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="日期" class="grid-content" prop="flight_date">
            <el-input size="mini" v-model="newFlightInfo.flight_date"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="始发站" class="grid-content" prop="departure">
            <el-select size="mini" filterable allow-create remote default-first-option placeholder="" clearable
              ref="departure"
              v-model="newFlightInfo.departure"
              @focus="getDepartures">
              <el-option
                v-for="(item, index) in departures"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="目的站" class="grid-content" prop="destination">
            <el-select size="mini" filterable allow-create remote default-first-option placeholder="" clearable
              v-model="newFlightInfo.destination"
              @focus="getDestination">
              <el-option
                v-for="(item, index) in destinations"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="updateBooking" size="mini">确 定</el-button>
    </span>
	</el-dialog>
</template>

<script>
  import { updateStowageBooking } from "@/service/stowage.js"
  import getCityMixin from "@/mixin/getCityMixin"

	export default {
    mixins: [getCityMixin],
		props: ['visible', 'list'],
		data() {
			return {
        newFlightInfo: {
          flight_no: '',
          flight_date: '',
          departure: '',
          destination: '',
        },
        departures: [],
        destinations: [],
			}
    },
    computed: {
      orderIdList() {
        return this.list.map(item => ({id: item.id}))
      }
    },
		methods: {
			close() {
        this.newFlightInfo = {}
				this.$emit('close')
      },
      updateBooking() {
        updateStowageBooking({
          ...this.newFlightInfo,
          orderIdList: this.orderIdList
        }).then(res => {
          if(res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: "修改配载订舱成功",
              type: "success",
            })
            this.$store.commit('CHANGE_FLIGHTINGO', this.newFlightInfo)
            this.$emit('close')
            this.$emit('updateSearch', this.newFlightInfo)
          }
        })
      },
		},
	}
</script>

<style lang="less">
  .confirmTable {
    margin-bottom: 20px;
  }
</style>