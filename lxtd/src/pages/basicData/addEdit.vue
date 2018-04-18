/**
 * 马少良
 */
 
<template>
	<el-dialog :title="title" :visible.sync="visible" append-to-body width="80%" :before-close="close">
		<el-form class="demo-form-inline basicDetail" label-position="top" ref="addForm" :model="addInfo">
      <el-row :gutter="10">
        <el-col :span="6" v-for="(item, index) in addInfo.list" v-if="!item.selectValues" :key="item.value">
          <el-form-item :label="item.key + ':'" class="grid-content" :prop="'list.' + index + '.classValue'">
            <el-input size="mini" v-model="item.classValue" :placeholder="item.label"></el-input>
          </el-form-item>
        </el-col>   
        <el-col :span="6" v-for="(item, index) in addInfo.list" v-if="item.selectValues" :key="index">
          <el-form-item  :label="item.key + ':'" class="grid-content" :prop="'list.' + index + '.classValue'">
            <el-select size="mini" v-model="item.classValue" placeholder="">
              <el-option
                v-for="(option, index) in item.selectValues"
                :key="index"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>    
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="save" size="mini">保 存</el-button>
    </span>
	</el-dialog>
</template>

<script>
  import {addBasicData, editBasicData} from "../../service"
	export default {
    props: ["id", "operationType", "visible", "editData", "title"],
		data() {
			return {
        pageId: this.$route.params.id,
			}
    },
    computed: {
      addInfo() {
        return {
          list: this.editData
        }
      } 
    },
    watch: {
      '$route.params.id'() {
        this.pageId = this.$route.params.id
      }
    },
		methods: {
      close() {
        this.$emit('close')
      },
      addParams() {
        let addData = this.addInfo.list.map(item => {
          return {
            key: item.value,
            value: item.classValue,
          }
        })
        let idList = this.id
        let is_batch = ""

        if(this.title === "批量编辑") {
          is_batch = 1
        }else {
          is_batch = ""
        }

        if(this.operationType === 'add') {
          return {
            addData,
            page_id: this.pageId,
          }
        }else {
          return {
            addData,
            idList,
            page_id: this.pageId,
            is_batch: is_batch,
          }
        }
      },
      add() {
        addBasicData(this.addParams()).then(res => {
          if(res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: this.title + '成功',
              type: "success",
            })
            this.$emit('close')
            this.$emit('search')
          }
        })
      },
      edit() {
        editBasicData(this.addParams()).then(res => {
          if(res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: this.title + '成功',
              type: "success",
            })
            this.$emit('close')
            this.$emit('search')
          }else {
            this.$notify({
              title: "警告",
              message: res.data.message,
              type: "warning",
            })
          }
        })
      },
      save() {
        if(this.operationType === 'add') {
          this.add()
        }else {
          this.edit()
        }
      },
    },
    
	}
</script>

<style lang="less">
	.basicDetail{
    padding: 0 50px;
		max-height: 400px;
		overflow: auto;
	}
</style>