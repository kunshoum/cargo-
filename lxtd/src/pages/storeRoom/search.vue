<template><!--王艺蒙-->
<div class="Search">
      <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
        <el-row :gutter="10">
           <el-col :span="4">
              <el-form-item label="城市" class="grid-content" prop="params.city">
                <el-select size="mini" @focus="getCity" @change="getoutLet" filterable allow-create clearable v-model="searchInfo.params.city" placeholder="">
                  <el-option
                  v-for="(item, index) in citys"
                  :key="index"
                  :label="item.label"
                  :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="营业点" class="grid-content" prop="params.outLet">
                    <el-select size="mini" @focus="clearRoom" filterable allow-create clearable @change="getStoreroom" v-model="searchInfo.params.outLet" placeholder="">
                      <el-option
                      v-for="(item,index) in outLets"
                      :key="index"
                      :label="item"
                      :value="item" ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="仓库" class="grid-content" prop="params.roomId">
                      <el-select size="mini" @focus="clearKu" filterable allow-create clearable @change="getLibrary" v-model="searchInfo.params.roomName" placeholder="">
                        <el-option
                          v-for="(item, index) in rooms"
                          :key="index"
                          :label="item.label"
                          :value="item.value" ></el-option>
                      </el-select>
                      
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="库位" class="grid-content" prop="params.id">
                      <el-select size="mini" filterable allow-create clearable v-model="searchInfo.params.id" placeholder="">
                         <el-option
                          v-for="(item, index) in kuwes"
                          :key="index"
                          :label="item.label"
                          :value="item.value" ></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="4" width="180">
                <el-form-item label="入库单号" class="grid-content break_line"  width="180" prop="params.inId">
                  <el-col>
                    <el-form-item prop="">
                    <el-input size="mini" v-model="searchInfo.params.inId" placeholder="入库单号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="状态" class="grid-content" prop="params.goodsType">
                      <el-select size="mini" v-model="searchInfo.params.goodsType" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已入库" value="0"></el-option>
                        <el-option label="已出库" value="1"></el-option>
                      </el-select>
                </el-form-item>
            </el-col> -->
        </el-row>
      </el-form>
      <div class="btn_wrap">
        <el-row>
          <el-col :span="6" :offset="18">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
          </div>
          </el-col>
        </el-row>
      </div>
      <div class="receive_list">
        <el-table :data="tableData" border style="width: 100%"  :height="this.screenHeight - 340" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" size="small" >
          <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="查看" placement="right">
                    <el-button type="primary" icon="el-icon-fa-eye" size="mini" @click="detail(scope.row)"></el-button>
                </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column sortable prop="outLet" label="营业点"></el-table-column>
          <el-table-column sortable prop="roomName" label="仓库名称"></el-table-column>
          <el-table-column sortable prop="name" label="库位名称"></el-table-column>
          <el-table-column sortable prop="maxWeight" label="可载重量"></el-table-column>
          <el-table-column sortable prop="overPlusWeight" label="可容总重量"></el-table-column>
          <el-table-column sortable prop="maxVolume" label="可载体积"></el-table-column>
          <el-table-column sortable prop="overPlusVolume" label="可容总体积"></el-table-column>
        </el-table>
        <el-pagination
          v-if="total"
          @current-change="pageChange"
          @size-change="sizeChange"
          :current-page="searchInfo.params.currPage"
          :page-size="10"
          :page-sizes="[10, 15, 20]"
          layout="sizes, total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
</div>
</template>
<script>
import { searchLocation, searchCity, outLet, storeRoom } from "../../service"
import { mapState } from "vuex"
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      type: "",
      loading: false,
      title: "进港库房管理",
      citys: [], //城市
      outLets: [], //营业点
      rooms: [], //仓库
      kuwes: [], //库位
      searchInfo: {
        params: {
          type: 1,
          // inId: "", //入库单号
          // goodsType: "", //状态
          id: "", // 库位
          city: "", //所属城市
          outLet: "", //所属营业点
          roomName: "", //仓库
          currPage: 1,
          pageSize: 10,
        },
      },
      tableData: [],
      total: "",
    }
  },
  watch: {
    $route() {
      this.load()
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    pageChange(val) {
      this.searchInfo.params.currPage = val
      this.search()
    },
    
    sizeChange(size) {
      this.searchInfo.params.pageSize = size
      this.search()
    },
    load() {
      this.type = this.$route.params.type
      this.searchInfo.params.type = this.type === "arrive" ? 1 : 0
      this.title = this.type === "departure" ? "出港仓库管理" : "进港仓库管理"
      this.$store.commit("CHANGE_TOPTITLE", this.title + "-查询")
      this.search()
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    search() {
      searchLocation({
        ...this.searchInfo.params,
      }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data[0].list
          this.total = res.data.data[0].total
        } else {
          this.tableData = []
        }
      })
    },
    reset() {
      this.$refs["searchForm"].resetFields()
    },
    detail(item) {
      this.$store.commit("CHANGE_TOPTITLE", this.type === "arrive" ? "进港入库单管理" : "出港入库单管理")
      this.$router.push(`/storeRoom/${this.type}/detail`)
      this.$store.commit("LOOK_ID", item.id)
      this.$store.commit("OUT_LET", item.outLet)
      this.$store.commit("ROOM_NAME", item.roomName)
      this.$store.commit("KU_WE", item.name)
    },
    getCity() {
      this.searchInfo.params.city = ''
      this.searchInfo.params.outLet = ''
      this.searchInfo.params.roomId = ''
      this.searchInfo.params.id = ''
      searchCity().then(res => {
        if (res.data.status === 200) {
          this.citys = res.data.data.map(item => {
            return { value: item.cn_name, label: item.cn_name }
          })
        }else {
          this.citys = []
        }
      })
    },
    clearRoom() {
      this.searchInfo.params.roomName = ''
      this.searchInfo.params.id = ''
    },
    clearKu() {
      this.searchInfo.params.id = ''
    },
    getoutLet() {
      outLet({ city: this.searchInfo.params.city }).then(res => {
        if (res.data.status === 200) {
          this.outLets = res.data.data
        }else {
          this.outLets = []
        }
      })
    },
    getStoreroom() {
      storeRoom({ city: this.searchInfo.params.city, outLet: this.searchInfo.params.outLet,type: this.type === "arrive" ? 1 : 0 ,goodsType: 0, }).then(res => {
        if (res.data.status === 200) {
          this.rooms = res.data.data.map(item => {
            return { value: item.id, label: item.name }
          })
        }else {
          this.rooms = []
        }
      })
    },
    getLibrary() {
      console.log(this.searchInfo.params.roomId)
      searchLocation({ city: this.searchInfo.params.city, outLet: this.searchInfo.params.outLet,roomName: this.searchInfo.params.roomName,type: this.type === "arrive" ? 1 : 0 }).then(res => {
        if (res.data.status === 200) {
          this.kuwes = res.data.data[0].list.map(item => {
            return { value: item.id, label: item.name }
          })
        }else {
          this.kuwes = []
        }
      })
    },
  },
}
</script>

<style lang="less">
.search_form {
  padding-bottom: 16px;
  border-bottom: 1px solid #d8dce5;
  margin-bottom: 12px;
}
.btn_wrap {
  margin-bottom: 10px;
}
</style>
