<template>
  <el-col :span="5">
    <el-button type="primary" size="mini" @click="clear">{{title}}</el-button>
    <el-dialog :title="title + '详情'" :visible.sync="visible">
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
        <el-row :gutter="10">
          <el-col :span="6" width="180">
                <el-form-item label="合计总金额" class="grid-content break_line"  width="180" prop="params.orderNo">
                  <el-col>
                    <el-form-item prop="">
                    <el-input size="mini" v-model="searchInfo.params.orderNo" placeholder="合计总金额"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6" width="180">
                <el-form-item label="实付金额" class="grid-content break_line"  width="180" prop="params.orderNo">
                  <el-col>
                    <el-form-item prop="">
                    <el-input size="mini" v-model="searchInfo.params.orderNo" placeholder="实付金额"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6" width="180">
                <el-form-item label="合计.." class="grid-content break_line"  width="180" prop="params.orderNo">
                  <el-col>
                    <el-form-item prop="">
                    <el-input size="mini" v-model="searchInfo.params.orderNo" placeholder="合计总金额"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6" width="180">
                <el-form-item label="实付金额..." class="grid-content break_line"  width="180" prop="params.orderNo">
                  <el-col>
                    <el-form-item prop="">
                    <el-input size="mini" v-model="searchInfo.params.orderNo" placeholder="实付金额"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="mini">打印</el-button>
        <el-button type="primary" size="mini">保存</el-button>
        <el-button type="primary" size="mini">确认结算</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
export default {
  props: ["title", "type", "array"],
  data() {
    return {
      visible: false,
      searchInfo: {
        params: {
          type: 1,
          orderNo: "", //单号
        },
      },
    }
  },
  mounted() {},
  methods: {
    clear() {
      if (!this.array.length) {
        this.$notify({
          title: "警告",
          message: "请选择要结算的数据",
          type: "warning",
        })
        return
      }
      this.visible = true
    },
  },
}
</script>
