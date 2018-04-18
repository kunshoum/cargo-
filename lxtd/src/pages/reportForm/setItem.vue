<template>
  <el-col :span="5">
    <el-button type="primary" icon="el-icon-setting" size="mini" @click="setItem">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="visible">
      <el-checkbox-group v-model="checkList" class="checkboxWrap">
        <el-checkbox 
        class="checkItem"
        v-for="item in data"
        :key="item.id"
        :label="item.id"
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import { saveReportSet } from "../../service"
export default {
  props: ["data", "title", "id"],
  data() {
    return {
      visible: false,
      checkList: [],
    }
  },
  methods: {
    getCheckList() {
      // 获取设置数据中的选中项，赋值给绑定的checkList
      this.checkList = this.data
        .filter(item => {
          return !item.isSelect
        })
        .map(item => item.id)
    },
    setItem() {
      this.getCheckList()
      this.visible = true
    },
    isChecked(id) {
      return this.checkList.some(item => item === id)
    },
    changeData() {
      this.data.forEach(item => {
        if (this.isChecked(item.id)) {
          item.isSelect = 0
        } else {
          item.isSelect = 1
        }
      })
    },
    cancel() {
      this.visible = false
      this.getCheckList()
    },
    sure() {
      saveReportSet({ pageId: this.id, ids: this.checkList, showType: this.title === "设置查询条件" ? 0 : 1 }).then(res => {
        if (res.data.status === 200) {
          this.changeData()
          this.visible = false
        }
      })
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
