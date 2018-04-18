<template>
  <el-col :span="5" :offset="1">
    <el-button type="primary" icon="el-icon-setting" size="mini" @click="setItem">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="visible" width="30%" class="sortItem">
      <div class="sort_box">
        <p 
        class="checkItem"
        v-for="item in data"
        v-dragging="{ item: item, list: data, group: 'item' }"
        v-if="(item.isSelect == 0)"
        :key="item.id"
        :label="item.id"
        ><i class="el-icon-fa-thumb-tack" aria-hidden="true" ></i>{{item.name}}</p>
      </div>
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
  props: ["data", "title"],
  data() {
    return {
      visible: false,
      checkList: [],
    }
  },
  methods: {
    getCheckList() {
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
    cancel() {
      this.visible = false
      this.getCheckList()
    },
    sure() {
      console.log(this.data)
      this.$message("无保存顺序接口")
      this.visible = false
    },
  },
}
</script>

<style lang="less" >
.sort_box {
  height: 290px;
  overflow-y: auto;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.sortItem .el-dialog__body {
  width: 100px;
}
.sortItem .el-dialog {
  height: 500px;
  overflow: hidden;
}
.el-icon-fa-thumb-tack {
  padding: 0 10px;
  color: #409eff;
}
</style>
