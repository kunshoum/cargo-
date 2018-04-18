<template>
  <div class="Special_setting Search">
    <el-form :model="searchInfo" class="demo-form-inline search_form" label-position="top" ref="searchForm">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="出发/到达" class="grid-content" prop="start_arrive">
            <el-select size="mini" v-model="searchInfo.start_arrive" ref='start_arrive' 
            @change='changeType'>
              <el-option label="出发" :value="0"></el-option>
              <el-option label="到达" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="单据类型" class="grid-content" prop="order_type">
            <el-select size="mini" placeholder="" ref="departure" v-model="searchInfo.order_type" @change="search">
              <el-option
                v-for="(item, index) in orderTypes"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否关联" class="grid-content" prop="is_relate">
            <el-select size="mini" v-model="searchInfo.is_relate" ref='is_relate' @change="search">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-if="specialShow">
          <el-form-item label="航空/相关/特殊设置" class="grid-content" prop="flight_other">
            <el-select size="mini" placeholder="" v-model="searchInfo.flight_other" @change="search">
              <el-option label="航空" :value="0"></el-option>
              <el-option label="相关" :value="1"></el-option>
              <el-option label="特殊设置" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn_wrap">
      <el-row>
        <el-col :span="12" :offset="1">
          <el-button type="warning" icon="el-icon-delete" size="mini" @click="deleteSpecial">删除</el-button>
          <el-button type="primary" icon="el-icon-upload2" size="mini" @click="setTop">置顶</el-button>
        </el-col>
        <el-col :span="8" :offset="2">
          <div class="grid-content bg-purple" style="float: right">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="special_list">
      <el-table :data="tableData" border style="width: 100%" :height="this.screenHeight - 280" size="small" 
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      highlight-current-row
      @current-change="getCheckedId"
      >
        <el-table-column fixed type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="factor" label="因素"></el-table-column>
        <el-table-column prop="is_relate" label="是否关联"></el-table-column>
        <el-table-column prop="priority" label="优先级"></el-table-column>
        <el-table-column prop="start_arrive" label="出发/到达" :formatter="stateFormat"></el-table-column>
        <el-table-column prop="flight_other" label="航空/相关/特殊设置" :formatter="otherFormat"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    getSpecialList,
    setTop,
    deleteSpecialItem,
  } from '@/service/specialSetting'

  export default {
    data() {
      return {
        searchInfo: {
          start_arrive: 0,
          order_type: 0,
          flight_other: 0,
          is_relate: '是',
        },
        orderTypes: [],
        startType: [
          {label: '主单', value: 0},
          {label: '分单', value: 1},
          {label: '邮件', value: 2},
        ],
        arriveType: [
          {label: '提货主单', value: 0},
          {label: '提货分单', value: 1},
        ],
        tableData: [],
        specialShow: true,
        loading: false,
        screenHeight: window.innerHeight,
        id: '',
      }
    },
    mounted() {
      this.orderTypes = this.startType
      this.search()
    },
    methods: {
      changeType(val) {
        this.specialShow = !this.specialShow
        this.searchInfo.order_type = 0
        if(val === 0) {
          this.orderTypes = this.startType
        }else {
          this.orderTypes = this.arriveType
        }
        this.search()
      },
      stateFormat(row, column, cellValue) {
        return cellValue ? '到达' : '出发'
      },
      otherFormat(row, column, cellValue) {
        let arr = ['航空', '相关', '特殊设置']
        return arr[cellValue]
      },
      search() {
        getSpecialList({currPage: this.currPage, ...this.searchInfo}).then(res => {
          if(res.data.status === 200) {
            this.tableData = res.data.data
          }
        })
      },
      getCheckedId(item) {
        if(item) {
          this.id = item.id
        }
      },
      reset() {
        this.$refs["searchForm"].resetFields()
      },
      isChecked() {
        return this.id ? true : false
      },
      deleteSpecial() {
        if(!this.isChecked()) {
          this.$notify({
            title: "警告",
            message: "请选择要删除的因素",
            type: "warning",
          })
          return
        }

        this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete()
        })
      },
      delete() {
        deleteSpecialItem({id: this.id}).then(res => {
          if(res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
            })
            this.search()
          }
        })
      },
      setTop() {
        if(!this.isChecked()) {
          this.$notify({
            title: "警告",
            message: "请选择要置顶的因素",
            type: "warning",
          })
          return
        }
        setTop({id: this.id}).then(res => {
          if(res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: "置顶成功",
              type: "success",
            })
            this.search()
          }
        })
      },
    }
  }
</script>