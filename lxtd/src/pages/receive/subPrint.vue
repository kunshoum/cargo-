/**
 * 马少良
 */
 
<template>
  <el-button type="primary" icon="el-icon-printer" size="small" @click="printOrder">打单</el-button>
</template>

<script>
  import {searchMainPrint} from "../../service"
  import getLodop from "../../utils/lodop.js"
  
  export default {
    props: ["change"],
    data() {
      return {
        type: '',
        order_no: '',
        LODOP: null,
        printData: null,
      }
    },
    mounted() {
      this.type = this.$route.params.type
      this.order_no = this.$route.params.id
    },
    methods: {
      createPage() {
        this.LODOP.PRINT_INITA(0,0,300,600,"")
        this.LODOP.ADD_PRINT_TEXT(41,99,78,30,this.printData.departure);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(245,23,325,20,this.printData.receiver_name);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
        this.LODOP.ADD_PRINT_TEXT(118,23,325,25,this.printData.sender_name);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(142,24,325,25,this.printData.sender_address);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(285,22,323,20,this.printData.receiver_telephone);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(185,695,294,35,this.printData.billing_remark);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(571,489,175,27,this.printData.product_name);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(167,19,325,20,this.printData.sender_telephone);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(42,278,83,33,this.printData.destination);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(266,21,323,21,this.printData.receiver_address);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(417,426,135,25,this.printData.declared_value);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(394,104,153,24,this.printData.actual_flight_no + ' ' + this.printData.actual_fly_date);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(345,667,67,20,"");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(343,584,70,20,"");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(342,505,69,20,"");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(342,422,73,20,'');
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(347,203,168,20,this.printData.air_carrier);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(346,121,81,20,this.printData.destination);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(419,566,136,24,this.printData.insurance_value);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(571,259,64,25,this.printData.weight);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(570,207,39,25,this.printData.product_code);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(570,164,38,25,this.printData.price_species_code);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(569,85,57,25,this.printData.net_weight);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(568,21,50,25,this.printData.quantity);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(711,405,55,25,"");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(464,31,587,31,this.printData.other_storage_remark);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(598,491,176,29,this.printData.product_code);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(626,490,177,25,this.printData.packaging_name);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(748,340,277,22,"");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(700,28,71,26,"");
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(571,403,56,25,"120.00");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(673,18,83,19,"");
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(647,489,177,27,this.printData.volume + "M3");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(849,225,51,20,this.printData.quantity);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(779,220,70,20,this.printData.net_weight);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(570,349,43,23,this.printData.invoice_price);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(888,32,70,20,"140.00");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(704,227,67,20,"38");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(839,33,72,20,"20.00");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(780,36,69,20,"120.00");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.ADD_PRINT_TEXT(975,172,131,25,this.printData.payment_method);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
        this.LODOP.ADD_PRINT_TEXT(979,464,86,20,this.printData.billing_location);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(978,341,100,20,this.printData.billing_time);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(977,563,158,20,this.printData.issuer);
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        this.LODOP.ADD_PRINT_TEXT(884,215,69,20,"20");
        this.LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
        this.LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        this.LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      },
      printDesign() {
        this.createPage()
        this.LODOP.ADD_PRINT_SETUP_BKIMG(`<img border='0' src='/static/print_sub_bg.jpg'>`)
        this.LODOP.SET_SHOW_MODE("BKIMG_LEFT", 1)
        this.LODOP.SET_SHOW_MODE("BKIMG_TOP", 1)
        this.LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "183mm")
        this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1)
        this.LODOP.PRINT_DESIGN()
      },
      getPrintData() {
        searchMainPrint({order_no: this.order_no, type: 1}).then(res => {
          let resData = res.data
          if(resData.status === 200) {
            this.printData = resData.data[0]
            this.printDesign()
          }
        })
      },
      printOrder() {
        this.LODOP = getLodop()
        if (this.change) {
          this.$confirm("当前对应单号件数曾发生变化,请确认件数,重量及价种已更改准确!", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "info",
          })
            .then(() => {
              this.getPrintData()
            })
            .catch(() => {
              
            })
        }else {
          this.getPrintData()
        }
      }
    },
  }
</script>