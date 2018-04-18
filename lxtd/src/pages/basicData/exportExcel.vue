/**
 * 马少良
 */
 
<template>
  <el-button class="emportcss" id="yin" size="mini">
    <form class="yinc" :action="url" method="post">
      <input type="text" :value="fileName" name="fileName" class="hidecla">
      <input type="text" :value="pageId" class="hidecla" name="page_id">
      <input type="submit" value="导出" class="ess" />
    </form>
  </el-button>
</template>

<script>
import { baseUrl } from '@/config/env.js'
export default {
  data() {
    return {
      url: baseUrl + "/def/basic/util/exportXls",
      pageId: this.$route.params.id,
      authList: [],
    }
  },
  mounted() {
    console.log(this.pageId)
    this.authList = JSON.parse(this.$getStore("authList"))
  },
  watch: {
    '$route.params.id'() {
      this.pageId = this.$route.params.id
    }
  },
  computed: {
    fileName() {
      if(this.authList.filter(item => item.id === this.pageId*1)[0]) {
        return this.authList.filter(item => item.id === this.pageId*1)[0].name
      }
    }
  },
}
</script>

<style lang="less">
  .ess{
    height: 32px;
    padding:7px 15px;
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
    border:none;
  }
  #yin{
    background:#e9eef3!important;
    border: 0px solid #d8dce5!important;
  }
  .hidecla{
    display:none !important;
  }
  .yinc{
    background:rgba(2,2,2,0)
  }
  .emportcss{
    padding:0;
    background:#e9eef3!important;
    border: 0px solid #d8dce5!important;
  }
</style>

