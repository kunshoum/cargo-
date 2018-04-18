<!--王艺蒙-->
<template>
<div class="Entry Search">
<el-form :model="orderInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
        <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="入库单位" class="grid-content" prop="params.toUnit">
													<el-select size="mini" placeholder=""	ref="toUnit"
                                filterable clearable 				
																@focus="getSrorageope"
																v-model="orderInfo.params.toUnit"
																value-key="unitName"
																@change="getsource"
																:loading="loading">
															<el-option
																v-for="(item, index) in storageOpes"
																:key="index"
																:label="item.label"
																:value="item.value">
															</el-option>
														</el-select>
												</el-form-item>
                    </el-col>
										<el-col :span="4">
                        <el-form-item label="领取人" class="grid-content" prop="params.claimer">
                              <el-input size="mini" id="yinye" v-model="orderInfo.params.claimer" placeholder="领取人"></el-input>
                        </el-form-item>
                    </el-col>
					<el-col :span="4">
            <el-form-item label="领取时间" class="grid-content" prop="timeValue" required>
							<el-date-picker 
							v-model="orderInfo.timeValue"
							type="datetime"
							size="mini"
							placeholder="选择日期时间"
							align="right"
							value-format="yyyy-MM-dd HH:mm:ss"
							:picker-options="pickerOptions1">
							</el-date-picker>
						</el-form-item>
          </el-col>
       </el-row>
</el-form>
<div id='entry'>
		<!-- 入库信息开始 -->
		<el-table :data="volumeLists" style="width: 100%" align='center' size="small" 
							class="volumeTable"
              show-summary 
							:summary-method="getSummaries"
							>
			<el-table-column label="序号" align='center' width="150" type="index" :index="indexMethod"></el-table-column>
			 <el-table-column label="分票单位" prop="fromUnit" align='center'>
  				<template slot-scope="scope">
    				<div slot="reference" >
                          <el-select size="mini"  filterable clearable 
													v-model="scope.row.fromUnit"
												  @focus="clearUnit(scope.row)"
													@change="gettickeType"
													ref="unitName"
                          :ref="scope.$index === (volumeLists.length - 1) ? 'fromUnit' : ''"
            							:loading="loading">
													<el-option
													 v-for="(item, index) in sourceUnits"
													:key="index"
													:label="item.label"
													:value="item.value"
													></el-option>
													</el-select>
      				</div>
  				</template>
			</el-table-column>
			 <el-table-column label="票证类型" prop="orderCategory" align='center'>
  				<template slot-scope="scope">
    				<div slot="reference" >
                	 	<el-select size="mini" placeholder="" filterable clearable 
									    	v-model="scope.row.orderCategory"
												@focus="clearType(scope.row)"
                        @change="getprefix(scope.row)"
												ref="orderCategory"
            						:loading="loading">
												<el-option 
												 v-for="(item, index) in ticketTypes"
												:key="item.label"
												:label="item.label"
												:value="item.label"
												></el-option>
										</el-select>
      			</div>
  				</template>
			</el-table-column>
       <el-table-column label="票证源单位" prop="getpre" align='center'>
  				<template slot-scope="scope">
    				<div slot="reference" >
                	 		<el-select size="mini" placeholder="" filterable clearable 
									    	v-model="scope.row.getpre"
												@focus="clearPernum(scope.row)"
                        @change="getpref(scope.row)"
												ref="getpre"
            						:loading="loading">
												<el-option 
												 v-for="(item, index) in prefixTics "
												:key="item.value"
												:label="item.label"
												:value="item.value"
												></el-option>
										</el-select>
      			</div>
  				</template>
			</el-table-column>
			<el-table-column label="单证前缀" align='center' prop="orderPrefix">
  				<template slot-scope="scope">
    				<div slot="reference" >
    				<el-input size="mini" v-model="scope.row.orderPrefix" :disabled="true" placeholder="单证前缀"></el-input>
      				</div>
  				</template>
			</el-table-column>
			<el-table-column label="起始号段" align='center' prop="startNum">
  				<template slot-scope="scope">
    				<div slot="reference" >
    					<el-input size="mini" @blur="countOrderNum(scope.row)" :ref="scope.$index === (volumeLists.length - 1) ? 'startNum' : ''"  v-model="scope.row.startNum" @change="judges(scope.row)"></el-input>
      				</div>
  				</template>
			</el-table-column>
			<el-table-column label="终止号段" align='center' prop="endNum">
                <template slot-scope="scope">
                        <div slot="reference" >
                            <el-input size="mini" @blur="countOrderNum(scope.row)" v-model="scope.row.endNum" @change="judge(scope.row)" 
                            :ref="scope.$index === (volumeLists.length - 1) ? 'endNum' : ''"
                                @keyup.native="entryAdd(scope.$index,scope.row)">
                            </el-input>
                        </div>
  				</template>
            </el-table-column>
		    <el-table-column label="操作" align='center'>
		      <template slot-scope="scope" v-if="scope.$index !== (volumeLists.length - 1)">
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<div align="center" class="button" style="margin-top:35px;" >
			<el-button type="primary" class="save" size="small" @click="sureTicket">确认入库</el-button>
		</div>
	</div>
