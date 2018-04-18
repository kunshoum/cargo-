<!--王艺蒙-->
<template>
  <el-col :span="4">
    <el-button type="primary" icon="el-icon-setting" size="mini" @click="reportSave">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="visible"  width="30%" class="sortItem">
      <div class="sort_box">
        <draggable  v-model = 'sortList'>
          <div  v-for = 'item in sortList' :key="item.id" :label="item.id"><i class="el-icon-fa-thumb-tack" aria-hidden="true" ></i> {{item.name}}</div>
        </draggable>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="no" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import { setReport } from "../../service"
import draggable from "vuedraggable"
export default {
  props: ["data", "title", "id", "type","collectId"],
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    sortItem() {
      return this.data.map(item => item.id)
    },
    sortList: {
      get() {
        return this.data.map(item => item)
      },
      set(list) {
        this.$emit("updateSort", list)
      },
    },
  },

  components: {
    draggable,
  },
  mounted() {},
  methods: {
    reportSave() {
      this.visible = true
    },
    no() {
      this.visible = false
    },
    sure() {
      setReport({ pageId: this.id, itemIds: this.sortItem, itemType: 1, type: this.type,
        collectId: this.collectId, }).then(res => {
        if (res.data.status === 200) {
          this.visible = false
          this.$emit("success")

          // window.location.reload()
        }
      })
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
  width: 200px;
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
