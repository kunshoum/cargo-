/**
 * 马少良
 */
 
<template>

	<!--到达情况-->
		<div class="Arrive">
      <div class="h3">到达情况</div>
			<el-table :data="arriveList" style="width: 100%" size="small" align='center' class="last_insert" border>
        <el-table-column label="序号" align='left' type="index" :index="indexMethod"></el-table-column>
        <el-table-column label="签收人" prop="sign_person" align='left'>
          <template slot-scope="scope">
            <div slot="reference" >
              <el-input size="mini" v-model="scope.row.sign_person" 
              @change="edit(scope.$index, scope.row)"
              :ref="scope.$index === (arriveList.length - 1) ? 'sign_person' : ''"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="签收件数" prop="sign_quantity" align='left'>
          <template slot-scope="scope">
            <div slot="reference" >
              <el-input size="mini" v-model="scope.row.sign_quantity" ref='sign_num' @change="edit(scope.$index, scope.row)"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="签收时间" prop="sign_time" align='left'>
          <template slot-scope="scope">
            <div slot="reference" >
              <el-input size="mini" v-model="scope.row.sign_time" ref='sign_date' @change="edit(scope.$index, scope.row)"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="签收备注" prop="sign_remark" align='left'>
          <template slot-scope="scope">
            <div slot="reference" >
             <el-input size="mini" v-model="scope.row.sign_remark" ref='quantity'
             @change="edit(scope.$index, scope.row)" 
             @keyup.enter.native="add(scope.row)"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="录入人"  prop="update_person" align='left'>
          <template slot-scope="scope">
            <div slot="reference" >
              <p ref='input_name'>{{ scope.row.update_person }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="录入日期" prop="update_time" align='left'>
            <template slot-scope="scope">
              <div slot="reference" >
                <p ref='input_data'>{{ scope.row.update_time }}</p>
              </div>
            </template>
        </el-table-column>
        <el-table-column label="操作" align='left'>
          <template slot-scope="scope" v-if="scope.$index !== (arriveList.length - 1)">
            <el-button
              size="mini"
              type="danger" @click="cancel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    	</el-table>
		</div>
</template>

<script>
import {
  insertUrl,
  getDeleteUrl,
  getArriveUrl,
  editUrl,
} from '../../service'
import {mapState} from 'vuex'

export default {
	data() {
    return {
      user: this.$getStore('real_name'),
      arriveList:[{update_person: this.user}],
      firstEnter: true,
    }
	},
	mounted() {
		this.getArrive()
  },
  computed: {
    ...mapState(['orderNo', 'orderType']),
  },
	methods: {
    indexMethod(index) {
      if(index === this.arriveList.length - 1) {
        return '输入'
      }else {
        return index + 1
      }
    },
    getArrive() {
      if(!this.orderNo) {
        this.$notify({
          title: "警告",
          message: '请输入单号',
          type: "warning",
        })
        return
      }
      getArriveUrl({order_no: this.orderNo}).then((res) =>{
        if(res.data.status === 200) {
          this.arriveList = res.data.data
          this.arriveList.push({update_person: this.user})
          this.$nextTick(function () {
            if(this.$route.query.from === 'detailCustom' && this.firstEnter) {
              return
            }
            this.$refs['sign_person'].focus()
          })
        }
      })
    },
    cancel(row){
      getDeleteUrl({id: row.id}).then((res) =>{
        if(res.data.status === 200) {
          this.getArrive()
        }
      })
    },
    edit(index, item) {
      if(index !== (this.arriveList.length - 1)) {
        editUrl(item).then((res) =>{
          if(res.data.status === 200) {
            this.getArrive()
          }
        })
      }
    },
    add(item) {
      this.firstEnter = false
      insertUrl({...item, order_no: this.orderNo, type: this.orderType}).then((res) =>{
        if(res.data.status === 200) {
          this.getArrive()
        }
      })
	  },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tabBox{
    position: absolute;
    height:100%;
    width:100%;
    display: none;
    border: 1px solid #D4D4D5;
    border-top: none;
    overflow-y: auto;
    padding:15px 15px 0 15px;
  }
  .tabBox.active{
    display: block;
  }
  h3{
    padding-bottom: .21428571rem;
    margin-bottom: .2rem;
    border-bottom: 1px solid rgba(34,36,38,.15);
  }
  .record{
    margin-top: .8rem;
  }
  .button{
    text-align: center;
    margin-top: .8rem;
  }
</style>
