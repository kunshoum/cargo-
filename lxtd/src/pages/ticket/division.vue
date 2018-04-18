<!--王艺蒙-->
<template>
<div class="Division Search">
<el-form :model="orderInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
        <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="领取单位" class="grid-content" prop="params.toUnit">
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
            <el-form-item label="领取时间" class="grid-content" prop="timeValue">
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
<el-form :model="orderInfo" class="demo-form-inline search_form" style="margin-top:20px;height:80px;" :rules="rules" label-position="top" ref="searchForm">
        <el-row :gutter="10">
                    <el-col :span="3">
                        <el-form-item label="分票单位" class="grid-content" prop="params.orderCategory">
													<el-select size="mini" filterable clearable 
													v-model="orderInfo.params.fromUnit"
													placeholder=""
													value-key="unitName"
                          @focus="clearType"
													@change="gettickeType"
													ref="unitName"
            							:loading="loading">
													<el-option
													 v-for="(item, index) in sourceUnits"
													:key="index"
													:label="item.label"
													:value="item.value"
													></el-option>
													</el-select>
												</el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="票证类型" class="grid-content" prop="params.orderCategory">
													<el-select size="mini" placeholder="" filterable clearable 
                          v-model="orderInfo.params.orderCategory"
                              value-key="orderCategory"
                              ref="orderCategory"
                              @focus="clearLink"
                              @change="getprefix"
                              :loading="loading">
                              <el-option
                              v-for="(item, index) in ticketTypes"
                              :key="item.label"
                              :label="item.label"
                              :value="item.label"
                              ></el-option>
                          </el-select>
												</el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="票证源单位" class="grid-content" prop="params.linkPrefix">
													<el-select size="mini" placeholder="" filterable clearable 
                           v-model="orderInfo.params.linkPrefix"
                               value-key="linkPrefix"
                              ref="linkPrefix"
                              @focus="clearNum"
                              @change="getpre"
                              :loading="loading">
                              	<el-option
												 v-for="(item, index) in prefixTics"
												:key="index"
												:label="item.label"
												:value="item.value"
												></el-option>
                          </el-select>
												</el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="单号前缀" class="grid-content" prop="params.orderPrefix" >
                        <el-input size="mini" id="yinye" v-model="orderInfo.params.orderPrefix" :disabled="true" placeholder="单号前缀"></el-input>
                        </el-form-item>
                    </el-col>
										<el-col :span="4">
                        <el-form-item label="起始号段" class="grid-content" prop="params.startNum">
                        <el-input size="mini" id="yinye" @blur="countOrderNum" @focus="clearALL" @change="smaJudge" v-model="orderInfo.params.startNum" placeholder="起始号段" ref="startNum"></el-input>
                        </el-form-item>
                    </el-col>
										<el-col :span="4">
                        <el-form-item label="终止号段" class="grid-content" prop="params.endNum">
                        <el-input size="mini" id="yinye" @blur="endcountOrderNum" @change="judge" v-model="orderInfo.params.endNum" placeholder="终止号段" ref="endNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label="合计" class="grid-content" prop="params.endNum">
                        <el-input size="mini" id="yinye" :disabled="true" v-model="orderInfo.params.orderCount" placeholder="终止号段"></el-input>
                        </el-form-item>
                    </el-col>
					
       </el-row>
</el-form>
		<div align="center" class="button" style="margin-top:35px;">
			<el-button type="primary" class="save" size="small" @click="save">确认分领</el-button>
		</div>
</div>
</template>
<script>
import { storageOpe, sourceUnit, tickeType, divisionTicket, prefixTicket } from "../../service"
const { Decimal } = require("../../utils/count.js")
import { getTime } from "../../utils/time.js"
import { mapState } from "vuex"

import rules from "@/mode/rulesData"
import { isnumRequired ,regThreeCode} from "@/mode/ruleMethods" //校验

