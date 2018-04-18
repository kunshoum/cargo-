/**
 * 马少良
 */
 
<template>
	<el-dialog title="配载订舱确认" :visible.sync="visible" width="70%" :before-close="close">
		<el-table :data="tableData" border style="width: 100%" max-height="300" size="small" class="confirmTable">
      <el-table-column fixed type="index" label="序号"></el-table-column>
      <el-table-column prop="goods_route" label="货物路由"></el-table-column>
      <el-table-column prop="order_no" label="运单号"></el-table-column>
      <el-table-column prop="batch" label="批次"></el-table-column>
      <el-table-column prop="product" label="品名"></el-table-column>
      <el-table-column prop="departure" label="始发站" ></el-table-column>
      <el-table-column prop="destination" label="目的站"></el-table-column>
      <el-table-column prop="stowage_quantity" label="件数">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.stowage_quantity" @blur="isBeyond(scope.row)" @input="countWeight(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="stowage_weight" label="重量">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.stowage_weight"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-form class="demo-form-inline" label-position="top" :model="confirmFlightInfo">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="航班号" class="grid-content" prop="flight_no">
            <el-input size="mini" v-model="confirmFlightInfo.flight_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="日期" class="grid-content" prop="flight_date">
            <el-input size="mini" v-model="confirmFlightInfo.flight_date"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="始发站" class="grid-content" prop="departure">
            <el-select size="mini" filterable remote default-first-option placeholder=""
              clearable
              ref="departure"
              v-model="confirmFlightInfo.departure"
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
            <el-select size="mini" filterable remote default-first-option placeholder=""
              clearable
              v-model="confirmFlightInfo.destination"
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
        <el-col :span="4">
          <el-form-item label="舱位" class="grid-content" prop="cabin">
            <el-select size="mini" filterable remote allow-create default-first-option placeholder=""
              clearable
              v-model="confirmFlightInfo.cabin"
              @focus="cabin">
              <el-option
                v-for="(item, index) in cabins"
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
      <el-button type="primary" @click="bookConfirm" size="mini">确 定</el-button>
    </span>
	</el-dialog>
</template>

<script>
  import { confirmBooking, getCabin } from "@/service/stowage.js"
  import {mapState} from "vuex"
  import getCityMixin from "@/mixin/getCityMixin"
  const { Decimal } = require("@/utils/count.js")

	export default {
    mixins: [getCityMixin],
		props: ['list', 'visible'],
		data() {
			return {
				confirmFlightInfo: {
          flight_no: '',
          flight_date: '',
          departure: '',
          destination: '',
          cabin: '',
        },
        departures: [],
        destinations: [],
        cabins: [],
			}
    },
    mounted() {
      this.load()
    },
    computed: {
      ...mapState(['flightInfo']),
      tableData() {
        return this.list.map(item => {
          let w = Decimal.add(0,item.remain_quantity).mul(item.weight).div(item.quantity).toNumber().toFixed(2)
          return {...item, stowage_quantity: item.remain_quantity, stowage_weight: w,}
        })
      }
    },
    watch: {
      flightInfo() {
        this.load()
      }
    },
		methods: {
      load() {
        let item = this.flightInfo
        this.confirmFlightInfo = {
          flight_no: item.flight_no,
          flight_date: item.flight_date,
          departure: item.departure,
          destination: item.destination,
          cabin: '',
        }
      },
			close() {
        this.$emit('close')
        this.confirmFlightInfo = {}
      },
      isBeyond(row) {
        if(row.stowage_quantity > row.remain_quantity) {
          row.stowage_quantity = row.remain_quantity
          this.countWeight(row)
          this.$notify({
            title: "警告",
            message: "超出剩余可配载件数,请重新输入",
            type: "warning",
          })
        }
      },
      countWeight(row) {
        row.stowage_weight = Decimal.add(0,row.stowage_quantity).mul(row.weight).div(row.quantity).toNumber().toFixed(2)
      },
      confirmParams() {
        let orderIdList = this.tableData.map(item => {
          return {
            order_no: item.order_no,
            quantity: item.remain_quantity,
            stowage_quantity: item.stowage_quantity,
            stowage_weight: item.stowage_weight * 1,
            batch: item.batch,
          }
        })

        return {
          ...this.confirmFlightInfo,
          orderIdList,
        }
      },
			bookConfirm() {
        confirmBooking(this.confirmParams()).then(res => {
          if(res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: "配载成功",
              type: "success",
            })
            
            this.$store.commit('CHANGE_FLIGHTINGO', this.confirmFlightInfo)
            this.close()
            this.$router.push({name: 'StowageList'})
          }
        })
      },
      cabinParmas() {
        return {
          flight_no: this.confirmFlightInfo.flight_no,
          plan_fly_date: this.confirmFlightInfo.flight_date,
          departure: this.confirmFlightInfo.departure,
          destination: this.confirmFlightInfo.destination,
        }
      },
      cabin() {
        getCabin(this.cabinParmas()).then(res => {
          if(res.data.status === 200) {
            this.cabins = res.data.data.map(item => {
              return {
                value: item.cabin_name,
                label: item.cabin_name,
              }
            })
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