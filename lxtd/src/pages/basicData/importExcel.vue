/**
 * 马少良
 */
 
<template>
  <span class="import_wrap">
    <el-button type="primary" icon="el-icon-setting" size="mini" @click="upload">导入相关</el-button>
    <el-dialog title="导入Excel文件" :visible.sync="visible" class="import_dialog" width="70%">
      <el-upload class="upload-demo" 
        ref="upload-demo"
        :action="url"
        :data="upParams"
        :on-success="uploadSuccess" 
        :limit="1"
        :with-credentials="true">
        <el-button size="small" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
      <el-table v-loading="loading" element-loading-text="拼命导入中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" height="320" :fit="true">
        <el-table-column property="excel_name" label="Excel表头名称" width="150"></el-table-column>
        <el-table-column property="name" label="显示名称" width="200">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="en_name" label="Excel对应英文名"></el-table-column>
      </el-table>
      <el-col :span="6" :offset="18">
        <div class="grid-content bg-purple import_btn_wrap">
          <el-switch
            v-model="uploadType"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="覆盖"
            :active-value="1"
            :inactive-value="0"
            inactive-text="追加">
          </el-switch>
          <el-button type="primary" size="mini" @click="impotrMsg" >导入</el-button>
        </div>
      </el-col>
    </el-dialog>
  </span>
</template>

<script>
import { importExcel } from "../../service"
import { baseUrl } from '@/config/env.js'
export default {
  data() {
    return {
      visible: false,
      url: baseUrl + '/def/basic/util/getExcelFirstWook',
      upParams: {
        page_id: this.$route.params.id
      },
      name: [],
      enName: [],
      filePath: '',
      checkList: [],
      loading: false,
      tableData: [],
      uploadType: 0,
    }
  },
  watch: {
    '$route.params.id'() {
      this.upParams.page_id = this.$route.params.id
    }
  },
  methods: {
    upload() {
      if(this.tableData.length) {
        this.$refs['upload-demo'].clearFiles()
        this.tableData = []
        this.uploadType = 0
        this.filePath = ''
      }
      this.visible = true
    },
    getTableData() {
      this.tableData = this.name.map((item, index) => {
        return {
          excel_name: item,
          name: item,
          en_name: this.enName[index],
          // is_select: 1,
          // is_show: 0,
        }
      })
    },
    uploadSuccess(res, file, fileList) {
      if(res.status === 200) {
        let o = res.data[0]
        this.name = o.excelTitleList
        this.enName = o.fieldList
        this.filePath = o.filePath
        this.getTableData()
      }else {
        this.$notify({
          title: "警告",
          message: res.message,
          type: "warning",
        })
      }
    },
    importParams() {
      return {
        filePath: this.filePath,
        page_id: this.$route.params.id,
        uploadType: this.uploadType,
        tableAltList: this.tableData
      }
    },
    importExcel() {
        this.loading = true

        importExcel(this.importParams()).then(res => {
          this.loading = false
          this.$notify({
            title: "成功",
            message: res.data.message,
            type: "success",
          })
          this.visible = false
          this.$emit('reload')
        }).catch(err => {
          this.loading = false
        })
      
    },
    impotrMsg() {
      if(this.uploadType === 0){
        this.importExcel()
      }else{
        this.$confirm("覆盖会导致之前数据丢失,确定要覆盖数据吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        }).then(() => {
          this.importExcel()
        })
      }
      
    }
  },
}
</script>

<style>
  .import_wrap {
    vertical-align: top;
    margin-right: 10px;
  }
  .import_btn_wrap{
    margin-top:20px;
  }
  .import_dialog .el-dialog{
    height: 530px !important;
  }
</style>

