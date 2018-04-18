<template>
<!-- 雷云朵 -->
  <el-button-group>
    <el-button type="primary" icon="el-icon-view" size="mini" @click="viewDetail"></el-button>
    <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
    <el-button type="primary" icon="el-icon-tickets" size="mini"></el-button>
    <el-dialog title="订舱详情" :visible.sync="visible" append-to-body>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="visible = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-button-group>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      viewDetail() {
        this.visible = true
      }
    }
  }
</script>

<style lang="less">
  .checkboxWrap {
    overflow: hidden;
  }
</style>
