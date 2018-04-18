<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" :option="option"></div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      },
      option: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        chart: null,
      }
    },
    mounted() {
      this.initChart()
      this.chart = null
    },
    watch: {
      option: {
        deep: true,
        handler() {
          this.chart = echarts.init(document.getElementById(this.id))
          if(this.chart) {
            setTimeout(() => {
              this.chart.setOption(this.option)
            }, 500)
          }
        },
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))
        this.chart.setOption(this.option)
      }
    }
  }
</script>

<style>

</style>
