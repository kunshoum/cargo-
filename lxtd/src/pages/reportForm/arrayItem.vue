<template><!-- 雷云朵 -->
  <el-col :span="4">
    <el-button type="primary" icon="el-icon-setting" size="mini" @click="setItem">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="visible" width="30%" class="sortItem">
      <div class="sort_box">
        <draggable  v-model = 'sortList'>
          <div  v-for = 'item in sortList' :key="item.report_item_page_id"><i class="el-icon-fa-thumb-tack" aria-hidden="true" ></i> {{item.cn_name}}</div>
        </draggable>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import { saveReportItems } from "../../service"
import draggable from "vuedraggable"
export default {
  props: ["data", "title", "id", "type", "quaryBasis"],
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    sortData() {
      return this.data.map(item => item.report_item_page_id)
    },
    sortList: {
      get() {
        return this.data.map(item => item)
      },
      set(list) {
        // console.log(list)
        this.$emit("updateSort", list)
      },
    },
  },
  components: {
    draggable,
  },
  methods: {
    setItem() {
      this.visible = true
    },
    cancel() {
      this.visible = false
    },
    sure() {
      saveReportItems({
        is_search_head: 1,
        page_id: this.id,
        report_item_page_ids: this.sortData,
        quary_basis_id: this.quaryBasis,
        type: this.type,
      }).then(res => {
        if (res.data.status === 200) {
          this.visible = false
          this.$emit("success")
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
  width: 300px;
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
