<template>
  <div id="arrivalstat">
    <div id="content-arr">
      <div class="section-arr">
        <h3>进出港航班统计</h3>
				<div class="prompt-color">
					<ul>
						<li><span class="color-arrival"></span></li>
						<li><a href="#">进港</a></li>
					</ul>
					<ul>
						<li><span class="color-depart"></span></li>
						<li><a href="#">出港</a></li>
					</ul>
				</div>
        <div id="">
        	<bar-graph id="test" height="500px" width="1100px" :option="option" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts"
import BarGraph from "@/pages/echarts/demo.vue"
export default {
  data() {
    return {
      option: {
        animation: false,
        //		    title: {
        //		        left: 'center',
        //		        text: '触屏 tooltip 和 dataZoom 示例',
        //		        subtext: '"tootip" and "dataZoom" on mobile device',
        //		    },
        legend: {
          top: "bottom",
          data: ["意向"],
        },
        tooltip: {
          trigger: "axis",
          default: true,
        },
        //		    toolbox: {
        //		        left: 'center',
        //		        itemSize: 25,
        //		        top: 55,
        //		        feature: {
        //		            dataZoom: {
        //		                yAxisIndex: 'none'
        //		            },
        //		            restore: {}
        //		        }
        //		    },
        xAxis: {
          type: "time",
          // boundaryGap: [0, 0],
          axisPointer: {
            value: "2018-3-0",
            snap: true,
            lineStyle: {
              color: "#004E52",
              opacity: 0.5,
              width: 2,
            },
            label: {
              show: true,
              formatter: function(params) {
                return echarts.format.formatTime("yyyy-MM-dd", params.value)
              },
              backgroundColor: "#004E52",
            },
            handle: {
              //		                show: true,
              //		                color: '#004E52'
            },
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            inside: true,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            inside: true,
            formatter: "{value}\n",
          },
          z: 10,
        },
        grid: {
          top: 110,
          left: 15,
          right: 15,
          height: 320,
        },
        dataZoom: [
          {
            type: "inside",
            throttle: 50,
          },
        ],
        series: [
          {
            name: "进港航班统计",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            sampling: "average",
            itemStyle: {
              normal: {
                color: "#F8E71C",
              },
            },
            stack: "a",
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#F8FB49",
                  },
                  {
                    offset: 1,
                    color: "#ffe",
                  },
                ]),
              },
            },
            data: this.data,
          },
          {
            name: "出港航班统计",
            type: "line",
            smooth: true,
            stack: "a",
            symbol: "circle",
            symbolSize: 5,
            sampling: "average",
            itemStyle: {
              normal: {
                color: "#54A2FD",
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#53A0FD",
                  },
                  {
                    offset: 1,
                    color: "#ffe",
                  },
                ]),
              },
            },
            data: this.data2,
          },
        ],
      },
      oneStyle: "",
      statusValue: "",
      orderSelect: "",
      receiveValue: "",
      ticketValue: "",
      domesticValue: "",
    }
  },
  components: {
    BarGraph,
  },
  watch: {},
  mounted() {
    this.demo()
  },
  methods: {
    demo() {
      var base = +new Date(2018, 3, 0)
      var oneDay = 24 * 3600 * 1000
      var valueBase = Math.random() * 300
      var valueBase2 = Math.random() * 300
      this.option.series[0].data = []
      this.option.series[1].data = []
      console.log(this.option.series[0].data)

      for (var i = 1; i < 31; i++) {
        var now = new Date((base += oneDay))
        var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("-")

        valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase)
        valueBase <= 0 && (valueBase = Math.random() * 300)

        this.option.series[0].data.push([dayStr, valueBase])

        valueBase2 = Math.round((Math.random() - 0.8) * 30 + valueBase2)
        valueBase2 <= 0 && (valueBase2 = Math.random() * 40)

        this.option.series[1].data.push([dayStr, valueBase2])
      }
    },
  },
}
</script>
<style lang="less" scoped>
#arrivalstat {
  height: 100% !important;
  width: 100% !important;
  min-width: 320px;
  min-height: 264px;
  margin: 0px;
  padding: 0px;

  .el-table th>.cell {
    color: #00548A !important;
    white-space: nowrap !important;
  }
  .el-form-item__label {
    color: #00548A !important;
  }

  #content-arr {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    margin-top: 80px;
    height: 100%;
    background: #ffffff;
    box-shadow: 2px 2px 20px 0 #bec2c9;
    border-radius: 30px;
    padding: 0 3.3%;
    padding-bottom: 50px;
		text-align: center;
		
		.section-arr {
			position: relative;
			.prompt-color {
				position: absolute;
				right: 152px;
				top: 50px;

				ul {
					display: flex;
					justify-content: center;

					li {
						margin-top: 10px;
						span {
							margin-right: 10px;
							display: inline-block;
							width: 60px;
							height: 20px;
							opacity: 0.8;
						}
						a {
							text-decoration: none;
							font-family: SIL-Hei-Med-Jian;
							font-size: 12px;
							color: #00548A;
						}
						.color-arrival {
							background-image: linear-gradient(-180deg, #F8FB49 0%, rgba(255,255,255,0.00) 100%);
							border: 1px solid #FFDF00;
						}
						.color-depart {
							background-image: linear-gradient(-180deg, #53A0FD 0%, rgba(255,255,255,0.64) 100%);
							border: 1px solid #4A90E2;
						}
					}
				}
			}
		}

    h3 {
      color: #00335d;
      display: block;
      font-size: 30px;
      margin-top: 20px;
      opacity: 100%;
      padding-top: 20px;
    }
    
  }
}
</style>