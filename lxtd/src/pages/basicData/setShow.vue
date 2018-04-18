/**
 * 马少良
 */
 
<template>
  <el-col :span="5">
    <el-dialog :title="title" :visible.sync="visible" :before-close="close">
      <el-checkbox-group v-model="checkList" class="basicSet">
        <el-checkbox 
        class="checkItem"
        v-for="item in data"
        :key="item.value"
        :label="item.value"
        >{{item.key}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import { saveBasicSet } from "@/service"
export default {
  props: ["visible", "data", "title", "id"],
  data() {
    return {
      
    }
  },
  computed: {
    checkList: {
      get() {
        return this.data
          .filter(item => {
            return !item.is_show
          })
          .map(item => item.value)
      },
      set(val) {
        this.$emit("updateShowData", val)
      }
    }
  },
  methods: {
    close() {
      this.$emit('cancelShowSet')
      this.$emit('close')
    },
    cancel() {
      this.close()
    },
    params() {
      let tableAltList = this.data.map(item => {
        return {
          en_name: item.value,
          is_show: item.is_show,
        }
      })
      return {
        page_id: this.id,
        tableAltList,
      }
    },
    sure() {
      saveBasicSet(this.params()).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: '设置成功',
            type: "success",
          })
          this.$emit('close')
          this.$emit('setSuccess')
        }
      })
    },
  },
}
</script>

<style lang="less">
.basicSet {
  overflow: hidden;
  .checkItem {
    width: 150px !important;
    margin-left: 0px;
  }
}
</style>
