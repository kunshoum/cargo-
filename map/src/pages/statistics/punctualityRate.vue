<template>
  <div id="punctuality">
    <div class="section-punctuality">
	  <!-- <h3>航班准点率</h3> -->
	  <!-- <br /> -->
	  <h4>航班准点率</h4>
	  <div id="">
		<bar-graph id="test" height="500px" width="1100px" :option="option" />
	  </div>
	  <h4>入港航班准点率</h4>
	  <div id="">
		<bar-graph id="test1" height="500px" width="1200px" :option="option2" />
	  </div>
	  <h4>出港航班准点率</h4>
	  <div id="">
		<bar-graph id="test2" height="500px" width="1200px" :option="option3" />
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
        legend: {
          top: "bottom",
          data: ["意向"],
        },
        tooltip: {
          trigger: "axis",
          default: true,
        },
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
            handle: {},
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
            name: "西安进港航班准点率",
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
            //	            data: [],
            data: this.data,
          },
          {
            name: "西安出港航班准点率",
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
            //	            data2: [],
            data: this.data2,
          },
        ],
      },
      option2: {
        animation: false,
        legend: {
          top: "bottom",
          data: ["意向"],
        },
        tooltip: {
          trigger: "axis",
          default: true,
        },
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
            handle: {},
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
            name: "西安进港航班准点率",
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
            //	            data: [],
            data: this.data,
          },
          {
            name: "西安出港航班准点率",
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
            //	            data2: [],
            data: this.data2,
          },
        ],
      },
      option3: {
        animation: false,
        legend: {
          top: "bottom",
          data: ["意向"],
        },
        tooltip: {
          trigger: "axis",
          default: true,
        },
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
            handle: {},
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
            name: "西安进港航班准点率",
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
            //	            data: [],
            data: this.data,
          },
          {
            name: "西安出港航班准点率",
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
            //	            data2: [],
            data: this.data2,
          },
        ],
      },
    }
  },
  components: {
    BarGraph,
  },
  watch: {},
  mounted() {
	this.demo()
	this.demo2()
	this.demo3()
  },
  methods: {
    demo() {
      var base = +new Date(2018, 3, 0)
      var oneDay = 24 * 3600 * 1000
      var valueBase = Math.random() * 300
      var valueBase2 = Math.random() * 50
      this.option.series[0].data = []
      this.option.series[1].data = []

      for (var i = 1; i < 10; i++) {
        var now = new Date((base += oneDay))
        var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("-")

        valueBase = Math.round((Math.random() - 0.8) * 20 + valueBase)
        valueBase <= 0 && (valueBase = Math.random() * 300)
        this.option.series[0].data.push([dayStr, valueBase])

        valueBase2 = Math.round((Math.random() - 0.9) * 20 + valueBase2)
        valueBase2 <= 0 && (valueBase2 = Math.random() * 50)
        this.option.series[1].data.push([dayStr, valueBase2])
      }
	},
	demo2() {
      var base = +new Date(2018, 3, 0)
      var oneDay = 24 * 3600 * 1000
      var valueBase = Math.random() * 300
      var valueBase2 = Math.random() * 50
      this.option2.series[0].data = []
      this.option2.series[1].data = []

      for (var i = 1; i < 10; i++) {
        var now = new Date((base += oneDay))
        var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("-")

        valueBase = Math.round((Math.random() - 0.8) * 20 + valueBase)
        valueBase <= 0 && (valueBase = Math.random() * 300)
        this.option2.series[0].data.push([dayStr, valueBase])

        valueBase2 = Math.round((Math.random() - 0.8) * 20 + valueBase2)
        valueBase2 <= 0 && (valueBase2 = Math.random() * 50)
        this.option2.series[1].data.push([dayStr, valueBase2])
      }
	},
	demo3() {
      var base = +new Date(2018, 3, 0)
      var oneDay = 24 * 3600 * 1000
      var valueBase = Math.random() * 300
      var valueBase2 = Math.random() * 50
      this.option3.series[0].data = []
      this.option3.series[1].data = []

      for (var i = 1; i < 10; i++) {
        var now = new Date((base += oneDay))
        var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("-")

        valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase)
        valueBase <= 0 && (valueBase = Math.random() * 300)
        this.option3.series[0].data.push([dayStr, valueBase])

        valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2)
        valueBase2 <= 0 && (valueBase2 = Math.random() * 50)
        this.option3.series[1].data.push([dayStr, valueBase2])
      }
    },
  },
}
</script>

<style lang="less" scoped>
#punctuality {
  background: #fff;
  width: 100%;
  margin-bottom: 30px;
  overflow-y: scroll;
  max-height: 760px;
  padding-bottom: 50px;
  &::-webkit-scrollbar {
    width: 0px;
  }

  .section-punctuality {
	  width: 100%;
    max-width: 1200px;
    margin: auto;
    // margin-top: 80px;
    height: 100%;
    background: #ffffff;
    box-shadow: 2px 2px 20px 0 #bec2c9;
    border-radius: 30px;
    text-align: center;
    padding: 10px 3.3% 0 3.3%;
    padding-bottom: 50px;
    margin-top: 20px;

	  h3 {
      color: #00335D;
      display: block;
      font-size: 30px;
      margin-top: 20px;
      opacity: 100%;
      padding-top: 20px;
    }
  }
}
</style>