<template>
<!-- 雷云朵 -->
	<el-dialog title="设置" :visible.sync="visible" append-to-body width="65%" :before-close="close">
		<div class="btn_wrap btn_system">
			<el-row>
				<el-col :span="6" class='treelist'>
					<el-tree
					   ref="tree"
					  :data="authList"
					  show-checkbox
					  node-key="id"
					  :default-checked-keys=defaultCheckList>
					</el-tree>
				</el-col>
				<el-col :span="12">
					<el-form inline class="classDetail">
						<el-form-item label="部门名称" class='label'>
							<span>{{detail.name}}</span>
						</el-form-item>
						<el-form-item label="上级部门" class='label'>
							<span>{{detail.parent_depart_name}}</span>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="button">
				<el-button type="primary" @click="getCheckedId">保存权限</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import { getEmplAuthByUserid, saveDepartAuth } from "../../service"
export default {
  props: ["detail", "visible", "dataTrue"],
  data() {
    return {
      auth_list_id: [],
      allCheckedId: [],
      allUnCheckedId: [],
    }
  },
  computed: {
    authList() {
      return this.getMenuData()
    },
    defaultCheckList() {
      if(this.dataTrue.length) {
        let unCheckedIds = new Set(this.allUnCheckedId)
        return this.dataTrue.filter(item => item.is_select && !unCheckedIds.has(item.id)).map(item => item.id)
      }
    },
  },
  mounted() {},
  watch: {
    dataTrue(arr) {
      if(arr.length) {
        let ids = arr.filter(item => !item.is_select).map(item => item.id)
        this.getUnCheckedId(ids)
      }
    }
  },
  methods: {
    close(done) {
      this.$emit("close")
    },
    getChild(parent) {
      // 获取父节点下的子节点
      let child = []
      this.dataTrue.forEach(item => {
        if (item.parent_id === parent.id) {
          child.push({
            ...item,
            label: item.name,
          })
        }
      })
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
          id: 0,
        }),
      )
    },
    getUnCheckedId(idList) {
      let ids = this.dataTrue
        .filter(item => {
          return new Set(idList).has(item.id)
        })
        .map(item => item.parent_id)

      if (!ids.length) {
        return
      }  

      this.allUnCheckedId = this.allUnCheckedId.concat(ids)
      this.getUnCheckedId(ids)
      return ids
    },
    getPidById(idList) {
      let ids = this.dataTrue
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
    getCheckedId() {
      let auth_list_id = this.$refs["tree"].getCheckedKeys()
      this.allCheckedId = []
      this.getPidById(auth_list_id)
      this.allCheckedId = this.allCheckedId.concat(auth_list_id)
      let setArr = new Set(this.allCheckedId)
      let auth_list = Array.from(setArr).filter(item => item !== 0)

      saveDepartAuth({ auth_list_id: auth_list, depart_id: this.detail.id }).then(res => {
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