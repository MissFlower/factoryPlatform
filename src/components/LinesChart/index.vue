<!--
 * @Description: LinesChart 折线图
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-03 13:12:47
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-24 15:52:14
-->
<template>
  <div id="linesChart" class="lines-chart" />
</template>

<script>
// 折线图
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')
// 引入提示框和标题组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/grid')
import resize from '@/utils/resize'

export default {
  name: 'LinesChart',
  mixins: [resize],
  props: {
    datas: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      echartInstance: null,
      title: '',
      left: 'center'
    }
  },
  watch: {
    datas: {
      handler(datas) {
        const { legend, xAxis, series } = datas
        this.initChart(legend, xAxis, series)
      }
    },
    visible: {
      handler(visible) {
        if (visible) {
          const { legend, xAxis, series } = this.datas
          this.initChart(legend, xAxis, series)
        }
      }
    }
  },
  mounted() {
    if (this.datas) {
      const { legend, xAxis, series } = this.datas
      this.initChart(legend, xAxis, series)
    }
  },
  destroyed() {
    this.echartInstance.dispose()
    this.echartInstance = null
  },
  methods: {
    initChart(legend, xAxis, series) {
      // 初始化
      this.title = !legend.length ? '暂无数据' : ''
      if (this.echartInstance) {
        this.echartInstance.dispose()
        this.echartInstance = null
      }
      this.echartInstance = echarts.init(document.getElementById('linesChart'))
      this.echartInstance.setOption(this.getOptions(legend, xAxis, series))
    },
    drawChart() {
      // 绘图
      this.echartInstance.setOption()
    },
    getOptions(legend, xAxis, series) {
      // 配置
      return {
        title: {
          text: this.title,
          left: this.left
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(info) {
            const arr = []
            info.forEach((item, index) => {
              if (index === 0) {
                arr.push(`<div>${item.axisValue}</div>`)
              }
              let str = ''
              const serieData = series[item.seriesIndex]
              str = `<div style="flex: 1;margin-right: 10px;">${item.seriesName}：</div><div style="font-weight: 700; color: #333;">${serieData.unit ? item.data * 100 + serieData.unit : item.data}</div>`
              arr.push(`<div style="display: flex;align-items: center;">${item.marker} ${str}</div>`)
            })
            return `<div style="font-size: 12px; line-height: 30px;">${arr.join('')}</div>`
          }
        },
        legend: {
          type: 'scroll',
          data: legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: series
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lines-chart {
  width: 100%;
  height: 450px;
}
</style>
