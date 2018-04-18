<template><!--王艺蒙-->
<div class="Billing">
<i class="el-icon-circle-close closeBilling" @click="backSearch"></i>
     <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" :rules="rules" ref="searchForm">
        <el-row :gutter="10">
           <el-col :span="4">
              <el-form-item label="入库单号" class="grid-content" prop="params.inId">
                <el-input size="mini" v-model="searchInfo.params.inId" placeholder="入库单号"></el-input>
              </el-form-item>
           </el-col>
           <el-col :span="4">
              <el-form-item label="运单号" class="grid-content" prop="params.orderNo">
                <el-input size="mini" v-model="searchInfo.params.orderNo" placeholder="运单号"></el-input>
              </el-form-item>
           </el-col>
            <el-col :span="4">
                <el-form-item label="发货人" class="grid-content" prop="params.sender">
                    <el-select size="mini" @focus="getSender" allow-create filterable  v-model="searchInfo.params.sender" placeholder="">
                            <el-option
                            v-for="(item, index) in senders"
                            :key="index"
                            :label="item.label"
                            :value="item.value" ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="收货人" class="grid-content" prop="params.receiver">
                      <el-select size="mini" @focus="getReceiver" allow-create filterable v-model="searchInfo.params.receiver" placeholder="">
                         <el-option
                          v-for="(item, index) in receivers"
                          :key="index"
                          :label="item.label"
                          :value="item.value" ></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="始发站" class="grid-content" prop="params.departure">
                <el-select size="mini" @focus="getCity" allow-create  filterable v-model="searchInfo.params.departure" placeholder="">
                  <el-option
                  v-for="(item, index) in citys"
                  :key="index"
                  :label="item.label"
                  :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="目的站" class="grid-content" prop="params.destination">
                <el-select size="mini" @focus="getCity" allow-create  filterable v-model="searchInfo.params.destination" placeholder="">
                  <el-option
                  v-for="(item, index) in citys"
                  :key="index"
                  :label="item.label"
                  :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="货物状态" class="grid-content" prop="params.goodsType">
                    <el-select size="mini" v-model="searchInfo.params.goodsType" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已入库" value="0"></el-option>
                        <el-option label="已出库" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="创建时间" class="grid-content" prop="timeValue">
                <el-date-picker
                 ref="date_picker"
                    size="mini"
                    v-model="searchInfo.timeValue"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width:100%;"
                >
                </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div class="btn_wrap">
        <el-row>
          <el-col :span="8" :offset="1">
          <div class="grid-content bg-purple">
            <el-button type="primary" size="mini" @click="batchGosin">入库</el-button>
            <el-button type="primary" size="mini" @click="batchGosto">出库</el-button>
            <el-button type="primary" size="mini" @click="cancelGosin">未入库运单</el-button>
          </div>
          </el-col>
          <el-col :span="5" :offset="9">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="searchGood">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
          </div>
          </el-col>
        </el-row>
      </div>
    <div class="detail_list">
        <el-table :data="tableData" border style="width: 100%" :height="this.screenHeight - 380"
         size="small"  @selection-change="changegoSto">
          <el-table-column type="selection"  @selection-change="changegoSto(scope.row)"></el-table-column>
          <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                <el-button
                size="mini"
                type="primary" icon="el-icon-edit"
                @click="changePage(scope.row)">编辑</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="right">
                  <el-button
                type="primary" icon="el-icon-delete" size="mini"
                @click="delte(scope.row)"
                >删除</el-button>
              </el-tooltip>
                
                
            </template>
          </el-table-column>
          <el-table-column sortable prop="inId" label="入库单号"></el-table-column>
          <el-table-column sortable prop="orderNo" label="运单号"></el-table-column>
          <el-table-column sortable prop="sender" label="发货人"></el-table-column>
          <el-table-column sortable prop="receiver" label="收货人"></el-table-column>
          <el-table-column sortable prop="departure" label="始发站"></el-table-column>
          <el-table-column sortable prop="destination" label="目的站"></el-table-column>
          <el-table-column sortable prop="product" label="品名"></el-table-column>
          <el-table-column sortable prop="product_category" label="货物类别"></el-table-column>
          <el-table-column sortable prop="quantity" label="件数"></el-table-column>
          <el-table-column sortable prop="weight" label="重量"></el-table-column>
          <el-table-column sortable prop="volume" label="体积"></el-table-column>
          <el-table-column sortable prop="goodsType" :formatter="stateFormat" label="货物状态"></el-table-column>
        </el-table>
        <el-pagination
          v-if="total > 10"
          @current-change="pageChange"
          @size-change="sizeChange"
          :current-page="searchInfo.params.currPage"
          :page-size="10"
          :page-sizes="[10, 15, 20]"
          layout="sizes, total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!-- 库位编辑 -->
        <el-dialog title="库位货物详情编辑" :visible.sync="dialogTableVisible" width="60%">
            <el-form :model="editInfo" class="demo-form-inline change_form" label-position="top" ref="editForm">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="入库单号" class="grid-content" prop="params.inId">
                        <el-input size="mini" v-model="editInfo.params.inId" :disabled="true" placeholder="营业点"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-form :model="editInfo" class="demo-form-inline search_form" label-position="top" :rules="rulesEdit" ref="editForm">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="运单号" class="grid-content" prop="params.orderNo">
                        <el-input size="mini" v-model="editInfo.params.orderNo" placeholder="运单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                <el-form-item label="发货人" class="grid-content" prop="params.sender">
                    <el-select size="mini" @focus="getSender" allow-create filterable  v-model="editInfo.params.sender" placeholder="">
                            <el-option
                            v-for="(item, index) in senders"
                            :key="index"
                            :label="item.label"
                            :value="item.value" ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="收货人" class="grid-content" prop="params.receiver">
                      <el-select size="mini" @focus="getReceiver" allow-create filterable v-model="editInfo.params.receiver" placeholder="">
                         <el-option
                          v-for="(item, index) in receivers"
                          :key="index"
                          :label="item.label"
                          :value="item.value" ></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="始发站" class="grid-content" prop="params.departure">
                <el-select size="mini" @focus="getCity" allow-create filterable v-model="editInfo.params.departure" placeholder="">
                  <el-option
                  v-for="(item, index) in citys"
                  :key="index"
                  :label="item.label"
                  :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="目的站" class="grid-content" prop="params.destination">
                <el-select size="mini" @focus="getCity" allow-create filterable v-model="editInfo.params.destination" placeholder="">
                  <el-option
                  v-for="(item, index) in citys"
                  :key="index"
                  :label="item.label"
                  :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="4">
                        <el-form-item label="品名" class="grid-content" prop="params.product">
                          <el-select size="mini" @focus="getProduct" @change="giveCatory" filterable v-model="editInfo.params.product" placeholder="">
                              <el-option
                              v-for="(item, index) in products"
                              :key="index"
                              :label="item.label"
                              :value="item.value" ></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="货物类别" class="grid-content" prop="params.product_category">
                            <el-select size="mini" @focus="getCatory" filterable v-model="editInfo.params.product_category" placeholder="">
                              <el-option
                              v-for="(item, index) in proCators"
                              :key="index"
                              :label="item.label"
                              :value="item.value" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="4">
                        <el-form-item label="件数" class="grid-content" prop="params.quantity">
                        <el-input size="mini" v-model="editInfo.params.quantity" placeholder="件数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="重量(kg)" class="grid-content" prop="params.weight">
                        <el-input size="mini" v-model="editInfo.params.weight" placeholder="重量"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="体积(m³)" class="grid-content" prop="params.volume">
                        <el-input size="mini" v-model="editInfo.params.volume" placeholder="体积"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div align="right" class="button gostor">
			            <el-button type="primary" class="save" size="small" @click="changeStore">保存</el-button>
		        </div>
        </el-dialog> 
        <!-- 入库 -->
        <el-dialog title="入库" :visible.sync="batchdialoginTableVisible">
            <el-form :model="goinInfo" class="demo-form-inline change_form" label-position="top" ref="searchForm">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="入库单号" class="grid-content" prop="params.inId">
                        <el-input size="mini" v-model="goinInfo.params.inId" :disabled="true" placeholder="营业点"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="交接人" class="grid-content" prop="params.heir">
                        <el-input size="mini" v-model="goinInfo.params.heir"   placeholder="交接人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="营业点" class="grid-content" prop="params.outLet">
                        <el-input size="mini" v-model="goinInfo.params.outLet" :disabled="true" placeholder="营业点"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="库房" class="grid-content" prop="params.roomName">
                        <el-input size="mini" v-model="goinInfo.params.roomName" :disabled="true" placeholder="仓库名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="库位" class="grid-content" prop="params.name">
                        <el-input size="mini" v-model="goinInfo.params.name" :disabled="true" placeholder="库位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-form :model="goinInfo" class="demo-form-inline search_form" label-position="top" :rules="rulesBot" ref="searchForm">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="运单号" class="grid-content" prop="params.order_no">
                        <el-input size="mini" @focus="orderBack"  @change="orderBackwrite" v-model="goinInfo.params.order_no" placeholder="运单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发货人" class="grid-content" prop="params.sender">
                        <el-select size="mini" @focus="getSender" filterable allow-create v-model="goinInfo.params.sender" placeholder="发货人">
                                <el-option
                                v-for="(item, index) in senders"
                                :key="index"
                                :label="item.label"
                                :value="item.value" ></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="收货人" class="grid-content" prop="params.receiver">
                          <el-select size="mini" @focus="getReceiver" filterable allow-create v-model="goinInfo.params.receiver" placeholder="收货人">
                            <el-option
                              v-for="(item, index) in receivers"
                              :key="index"
                              :label="item.label"
                              :value="item.value" ></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="始发站" class="grid-content" prop="params.departure">
                          <el-select size="mini" @focus="getCity" allow-create filterable v-model="goinInfo.params.departure" placeholder="始发站">
                            <el-option
                            v-for="(item, index) in citys"
                            :key="index"
                            :label="item.label"
                            :value="item.value" ></el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="目的站" class="grid-content" prop="params.destination">
                          <el-select size="mini" @focus="getCity" allow-create filterable  v-model="goinInfo.params.destination" placeholder="目的站">
                            <el-option
                            v-for="(item, index) in citys"
                            :key="index"
                            :label="item.label"
                            :value="item.value" ></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item label="品名" class="grid-content" prop="params.product">
                          <el-select size="mini" @focus="getProduct" @change="giveCatory" filterable v-model="goinInfo.params.product" placeholder="品名">
                              <el-option
                              v-for="(item, index) in products"
                              :key="index"
                              :label="item.label"
                              :value="item.value" ></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="货物类别" class="grid-content" prop="params.product_category">
                            <el-select size="mini" @focus="getCatory" filterable v-model="goinInfo.params.product_category" placeholder="货物类别">
                              <el-option
                              v-for="(item, index) in proCators"
                              :key="index"
                              :label="item.label"
                              :value="item.value" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="件数" class="grid-content" prop="params.quantity">
                        <el-input size="mini" v-model="goinInfo.params.quantity" placeholder="件数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="重量(kg)" class="grid-content" prop="params.weight">
                        <el-input size="mini" v-model="goinInfo.params.weight" placeholder="重量"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="体积(m³)" class="grid-content" prop="params.volume">
                        <el-input size="mini" v-model="goinInfo.params.volume" placeholder="体积"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div align="right" class="button gostor">
			            <el-button type="primary" class="save" size="small" @click="sure">确认入库</el-button>
		        </div>
        </el-dialog>

        <!-- 批量入库 -->
        <el-dialog title="批量入库" :visible.sync="canceldialoginTableVisible">
            <el-form :model="batchgoinInfo" class="demo-form-inline change_form" label-position="top" ref="searchForm">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="交接人" class="grid-content" prop="params.heir">
                        <el-input size="mini" v-model="batchgoinInfo.params.heir"   placeholder="交接人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="营业点" class="grid-content" prop="params.outLet">
                        <el-input size="mini" v-model="batchgoinInfo.params.outLet" :disabled="true" placeholder="营业点"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="库房" class="grid-content" prop="params.roomName">
                        <el-input size="mini" v-model="batchgoinInfo.params.roomName" :disabled="true" placeholder="仓库名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="库位" class="grid-content" prop="params.name">
                        <el-input size="mini" v-model="batchgoinInfo.params.name" :disabled="true" placeholder="库位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="batchstoreData" border style="width: 100%" height="370" size="small"  @selection-change="batchchangegoSto">
              <el-table-column type="selection"  @selection-change="changegoSto(scope.row)"></el-table-column>
              <el-table-column type="index" width="80" label="序号"></el-table-column>
              <el-table-column prop="order_no"  width="180" label="运单号"></el-table-column>
              <el-table-column prop="sender" label="发货人"></el-table-column>
              <el-table-column prop="receiver" label="收货人"></el-table-column>
              <el-table-column prop="departure" label="始发站"></el-table-column>
              <el-table-column prop="destination" label="目的站"></el-table-column>
              <el-table-column prop="product" label="品名"></el-table-column>
              <el-table-column prop="product_category" label="货物类别"></el-table-column>
              <el-table-column prop="quantity" label="件数"></el-table-column>
              <el-table-column prop="weight" label="重量"></el-table-column>
              <el-table-column prop="volume" label="体积"></el-table-column>
            </el-table>
            
            <div align="right" class="button gostor">
			            <el-button type="primary" class="save" size="small" @click="sureBatch">确认入库</el-button>
		        </div>
        </el-dialog>
      </div>
