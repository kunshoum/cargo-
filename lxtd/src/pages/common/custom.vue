/**
 * 马少良
 */
 
<template>
  <div class="record">
    <div class="h3">客服记录</div>
    <el-table :data="customList" style="width: 100%" size="small" align='center' max-height="350" class="last_insert" border>
      <el-table-column label="序号" align='left' type="index" :index="customIndex"></el-table-column>
      <el-table-column label="状态" prop="state" align='left'>
        <template slot-scope="scope">
          <el-select v-model="scope.row.state" size="mini" ref="custom_status">
            <el-option v-for="item in status_name" placeholder=''
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="内容" prop="content" align='left'>
        <template slot-scope="scope">
          <div slot="reference" >
            <el-input size="mini" v-model="scope.row.content" ref='content' @keyup.enter.native="add(scope.$index,scope.row)"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="录入人" prop="entry_person" align='left'>
        <template slot-scope="scope">
          <div slot="reference" >
            <p>{{scope.row.entry_person}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="entry_time" label="录入日期" align='left'></el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope" v-if="scope.$index !== (customList.length - 1)">
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="button back_detail">
      <el-button type="primary" class="save" size="small" @click="backDetail">保存并返回开单明细</el-button>
    </div>
  </div>
</template>

<script>
import {searchServiceState} from '../../service'
import {getTime} from "../../utils/time"
import {mapState} from 'vuex'

export default {
	data() {
    return {
      status_name: [],
      user: '',
    }
	},
	mounted() {
    this.user = this.$getStore('real_name')
		searchServiceState({type:this.$route.path.indexOf('delivery') > -1 ? 2 : this.type, order_type:this.orderType}).then((res) =>{
      this.status_name= res.data.data.map(item => {
        return {value: item.name, label: item.name}
      })
      this.$nextTick(function () {
        this.$refs['custom_status'].focus()
      })
    })
  },
  computed: {
    ...mapState(['customList', 'orderNo', 'type', 'orderType']),
  },
	methods: {
    handleDelete(index, row) {
      if(this.customList.length > 1 && index != this.customList.length-1){
        this.customList.splice(index, 1)
      }
    },
    customIndex(index) {
      if(index === this.customList.length - 1) {
        return '输入'
      }else {
        return index + 1
      }
    },
    add(index, row) {
      if(index == this.customList.length-1){
        row.entry_time = getTime()
        this.customList.push(
          {
            state: '',
            content: '',
            entry_person: this.user,
            entry_time: '',
          }
        )

        this.$nextTick(function () {
          this.$refs['custom_status'].focus()
        })
      }
    },
    backDetail() {
      this.$router.push({params: {item: 'detail'}, query: {from: 'custom'}})
    },
  },
}
</script>

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
    margin-top: 32px;
  }
</style>
