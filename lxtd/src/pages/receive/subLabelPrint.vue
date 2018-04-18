/**
 * 马少良
 */
 
<template>
  <el-button type="primary" icon="el-icon-fa-print" size="small" @click="printOrder">打标签</el-button>
</template>

<script>
import { searchMainPrint, updatePrintNum } from "../../service"
import getLodop from "../../utils/lodop.js"
const LODOP = getLodop()

export default {
  props: ["change", "info"],
  data() {
    return {
      type: "",
      order_no: "",
      LODOP: null,
      printData: null,
    }
  },
  computed: {
    printInfo() {
      return {
        quantity: this.info.quantity,
        weight: this.info.weight,
        departure: this.info.departure && (this.info.departure.split('/')[1] || this.info.departure.split('/')[0]),
        destination: this.info.destination && (this.info.destination.split('/')[1] || this.info.destination.split('/')[0]),
        sender: this.info.sender && (this.info.sender.split('/')[1] || this.info.sender.split('/')[0]),
        receiver: this.info.receiver && (this.info.receiver.split('/')[1] || this.info.receiver.split('/')[0]),
        clearing_unit: this.info.clearing_unit && (this.info.clearing_unit.split('/')[1] || this.info.clearing_unit.split('/')[0]),
        unit: this.info.starting_point_operation,
      }
    }
  },
  mounted() {
    this.type = this.$route.params.type === "main" ? 0 : 1
    this.order_no = this.$route.params.id
  },
  methods: {
    createPage() {
      let d = this.printInfo
      this.LODOP = getLodop()
      this.LODOP.PRINT_INITA("")
      this.LODOP.SET_PRINT_PAGESIZE(1,'80mm','60mm');
      
      this.LODOP.SET_PRINT_MODE("PRINT_NOCOLLATE",1);
      this.LODOP.ADD_PRINT_TEXT(28,5,100,26,d.unit);
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      
      this.LODOP.ADD_PRINT_TEXT(62,5,68,20,"电话");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
      this.LODOP.ADD_PRINT_TEXT(58,70,111,28,this.$getStore("unit_tel"));
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",12);

      this.LODOP.ADD_PRINT_TEXT(92,5,68,20,"分单号码");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
      this.LODOP.ADD_PRINT_TEXT(88,85,111,28,this.order_no);
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",12);

      this.LODOP.ADD_PRINT_TEXT(122,5,38,16,"件数");
      this.LODOP.ADD_PRINT_TEXT(118,55,50,24,d.quantity);
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",11);

      this.LODOP.ADD_PRINT_TEXT(122,100,46,16,"重量");
      this.LODOP.ADD_PRINT_TEXT(118,155,50,24,d.weight);
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",11);

      this.LODOP.ADD_PRINT_TEXT(152,10,48,16,"始发");
      this.LODOP.ADD_PRINT_TEXT(152,60,80,28,d.departure);
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",11);

      this.LODOP.ADD_PRINT_TEXT(152,140,36,16,"目的");
      this.LODOP.ADD_PRINT_TEXT(152,180,80,24,d.destination);
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",11);

      this.LODOP.ADD_PRINT_TEXT(182,5,56,16,"收货人");
      this.LODOP.ADD_PRINT_TEXT(182,65,200,20,d.receiver);
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
    },
    printDesign() {
      this.createPage()
      this.LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true)
      if (this.LODOP.CVERSION) {
        // 获取打印次数
        let This = this
        this.LODOP.On_Return_Remain = true
        this.LODOP.On_Return = function(TaskID, Value) {
          if (Value > 0) {
            updatePrintNum({ order_no: This.order_no, print_num: Value * 1 }).then(res => {})
          }
        }
        this.LODOP.PREVIEW()
        return
      }
    },
    getPrintData() {
      this.printDesign()
    },
    printOrder() {
      if (this.change) {
        this.$confirm("当前对应单号件数曾发生变化,请确认件数,重量及价种已更改准确!", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "info",
        })
          .then(() => {
            this.getPrintData()
          })
      } else {
        this.getPrintData()
      }
    },
  },
}
</script>