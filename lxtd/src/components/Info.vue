<template>
  <div id="rightFlight">
    <transition name="fade">
      <div id="right_info" v-if="show">
        <div class="top" v-if="rightTemplate" align="center" v-show="showFlight">
          <el-button type="primary" style="margin:30px 0;" icon="el-icon-plus" @click="install">添加</el-button>
          <el-table :data="tableData" style="width: 100%" @row-click="flightSearch">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="flight_top" v-if="detailInfo">
                  <div class="flight_line" :style="{height: lineHeight}"></div>
                  <dl class="flight_list">
                    <dt>
                      <div class="left">
                        <span class="blue_circle one">1</span>
                        <p class="weather one">{{ detailInfo[0].city }}</p>
                      </div>
                      <div class="right">
                        <div>{{ detailInfo[0].A.replace(/null/g,"暂无") }}</div>
                        <div>{{ detailInfo[0].B.replace(/null/g,"暂无") }}</div>
                        <div>{{ detailInfo[0].C.replace(/null/g,"暂无") }}</div>
                      </div>
                      <div class="left">
                        <span class="blue_circle two">2</span>
                        <p class="weather two">{{ detailInfo[1].city }}</p>  
                      </div>
                      <div class="right">
                        <div>{{ detailInfo[1].A.replace(/null/g,"暂无") }}</div>
                        <div>{{ detailInfo[1].B.replace(/null/g,"暂无") }}</div>
                        <div>{{ detailInfo[1].C.replace(/null/g,"暂无") }}</div>
                      </div>
                      <div class="left" v-if="detailInfo[2]">
                        <span class="blue_circle three">3</span>
                        <p class="weather three">{{ detailInfo[2].city }}</p>  
                      </div>
                      <div class="right">
                        <div v-if="detailInfo[2]">{{ detailInfo[2].A.replace(/null/g,"暂无") }}</div>
                        <div v-if="detailInfo[2]">{{ detailInfo[2].B.replace(/null/g,"暂无") }}</div>
                        <div v-if="detailInfo[2]">{{ detailInfo[2].C.replace(/null/g,"暂无") }}</div>
                      </div>
                    </dt>  
                  </dl>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="航班号" prop="flightNo">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="添加航班号" :visible.sync="dialogTableVisible" width="20%" align="center" append-to-body>
          <el-table :data="gridData" size="small">
            <el-table-column prop='flight_num' label="航班号" width="200">
              <template slot-scope="scope">
                <div slot="reference">
                  <el-input size="mini" v-model="scope.row.flight_num"></el-input>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel" size="mini">取 消</el-button>
            <el-button type="primary" @click="total" size="mini">确 定</el-button>
          </div>
        </el-dialog>

        <div v-if="rightTemplate" class="bottom">
          <div class="flight_thumb" v-if="detailInfo">
            <div class="line_length" :style="{width: lineWidth}"></div>
            <dl class="flight_list flight_Demo">
              <dt>
                <div>
                  <span class="blue_circle weatherOne"></span>
                  <p class="weather">{{ detailInfo[0].air[0] }}</p>  
                  <p>
                    <span>{{ detailInfo[0].air[1] }}</span>
                    <span>{{ detailInfo[0].air[2] }}</span>
                  </p>
                </div>
                <div>
                  <span class="blue_circle weatherTwo"></span>
                  <p class="weather">{{ detailInfo[1].air[0] }}</p>  
                  <p>
                    <span>{{ detailInfo[1].air[1] }}</span>
                    <span>{{ detailInfo[1].air[2] }}</span>
                  </p>
                </div>
                <div v-if="detailInfo[2]">
                  <span class="blue_circle weatherThree"></span>
                  <p class="weather">{{ detailInfo[2].air[0] }}</p>  
                  <p>
                    <span>{{ detailInfo[2].air[1] }}</span>
                    <span>{{ detailInfo[2].air[2] }}</span>
                  </p>
                </div>
              </dt>  
            </dl>
          </div>
        </div>
        <div id="botemplate">
          <div id="bottomTemplate">
            <el-button type="primary" icon="el-icon-plus" @click="saveTemplate">添加组件</el-button>
          </div>
          <el-dialog title="添加组件" :visible.sync="dialogVisible" width="20%" align="center" append-to-body>
            <template>
              <el-checkbox v-model="checked">航班查询</el-checkbox>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel" size="mini">取 消</el-button>
              <el-button type="primary" @click="sure" size="mini">确 定</el-button>
            </div>
          </el-dialog>  
        </div> 
      </div>
    </transition>
    <i class="switch_show" @click="switchShow" :style="{right: right}" :class="icon"></i>
    
  </div>
