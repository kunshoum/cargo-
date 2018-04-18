<!--王艺蒙-->
<template>
  <el-col :span="4">
    <el-button type="primary" icon="el-icon-setting" size="mini" @click="reportSave">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="visible">
      <el-checkbox-group v-model="checkList" class="checkboxWrap">
        <el-checkbox 
        class="checkItem"
         v-for="item in data"
         v-if="item.name != '单据类型'"
        :key="item.id"
        :label="item.id"
        >{{item.name}}
        </el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="no" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import { setReport } from "../../service"
export default {
  props: ["data", "title", "id", "type", "collectId"],
  data() {
    return {
      visible: false,
      checkList: [],
    }
  },
  mounted() {
    this.allChec()
  },
  methods: {
    allChec() {
      this.checkList = this.data
        .filter(item => {
          return item.isSelect === 0
        })
        .map(item => item.id)
    },
    reportSave() {
      this.allChec()
      this.visible = true
    },
    Xuan(id) {
      return this.checkList.some(item => item === id)
    },
    // render() {
    //   this.data.forEach(item => {
    //     if (this.Xuan(item.id)) {
    //       item.isSelect = 1
    //     } else {
    //       item.isSelect = 0
    //     }
    //   })
    // },
    no() {
      this.visible = false
      this.allChec()
    },
    sure() {
      setReport({
        pageId: this.id,
        itemIds: this.checkList,
        type: this.type,
        collectId: this.collectId,
        itemType: this.title === "设置查询条件" ? 0 : 1,
      }).then(res => {
        if (res.data.status === 200) {
          //this.render() // renderPage
          this.itemIds = res.data
          this.visible = false
          this.$emit("success")
        }
      })
    },
  },
}
</script>
<style lang="less">
.checkboxWrap {
  overflow: hidden !important;
  .checkItem {
    width: 170px !important;
    margin-left: 0px !important;
  }
}
</style>