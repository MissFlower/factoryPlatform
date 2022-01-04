<!--
 * @Description: PieChart 饼图组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 19:03:23
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-03 11:17:01
-->
<template>
  <div :id="id" class="pie-chart" />
</template>

<script>
import resize from '../mixins/resize'

// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/chart/pie')

export default {
  name: 'PieChart',
  mixins: [resize],
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    emptyTitle: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {
      chart: null,
      emptySeries: [
        {
          type: 'pie',
          radius: '55%',
          cursor: 'default',
          label: {
            position: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14
          },
          itemStyle: {
            color: '#ddd'
          },
          emphasis: {
            itemStyle: {
              color: '#ddd'
            }
          },
          hoverAnimation: false,
          labelLine: {
            show: false
          },
          data: [{ value: 0, name: '暂无数据' }]
        }]
    }
  },
  mounted() {
    this.initChart()
    this.drawChart(this.data)
  },
  methods: {
    initChart() {
      // 初始化
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
      this.chart = echarts.init(document.getElementById(this.id))
      // this.chart.setOption(this.getOptions())
    },
    drawChart(data) {
      // 绘图
      const tooltip = {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      }
      const obj = {
        title: {
          text: this.title,
          left: 'center'
        },
        tooltip: data.length ? tooltip : {
          show: false
        },
        series: [{
          name: this.title,
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: data.length ? data : [{ value: 335, name: '暂无数据' }],
          labelLine: {
            length: 5,
            length2: 3
          },
          // label: {
          //   formatter: function(info) {
          //     console.log(info)
          //     let str = info.name
          //     str += ` ${info.percent}%`
          //     return str
          //   }
          // },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      if (data.length === 0) {
        this.emptySeries[0].data = [{ value: 0, name: this.emptyTitle }]
        obj.series = this.emptySeries
      }
      this.chart.setOption(obj)
    },
    getOptions() {
      // 配置
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        // },
        series: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
