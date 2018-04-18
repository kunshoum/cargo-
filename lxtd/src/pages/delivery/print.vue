/**
 * 马少良
 */
<template>
  <el-button type="primary" icon="el-icon-printer" size="small" @click="printOrder">打单</el-button>
</template>

<script>
import { pickUpPrint } from "../../service"
import getLodop from "../../utils/lodop.js"
const LODOP = getLodop()
import {mapState} from 'vuex'
import { getTime } from "@/utils/time"
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
      this.LODOP.SET_PRINT_MODE("PRINT_NOCOLLATE",1);
      this.LODOP.ADD_PRINT_RECT(74,44,672,300,0,1);
      this.LODOP.SET_PRINT_STYLEA(0,"Horient",2);

      // 名称
      this.LODOP.ADD_PRINT_TEXT(8,226,291,28,d.orderName);
      this.LODOP.SET_PRINT_STYLEA(0,"FontName","华文中宋");
      this.LODOP.SET_PRINT_STYLEA(0,"FontSize",14);

      // 签收单号
      this.LODOP.ADD_PRINT_TEXT(16,634,80,20,d.sign_no);
      this.LODOP.ADD_PRINT_TEXT(49,506,209,20,"查询电话：0311-85054849/85037810");
      this.LODOP.ADD_PRINT_LINE(135,42,134,424,0,1);
      this.LODOP.SET_PRINT_STYLEA(0,"Horient",3);
      this.LODOP.ADD_PRINT_LINE(374,380,74,381,0,1);
      this.LODOP.ADD_PRINT_LINE(105,42,104,714,0,1);
      this.LODOP.ADD_PRINT_LINE(165,42,164,380,0,1);
      this.LODOP.ADD_PRINT_LINE(195,42,194,714,0,1);
      this.LODOP.ADD_PRINT_LINE(225,42,224,380,0,1);
      this.LODOP.ADD_PRINT_LINE(255,380,254,714,0,1);
      this.LODOP.ADD_PRINT_LINE(224,102,104,103,0,1);
      this.LODOP.ADD_PRINT_TEXT(84,122,79,20,d.sign_no);
      this.LODOP.ADD_PRINT_TEXT(114,45,65,20," 运单号：");
      this.LODOP.ADD_PRINT_TEXT(145,44,64,16," 起  点：");
      this.LODOP.ADD_PRINT_LINE(164,222,104,223,0,1);
      this.LODOP.ADD_PRINT_LINE(164,282,104,283,0,1);
      this.LODOP.ADD_PRINT_LINE(224,170,164,171,0,1);
      this.LODOP.ADD_PRINT_LINE(224,250,164,251,0,1);
      this.LODOP.ADD_PRINT_LINE(224,310,164,311,0,1);
      this.LODOP.ADD_PRINT_TEXT(114,223,70,16,"分单号：");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(145,226,58,16,"终  点：");
      this.LODOP.ADD_PRINT_TEXT(174,252,59,16,"品名");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(175,171,80,16,"货物类别");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(174,105,64,16,"重量");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(174,46,58,16,"件数");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(174,310,68,16,"包装");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(82,386,223,16,"收货人、地址、电话：");
      this.LODOP.ADD_PRINT_TEXT(114,110,92,16,d.main_order_no);
      this.LODOP.ADD_PRINT_TEXT(145,105,117,16,d.departure);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(145,281,100,16,d.destination);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(202,45,56,16,d.quantity);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(203,104,64,16,d.weight);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(203,169,80,16,d.product_category);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(203,250,60,16,d.product);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(202,310,72,18,d.packaging);
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      this.LODOP.ADD_PRINT_TEXT(84,45,76,16,"签收单号：");

      // 发货人
      if(d.sender) {
        this.LODOP.ADD_PRINT_TEXT(54,45,76,16,"发货人:");
        this.LODOP.ADD_PRINT_TEXT(54,100,300,16,d.sender);
      }
      
      // 收货人信息
      this.LODOP.ADD_PRINT_TEXT(114,386,330,16,d.receiver);
      this.LODOP.ADD_PRINT_TEXT(133,386,330,16,d.receiver_address);
      this.LODOP.ADD_PRINT_TEXT(153,386,200,16,d.receiver_telephone);

      // 结算方式
      this.LODOP.ADD_PRINT_TEXT(174,640,150,16,d.payment_method);

      // 提货方式
      let deliveryModeArr = ['', '自提', '派送', '中转']
      this.LODOP.ADD_PRINT_TEXT(202,410,72,18,deliveryModeArr[d.delivery_mode]);

      if(d.costItemList.length) {
        this.LODOP.ADD_PRINT_TEXT(237,253,80,16,"费用");
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(236,160,80,16,"费率");
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(236,70,80,16,"费用名称");
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

        let h = 264
        d.costItemList.forEach((item, index) => {
          this.LODOP.ADD_PRINT_TEXT(h + 20 * index,71,80,16,item.cost_name);
          this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
          this.LODOP.ADD_PRINT_TEXT(h + 20 * index,162,80,16,item.invoice_price);
          this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
          this.LODOP.ADD_PRINT_TEXT(h + 20 * index,253,80,16,item.actual_cost);
          this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        })
      }
      
      this.LODOP.ADD_PRINT_TEXT(353,55,80,16,"提货人签字");
      this.LODOP.ADD_PRINT_TEXT(354,223,80,16,"库房交付人");

      // this.LODOP.ADD_PRINT_TEXT(284,71,80,16,"应收提货费");
      // this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      // this.LODOP.ADD_PRINT_TEXT(284,162,80,16,"0.6");
      // this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      // this.LODOP.ADD_PRINT_TEXT(284,253,80,16,"30");
      // this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

      // this.LODOP.ADD_PRINT_TEXT(304,74,80,16,"合  计");
      // this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      // this.LODOP.ADD_PRINT_TEXT(304,254,80,16,"30");
      // this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

      this.LODOP.ADD_PRINT_TEXT(258,386,80,16,"收货人证件");
      this.LODOP.ADD_PRINT_TEXT(258,460,80,16,d.receiver_certificate_category);
      this.LODOP.ADD_PRINT_TEXT(258,520,200,16,d.receiver_certificate_no);

      this.LODOP.ADD_PRINT_TEXT(278,386,48,16,"提货人");
      this.LODOP.ADD_PRINT_TEXT(296,387,48,16,"证件");
      this.LODOP.ADD_PRINT_TEXT(278,492,70,16,"签收日期");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      this.LODOP.ADD_PRINT_TEXT(278,438,56,16,d.signer);
      this.LODOP.ADD_PRINT_TEXT(278,553,126,16,d.sign_time && d.sign_time.slice(0, 16));
      this.LODOP.ADD_PRINT_TEXT(296,438,52,16,d.signer_certificate_category);
      this.LODOP.ADD_PRINT_TEXT(297,507,141,16,d.signer_certificate_no);
      this.LODOP.ADD_PRINT_TEXT(314,388,48,16,"开单人");
      this.LODOP.ADD_PRINT_TEXT(314,429,120,16,d.creater);
      this.LODOP.ADD_PRINT_TEXT(314,494,56,16,"日期");
      this.LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      this.LODOP.ADD_PRINT_TEXT(314,558,150,16,d.create_time && d.create_time.slice(0, 16));
      this.LODOP.ADD_PRINT_TEXT(333,389,60,16,"送货车号");
      this.LODOP.ADD_PRINT_TEXT(333,454,64,16,d.car_number);
      this.LODOP.ADD_PRINT_TEXT(333,527,70,16,"送货司机");
      this.LODOP.ADD_PRINT_TEXT(333,587,80,16,d.driver);
      this.LODOP.ADD_PRINT_TEXT(351,529,200,16,getTime() + '  ' + this.$getStore("real_name"));
      this.LODOP.ADD_PRINT_TEXT(114,286,80,16,d.order_no);
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
      pickUpPrint({type: this.type, order_no: this.orderNo}).then(res => {
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