</template>

<script>
import { listFlightInfo, listModule, saveModule, insertFlight, deleteFlight } from '@/service/index.js'
import { getDate, } from "../utils/time"
export default {
  data() {
    return {
      lineHeight: '100%',      
      lineWidth: '50%',
      show: false,
      showFlight: false,
      right: 0,
      rightTemplate: true,
      icon: "el-icon-d-arrow-left",
      dialogTableVisible: false,
      dialogVisible: false,
      gridData: [
        {
          flight_num: "",
        },
      ],
      tableData: [
        // {
        //   flight_num: "",
        // },
      ],
      flightData: '',
      two_flight_code: '',
      flight_num: '',
      currPage: 1,
      detailInfo: null,
      flightNum: "",
      flightTwoWords: "",
      ids: '',
      checked: true,
      isEffec: '',
    }
  },
  mounted() {
    this.rightSearch()
  },
  methods: {
    // 图标位置
    switchShow() {
      this.show = !this.show
      if (this.show) {
        this.right = "380px"
        setTimeout(() => {
          this.icon = "el-icon-d-arrow-right"
        }, 600)
      } else {
        this.right = "0px"
        setTimeout(() => {
          this.icon = "el-icon-d-arrow-left"
        }, 600)
      }
    },
    rightSearch() {
      listModule({
        userId: this.$getStore("userId")
      }).then(res => {
        this.tableData = res.data.data[0].flightModules
        this.ids = res.data.data[0].moduleIds[0].id
        this.isEffec = res.data.data[0].moduleIds[0].isEffective
        if(this.isEffec == 1) {
          this.showFlight = true
        }else {
          this.showFlight = false
        }
      })
    },
    flightSearch(row, event, column) {
      listFlightInfo({
        two_flight_code: row.flightTwoWords,
        flight_num: row.flightNum,
        startDate: getDate(),
        startTime: '00:00:00',
        endTime: '23:59:59',
        endDate: getDate(),
        currPage: this.currPage
      }).then(res => {
        if(res.data.status === 200) {
          setTimeout(() => {
            this.loading = false
            this.detailInfo = res.data.data[0].list[0].infoList
            if(this.detailInfo.length === 2) {
              this.lineHeight = '65%'
              this.lineWidth = '33%'
            }else {
              this.lineHeight = '100%'
              this.lineWidth = '68%'
            }
          }, this.loadingTime)
        }else {
          this.loading = false
          // this.$message({
          //   type: 'warning',
          //   message: res.data.message,
          // })
        }
      })
    },
    // 添加航班
    install() {
      this.dialogTableVisible = true
    },
    // 取消
    cancel() {
      this.dialogTableVisible = false
      this.dialogVisible = false
    },
    // 确定
    total() {
      this.flightData = this.tableData.map(item => item.flightNo)
      if(new Set(this.flightData).has(this.gridData[0].flight_num) === false) {
        if(this.gridData[0].flight_num !== '') {
          insertFlight({
            flightNo: this.gridData[0].flight_num,
            // moduleId: 1,
            moduleId: this.ids
          }).then(res => {
            if(res.data.status === 200) {
              this.dialogTableVisible = false
              if(this.gridData[0].flight_num != '') {
                this.tableData.push({
                  flight_num: this.gridData[0].flight_num,
                })
                this.rightSearch()
                this.flightSearch()
                this.rightTemplate = false
              }
            }
          }) 
        }
      }else {
        this.$message({
          type: 'warning',
          message: '已有此航班'
        })
      }
      
    },
    // 添加组件
    saveTemplate() {
      this.dialogVisible = true
    },
    // 确定
    sure() {
      this.dialogVisible = false
      saveModule({
        moduleType: 0,
        userId: this.$getStore("userId"),
        isEffective: 1,
      }).then(res => {
        // console.log(res.data)
        if(res.data.status === 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          })
          this.showFlight = true
        }
      })
    },
    // 删除
    handleDelete(index, row) {
      deleteFlight({
        flightNo: row.flightNo,
        // moduleId: 1
        moduleId: this.ids
      }).then(res => {
        this.tableData.splice(index, 1)
      })
    },
  },
}
</script>

