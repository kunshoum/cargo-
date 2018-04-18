<template>
<!-- 雷云朵 -->
  <el-button-group>
  	<el-tooltip class="item" effect="dark" content="查看" placement="left">
    		<el-button type="primary" icon="el-icon-view" size="mini" @click="viewDetail"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="编辑" placement="left">
    		<el-button type="primary" icon="el-icon-edit" size="mini" @click="editDetail('编辑订舱')"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="复制" placement="left">
    		<el-button type="primary" icon="el-icon-plus" size="mini" @click="installDetail('复制添加')"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="打印" placement="left">
    		<el-button type="primary" icon="el-icon-tickets" size="mini" @click="classDetail('打印')"></el-button>
    </el-tooltip>
    <booking-detail :detail="detail" :visible="detialVisible" @close="close"/>
    <edit-detail :detail="detail" :dataUnit="dataUnit" :visible="editVisible" :title="title" @close="close" @search='search'/>
    <install-detail :detail="detail" :visible="installVisible" :title="title" @close="close" @search='search'/>

    <print :detail="detail" :visible="printVisible" :airPort="this.row.departure" :date="this.row.flight_date" :title="title" @close="close" @search='search'/>
    
  </el-button-group>
</template>

<script>
import { getBookingOut, getBookingNo ,printPlanBooking } from "../../../service"
import BookingDetail from "./bookingDetail.vue"
import EditDetail from "./editDetail.vue"
import InstallDetail from "./installDetail.vue"

import Print from "./print.vue" //打印组件

export default {
  props: ["row"],
  data() {
    return {
      detialVisible: false,
      editVisible: false,
      installVisible: false,
      printVisible: false,
      title: "编辑订舱",
      detail: {},
      dataUnit: "",
    }
  },
  components: {
    BookingDetail,
    EditDetail,
    InstallDetail,
    Print,
  },
  methods: {
    getBookingDetail() {
      return getBookingOut({
        id: this.row.id,
      }).then(res => {
        //					console.log(this.row)
        if (res.data.status === 200) {
          this.detail = res.data.data[0]
          this.dataUnit = res.data.data[0].data_unit_id
        } else {
          this.loading = false
          this.$message({ message: res.data.message, type: "warning" })
        }
      })
    },
    viewDetail() {
      this.getBookingDetail().then(() => {
        this.detialVisible = true
      })
    },
    editDetail(title) {
      this.getBookingDetail().then(() => {
        this.title = title
        this.editVisible = true
      })
    },
    //    	订舱号
    BookingNo() {
      getBookingNo().then(res => {
        //					console.log(res.data)
        if (res.data.status === 200) {
          this.detail.booking_no = res.data.data[0]
        }
      })
    },
    installDetail(title) {
      this.getBookingDetail().then(() => {
        this.title = title
        this.installVisible = true
        this.BookingNo()
      })
    },
    close() {
      this.detialVisible = false
      this.editVisible = false
      this.installVisible = false
      this.printVisible = false
    },
    classDetail(title) {
         
      printPlanBooking({departureAirport:this.row.departure,planFlyDate:this.row.flight_date}).then(res => {
        if (res.data.status === 200) {
          this.printVisible = true
          this.title = title
          this.detail = res.data.data
        }
        
      })
      
    },
    // 查询
    search() {
      // console.log(123)
      this.$emit("search")
    },
  },
}
</script>

<style lang="less">
.bookingDetail label {
  width: 110px;
  color: #99a9bf;
}
.bookingDetail .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
}
.el-dialog.is-fullscreen{
  z-index: 9999 !important;
}
</style>
