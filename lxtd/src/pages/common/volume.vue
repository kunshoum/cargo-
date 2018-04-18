/**
 * 马少良
 */
 
<template>
	<div id='volume' class="billing_common">
		<el-row>
      <el-col :span="24">
        <div class="title_info">
          <span>当前单号: {{orderNo || '_'}}</span>
					<span>当前单件数: {{sumPiece || '_'}}</span>
        </div>
      </el-col>
    </el-row>
    <el-table :data="volumeList" style="width: 100%" align='center' size="small" 
    max-height="400"
    border
    class="volumeTable last_insert"
    show-summary 
    :summary-method="getSum">
      <el-table-column label="序号" align='left' type="index" :index="indexMethod" width="200"></el-table-column>
      <el-table-column label="长(cm)" align='left'>
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.length" @change="countSum(scope.row, scope.$index)" @blur="testNum(scope.row.length)"
          ref="length" v-on-enter="'width'"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="宽(cm)" align='left'>
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.width" @change="countSum(scope.row, scope.$index)" @blur="testNum(scope.row.width)"
          ref="width" v-on-enter="'height'"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="高(cm)" align='left'>
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.height" @change="countSum(scope.row, scope.$index)" @blur="testNum(scope.row.height)"
          ref="height" v-on-enter="'quantity'"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="件数" align='left'>
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.quantity" ref="quantity"
          @change="countSum(scope.row, scope.$index)" @blur="testInt(scope.row.quantity)"
          @keyup.enter.native="volumeAdd(scope.$index,scope.row)">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="体积(m3)" align='left' prop="volume"></el-table-column>
      <el-table-column label="体积重量(kg)" align='left' prop="volume_weight"></el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope" v-if="scope.$index !== (volumeList.length - 1)">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
		<div align="center" class="button back_detail">
			<el-button type="primary" class="save" size="small" @click="backDetail">保存并返回开单明细</el-button>
		</div>
	</div>
</template>

<script>
const { Decimal } = require("../../utils/count.js")
import { mapState } from "vuex"

export default {
  data() {
    return {
      sumVolume: "",
      sumQuantity: "",
      sumWeight: "",
    }
  },
  computed: {
    ...mapState(["orderNo", "sumPiece", "volumeList", "orderType"]),
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs["length"].focus()
    })
  },
  methods: {
    testNum(num) {
      let numberRegx = /^\d*\.?\d*$/
      if(!numberRegx.test(num)) {
        this.$notify({
          title: "警告",
          message: "请输入数字",
          type: "warning",
        })
      }
    },
    testInt(num) {
      let numberRegx = /^\d*$/
      if(!numberRegx.test(num)) {
        this.$notify({
          title: "警告",
          message: "请输入整数",
          type: "warning",
        })
      }
    },
    handleDelete(index, row) {
      if (this.volumeList.length > 1) {
        this.volumeList.splice(index, 1)
      }
    },
    indexMethod(index) {
      if (index === this.volumeList.length - 1) {
        return "输入"
      } else {
        return index + 1
      }
    },
    countSum(row, index) {
      let { length: l, width: w, height: h, quantity: n } = row
      if (l && w && h && n) {
        row.volume = Decimal.add(1)
          .mul(l)
          .mul(w)
          .mul(h)
          .mul(n)
          .div(1000000)
          .toNumber()
        row.volume_weight = Math.round(
          Decimal.add(1)
            .mul(l)
            .mul(w)
            .mul(h)
            .mul(n)
            .div(6000)
            .toNumber(),
        )
      }
    },
    volumeAdd(index, row) {
			let { length: l, width: w, height: h, quantity: n } = row
			if (!(l && w && h && n)) {
				this.$notify({
          title: "警告",
          message: "请输入完整",
          type: "warning",
        })
				return
			}

      if (index == this.volumeList.length - 1) {
        this.volumeList.push({
          length: "",
          width: "",
          height: "",
          quantity: "",
          volume: "",
          volume_weight: "",
				})
				
				this.isBeyond()
        this.$nextTick(function() {
          this.$refs["length"].focus()
        })
      }
    },
    getSum(param) {
      const { data } = param
      let sumInfo = data.reduce(
        (item1, item2) => {
          let sumQuantity = Decimal.add([item1.quantity || 0, item2.quantity || 0]).toNumber()
          let sumVolume = Decimal.add([item1.volume || 0, item2.volume || 0]).toNumber()
          let sumWeight = Decimal.add([item1.volume_weight || 0, item2.volume_weight || 0]).toNumber()

          return {
            quantity: sumQuantity,
            volume: sumVolume,
            volume_weight: sumWeight,
          }
        },
        { quantity: 0, volume: 0, volume_weight: 0 },
      )

      this.sumVolume = sumInfo.volume
      this.sumQuantity = sumInfo.quantity
			this.sumWeight = sumInfo.volume_weight
      return ["合计", "", "", "", sumInfo.quantity, sumInfo.volume.toFixed(3), sumInfo.volume_weight.toFixed(2)]
		},
		isBeyond() {
			if(this.sumQuantity > this.sumPiece) {
				this.$notify({
          title: "警告",
          message: "总件数超出当前单件数",
          type: "warning",
        })
      }
      
      if(this.sumQuantity*1 === this.sumPiece*1) {
				this.$notify({
          title: "成功",
          message: "当前单件数已录完",
          type: "success",
        })
			}
		},
		notSame() {
			if(this.sumQuantity*1 !== this.sumPiece*1) {
				this.$notify({
          title: "警告",
          message: "总件数与当前单件数不一致,请注意修改",
          type: "warning",
        })
      }
      
      if(this.sumQuantity*1 === this.sumPiece*1) {
				this.$notify({
          title: "成功",
          message: "当前单件数已录完",
          type: "success",
        })
			}
		},
    backDetail() {
      this.notSame()
      this.$store.commit("GET_VOLUME", this.sumVolume.toFixed(3))
      this.$store.commit("GET_WEIGHT", this.sumWeight.toFixed(2))
      this.$router.push({ params: { item: "detail" }, query: { from: "volume" } })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.title_info {
	height: 35px;
	margin-bottom: 15px;
	border-bottom: 1px solid #d8dce5;
	span {
		display: inline-block;
		margin-right: 10px;
	}
}

.volumeTable {
  margin-bottom: 32px;
}
</style>
