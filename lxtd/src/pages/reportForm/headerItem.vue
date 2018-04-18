<template><!-- 雷云朵 -->
  <el-col :span="4">
    <el-button type="primary" icon="el-icon-setting" size="mini" @click="setItem">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="visible" :before-close="close">
      <el-checkbox-group v-model="checkList" class="checkboxWrap">
        <el-checkbox 
        class="checkItem"
        v-for="item in data"
        :key="item.report_item_page_id"
        :label="item.report_item_page_id"
        >{{item.cn_name}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="onclick" size="mini">全 选</el-button> -->
        <el-button @click="close" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import { saveReportItems } from "../../service"
export default {
  props: ["data", "title", "id", "type", "quaryBasis"],
  data() {
    return {
      visible: false,
      checkList: [],
    }
  },
  watch: {
    data() {
      this.getCheckList()
    },
  },
  methods: {
    getCheckList() {
      this.checkList = this.data
        .filter(item => {
          return item.is_search_head === 0
        })
        .map(item => item.report_item_page_id)
    },
    setItem() {
      this.getCheckList()
      // console.log(this.data)
      // console.log(this.checkList)
      this.visible = true
    },
    close() {
      this.visible = false
      this.getCheckList()
    },
    sure() {
      saveReportItems({
        quary_basis_id: this.quaryBasis,
        is_search_head: this.title === "设置查询条件" ? 0 : 1,
        page_id: this.id,
        report_item_page_ids: this.checkList,
        type: this.type,
      }).then(res => {
        if (res.data.status === 200) {
          this.report_item_page_ids = res.data
          this.visible = false
          this.$emit("success")
        }
      })
    },
    onclick() {
      
    },
  },
}
</script>

<style lang="less">
.checkboxWrap {
  overflow: hidden;
  .checkItem {
    width: 150px;
    margin-left: 0px;
  }
}
</style>
