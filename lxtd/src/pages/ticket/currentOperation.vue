<!--王艺蒙-->
<template>
<div class="Billing Search">
<i class="el-icon-circle-close closeBilling" @click="backSearch"></i>
  <el-tabs v-model="activeName">
    <el-tab-pane label="勾选操作" name="first">
          <div class="receive_list">
            <el-table :data="tableData" border style="width: 100%" height="180" size="small" >
              <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
              <el-table-column sortable prop="orderPrefix" :formatter="orderFormat" label="单证唯一标识"></el-table-column>
              <el-table-column sortable prop="realityStatus" label="物理状态" :formatter="stateFormat"></el-table-column>
              <el-table-column sortable prop="manageStatus" label="管理状态" :formatter="mangFormat"></el-table-column>
              <el-table-column sortable prop="isClear" label="是否结算"></el-table-column>
              <el-table-column sortable prop="clearingUnit" label="结算单位"></el-table-column>
              <el-table-column sortable prop="currentOwner" label="当前责任人"></el-table-column>
              <el-table-column sortable prop="currentUnit" label="所在单位"></el-table-column>
              <el-table-column sortable prop="inTime" label="入库时间"></el-table-column>
              <el-table-column sortable prop="fromUnit" label="单证来源单位"></el-table-column>
            </el-table>
          </div>
          <el-form :model="opInfo" style="margin-top:35px;" class="demo-form-inline search_form" label-position="top" ref="searchForm">
            <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="物理操作" class="grid-content" prop="params.realityStatus">
                <el-select size="mini" @change="manisVal" v-model="opInfo.params.realityStatus" placeholder="">
                  <el-option label="作废" value="2"></el-option>
                  <el-option label="取消作废" value="5"></el-option>
                  <el-option label="丢失" value="3"></el-option>
                  <el-option label="损坏" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="管理操作" class="grid-content" prop="params.manageStatus">
                    <el-select size="mini" @change="opeisVal" v-model="opInfo.params.manageStatus" placeholder="">
                      <el-option label="外部返单" value="9"></el-option>
                      <el-option label="取消外部返单" value="15"></el-option>
                      <el-option label="外部退库" value="10"></el-option>
                      <el-option label="取消外部退库" value="16"></el-option>
                      <el-option label="外部销号" value="11"></el-option>
                      <el-option label="取消外部销号" value="17"></el-option>
                      <el-option label="取消内部返单" value="12"></el-option>
                      <el-option label="内部退库" value="7"></el-option>
                      <el-option label="取消内部退库" value="13"></el-option>
                      <el-option label="内部销号" value="8"></el-option>
                      <el-option label="取消内部销号" value="14"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="票证现在地" class="grid-content" prop="params.currentUnit">
                <el-input size="mini" v-model="opInfo.params.currentUnit" placeholder="票证现在地"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="票证操作目的地" class="grid-content" prop="params.destUnit">
                <el-input size="mini" v-model="opInfo.params.destUnit" placeholder="票证操作目的地"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                        <el-form-item label="备注" class="grid-content" prop="params.opDesc">
                        <el-input type="textarea" :readonly="isRead1" v-model="opInfo.params.opDesc" v-on:input='opstringLength'
                        :rows="2" size="mini" 
                        placeholder="" class="operateion"></el-input>
                        </el-form-item>
            </el-col>
        </el-row>
          </el-form>
          <div class="btn_wrap">
            <el-row>
              <el-col :span="6" :offset="10">
              <div class="grid-content bg-purple">
                <el-button type="primary" size="mini" @click="sureOpera">确认操作</el-button>
              </div>
              </el-col>
            </el-row>
          </div>
    </el-tab-pane>
    <el-tab-pane label="连号操作" name="second">
    <el-form :model="numberInfo" class="demo-form-inline search_form simple_form" label-position="top" :rules="rules" ref="searchForm">
        <el-row :gutter="10">
            <el-col :span="4">
                <el-form-item label="单证类型" class="grid-content" prop="params.orderCategory">
                    <el-select size="mini" v-model="numberInfo.params.orderCategory" placeholder="">
                      <el-option label="航空运单" value="航空运单"></el-option>
                      <el-option label="分单" value="分单"></el-option>
                      <el-option label="民航快递单" value="民航快递单"></el-option>
                      <el-option label="邮单" value="邮单"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="单号前缀" class="grid-content" prop="params.orderPrefix">
                <el-input size="mini" v-model="numberInfo.params.orderPrefix" placeholder="单号前缀"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="起始号段" class="grid-content" prop="params.startNum">
                <el-input size="mini" v-model="numberInfo.params.startNum" placeholder="起始号段"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="终止号段" class="grid-content" prop="params.endNum">
                <el-input size="mini" @change="judge" v-model="numberInfo.params.endNum" placeholder="终止号段"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <el-form :model="opInfo" style="margin-top:35px;" class="demo-form-inline search_form" label-position="top" ref="searchForm">
        <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="物理操作" class="grid-content" prop="params.realityStatus">
                <el-select size="mini" @change="manisVals" v-model="numberInfo.params.realityStatus" placeholder="">
                  <el-option label="作废" value="2"></el-option>
                  <el-option label="取消作废" value="5"></el-option>
                  <el-option label="丢失" value="3"></el-option>
                  <el-option label="损坏" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="管理操作" class="grid-content" prop="params.manageStatus">
                    <el-select size="mini" @change="opeisVals" v-model="numberInfo.params.manageStatus" placeholder="">
                      <el-option label="外部返单" value="9"></el-option>
                      <el-option label="取消外部返单" value="15"></el-option>
                      <el-option label="外部退库" value="10"></el-option>
                      <el-option label="取消外部退库" value="16"></el-option>
                      <el-option label="外部销号" value="11"></el-option>
                      <el-option label="取消外部销号" value="17"></el-option>
                      <el-option label="取消内部返单" value="12"></el-option>
                      <el-option label="内部退库" value="7"></el-option>
                      <el-option label="取消内部退库" value="13"></el-option>
                      <el-option label="内部销号" value="8"></el-option>
                      <el-option label="取消内部销号" value="14"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="票证现在地" class="grid-content" prop="params.currentUnit">
                <el-input size="mini" v-model="numberInfo.params.currentUnit" placeholder="票证现在地"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="票证操作目的地" class="grid-content" prop="params.destUnit">
                <el-input size="mini" v-model="numberInfo.params.destUnit" placeholder="票证操作目的地"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                        <el-form-item label="备注" class="grid-content" prop="params.opDesc">
                        <el-input type="textarea" :readonly="isRead" v-model="numberInfo.params.opDesc" v-on:input='stringLength'
                        :rows="2" size="mini" 
                        placeholder="" class="operateion"></el-input>
                        </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div class="btn_wrap">
        <el-row>
          <el-col :span="6" :offset="10">
          <div class="grid-content bg-purple">
            <el-button type="primary" size="mini" @click="numberOpera">确认操作</el-button>
          </div>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
  </el-tabs>
      