<style lang="less">
.el-table__expanded-cell{
  padding: 20px 20px !important;
}
.flight_top {
    position: relative;
    display: flex;
    height: 220px;
    justify-content: space-between;
    margin: 0 0 50px 0;

    .flight_line {
      position: absolute;
      top: 1%;
      left: 26PX;
      transform: translateX(-50%);
      width: 5px;
      height: 100%;
      background-color: #00bbff;
    }
  

  .flight_list {
    position: relative;
    .left{
      span {
        font-weight: bold;
        display: block;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
      }
      .blue_circle {
        position: relative;
        left: 6px;
        border-radius: 50%;
        border: 5px solid #00bbff;
        width: 30px;
        height: 30px;
        top: -2px;
        margin: 0 auto 10px;
        background-color: #fff;
        z-index: 9;
        color: #00bbff;
      }
      .one{
        position: absolute;
        top: 2px;
      }
      .two{
        position: absolute;
        top: 50%;
      }
      .three{
        position: absolute;
        top: 100%;
      }
      .weather{
        margin-left: 50px;
        margin-top: 12px;
        font-size: 16px;
      }
      
    }
    dt{
      justify-content: space-around;
      padding: 8px 0;
    }

    .right{
      float: right;
      line-height: 30px;
      margin: -20px 0 32px 130px;
      width: 124px;
    }
  }
}



.fade-enter-active, .fade-leave-active {
  transition: all 600ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(380px);
}
#right_info {
  position: fixed;
  right: 0;
  width: 380px;
  height: 100%;
  background: #697a92;
  z-index: 1000;
  overflow: auto;
}
.switch_show {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  cursor: pointer;
  z-index: 9999;
  animation: move 2.5s infinite;
  transition: 1s;
}

@keyframes move {
  0% {
    transform: translateX(-3px) translateY(-50%);
  }
  50% {
    transform: translateX(3px) translateY(-50%);
  }
  100% {
    transform: translateX(-3px) translateY(-50%);
  }
}
#rightFlight .top {
  width: 100%;
  height: auto;
  padding-bottom: 50px;
  border-bottom: 1px solid rgb(166, 177, 176);
}
#rightFlight .bottom {
  width: 100%;
  height: 30%;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

.flight_thumb {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;

  .flight_Demo {
    position: absolute;
    margin-left: 20px;
    top: 16px;
    left: 20%;
    transform: translateX(-20%);
    width: 80%;
    height: 5px;
    background-color: #00bbff;
    // .weatherOne {
    //   left: 0;
    // }
    // .weatherTwo {
    //   left: 40%;
    // }
    // .weatherThree {
    //   right: 0px;
    // }
    span {
      display: block;
      text-align: center;
    }
    .line_length {
      width: 100%;
    }
    .blue_circle {
      position: absolute;
      border-radius: 50%;
      border: 5px solid #00bbff;
      width: 30px;
      height: 30px;
      top: -20px;
      margin: 0 auto 12px;
      background-color: #fff;
      z-index: 9;
    }
    dt {
      border-radius: 5px 5px 0 0;
      margin-top: 50px;
      // border-top: .2em solid #00B5AD !important;
      div {
        margin: 0 10px;
        .weather {
          line-height: 48px;
          margin-right: 15px;
          margin-left: -14px;
        }
        display: flex;
        justify-content: space-around;
        p {
          span {
            display: block;
          }
        }
      }
    }
    dt{
      display: flex;
      justify-content: space-around;
      padding: 4px 0;
      // border: 1px solid rgba(34,36,38,.1);
    }
  }
}
// .weatherTwo {
//   left: 6px;
// }
#botemplate{
  width: 100%;
  height: 20%;
  text-align: center;

  #bottomTemplate{
    z-index: 999;
    margin-top: 20px;
  }
}
</style>
