<template>
<!-- 雷云朵 -->
	<el-dialog class="oneprint" title="打印" :visible.sync="visible" width="70%" fullscreen :before-close="close" append-to-body>
    <div id="printTable">
      <h1 style="text-align:center;line-height: 40px;">订舱预配表</h1>
      <el-form label-position="left" inline class="flightInfo" v-if="detail[0]">
        <el-form-item label="制表人:">
          <span>{{detail[0].creater}}</span>
        </el-form-item>
        <el-form-item label="制表时间:">
          <span>{{detail[0].createDate}}</span>
        </el-form-item>
        <el-form-item label="机场:">
          <span>{{airPort}}</span>
        </el-form-item>
        <el-form-item label="日期:">
          <span>{{date}}</span>
        </el-form-item>
      </el-form>
      <div class="warp">
            <div class="head">
            <div>航班号</div>
            <div>机型</div>
            <div>起飞</div>
            <div>截止</div>
            <div>总订舱量</div>
            <div>可收货量</div>
            <div style="display:none;"></div>
          </div>
          <div class="body" v-for="item in detail" v-if="detail[0]">
              <div class="bodyContent">{{item.flightNo}}</div>
              <div class="bodyContent">{{item.modelCode}}</div>
              <div class="bodyContent">{{item.planFlyTime}}</div>
              <div class="bodyContent">{{item.closeTime}}</div>
              <div class="bodyContent">{{item.totalWeight}}</div>
              <div class="bodyContent">{{item.referLoad}}</div>
              <div class="bodyContent" style="display:none;"></div>
              <div class="bodyLeg">
                <div class="bodyLegContent" v-for="(key,value) in item.bookingInfos">
                  <div>{{value}}</div>
                  <div colspan="3">
                    <span  v-for="item in key">
                    {{item.booking_no}}:{{item.sender}}{{item.reply_weight}} ({{item.product}}-{{item.productSource}})&nbsp;&nbsp;
                    </span>
                    </div>
                </div>
              </div>
        </div>
        
        
      </div>
    </div>
		<span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="print" size="mini">确 定</el-button>
    </span>
	</el-dialog>
</template>

<script>
import $ from "@/utils/printArea.js"
export default {
  props: ["detail", "visible", "title", "airPort", "date"],
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit("close")
      console.log(this.date)
    },
    print() {
      $("#printTable").jqprint()
    },
  },
}
</script>
<style lang="less">
.el-dialog__body {
  padding: 0px 20px !important;
}
#printTable {
  text-align: center !important;
}
.warp {
  font-size: 14px !important;
  width: 980px;
  height: 1000px;
  margin-left: 50px;
  .head {
    width: 980px;
    margin: auto;
    height: 60px;
    line-height: 50px;
    div {
      width: 140px;
      height: 60px;
      line-height: 50px;
      float: left;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
    }
  }
  .body {
    width: 980px;
    margin: auto;
    .bodyContent:nth-child(2){
      
      line-height: 30px;
    }
    .bodyContent {
      width: 140px;
      float: left;
      height: 60px;
      line-height: 60px;
      word-wrap: break-word;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
    }
    .bodyLeg {
      width: 100%;
      float: left;
      .bodyLegContent {
        width: 100%;
        float: left;
        div:nth-child(1) {
          width: 140px;
          height: 60px;
          float: left;
          line-height: 60px;
          word-wrap: break-word;
          border-right: 1px solid #000;
          border-bottom: 1px solid #000;
        }
        div:nth-child(2) {
          text-align: left;
          width: 684px;
          height: 40px;
          padding: 10px;
          float: left;
          word-wrap: break-word;
          border-right: 1px solid #000;
          border-bottom: 1px solid #000;
        }
        
      }
    }
  }
}
</style>
