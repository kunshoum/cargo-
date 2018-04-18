

<!--与arrivalstat合并-->


<!--<template>
  <div id="app">
    <div id="content">
      <div class="section">
        <h3>出港航班统计</h3>
        <div id="">
        	<bar-graph id="test" height="500px" width="1200px" :option="option" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import BarGraph from "@/pages/echarts/demo.vue"
export default {
  data() {
    return {
//  	data: [],
//  	data2: [],
      option: {
		    animation: false,
		    title: {
		        left: 'center',
		        text: '触屏 tooltip 和 dataZoom 示例',
		        subtext: '"tootip" and "dataZoom" on mobile device',
		    },
		    legend: {
		        top: 'bottom',
		        data:['意向']
		    },
		    tooltip: {
		        triggerOn: 'none',
		        position: function (pt) {
		            return [pt[0], 130];
		        }
		    },
		    toolbox: {
		        left: 'center',
		        itemSize: 25,
		        top: 55,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            restore: {}
		        }
		    },
		    xAxis: {
		        type: 'time',
		        // boundaryGap: [0, 0],
		        axisPointer: {
		            value: '2018-3-0',
		            snap: true,
		            lineStyle: {
		                color: '#004E52',
		                opacity: 0.5,
		                width: 2
		            },
		            label: {
		                show: true,
		                formatter: function (params) {
		                    return echarts.format.formatTime('yyyy-MM-dd', params.value);
		                },
		                backgroundColor: '#004E52'
		            },
		            handle: {
		                show: true,
		                color: '#004E52'
		            }
		        },
		        splitLine: {
		            show: false
		        }
		    },
		    yAxis: {
		        type: 'value',
		        axisTick: {
		            inside: true
		        },
		        splitLine: {
		            show: false
		        },
		        axisLabel: {
		            inside: true,
		            formatter: '{value}\n'
		        },
		        z: 10
		    },
		    grid: {
		        top: 110,
		        left: 15,
		        right: 15,
		        height: 160
		    },
		    dataZoom: [{
		        type: 'inside',
		        throttle: 50
		    }],
		    series: [
		        {
		            name:'模拟数据',
		            type:'line',
		            smooth: true,
		            symbol: 'circle',
		            symbolSize: 5,
		            sampling: 'average',
		            itemStyle: {
		                normal: {
		                    color: '#8ec6ad'
		                }
		            },
		            stack: 'a',
		            areaStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                        offset: 0,
		                        color: '#8ec6ad'
		                    }, {
		                        offset: 1,
		                        color: '#ffe'
		                    }])
		                }
		            },
	//	            data: [],
		            data: this.data
		        },
		        {
		            name:'模拟数据',
		            type:'line',
		            smooth:true,
		            stack: 'a',
		            symbol: 'circle',
		            symbolSize: 5,
		            sampling: 'average',
		            itemStyle: {
		                normal: {
		                    color: '#d68262'
		                }
		            },
		            areaStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                        offset: 0,
		                        color: '#d68262'
		                    }, {
		                        offset: 1,
		                        color: '#ffe'
		                    }])
		                }
		            },
	//	            data2: [],
		            data: this.data2
		        }
		    ]
	},
      oneStyle: '',
      statusValue: '',
      orderSelect: '',
      receiveValue: '',
      ticketValue: '',
      domesticValue: '',
    }
  },
  components: {
    BarGraph,
  },
  watch: {
  },
  mounted() {
  	this.demo();
  },
  methods: {
    demo() {
    	var base = +new Date(2018, 3, 0);
			var oneDay = 24 * 3600 * 1000;
			var valueBase = Math.random() * 300;
			var valueBase2 = Math.random() * 50;
			this.option.series[0].data = [];
			this.option.series[1].data = [];	
			
			
			for (var i = 1; i < 10; i++) {
			    var now = new Date(base += oneDay);
			    var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
					
			    valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
			    valueBase <= 0 && (valueBase = Math.random() * 300);
			    this.option.series[0].data.push([dayStr, valueBase]);
				
			    valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
			    valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
			    this.option.series[1].data.push([dayStr, valueBase2]);
			}
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  background: #fff;
  width: 100%;

  #content {
    height: 100%;
    padding: 50px 30px;

    .section {
      width: 100%;
      height: 100%;

      h3 {
        color: #000000;
        display: block;
        font-family: "Roboto Condensed";
        font-size: 3.6em;
        font-weight: normal;
        line-height: 0.8em;
        margin-bottom: 10px;
      }
    }
  }
}
</style>-->