</div>
</template>
<script>
import { storageOpe, sourceUnit, tickeType, sureStorage, prefixTicket } from "../../service"
import { getTime } from "../../utils/time.js"
import { mapState } from "vuex"

export default {
  data() {
    return {
      title: "票证入库",
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date())
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit("pick", date)
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", date)
            },
          },
        ],
      },
      loading: false,
      storageOpes: [],
      sourceUnits: [],
      ticketTypes: [],
      prefixTics: [],
      sourceid: "",
      tickeType: "",
      orderCategory: "",
      total: "",
      orderInfo: {
        params: {
          toUnit: "",
          claimer: "",
          claimTime: "",
        },
        orderParams: [
          {
            fromUnit: "",
            orderCategory: "",
            orderPrefix: "",
            startNum: "",
            endNum: "",
          },
        ],
        timeValue: "",
      },
      unCode: "",
      storeArr: [],
    }
  },
  computed: {
    ...mapState(["volumeLists"]),
  },
  watch: {
    $route() {
      this.load()
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    judges(row) {
      if (row.startNum < 0) {
        row.startNum = ""
        this.$message("号段不能为负数,请重新填写")
        this.$nextTick(function() {
          this.$refs["startNum"].focus()
        })
      } else if (row.orderCategory === "航空运单") {
        if (row.startNum.length < 7) {
          this.$message("请输入正确的7位单号")
          this.$refs["startNum"].focus()
        }
      }
    },
    judge(row) {
      if (row.startNum && row.endNum) {
        if (row.endNum < row.startNum) {
          // row.endNum = ""
          this.$refs["endNum"].focus()
          // this.$message("终止号段应大于起始号段,请重新填写")
          if (row.endNum.length > 8 || row.startNum.length > 8) {
            var a = ""
            a = row.endNum.length
            a = a.substring(0, a.length - 1)

            var b = ""
            b = row.startNum.length
            b = b.substring(0, b.length - 1)

            // row.endNum = a
            // row.startNum = b
          }
        } else if (row.orderCategory === "航空运单") {
          if (row.endNum.length < 7) {
            this.$message("请输入正确的7位单号")
            this.$refs["endNum"].focus()
            thsi.countOrderNum()
          }
        }
        this.$nextTick(function() {
          this.$refs["endNum"].focus()
        })
      }
    },
    load() {
      this.volumeLists.map(item => {
        item.fromUnit = ""
        item.orderPrefix = ""
        item.startNum = ""
        item.endNum = ""
        item.getpre = ""
        item.orderCount = ""
        item.orderCategory = ""
        item.perarr = []
        return item
      })
      this.orderInfo.timeValue = getTime()
      this.orderInfo.params.claimer = this.$getStore("real_name")
      this.$store.commit("CHANGE_TOPTITLE", this.title)
    },
    handleDelete(index, row) {
      if (this.volumeLists.length > 1) {
        this.volumeLists.splice(index, 1)
      }
    },
    indexMethod(index) {
      if (index === this.volumeLists.length - 1) {
        return "输入"
      } else {
        return index + 1
      }
    },
    endcountOrderNum(row) {
      let regx = /^\d{7}$/
      let n = row.endNum
      if (regx.test(n) && row.orderCategory === "航空运单") {
        row.endNum = n + (~~n % 7 + "")
      }
    },
    entryAdd(index, row) {
      //结束号段
      this.endcountOrderNum(row)

      let { fromUnit: l, orderCategory: w, orderPrefix: h, startNum: n, endNum: b } = row

      if (!(l && w && n && b)) {
        return
      } else {
        if (row.orderCategory === "航空运单") {
          if (row.endNum.length > 7) {
            if (this.orderCategory) {
              if (
                this.volumeLists[this.volumeLists.length - 1].fromUnit != "" &&
                this.volumeLists[this.volumeLists.length - 1].orderCategory != "" &&
                this.volumeLists[this.volumeLists.length - 1].orderPrefix != "" &&
                this.volumeLists[this.volumeLists.length - 1].startNum != "" &&
                this.volumeLists[this.volumeLists.length - 1].endNum != ""
              ) {
                this.volumeLists.push({
                  fromUnit: "",
                  orderCategory: this.orderCategory,
                  orderPrefix: "",
                  startNum: "",
                  endNum: "",
                  getpre: "",
                  orderCount: "",
                })
                this.$nextTick(function() {
                  this.$refs["fromUnit"].focus()
                })
                return
              }
            } else {
              this.volumeLists.push({
                fromUnit: "",
                orderCategory: "",
                orderPrefix: "",
                startNum: "",
                endNum: "",
                getpre: "",
                orderCount: "",
              })
              this.$nextTick(function() {
                this.$refs["fromUnit"].focus()
              })
            }
          }
        } else if (row.orderCategory != "航空运单" && row.endNum.length >= 8) {
          if (this.orderCategory) {
            if (
              this.volumeLists[this.volumeLists.length - 1].fromUnit != "" &&
              this.volumeLists[this.volumeLists.length - 1].orderCategory != "" &&
              this.volumeLists[this.volumeLists.length - 1].orderPrefix != "" &&
              this.volumeLists[this.volumeLists.length - 1].startNum != "" &&
              this.volumeLists[this.volumeLists.length - 1].endNum != ""
            ) {
              this.volumeLists.push({
                fromUnit: "",
                orderCategory: this.orderCategory,
                orderPrefix: "",
                startNum: "",
                endNum: "",
                getpre: "",
                orderCount: "",
              })
              this.$nextTick(function() {
                this.$refs["fromUnit"].focus()
              })
              return
            }
          } else {
            this.volumeLists.push({
              fromUnit: "",
              orderCategory: "",
              orderPrefix: "",
              startNum: "",
              endNum: "",
              getpre: "",
              orderCount: "",
            })
            this.$nextTick(function() {
              this.$refs["fromUnit"].focus()
            })
          }
        }
      }
    },
    getSummaries(param) {
      let newArr = param.data.map((item, index) => {
        if (index === 0) {
          if (item.orderCategory === "航空运单") {
            item.startNum = item.startNum
            item.endNum = item.endNum
            return {
              ...item,
              orderCount: item.endNum.substring(0, 7) - item.startNum.substring(0, 7),
            }
          } else if (item.orderCategory != "航空运单") {
            return {
              ...item,
              orderCount: item.endNum - item.startNum,
            }
          }
        } else if (this.volumeLists.length > 1 || this.volumeLists.length === 1) {
          if (item.orderCategory === "航空运单") {
            item.startNum = item.startNum
            item.endNum = item.endNum
            return {
              ...item,
              orderCount: item.endNum.substring(0, 7) - item.startNum.substring(0, 7) + 1,
            }
          } else if (item.orderCategory != "航空运单") {
            return {
              ...item,
              orderCount: item.endNum - item.startNum + 1,
            }
          }
        }
      })
      const { data } = param
      const sumInfo = newArr.reduce(
        (obj1, obj2) => {
          let sumorderCount = obj1.orderCount + obj2.orderCount
          return {
            orderCount: sumorderCount,
          }
        },
        { orderCount: 0 },
      )

      this.storeArr = newArr
      if (sumInfo.orderCategory === "航空运单") {
        if (sumInfo.orderCount < 0) {
          return ["总计号段数", "", "", "", "", "", 1]
        } else {
          return ["总计号段数", "", "", "", "", "", sumInfo.orderCount]
        }
      } else {
        if (sumInfo.orderCount < 0) {
          return ["总计号段数", "", "", "", "", "", 1]
        }
        return ["总计号段数", "", "", "", "", "", sumInfo.orderCount]
      }
    },
    //入库操作
    getSrorageope() {
      //入库操作下拉框
      this.orderInfo.params.toUnit = ""
      storageOpe().then(res => {
        if (res.data.status === 200) {
          this.storageOpes = res.data.data.map(item => {
            return { value: item, label: item.unitName }
          })
        } else {
          this.storageOpes = []
        }
      })
    },
    //联动源单位
    sourceAbout(item) {
      this.sourceid = item.id
    },
    //源单位
    getsource(item) {
      //源单位下拉框
      this.sourceAbout(item)
      sourceUnit(item.id).then(res => {
        if (res.data.status === 200) {
          this.sourceUnits = res.data.data.map(item => {
            return { value: item.unitName, label: item.unitName }
          })
        } else {
          this.sourceUnits = []
        }
      })
    },
    //联动票证
    tickTypAbout(item) {
      this.tickeType = item.unitCode
    },
    //票证类型
    gettickeType(item, row) {
      //来源操作下拉框
      this.tickTypAbout(item)
      tickeType({ unit_code: item }).then(res => {
        if (res.data.status === 200) {
          this.ticketTypes = res.data.data.map(item => {
            return { value: item.categoryId, label: item.orderType }
          })
        } else {
          this.ticketTypes = []
        }
      })
    },
    getprefix(row) {
      this.orderCategory = row.orderCategory
      //单证前缀
      prefixTicket({ orderType: row.orderCategory }).then(res => {
        if (res.data.status === 200) {
          this.prefixTics = res.data.data.map(item => {
            return { value: item.orderPrefix, label: item.unitName }
          })
        } else {
          this.prefixTics = []
        }
      })
    },

    getpref(item) {
      item.orderPrefix = item.getpre
    },
    clearUnit(row) {
      row.fromUnit = ""
      row.orderCategory = ""
      row.getpre = ""
      row.orderPrefix = ""
      row.perarr = []
    },
    clearType(row) {
      row.orderCategory = ""
      row.getpre = ""
      row.orderPrefix = ""
      row.perarr = []
    },
    clearPernum(row) {
      row.getpre = ""
      row.orderPrefix = ""
      row.perarr = []
    },
    sureTicket() {
      let newArr2 = this.storeArr.map(item => {
        delete item.getpre
        delete item.perarr
      })
      //确认入库
      if (this.orderInfo.params.toUnit.unitName && this.orderInfo.params.claimer && this.volumeLists.length > 0 && this.storeArr[0].startNum != '') {
        this.orderInfo.params.claimTime = this.orderInfo.timeValue || ""
        sureStorage({
          orderParams: this.storeArr,
          order: {
            toUnit: this.orderInfo.params.toUnit.unitName,
            claimer: this.orderInfo.params.claimer,
            claimTime: this.orderInfo.params.claimTime,
          },
        }).then(res => {
          if (res.data.status === 200) {
            this.$message({
              message: res.data.message,
              type: "success",
            })
            //确认入库后跳转
            this.$router.push(`/ticket/management`)
          } else {
            this.$message(res.data.message)
          }
        })
      } else {
        this.$message("请完整填写入库信息")
      }
    },
    countOrderNum(row) {
      let numberRegx = /^\d*\.?\d*$/
      if(!numberRegx.test(row.startNum)) {
        this.$notify({
          title: "警告",
          message: "请输入数字",
          type: "warning",
        })
        this.$refs["startNum"].focus()
      }

      if(!numberRegx.test(row.endNum)) {
        this.$notify({
          title: "警告",
          message: "请输入数字",
          type: "warning",
        })
        this.$refs["endNum"].focus()
      }

      let regx = /^\d{7}$/
      let n = row.startNum
      if (regx.test(n) && row.orderCategory === "航空运单") {
        row.startNum = n + (~~n % 7 + "")
      }

    },
  },
}
</script>
<style lang="less" scoped>
.Billing {
  position: relative;
  padding: 0 120px;

  .closeBilling {
    position: absolute;
    top: 0px;
    right: 30px;
    font-size: 24px !important;
    color: #878d99;
    &:hover {
      color: #fa5555;
    }
  }
  .tit {
    margin: 10px;
  }
}
</style>
