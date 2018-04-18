<template><!-- 雷云朵 -->
  <el-col :span="2">
    <el-button class="emportcss" id="yin" size="mini">
      <form class="yinc" :action="url" method="post">
        <input type="text" :value="enName" name="en_name" class="hidecla">
        <input type="text" :value="id" class="hidecla" name="page_id">
        <input type="text" :value="type" class="hidecla" name="type">
        <input type="text" :value="quaryBasis" class="hidecla" name="quary_basis_id">
        <input type="submit" value="导出" class="ess" />
      </form>
    </el-button>
  </el-col>
</template>

<script>
import { baseUrl } from "@/config/env.js"
export default {
  props: ["type", "enName", "id", "quaryBasis"],
  data() {
    return {
      url: baseUrl + "/def/zhcx/util/export_xls_list_report_records",
      authList: [],
    }
  },
}
</script>

<style lang="less">
.ess {
  height: 32px;
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 6px;
  background: #8768FF;
  border-color: #8768FF;
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  border: none;
}
#yin {
  background: #e9eef3 !important;
  border: 0px solid #d8dce5 !important;
}
.hidecla {
  display: none !important;
}
.yinc {
  background: rgba(2, 2, 2, 0);
}
.emportcss {
  padding: 0 !important;
  background: #e9eef3 !important;
  border: 0px solid #d8dce5 !important;
}
</style>

