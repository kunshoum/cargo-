/**
 * 马少良
 */
 
<template>
  <el-button type="primary" icon="el-icon-printer" size="small" @click="printOrder">打单</el-button>
</template>

<script>
import { searchMainPrint } from "../../service"
import getLodop from "../../utils/lodop.js"
const LODOP = getLodop()

export default {
  props: ["change"],
  data() {
    return {
      order_no: "",
      LODOP: null,
      printData: null,
      obj: "",
    }
  },
  mounted() {
    this.type = this.$route.params.type
    this.order_no = this.$route.params.id
  },
  watch: {
    obj() {
      console.log(this.obj)
    },
  },
  methods: {
    createPage() {
      let d = this.printData
      this.LODOP = getLodop()
      this.LODOP.PRINT_INITA(-3, 0, 800, 1300, "")
      this.LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true)
      // this.LODOP.ADD_PRINT_SETUP_BKIMG("<img border='0' src='/static/mail_print_bg.jpg'>")
      this.LODOP.SET_SHOW_MODE("BKIMG_LEFT", 1)
      this.LODOP.SET_SHOW_MODE("BKIMG_TOP", 1)
      this.LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "157.43mm")
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", true)
      this.LODOP.ADD_PRINT_TEXT(86, 113, 46, 20, d.departure)
      this.LODOP.ADD_PRINT_TEXT(87, 248, 53, 20, d.destination)
      this.LODOP.ADD_PRINT_TEXT(135, 98, 139, 25, d.sender)
      this.LODOP.ADD_PRINT_TEXT(166, 66, 63, 20, d.sender_telephone)
      this.LODOP.ADD_PRINT_TEXT(167, 178, 100, 20, d.sender)
      this.LODOP.ADD_PRINT_TEXT(208, 75, 198, 30, d.receiver)
      this.LODOP.ADD_PRINT_TEXT(257, 65, 63, 20, d.receiver_telephone)
      this.LODOP.ADD_PRINT_TEXT(257, 180, 100, 20, d.receiver)
      this.LODOP.ADD_PRINT_TEXT(213, 311, 237, 20, d.issuer)
      this.LODOP.ADD_PRINT_TEXT(242, 342, 85, 20, d.billing_time)
      this.LODOP.ADD_PRINT_TEXT(242, 467, 70, 20, d.billing_location)
      this.LODOP.ADD_PRINT_TEXT(315, 102, 69, 20, d.flight_no)
      this.LODOP.ADD_PRINT_TEXT(315, 183, 115, 20, d.flight_date)
      this.LODOP.ADD_PRINT_TEXT(442, 35, 133, 40, d.price_species)
      this.LODOP.ADD_PRINT_TEXT(442, 192, 100, 40, d.quantity)
      this.LODOP.ADD_PRINT_TEXT(441, 320, 100, 40, d.net_weight)
      this.LODOP.ADD_PRINT_TEXT(440, 439, 100, 40, d.weight)

      this.LODOP.ADD_PRINT_TEXT(526, 323, 221, 104, d.other_stowage_remark)
      this.LODOP.ADD_PRINT_TEXT(721, 191, 105, 30, d.billing_cost)
    },
    printDesign() {
      this.createPage()

      this.LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true)
      if (this.LODOP.CVERSION) {
        // 获取打印次数
        this.LODOP.On_Return_Remain = true
        this.LODOP.On_Return = function(TaskID, Value) {
          console.log(TaskID)
          console.log(Value)
        }
        this.LODOP.PREVIEW()
        return
      }
    },
    getPrintData() {
      searchMainPrint({ order_no: this.order_no, type: 2 }).then(res => {
        let resData = res.data
        if (resData.status === 200) {
          this.printData = resData.data[0]
          this.printDesign()
        }
      })
    },
    printOrder() {
      this.getPrintData()
    },
  },
}
</script>