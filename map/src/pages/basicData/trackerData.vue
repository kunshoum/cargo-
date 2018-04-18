<template>
  <div id="tracker">
    <div id="content-tracker" :style="{height: height  + 'px'}">
      <!-- <h3 class="h3-history">轮挡数据</h3> -->
      <el-form :model="searchInfo" class="demo-form-inline search_form" :inline="true">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="编号" prop="params.number">
              <el-input size="mini" v-model="searchInfo.params.number" placeholder="编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="负责人" prop="params.person">
              <el-input size="mini" v-model="searchInfo.params.person" placeholder="负责人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话" prop="params.contact_tel">
              <el-input size="mini" v-model="searchInfo.params.contact_tel" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn_wrap">
        <el-row>
          <el-col :span="8" :offset="15">
            <div class="grid-content bg-purple" style="float: right; margin-bottom: 20px;">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="searchHandler">查询</el-button>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="install">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="receive_list">
        <el-table :data="tableData" style="width: 100%" :height="height - 220  + 'px'">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column fixed type="index" :index="indexMethod" label="序号"></el-table-column>
          <el-table-column prop="number" label="编号"></el-table-column>
          <el-table-column prop="person" label="负责人"></el-table-column>
          <el-table-column prop="contact_tel" label="联系电话"></el-table-column>
          <el-table-column prop="email" label="邮件"></el-table-column>
          <el-table-column prop="department" label="归属部门"></el-table-column>
          <el-table-column prop="purchasef_date" label="购买日期"></el-table-column>
          <el-table-column prop="store_address" label="存放地址"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
        </el-table>
        <el-pagination
          v-if="total"
          @current-change="pageChange"
          :current-page="searchInfo.params.currPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <install-add :visible="installVisible" :title="title" @close="close" ></install-add> 
  </div>
</template>

<script>
  import InstallAdd from "./install.vue"
  export default {
    data() {
      return {
        title: '轮挡数据',
        height: window.innerHeight - 200,
        installVisible: false,
        searchInfo: {
          params: {
            currPage: 1,
            number: '',
            person: '',
            contact_tel: '',
            email: '',
            department: '',
            purchasef_date: '',
            store_address: '',
            remarks: '',
          },
        },
        tableData: [
          {
            number: 1,
            person: '朵朵',
            contact_tel: '15878956452',
            email: '13455543777@qq.com',
            department: 'lianxintongda',
            purchasef_date: '2018-03-26',
            store_address: '北京顺义',
            remarks: '轮挡数据',
          },
          {
            number: 2,
            person: '良良',
            contact_tel: '15878956250',
            email: '345678938@qq.com',
            department: 'lianxintongda',
            purchasef_date: '2018-03-26',
            store_address: '北京顺义',
            remarks: '轮挡数据',
          },
          {
            number: 3,
            person: 'Mli',
            contact_tel: '13423234567',
            email: '13423234567@qq.com',
            department: 'lianxintongda',
            purchasef_date: '2018-03-28',
            store_address: '北京顺义',
            remarks: '轮挡数据',
          },
          {
            number: 4,
            person: '小明',
            contact_tel: '13457892223',
            email: '13457892223@qq.com',
            department: 'lianxintongda',
            purchasef_date: '2018-02-22',
            store_address: '北京顺义',
            remarks: '轮挡数据',
          },
          {
            number: 5,
            person: '方红',
            contact_tel: '14756344422',
            email: '14756344422@qq.com',
            department: 'lianxintongda',
            purchasef_date: '2018-03-20',
            store_address: '北京顺义',
            remarks: '轮挡数据',
          },
          {
            number: 6,
            person: '王晓历',
            contact_tel: '13134254528',
            email: '13134254528@qq.com',
            department: 'lianxintongda',
            purchasef_date: '2018-03-31',
            store_address: '北京顺义',
            remarks: '轮挡数据',
          },
          {
            number: 7,
            person: 'LPING',
            contact_tel: '13932354470',
            email: '13932354470@qq.com',
            department: 'lianxintongda',
            purchasef_date: '2018-02-26',
            store_address: '北京顺义',
            remarks: '轮挡数据',
          }
        ],
        total: '',
      }
    },
    components: {
      InstallAdd
    },
    mounted() {
    },
    methods: {
      // 点击查询，页面为第一页
      searchHandler() {
      },
      install() {
        this.installVisible = true
      },
      indexMethod(index) {
        return (this.searchInfo.params.currPage - 1) * 10 + index + 1
      },
      close() {
        this.installVisible = false
      },
    }
  }
</script>
<style lang="less">
#tracker {
  text-rendering: optimizeSpeed;
  height: 100% !important;
  width: 100% !important;
  min-width: 320px;
  min-height: 264px;
  margin: 0px;
  padding: 0px;

  .el-table th>.cell {
    color: #00548A !important;
  }
  .el-form-item__label {
    color: #00548A !important;
  }

  #content-tracker {
    width: 100%;
    max-width: 1200px;
    max-height: 660px;
    margin: auto;
    margin-top: 80px;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 0 #BEC2C9;
    border-radius: 30px;
    padding: 0 3.3%;
    text-align: center;
    padding-bottom: 50px;

      h3 {
        color: #00335D;
        display: block;
        font-size: 30px;
        margin-top: 20px;
        opacity: 100%;
        padding-top: 20px;
      }

      .el-col {
        .el-form-item {
          margin-top: 9%;
        }
        // 按钮
        .el-button--mini {
          width: 100px;
          height: 30px;
          background: #54A1FB !important;
          border-radius: 10px !important;
        }

        .el-table th>.cell {
          font-family: MicrosoftYaHeiUI;
          font-size: 12px;
          color: #00548A;
        }
      }
  }
}

.el-table {
  .cell {
    white-space: nowrap !important;
  }
}

</style>