export default {
  data() {
    return {
      title: "票证分领",
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
      tableData: [{}, {}, {}, {}],
      total: "",
      orderInfo: {
        params: {
          fromUnit: "",
          orderCategory: "",
          orderCount: "",
          startNum: "",
          endNum: "",
          orderPrefix: "",
          toUnit: "",
          claimer: "",
          claimTime: "",
        },
        linkPrefix: "",
        timeValue: "",
      },
      getWeight: "",
      getvolume: "",
      rules: {
        //查询区
        ...rules,
        "params.startNum": [{ validator: isnumRequired }],
        "params.endNum": [{ validator: isnumRequired }],
      },
    }
  },
  watch: {
    $route() {
      this.load()
    },
  },
  mounted() {
    this.type = this.$route.params.type
    this.load()
  },
  methods: {
    clearALL() {
      this.orderInfo.params.startNum = ""
      this.orderInfo.params.orderCount = ""
      this.orderInfo.params.endNum = ""
    },
    countOrderNum() {
      let regx = /^\d{7}$/
      let n = this.orderInfo.params.startNum
      if (regx.test(n) && this.orderInfo.params.orderCategory === "航空运单") {
        this.orderInfo.params.startNum = n + (~~n % 7 + "")
      }
    },
    endcountOrderNum() {
      let regx = /^\d{7}$/
      let n = this.orderInfo.params.endNum
      if (regx.test(n) && this.orderInfo.params.orderCategory === "航空运单") {
        this.orderInfo.params.endNum = n + (~~n % 7 + "")
      }
    },
    smaJudge() {
      if (this.orderInfo.params.orderCategory === "航空运单") {
        if (this.orderInfo.params.startNum < 0 || this.orderInfo.params.startNum.length > 7) {
          this.$message("请输入8位以内的正整数号段")
          this.orderInfo.params.startNum = ""
          this.$refs["startNum"].focus()
        } else if (this.orderInfo.params.orderCategory === "航空运单") {
          if (this.orderInfo.params.startNum.length < 7) {
            this.$message("请输入正确的7位单号")
            this.$refs["startNum"].focus()
          }
        }
      } else {
        if (this.orderInfo.params.startNum.length < 8) {
          this.$message("请输入正确的8位单号")
          this.$refs["startNum"].focus()
        }
      }
    },
    judge() {
      if (this.orderInfo.params.startNum) {
        if (this.orderInfo.params.endNum < this.orderInfo.params.startNum) {
          this.orderInfo.params.endNum = ""
          this.$message("终止号段应大于起始号段,请重新填写")
          this.$refs["endNum"].focus()
        } else {
          if (this.orderInfo.params.endNum.length > 7 || this.orderInfo.params.startNum.length > 7) {
            var a = ""
            a = this.orderInfo.params.endNum
            a = a.substring(0, 7)

            var b = ""
            b = this.orderInfo.params.startNum
            b = b.substring(0, 7)

            this.orderInfo.params.orderCount = a - b + 1
            if (this.orderInfo.params.orderCount < 0) {
              this.$message("号段合计不能为负数")
              this.clearALL()
              this.$refs["startNum"].focus()
            }
          } else {
            this.orderInfo.params.orderCount =
              Number(this.orderInfo.params.endNum) - Number(this.orderInfo.params.startNum) + 1
            if (this.orderInfo.params.orderCount < 0) {
              this.$message("号段合计不能为负数")
              this.clearALL()
              this.$refs["endNum"].focus()
            }
          }
        }
      }
    },
    load() {
      this.orderInfo.timeValue = getTime()
      this.orderInfo.params.claimer = this.$getStore("real_name")
      this.$store.commit("CHANGE_TOPTITLE", this.title)
    },
    //领取单位
    getSrorageope() {
      this.orderInfo.params.fromUnit = ""
      this.orderInfo.params.orderCategory = ""
      this.orderInfo.params.orderPrefix = ""
      this.orderInfo.params.orderCount = ""
      this.orderInfo.params.linkPrefix = ""
      this.orderInfo.params.startNum = ""
      this.orderInfo.params.endNum = ""
      //入库操作下拉框
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
      //入库操作下拉框
      // this.sourceAbout(item)
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
      this.tickeType = item.unit_code
    },
    //票证类型
    gettickeType(item) {
      //来源操作下拉框
      this.tickTypAbout(item)
      tickeType({ unit_code: item.unitCode }).then(res => {
        if (res.data.status === 200) {
          this.ticketTypes = res.data.data.map(item => {
            return { value: item.categoryId, label: item.orderType }
          })
        } else {
          this.ticketTypes = []
        }
      })
    },
    //联动前缀
    prefixAbout(item) {},
    getprefix(item) {
      this.prefixAbout(item)
      //单证前缀
      prefixTicket({ orderType: item }).then(res => {
        if (res.data.status === 200) {
          this.prefixTics = res.data.data.map(item => {
            return { value: item.orderPrefix, label: item.unitName }
          })
        } else {
          this.prefixTics = []
        }
      })
    },
    getpre(item) {
      this.orderInfo.params.orderPrefix = item
    },
    save() {
      // 确认入库
      if (
        this.orderInfo.params.claimer &&
        this.orderInfo.params.toUnit &&
        this.orderInfo.params.fromUnit &&
        this.orderInfo.params.startNum
      ) {
        this.orderInfo.params.claimTime = this.orderInfo.timeValue || ""
        divisionTicket({
          ...this.orderInfo.params,
          toUnit: this.orderInfo.params.toUnit.unitName,
          orderPrefix: this.orderInfo.params.orderPrefix,
        }).then(res => {
          if (res.data.status === 200) {
            this.$message({
              message: "票证分领成功",
              type: "success",
            })
          } else {
            this.$message(res.data.message)
          }
        })
      } else {
        this.$message("请完整填写分领信息")
      }
    },
    clearType() {
      this.orderInfo.params.orderCategory = ""
      this.orderInfo.params.orderPrefix = ""
      this.orderInfo.params.orderCount = ""
      this.orderInfo.params.linkPrefix = ""
      this.orderInfo.params.startNum = ""
      this.orderInfo.params.endNum = ""
    },
    clearLink() {
      this.orderInfo.params.orderPrefix = ""
      this.orderInfo.params.orderCount = ""
      this.orderInfo.params.linkPrefix = ""
      this.orderInfo.params.startNum = ""
      this.orderInfo.params.endNum = ""
    },
    clearNum() {
      this.orderInfo.params.orderPrefix = ""
      this.orderInfo.params.orderCount = ""
      this.orderInfo.params.startNum = ""
      this.orderInfo.params.endNum = ""
    },
  },
}
</script>
