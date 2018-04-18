<template><!--王艺蒙-->
<!-- 雷云朵 -->
	<el-dialog title="设置数据权限" :visible.sync="visible" append-to-body width="65%" :before-close="close">
		<div class="btn_wrap btn_system">
			<el-row>
				<el-col :span="24" class='treelist'>
					<el-tree
					   ref="tree"
					  :data="authList"
					  show-checkbox
					  node-key="page_id"
            :default-checked-keys=defaultCheckList
					  >
					</el-tree>
				</el-col>
			</el-row>
			<div class="button">
				<el-button type="primary" @click="save">保存权限</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import { saveDepartdataById } from "../../service"
export default {
  props: ["detail", "visible", "data", "user"],
  data() {
    return {
      auth_list_id: [],
      allCheckedId: [],
      saveArr: [],
    }
  },
  watch: {
    data() {},
  },
  computed: {
    formatedData() {
      if (this.data.length) {
        return this.data.map(item => {
          return {
            ...item,
            page_id: item.data_unit_id + "_" + item.page_id,
            parent_id: item.parent_id ? item.data_unit_id + "_" + item.parent_id : item.parent_id,
          }
        })
      }
    },
    authList() {
      return this.getMenuData()
    },
    defaultCheckList() {
      if (this.data.length && this.formatedData.length) {
        return this.formatedData.filter(item => item.is_select).map(item => item.page_id)
      }
    },
  },
  mounted() {},
  methods: {
    close(done) {
      this.$emit("close")
    },
    getChild(parent) {
      // 获取父节点下的子节点
      let child = []
      let index = 1
      if (this.data.length && this.formatedData.length) {
        this.formatedData.forEach(item => {
          if (item.parent_id === parent.page_id) {
            child.push({
              ...item,
              label: item.page_name,
            })
          }
        })
      }
      return child
    },
    formatData(data) {
      // 递归数据
      if (!data.length) {
        return
      }

      data.forEach(item => {
        item.children = this.getChild(item)
        this.formatData(item.children)
      })

      return data
    },
    getMenuData() {
      return this.formatData(
        this.getChild({
          page_id: null,
        }),
      )
    },
    getPidById(idList) {
      let ids = this.data
        .filter(item => {
          return idList.some(id => id === item.id)
        })
        .map(item => item.parent_id)
      if (!ids.length) {
        return
      }

      this.allCheckedId = this.allCheckedId.concat(ids)
      this.getPidById(ids)
      return ids
    },
    save() {
      let auth_list_id = this.$refs["tree"].getCheckedNodes()
      if (auth_list_id.length) {
        let arr =[]
         auth_list_id.map(item => {
          arr.push( {
            data_unit_id: item.data_unit_id,
            page_id: item.parent_id && item.parent_id.split('_')[1],
            read:item.label === "可读" ? 1 : 0,
            edit:item.label === "可编辑" ? 1 : 0,
            delete:item.label === "可删除" ? 1 : 0,
          })
        })
        this.saveArr = arr
      }

      
      saveDepartdataById({unit_id: this.user, auths:this.saveArr }).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          })
          this.close()
        }
      })
    },
  },
}
</script>

<style lang="less">
.classDetail .label {
  width: 100%;
  color: #000;
}

.classDetail label {
  color: #99a9bf;
}

.button {
  text-align: center;
}

.btn_wrap .treelist {
  max-height: 400px;
  overflow: auto;
  margin-right: 50px;
}
</style>
