/**
 * 马少良
 */
 
<template>
  <el-button type="primary" icon="el-icon-printer" size="small" @click="printOrder">打派送单</el-button>
</template>

<script>
import { deliveryPrint } from "@/service"
import getLodop from "@/utils/lodop.js"
const LODOP = getLodop()
import {mapState} from 'vuex'
import { formatDate } from "@/utils/time"
export default {
  props: ["mode"],
  data() {
    return {
      type: "",
      order_no: "",
      LODOP: null,
      printData: null
    }
  },
  computed: {
		...mapState(['orderNo']),
	},
  mounted() {
    this.type = this.$route.params.type === 'main' ? 0 : 1
  },
  methods: {
    createPage() {
      let d = this.printData
      this.LODOP = getLodop()
      this.LODOP.PRINT_INIT("");
      this.LODOP.SET_PRINT_MODE("PRINT_NOCOLLATE",1);
      this.LODOP.ADD_PRINT_RECT(75,43,672,181,0,1);
      this.LODOP.SET_PRINT_STYLEA(0,"Horient",2);
      this.LODOP.ADD_PRINT_TEXT(8,226,350,28,"河北空港物流有限公司货物派送单");
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","华文中宋");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
      this.LODOP.ADD_PRINT_TEXT(49,506,67,20,"主单号码:");
      this.LODOP.ADD_PRINT_LINE(105,43,106,757,0,1);
      this.LODOP.SET_PRINT_STYLEA(0,"Horient",3);
      this.LODOP.ADD_PRINT_LINE(136,43,135,715,0,1);
      this.LODOP.ADD_PRINT_LINE(196,43,195,715,0,1);
      this.LODOP.ADD_PRINT_LINE(226,43,225,715,0,1);
      this.LODOP.ADD_PRINT_LINE(195,105,75,106,0,1);
      this.LODOP.ADD_PRINT_TEXT(85,44,60,16,"开票日期");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(114,45,60,16,"货运单号");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(161,43,62,16," 收货人");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_LINE(135,195,75,196,0,1);
      this.LODOP.ADD_PRINT_LINE(105,255,75,256,0,1);
      this.LODOP.ADD_PRINT_LINE(105,315,75,316,0,1);
      this.LODOP.ADD_PRINT_LINE(105,375,75,376,0,1);
      this.LODOP.ADD_PRINT_LINE(135,435,75,436,0,1);
      this.LODOP.ADD_PRINT_LINE(135,520,75,521,0,1);
      this.LODOP.ADD_PRINT_LINE(135,270,105,271,0,1);
      this.LODOP.ADD_PRINT_LINE(225,95,195,96,0,1);
      this.LODOP.ADD_PRINT_LINE(255,145,195,146,0,1);
      this.LODOP.ADD_PRINT_LINE(225,195,195,196,0,1);
      this.LODOP.ADD_PRINT_LINE(255,245,195,246,0,1);
      this.LODOP.ADD_PRINT_LINE(225,295,195,296,0,1);
      this.LODOP.ADD_PRINT_LINE(225,375,195,376,0,1);
      this.LODOP.ADD_PRINT_LINE(225,445,195,446,0,1);
      this.LODOP.ADD_PRINT_LINE(255,325,225,326,0,1);

      this.LODOP.ADD_PRINT_TEXT(86,196,58,16,"始发站");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(86,318,56,16,"目的站");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(86,438,84,16,"委派单位");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(113,436,84,16,"派送时限");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(114,197,72,16,"航班情况");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(204,46,47,16,"件数");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(204,146,49,16,"重量");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(203,245,50,16,"品名");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(203,375,72,16,"提货备注");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(232,45,101,16,"收货人签字");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(233,245,80,16,"证件号码");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

      // 主单号码
      this.LODOP.ADD_PRINT_TEXT(49,573,121,20,d.mainOrderList && d.mainOrderList.join());

      // 开票日期
      this.LODOP.ADD_PRINT_TEXT(86,106,88,16,formatDate(d.billing_time));
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

      // 始发站
      this.LODOP.ADD_PRINT_TEXT(87,255,62,16,d.departure);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      
      // 目的站
      this.LODOP.ADD_PRINT_TEXT(86,375,60,16,d.destination);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

      // 委派单位
      this.LODOP.ADD_PRINT_TEXT(86,526,179,16,d.appointed_unit);

      // 货运单号
      this.LODOP.ADD_PRINT_TEXT(114,106,88,16,d.order_no);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      
      // 航班情况
      this.LODOP.ADD_PRINT_TEXT(114,275,154,16,d.state);
      
      // 派送时限
      this.LODOP.ADD_PRINT_TEXT(112,527,178,16,d.appointed_time);
      
      // 收货人
      this.LODOP.ADD_PRINT_TEXT(142,109,599,40,d.receiver + "/" + d.receiver_address + "/" + d.receiver_telephone);
      
      // 件数
      this.LODOP.ADD_PRINT_TEXT(204,95,50,16,d.quantity);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

      // 重量
      this.LODOP.ADD_PRINT_TEXT(203,195,50,16,d.weight);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

      // 品名
      this.LODOP.ADD_PRINT_TEXT(203,294,80,16,d.product);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

      // 提货备注
      this.LODOP.ADD_PRINT_TEXT(202,451,262,16,d.delivery_remark);

      // 证件号码
      this.LODOP.ADD_PRINT_TEXT(234,332,330,16,d.license_number);

      this.LODOP.PREVIEW()
    },
    getPrintNum() {
      if (this.LODOP.CVERSION) {
        // 获取打印次数
        let This = this
        this.LODOP.On_Return_Remain = true
        this.LODOP.On_Return = function(TaskID, Value) {
          if (Value > 0) {
            
          }
        }
        return
      }
    },
    printOrder() {
      deliveryPrint({order_no: this.orderNo}).then(res => {
        if(res.data.status === 200) {
          this.printData = res.data.data[0]
          this.createPage()
          this.getPrintNum()
        }
      })
    },
  },
}
</script>