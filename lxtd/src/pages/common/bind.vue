/**
 * 马少良
 */
 
<template>
  <div class="Bind billing_common">
    <el-row :gutter="30" class="head_info">
      <el-col :span="12">
        <div class="bind_info">
          <span>当前单号: {{orderNo || '_'}}</span>
          <span>共 {{sumPiece || '_'}} 件</span>
          <span>已拼出 {{bindedPiece || '_'}} 件</span>
          <span>剩余 {{bindedPiece ? remainPiece : (remainPiece || '_')}} 件</span>
          <el-tag v-if="bindInfo" :type="bindInfo.state">{{bindInfo.text}}</el-tag>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bind_search_item billing_common_button">
          <span>拼单筛选条件:</span>
          <el-tag v-for="item in filterItems" class="filter_item" :key="item.key" size="mini">{{item.name}}</el-tag>
          <el-button type="primary" size="mini" style="float: right" @click="setFilterItem">设置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="table_wrap">
      <el-col :span="12">
        <el-card>
          <div class="card_line"></div>
          <div slot="header" class="bindTableHead">
            <span class="title">可选销售单</span>
            <el-input
              style="width:auto;"
              size="mini"
              placeholder="请输入单号查询"
              prefix-icon="el-icon-search"
              v-model="bindOrder">
            </el-input>
            <el-button style="padding: 3px 0" type="text" @click="allToRight">到已选</el-button>
          </div>
          <el-table :data="leftList" border height="355" size="mini"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          @selection-change="selectLeft">
            <el-table-column type="selection" width="48"></el-table-column>
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="操作" width="68">
              <template slot-scope="scope">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="toRight(scope.row)"></el-button>
              </template>
            </el-table-column>
            <el-table-column prop="order_no" label="单号" width="120" v-if="orderType !== 0"></el-table-column>
            <el-table-column prop="order_no" label="单号" width="120"
            v-if="orderType === 0"></el-table-column>
            <el-table-column prop="easy_flag" label="状态"
            :filters="[{ text: '已开单', value: 'number' }, { text: '未开单', value: 'object' }]"
            :filter-method="filterState"
            filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.easy_flag !== null ? 'primary' : 'warning'"
                  close-transition>{{scope.row.easy_flag !== null ? '已开单' : '未开单'}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="card_line"></div>
          <div slot="header" class="bindTableHead">
            <span class="title">已选销售单</span>
            <el-input
              style="width:auto;"
              size="mini"
              placeholder="请输入单号查询"
              prefix-icon="el-icon-search"
              v-model="bindedOrder">
            </el-input>
            <el-button style="padding: 3px 0" type="text" @click="allToLeft">取消选择</el-button>
          </div>
          <el-table :data="rightList" border height="355" size="mini"
          element-loading-background="rgba(0, 0, 0, 0.8)"
           @selection-change="selectRight">
            <el-table-column type="selection" width="48" fixed></el-table-column>
            <el-table-column type="index" label="序号" fixed  width="55"></el-table-column>
            <el-table-column label="操作" width="68" fixed>
              <template slot-scope="scope">
                <el-button type="danger" plain icon="el-icon-minus" size="mini" @click="toLeft(scope.row)"></el-button>
              </template>
            </el-table-column>
            <el-table-column prop="order_no" label="单号" width="120" fixed v-if="orderType !== 0"></el-table-column>
            <el-table-column prop="order_no" label="单号" width="120" fixed
            v-if="orderType === 0"></el-table-column>
            <el-table-column prop="easy_flag" label="状态"
            :filters="[{ text: '已开单', value: 'number' }, { text: '未开单', value: 'object' }]"
            :filter-method="filterState"
            filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.easy_flag !== null ? 'primary' : 'warning'"
                  close-transition>{{scope.row.easy_flag !== null ? '已开单' : '未开单'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="add_quantity" label="分配件数">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.quantity" @change="countBindInfo" @blur="testNum(num)"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-dialog title="设置筛选条件" :visible.sync="visible">
        <el-checkbox-group v-model="checkList" class="checkboxWrap">
          <el-checkbox 
          class="checkItem"
          v-for="item in filterList"
          :key="item.en_name"
          :label="item.en_name"
          :disabled = "(item.en_name === 'departure' || item.en_name === 'destination') ? true : false"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel" size="mini">取 消</el-button>
          <el-button type="primary" @click="sure" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-row type="flex" justify="center" class="back_detail">
      <el-button type="primary" size="small" class="save" @click="backDetail">保存并返回开单明细</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { searchBindList, bindFilterItem, saveBindFilterItem, } from "@/service"
const { Decimal } = require("@/utils/count")

export default {
  data() {
    return {
      list: [],
      leftSelected: [],
      rightSelected: [],
      type: "main",
      orderInfo: "",
      bindedPiece: "", // 已拼总件数
      bindedWeight: "", // 已拼总重量
      bindOrder: "", // 筛选用单号
      bindedOrder: "", // 筛选用单号
      filterList: [],
      checkList: [],
      visible: false,
    }
  },

  mounted() {
    this.type = this.$route.params.type
    if (this.type === "main") {
      this.headTitle = ["可选分单", "已选分单"]
    } else {
      this.headTitle = ["可选主单", "已选主单"]
    }
    this.countBindInfo()
    this.getBindFilterItem()
  }, 

  computed: {
    ...mapState(["orderNo", "sumPiece", "orderType", "allBindList"]),
    leftList() {  // 筛选出所有可选单
      return this.allBindList.filter(item => {
        return item.bind_status === 0 && item.order_no.indexOf(this.bindOrder) > -1
      })
    },
    rightList() { // 筛选出所有已选单
      return this.allBindList.filter(item => {
        return item.bind_status === 1 && item.order_no.indexOf(this.bindedOrder) > -1
      })
    },
    remainPiece() { // 剩余未拼件数
      return this.sumPiece - this.bindedPiece
    },
    bindInfo() {
      if(!this.sumPiece) {
        return
      }

      if (this.remainPiece > 0) {
        return { state: "warning", text: "未拼完" }
      }

      if (this.remainPiece < 0) {
        this.$notify({
          title: "警告",
          message: "拼单件数已超出当前单件数",
          type: "warning",
        })
        return { state: "danger", text: "已超出" }
      }

      if (this.remainPiece === 0) {
        this.$notify({
          title: "成功",
          message: "当前单已拼完",
          type: "success",
        })
        return { state: "success", text: "已拼完" }
      }
    },
    filterItems() {
      return this.filterList.filter(item => {
        return item.is_select
      })
    },
  },  

  watch: {
    rightList() {
      this.countBindInfo()
    },
    "$route.params.item"(val, odlVal) { // 离开当前页时保存操作数据
      if (odlVal === "bind" && val !== "bind") {
        this.$store.commit("GET_ALLBINDLIST", this.allBindList)
      }
    },
  },

  methods: {
    getBindFilterItem() {
      bindFilterItem().then(res => {
        if(res.data.status === 200) {
          this.filterList = res.data.data
          this.checkList = this.filterItems.map(item => {
            return item.en_name
          })
        }
      })
    },
    setFilterItem() {
      this.visible = true
    },
    cancel() {
      this.visible = false
      this.checkList = this.filterItems.map(item => {
        return item.en_name
      })
    },
    sure() {
      let joint_cargo_item_ids = this.filterList.filter(item => new Set(this.checkList).has(item.en_name))
      .map(item => item.joint_cargo_item_id)

      saveBindFilterItem({ joint_cargo_item_ids: joint_cargo_item_ids }).then(res => {
        if(res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: "设置成功",
            type: "success",
          })
        }
      })

      this.filterList.forEach(item => {
        if(new Set(this.checkList).has(item.en_name)) {
          item.is_select = 1
        }else {
          item.is_select = 0
        }
      })
      this.$store.commit("CHANGE_BINDFILTER", this.checkList)
      this.visible = false
    },
    notDone() {
      if(this.rightList.length === 1 && !this.rightList[0].quantity) {
        return
      }

      if (this.remainPiece > 0) {
        this.$notify({
          title: "警告",
          message: "当前单未拼完",
          type: "warning",
        })
      }
    },
    backDetail() {
      this.notDone()
      this.$router.push({ params: { item: "detail" }, query: { from: "bind" } })
    },
    getBindedOrder() {  // 获得已拼单数据,加入输入的件数
      let len = this.rightList.length
      let orderList =
        len > 1
          ? this.rightList.map(item => {
              let quantity = (item.quantity || 0) * 1
              return `${item.order_no}(${quantity})`
            })
          : this.rightList.map(item => {
              let quantity = (item.quantity || 0) * 1
              if (quantity * 1 === this.sumPiece * 1) {
                return item.order_no
              } else if(!quantity) {
                return item.order_no
              } else {
                return `${item.order_no}(${quantity})`
              }
            })
      this.$store.commit("GET_BINDORDER", orderList.join("/"))
    },
    testNum(num) {
      let numberRegx = /^\d*$/
      if(!numberRegx.test(num)) {
        this.$notify({
          title: "警告",
          message: "请输入整数",
          type: "warning",
        })
      }
    },
    countBindInfo(num) {
      this.getBindedOrder()
      // 计算已拼单合计
      let sumInfo = this.rightList.reduce(
        (item1, item2) => {
          let sumPiece = item1.quantity * 1 + item2.quantity * 1
          return { quantity: sumPiece }
        },
        { quantity: 0 },
      )

      this.bindedPiece = sumInfo.quantity
      this.$store.commit("CHANGE_BINDEDPIECE", this.bindedPiece)
    },
    filterState(value, row) {
      return typeof row.easy_flag === value
    },  
    // filterType(value, row) {
    //   return row.order_no.slice(0, 3) === value
    // },
    toRight(row) {
      row.bind_status = 1
    },
    toLeft(row) {
      row.bind_status = 0
    },
    selectLeft(list) {
      this.leftSelected = list
    },
    selectRight(list) {
      this.rightSelected = list
    },
    allToRight() {
      this.leftSelected.forEach(item => {
        item.bind_status = 1
      })
    },
    allToLeft() {
      this.rightSelected.forEach(item => {
        item.bind_status = 0
      })
    },
  },
}
</script>

<style lang="less">
.Bind {
  .bind_info {
    height: 35px;
    margin-bottom: 10px;
    span {
      display: inline-block;
      margin-right: 10px;
    }
  }

  .table_wrap {
    margin-bottom: 32px;
  }
  .bindTableHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .filter_item {
    margin: 0 3px;
  }
}
</style>