</div>
</template>
<script>
import { tickeSearch, ticketOpera } from "../../service"
import { mapState } from "vuex"

import rules from "@/mode/rulesData"
import { isnumRequired , regThreeCode} from "@/mode/ruleMethods" //校验
export default {
  data() {
    return {
      type: "",
      activeName: "first",
      title: "票证操作",
      orderNo: "",
      tableData: [],
      searchInfo: {
        params: {
          orderIds: [],
          currPage: 1,
          pageSize: 10,
        },
      },
      isRead1: false,
      isRead: false,
      opInfo: {
        params: {
          opDesc: "",
          currentUnit: "",
          destUnit: "",
          realityStatus: "",
          manageStatus: "",
        },
      },
      numberInfo: {
        params: {
          orderCategory: "",
          orderPrefix: "",
          startNum: "",
          endNum: "",
          opDesc: "",
          currentUnit: "",
          destUnit: "",
          realityStatus: "",
          manageStatus: "",
        },
      },
      total: "",
      orderJson: [],
      rules: {
        //查询区
        ...rules,
        // "params.orderPrefix": [{required: true, validator: regThreeCode }],
        "params.startNum": [{required: true, validator: isnumRequired }],
        "params.endNum": [{required: true, validator: isnumRequired }],
      },
    }
  },
  watch: {
    $route() {
      this.load()
    },
  },
  computed: {
    ...mapState(["idList"]),
  },
  mounted() {
    this.load()
  },
  methods: {
    judge() {
      if (this.numberInfo.params.startNum) {
        if (this.numberInfo.params.endNum <= this.numberInfo.params.startNum) {
          this.numberInfo.params.endNum = ""
          this.$message("终止号段应大于起始号段,请重新填写")
        }
      }
    },
    stringLength() {
      if (this.numberInfo.params.opDesc.length >= 200) {
        this.$message("备注内容限定输入200字以内！")
        this.isRead = true
      }
    },
    opstringLength() {
      if (this.opInfo.params.opDesc.length >= 200) {
        this.$message("备注内容限定输入200字以内！")
        this.isRead1 = true
      }
    },
    manisVal() {
      if (this.opInfo.params.realityStatus) {
        this.opInfo.params.manageStatus = ""
      }
    },
    opeisVal() {
      if (this.opInfo.params.manageStatus) {
        this.opInfo.params.realityStatus = ""
      }
    },
    manisVals() {
      if (this.numberInfo.params.realityStatus) {
        this.numberInfo.params.manageStatus = ""
      }
    },
    opeisVals() {
      if (this.numberInfo.params.manageStatus) {
        this.numberInfo.params.realityStatus = ""
      }
    },
    backSearch() {
      this.$router.push(`/ticket/management`)
    },
    load() {
      this.opInfo.params.realityStatus = "2"
      this.numberInfo.params.realityStatus = "2"
      this.numberInfo.params.orderCategory = "航空运单"
      this.searchInfo.params.orderIds = this.idList
      if (this.idList.length > 0) {
        this.activeName = "first"
      } else {
        this.activeName = "second"
      }
      this.$store.commit("CHANGE_TOPTITLE", this.title)
      this.search()
      this.stringLength()
      this.opstringLength()
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    orderFormat(row, column, cellValue) {
      let stateArr = row.orderPrefix + row.orderNo
      return (cellValue = stateArr)
    },
    stateFormat(row, column, cellValue) {
      let stateArr = ["未用", "已用", "作废", "丢失", "破损"]
      return stateArr[cellValue]
    },
    mangFormat(row, column, cellValue) {
      let stateArr = ["内部返单", "内部退库", "内部销号", "外部返单", "外部退库", "外部销号"]
      return stateArr[cellValue]
    },
    reset() {
      this.$refs["searchForm"].resetFields()
    },
    search() {
      if (this.idList.length > 0) {
        tickeSearch({ ...this.searchInfo.params }).then(res => {
          if (res.data.status === 200) {
            this.tableData = res.data.data[0].list
            this.total = res.data.data[0].total
            const jsonArr = []
            for (var value of res.data.data[0].list) {
              var obj = {}
              obj.orderPrefix = value.orderPrefix
              obj.orderNo = value.orderNo
              jsonArr.push(obj)
            }
            this.orderJson = jsonArr
          } else {
            this.tableData = []
          }
        })
      }
    },
    sureOpera() {
      if (this.idList.length > 0) {
        if (this.opInfo.params.currentUnit) {
          if ((this.opInfo.params.realityStatus && this.opInfo.params.destUnit) || this.opInfo.params.manageStatus) {
            ticketOpera({ ...this.opInfo.params, orderParams: this.orderJson }).then(res => {
              if (res.data.status === 200) {
                this.$alert(res.data.message, "操作信息", {
                  dangerouslyUseHTMLString: true,
                }).then(() => {
                  this.$router.push(`/ticket/management`)
                })
              } else {
                this.$message(res.data.message)
              }
            })
          } else {
            this.$message("请输入票证操作目的地")
          }
        } else {
          this.$message("请输入票证现在地")
        }
      } else {
        this.$message("请在票证管理界面勾选需要进行操作的票证")
      }
    },
    numberOpera() {
      if (this.numberInfo.params.orderPrefix && this.numberInfo.params.startNum && this.numberInfo.params.currentUnit) {
        if (
          (this.numberInfo.params.realityStatus && this.numberInfo.params.destUnit) ||
          this.numberInfo.params.manageStatus
        ) {
          ticketOpera({ ...this.numberInfo.params }).then(res => {
            if (res.data.status === 200) {
              this.$alert(res.data.message, "操作信息", {
                dangerouslyUseHTMLString: true,
              }).then(() => {
                this.$router.push(`/ticket/management`)
              })
            } else {
              this.$message(res.data.message)
            }
          })
        } else {
          this.$message("请输入票证操作目的地")
        }
      } else {
        this.$message("请完整记录操作信息")
      }
    },
  },
}
</script>

<style lang="less">
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
  .el-message-box {
    height: 250px;
    overflow: scroll;
  }
}
.search_form {
  border-bottom: 1px solid #d8dce5;
}

.simple_form {
  height: 180px;
}
.btn_wrap {
  margin-bottom: 10px;
}
.operateion {
  border-color: #d8dce5 !important;
}
</style>
