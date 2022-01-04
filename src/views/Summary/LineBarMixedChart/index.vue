<!--
 * @Description: LineBarMixedChart 折线柱状混合图表
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-03 10:12:58
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-08 16:02:58
-->
<template>
  <div>
    <div :id="data.id" class="line-bar-chart" :style="{'height': data.height ? data.height + 'px' : '500px'}" />
    <ElTable :data="data.tableData" border style="margin-top: 20px;">
      <ElTableColumn width="160" fixed="left">
        <template slot-scope="{row}">
          <div
            class="colorShow"
            :class="row.type ? 'colorShowLine' : 'colorShowBar'"
            :style="{'background': data.colors[row.key], 'border-color': data.colors[row.key]}"
          />
          {{ row.name }}
        </template>
      </ElTableColumn>
      <ElTableColumn
        v-for="key in data.tableColumnLabel"
        :key="key"
        :label="key"
        min-width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row[key] }}
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script>
import resize from '../mixins/resize'

// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
export default {
  name: 'LineBarMixedChart',
  mixins: [resize],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      colorObj: {},
      list: []
    }
  },
  mounted() {
    if (this.data) {
      this.initChart()
    }
  },
  methods: {
    initChart() {
      // 初始化
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
      this.chart = echarts.init(document.getElementById(this.data.id))
      this.chart.setOption(this.getOptions())
    },
    getOptions() {
      const data = this.data
      // console.log(data)
      const yAxis = []
      this.data.yData.forEach(item => {
        if (item.unit) {
          item.axisLabel = {
            formatter: function(value) {
              return value + ' ' + item.unit
            }
          }
        }
        yAxis.push(item)
      })
      const obj = {
        title: {
          text: this.data.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(info) {
            const arr = []
            if (info.length > 0) {
              info.forEach((item, index) => {
                if (index === 0) {
                  arr.push(`<div>${data.xAxisObj ? data.xAxisObj[item.axisValue] : item.axisValue}</div>`)
                }
                arr.push(`<div class="mt10">${item.marker}<span>${data.legendObj ? data.legendObj[item.seriesName] : item.seriesName}：</span><span class="ml10">${item.value[`${item.seriesName}_`] ? item.value[`${item.seriesName}_`] : item.value[item.seriesName]}</span></div>`)
              })
            }
            return `<div class="f12 lh16">${arr.join('')}</div>`
          },
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          top: 50,
          right: 20,
          formatter: function(name) {
            if (data.legendObj) {
              return data.legendObj[name]
            } else {
              return name
            }
          }
        },
        grid: {
          left: data.chartLeft ? data.chartLeft : 0,
          right: 10,
          bottom: 0,
          top: 120,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              formatter: function(value, index) {
                if (data.xAxisObj) {
                  return data.xAxisObj[value]
                } else {
                  return value
                }
              }
            },
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: yAxis,
        dataset: {
          dimensions: data.dimensions,
          source: data.list
        },
        series: data.series
      }
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
.mt10 {
  margin-top: 10px;
}
.ml10 {
  margin-left: 10px;
}
.f12 { font-size: 12px; }
.lh16 { line-height: 16px; }
.line-bar-chart {
  width: 100%;
  height: 500px;
}
.colorShow {
  display: inline-block;
  width: 30px;
}
.colorShowBar {
  height: 5px;
}
.colorShowLine {
  height: 2px;
  position: relative;
}
.colorShowLine::after {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: 2px solid;
  border-color: inherit;
  background: #fff;
  position: absolute;
  left: calc(50% - 3px);
  top: -3px;
}
</style>