</div>
</template>
<script>
import {
  searchLocation,
  inidGet,
  searchCity,
  outLet,
  storeRoom,
  searchJointCompany,
  searchSenderReceiver,
  searchReceiver,
  kuwDoods,
  orderBack,
  getStore,
  deleteStore,
  gostore,
  searchProductCategory,
  searchProduct,
  batchStore,
  getStoreBatch,
  searchAirport,
} from "../../service"
import { mapState } from "vuex"

import rules from "@/mode/rulesData"
import { isnumRequired } from "@/mode/ruleMethods" //校验

import formatParams from "@/utils/formatParams" //格式化批量入库请求参数

export default {
  // name: "edit",
  data() {
    return {
      screenHeight: window.innerHeight,
      type: "0",
      title: "",
      localtionId: "",
      tableData: [],
      total: "",
      totals: "",
      trueStatu: "false",
      citys: [], //城市
      outLets: [], //营业点
      senders: [], //发货人
      receivers: [], //收货人
      proCators: [], //货物类别
      products: [], //品名
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", [start, end])
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit("pick", [start, end])
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit("pick", [start, end])
            },
          },
        ],
      },
      searchInfo: {
        params: {
          type: 1,
          orderNo: "",
          departure: "",
          destination: "",
          inId: "",
          sender: "",
          receiver: "",
          currPage: 1,
          pageSize: 10,
          goodsType: "",
        },
        timeValue: "",
      },
      goinInfo: {
        //入库
        params: {
          heir: "",
          name: "", //名称
          outLet: "", //所属营业点
          roomName: "", //所属仓库
          order_no: "",
          sender: "",
          receiver: "",
          departure: "",
          destination: "",
          quantity: "",
          weight: "",
          volume: "",
          product_category: "",
          inId: "",
        },
      },
      batchgoinInfo: {
        //入库
        params: {
          heir: "",
          name: "", //名称
          outLet: "", //所属营业点
          roomName: "", //所属仓库
        },
      },
      editInfo: {
        //编辑
        params: {
          // heir: "",
          // name: "", //名称
          // outLet: "", //所属营业点
          // roomName: "", //所属仓库
          goodsType: "",
          orderNo: "",
          sender: "",
          receiver: "",
          departure: "",
          destination: "",
          quantity: "",
          weight: "",
          volume: "",
          product_category: "",
          inId: "",
        },
      },
      batchStorInfo: {
        params: {
          goodsIds: [],
        },
      },
      gridData: [{}, {}], //编辑
      gridDatas: [], //出库
      dialogTableVisible: false,
      dialogFormVisible: false,
      batchdialoginTableVisible: false,
      canceldialoginTableVisible: false,
      inIds: [],
      editId: "",
      batchstoreData: [], //批量入库列表
      sureBatchData: [], //批量入库选中的tablelist
      formatData: {
        order_no: "",
        weight: "",
        volume: "",
        sender: "",
        receiver: "",
        departure: "",
        destination: "",
        product: "",
        quantity: "",
        product_category: "",
        type: "",
      },
      dataunitId : "",
      rules: {//查询区
        ...rules,
        "params.inId": [{ validator: isnumRequired }],
        "params.orderNo": [{ validator: isnumRequired }],
      },
      rulesBot: {//入库bottom区
        ...rules,
        "params.order_no": [{ required: true,validator: isnumRequired }],
        "params.weight": [{ validator: isnumRequired }],
        "params.volume": [{ validator: isnumRequired }],
        "params.quantity": [{ validator: isnumRequired }],
      },
      rulesEdit: {//编辑区
        ...rules,
        "params.orderNo": [{ validator: isnumRequired }],
        "params.weight": [{ validator: isnumRequired }],
        "params.volume": [{ validator: isnumRequired }],
        "params.quantity": [{ validator: isnumRequired }],
      },
    }
  },
  computed: {
    ...mapState(["lookId", "outLet", "roomname", "kuwe"]),
  },
  watch: {
    $route() {
      // this.load()
    },
  },
  mounted() {
    this.type = this.$route.params.type
    this.title = this.type === "arrive" ? "进港入库单管理" : "出港入库单管理"
    this.load()
  },
  methods: {
    pageChange(val) {
      this.searchInfo.params.currPage = val
      this.searchGood()
    },
    sizeChange(size) {
      this.searchInfo.params.pageSize = size
      this.searchGood()
    },
    load() {
      this.searchGood()
      this.goinInfo.params.outLet = this.outLet
      this.goinInfo.params.roomName = this.roomname
      this.goinInfo.params.name = this.kuwe
      this.batchgoinInfo.params.outLet = this.outLet
      this.batchgoinInfo.params.roomName = this.roomname
      this.batchgoinInfo.params.name = this.kuwe
    },
    getCity() {
      searchAirport().then(res => {
        if (res.data.status === 200) {
          this.citys = res.data.data.map(item => {
            return { value: item.airport_name, label: item.airport_name }
          })
        }
      })
    },
    getCatory() {
      searchProductCategory().then(res => {
        if (res.data.status === 200) {
          this.proCators = res.data.data.map(item => {
            return { value: item.name, label: item.name }
          })
        }
      })
    },
    getProduct() {
      searchProduct().then(res => {
        if (res.data.status === 200) {
          this.products = res.data.data.map(item => {
            return { value: item.name, label: item.name }
          })
        }
      })
    },
    giveCatory(item) {
      searchProduct({ code: item }).then(res => {
        if (res.data.status === 200) {
          if (this.type === "arrive") {
            this.editInfo.params.product_category = res.data.data[0].arrive_product_category
            this.goinInfo.params.product_category = res.data.data[0].arrive_product_category
          } else {
            this.editInfo.params.product_category = res.data.data[0].start_product_category
            this.goinInfo.params.product_category = res.data.data[0].start_product_category
          }
        }
      })
    },
    getoutLet() {
      outLet({ city: this.searchInfo.params.city }).then(res => {
        if (res.data.status === 200) {
          this.outLets = res.data.data
        }
      })
    },
    getSender() {
      if (this.type === "arrive" ? 1 : 0) {
        searchJointCompany({ is_domestic: 0, start_arrive: 2 }).then(res => {
          if (res.data.status === 200) {
            this.senders = res.data.data.map(item => {
              return { value: item.name, label: item.name }
            })
          }
        })
      } else {
        searchSenderReceiver({ is_start_relate: 1 }).then(res => {
          if (res.data.status === 200) {
            this.senders = res.data.data.map(item => {
              return { value: item.code, label: item.code }
            })
          }
        })
      }
    },
    getReceiver() {
      if (this.type === "arrive" ? 1 : 0) {
        searchSenderReceiver({ is_arrive_relate: 1 }).then(res => {
          if (res.data.status === 200) {
            this.receivers = res.data.data.map(item => {
              return { value: item.code, label: item.code }
            })
          }
        })
      }
    },
    getinid() {
      inidGet().then(res => {
        if (res.data.status === 200) {
          this.goinInfo.params.inId = res.data.message
        }
      })
    },
    orderBack() {
      this.trueStatu = false
      this.goinInfo.params.orderNo = ""
    },
    orderBackwrite() {
      orderBack({ orderNo: this.goinInfo.params.order_no, type: this.type === "arrive" ? 1 : 0 }).then(res => {
        if (res.data.status === 200) {
          this.goinInfo.params.quantity = res.data.data[0].quantity ? res.data.data[0].quantity : 0
          this.goinInfo.params.weight = res.data.data[0].weight ? res.data.data[0].weight : 0
          this.goinInfo.params.volume = res.data.data[0].volume ? res.data.data[0].volume : 0
          this.goinInfo.params.product = res.data.data[0].product ? res.data.data[0].product : ""
          this.goinInfo.params.sender = res.data.data[0].sender ? res.data.data[0].sender : ""
          this.goinInfo.params.receiver = res.data.data[0].receiver ? res.data.data[0].receiver : ""
          this.goinInfo.params.product_category = res.data.data[0].product_category
            ? res.data.data[0].product_category
            : ""
          this.goinInfo.params.departure = res.data.data[0].departure ? res.data.data[0].departure : ""
          this.goinInfo.params.destination = res.data.data[0].destination ? res.data.data[0].destination : ""
        }
      })
    },
    backSearch() {
      window.localStorage.setItem("detailId", "")
      this.$router.push(`/storeRoom/${this.type}`)
    },
    indexMethod(index) {
      return (this.searchInfo.params.currPage - 1) * 10 + index + 1
    },
    stateFormat(row, column, cellValue) {
      let stateArr = ["已入库", "已出库"]
      return stateArr[cellValue]
    },
    searchGood() {
      kuwDoods({
        ...this.searchInfo.params,
        locationId: this.lookId,
        type: this.type === "arrive" ? 1 : 0,
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
      this.$refs["date_picker"]._data.userInput = null
      this.$refs["searchForm"].resetFields()
    },
    changeFun(item) {
      //根据多选数据信息获得入库单号集合
      const orderID = []
      if (item.length > 0) {
        for (let a = 0; a < item.length; a++) {
          // orderID.push(item[a].inId)
        }

        this.inIds = orderID
      } else {
        const orderID = []
        this.inIds = orderID
      }
    },
    changePage(item) {
      this.dataunitId = item.data_unit_id
      this.editInfo.params.goodsType = item.goodsType
      this.editId = item.id
      this.dialogTableVisible = true
      this.editInfo.params.inId = item.inId ? item.inId : ""
      this.editInfo.params.orderNo = item.orderNo ? item.orderNo : ""
      this.editInfo.params.quantity = item.quantity ? item.quantity : 0
      this.editInfo.params.weight = item.weight ? item.weight : 0
      this.editInfo.params.volume = item.volume ? item.volume : 0
      this.editInfo.params.product = item.product ? item.product : ""
      this.editInfo.params.sender = item.sender ? item.sender : ""
      this.editInfo.params.receiver = item.receiver ? item.receiver : ""
      this.editInfo.params.product_category = item.product_category ? item.product_category : ""
      this.editInfo.params.departure = item.departure ? item.departure : ""
      this.editInfo.params.destination = item.destination ? item.destination : ""
    },
    delte(item) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      }).then(() => {
        deleteStore({ goodsId: item.id ,data_unit_id: item.data_unit_id ,type: this.type === "arrive" ? 1 : 0  }).then(res => {
          if (res.data.status === 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            })
            this.searchGood()
          } else {
            this.$message(res.data.message)
          }
        })
      })
    },
    search() {
      searchLocation({ type: this.type === "arrive" ? 1 : 0 }).then(res => {
        if (res.data.status === 200) {
          this.gridData = res.data.data[0].list
          this.totals = res.data.data[0].totals
        } else {
          this.gridData = []
        }
      })
    },
    sure() {
      if (this.type === "arrive") {
        if (this.goinInfo.params.order_no) {
          if (
            this.goinInfo.params.order_no ||
            this.goinInfo.params.volume ||
            this.goinInfo.params.weight ||
            this.goinInfo.params.quantity
          ) {
            getStore({
              ...this.goinInfo.params,
              type: this.type === "arrive" ? 1 : 0,
              locationId: this.lookId,
            }).then(res => {
              if (res.data.status === 200) {
                this.$confirm(this.goinInfo.params.order_no + res.data.message, "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "info",
                }).then(() => {
                  this.batchdialoginTableVisible = false
                  this.searchGood()
                })
              }
            })
          } else {
            this.$message("请填写完整的入库信息")
          }
        } else {
          this.$message("请输入运单号")
        }
      } else {
        if (
          this.goinInfo.params.order_no ||
          this.goinInfo.params.volume ||
          this.goinInfo.params.weight ||
          this.goinInfo.params.quantity
        ) {
          getStore({
            ...this.goinInfo.params,
            type: this.type === "arrive" ? 1 : 0,
            locationId: this.lookId,
          }).then(res => {
            if (res.data.status === 200) {
              this.$confirm(this.goinInfo.params.order_no + res.data.message, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info",
              }).then(() => {
                this.batchdialoginTableVisible = false
                this.searchGood()
              })
            }
          })
        } else {
          this.$message("请填写完整的入库信息")
        }
      }
    },
    changeStore() {
      getStore({
        ...this.editInfo.params,
        type: this.type === "arrive" ? 1 : 0,
        locationId: this.lookId,
        id: this.editId,
        data_unit_id: this.dataunitId,
      }).then(res => {
        if (res.data.status === 200) {
          this.$confirm("编辑成功", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          }).then(() => {
            this.dialogTableVisible = false
            this.searchGood()
          })
        }
      })
    },
    changegoSto(item) {
      //根据多选的数据获得货物主键集合
      if(item.length>0){
        for(var i=0;i<item.length;i++){
          if(item[0].goodsType === 0){
              const ordernoID = []
              if (item.length > 0) {
                for (let a = 0; a < item.length; a++) {
                  ordernoID.push(item[a].id)
                }
                this.batchStorInfo.params.goodsIds = ordernoID
              } else {
                const ordernoID = []
                this.batchStorInfo.params.goodsIds = ordernoID
              }
              this.sureBatch = item
          }
          else{
              this.$notify({
                title: "警告",
                message: "请选择未出库的单据",
                type: "warning",
              })
              return
          }
        }
          
          
      }
      
      
    },
    batchchangegoSto(item) {
      this.sureBatchData = item.map(i => {
        return formatParams(this.formatData, i)
      })
    },
    batchGosto() {
      if (!this.batchStorInfo.params.goodsIds.length) {
        this.$notify({
          title: "警告",
          message: "请选择进行出库操作的单据",
          type: "warning",
        })
        return
      }
      this.$confirm("确定要出库吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      }).then(() => {
        gostore({ goodsIds: this.batchStorInfo.params.goodsIds }).then(res => {
          if (res.data.status === 200) {
            this.$message({
              message: res.data.message,
              type: "success",
            })
            this.searchGood()
          } else {
            this.$message(res.data.message)
          }
        })
      })
    },
    batchGosin() {
      this.getinid()
      this.$refs["searchForm"].resetFields()
      this.batchdialoginTableVisible = true
    },
    cancelGosin() {
      // this.getinid()
      batchStore({ type: this.type === "arrive" ? 1 : 0 }).then(res => {
        if (res.data.status === 200) {
          this.canceldialoginTableVisible = true
          this.batchstoreData = res.data.data
        }
      })
    },
    sureBatch() {
      getStoreBatch({
        details: this.sureBatchData,
        params: {
          heir: this.batchgoinInfo.params.heir,
          locationId: this.lookId,
        },
        type: this.type === "arrive" ? 1 : 0,
      }).then(res => {
        if (res.data.status === 200) {
          this.$confirm(res.data.message, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          }).then(() => {
            this.canceldialoginTableVisible = false
            this.searchGood()
          })
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.Billing {
  position: relative;
  padding: 0 120px;

  .closeBilling {
    position: absolute;
    top: 0px;
    right: 30px;
    font-size: 24px !important;
    color: #878d99;
    &:hover {
      color: #fa5555;
    }
  }
  .tit {
    margin: 10px;
  }
}
</style>
