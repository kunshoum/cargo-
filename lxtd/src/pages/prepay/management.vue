 /**
 * 马少良
 */
 
 <template>
	<div class="Search">
    <el-form class="demo-form-inline search_form" label-position="top" ref="searchForm" :model="searchInfo">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="出发/到达" class="grid-content" prop="start_arrive">
            <el-select size="mini"
              v-model="searchInfo.start_arrive">
              <el-option label="全部" value=""></el-option>
              <el-option label="出发" :value="0"></el-option>
              <el-option label="到达" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="收/付款单位" class="grid-content" prop="receive_pay_type">
            <el-select size="mini" v-model="searchInfo.receive_pay_type">
              <el-option label="全部" value=""></el-option>
              <el-option label="收款单位" :value="0"></el-option>
              <el-option label="付款单位" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="结算单位" class="grid-content" prop="clearing_unit">
            <el-input size="mini" v-model="searchInfo.clearing_unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="预警金额" class="grid-content" prop="danger_cost">
            <el-input size="mini" v-model="searchInfo.danger_cost"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn_wrap">
      <el-row>
        <el-col :span="8" :offset="15">
        <div class="grid-content bg-purple" style="float: right">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加</el-button>
        </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" :height="screenHeight - 340" size="small">
        <el-table-column fixed type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
        <el-table-column prop="" label="操作" width="180">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="充值" placement="left">
              <el-button type="primary" icon="el-icon-fa-jpy" size="mini" @click="charge(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" placement="right">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="right">
              <el-button type="primary" icon="el-icon-delete" size="mini" @click="cancel(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable prop="clearing_unit" label="结算单位" width="100"></el-table-column>
        <el-table-column sortable prop="start_arrive" label="出发/到达" :formatter="startArriveFormat" width="100"></el-table-column>
        <el-table-column sortable prop="receive_pay_type" label="收付款单位" :formatter="receivePayFormat"></el-table-column>
        <el-table-column sortable prop="danger_cost" label="预警金额" ></el-table-column>
        <el-table-column sortable prop="stop_cost" label="停办业务金额"></el-table-column>
        <el-table-column sortable prop="pre_payment_total_cost" label="预付金累计"></el-table-column>
        <el-table-column sortable prop="last_cost" label="余额"></el-table-column>
        <el-table-column sortable prop="receive_danger_tel" label="接受预警短信手机号" ></el-table-column>
      </el-table>
      <el-pagination
        v-if="total > 10"
        @current-change="pageChange"
        @size-change="sizeChange"
        :current-page="currPage"
        :page-size="10"
        :page-sizes="[10, 15, 20]"
        layout="sizes, total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <pre-charge :visible="chargeVisible" :list="list" @close="close" @success="success" 
    :type="addType" :id="id" :timeStamp="timeStamp"/>
    <add-edit :visible="addVisible" :list="list" :type="addType" @close="close" 
    @success="success" :id="id" :timeStamp="timeStamp"/>
	</div>
</template>
<script>

import {
  getList,
  cancelItem,
} from "@/service/prepay"

import PreCharge from "./charge"
import AddEdit from "./addEdit"

export default {
  data() {
    return {
      title: "预付款管理",
      searchInfo: {
        start_arrive: "",
        receive_pay_type: "",
        danger_cost: "",
        clearing_unit: "",
      },
      tableData: [],
      total: "",
      chargeVisible: false,
      addVisible: false,
      addType: 'add',
      id: '',
      list: [],
      currPage: 1,
      pageSize: 10,
      screenHeight: window.innerHeight,
      timeStamp: '',
    }
  },
  components: {
    PreCharge,
    AddEdit,
  },
  computed: {
    idList() {
      return this.list.map(item => {
        return {
          id: item.id,
          data_unit_id: item.data_unit_id
        }
      })
    },
    unitIdList() {
      return this.list.map(item => item.data_unit_id)
    }
  },
  mounted() {
    this.$store.commit("CHANGE_TOPTITLE", this.title)
    this.$store.commit('ADD_FOOTNAV', {
      name: '预付款管理',
      route: '/prepay/management',
    })
    this.searchHandler()
  },
  methods: {
    reset() {
      this.$refs["searchForm"].resetFields()
    },
    searchHandler() {
      this.currPage = 1
      this.search()
    },
    search() {
      getList({ ...this.searchInfo, currPage: this.currPage, pageSize: this.pageSize }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data[0].list
          this.total = res.data.data[0].total
        }
      })
    },
    indexMethod(index) {
      return (this.currPage - 1) * 10 + index + 1
    },
    cancel(row) {
      this.list = [row]
      if(!this.idList.length) {
        this.$notify({
          title: "警告",
          message: '请选择',
          type: "warning",
        })
      }

      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelHandel()
      })
      
    },
    cancelHandel() {
      cancelItem({...this.idList[0]}).then(res => {
        if(res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: '删除成功',
            type: "success",
          })
          this.searchHandler()
        }
      })
    },
    add() {
      this.addType = 'add'
      this.timeStamp = new Date().getTime()
      this.id = ''
      this.addVisible = true
    },
    edit(row) {
      this.addType = 'edit'
      this.timeStamp = new Date().getTime()
      this.id = row.id
      this.addVisible = true
    },
    charge(row) {
      this.addType = 'charge'
      this.timeStamp = new Date().getTime()
      this.id = row.id
      this.chargeVisible = true
    },
    close() {
      this.chargeVisible = false
      this.addVisible = false
    },
    success() {
      this.close()
      this.search()
    },
    pageChange(index) {
      this.currPage = index
      this.search()
    },
    sizeChange(size) {
      this.pageSize = size
      this.search()
    },
    startArriveFormat(row, column, cellValue) {
      if(cellValue === 0) {
        return '出发'
      }else {
        return '到达'
      }
    },
    receivePayFormat(row, column, cellValue) {
      if(cellValue === 0) {
        return '收款单位'
      }else {
        return '付款单位'
      }
    },
  }
}
</script>