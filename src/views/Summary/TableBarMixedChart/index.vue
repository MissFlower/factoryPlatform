<!--
 * @Description: TableBarMixedChart 表格柱状图混合图表
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-03 10:34:47
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-18 14:57:06
-->
<template>
  <div class="table-bar-container">
    <div class="report-list-box">
      <p class="report-title">{{ data.title }}</p>
      <ElTable :data="data.tableData" border :show-header="data.showHeaderFlag">
        <ElTableColumn
          v-for="(item, index) in data.tableCols"
          :key="index"
          :label="item.label ? item.label : ''"
          :prop="item.prop"
        />
      </ElTable>
    </div>
    <BarEchart class="pass-rate" v-if="lineBarData" :data="lineBarData" />
  </div>
</template>

<script>
import BarEchart from '../LineBarMixedChart'

export default {
  name: 'TableBarMixedChart',
  components: {
    BarEchart
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      lineBarData: null,
      echartInstance: null,
      testData: []
    }
  },
  mounted() {
    if (this.data) {
      this.testData = this.data.tableData
      this.initFun()
    }
  },
  methods: {
    initFun() {
      if (this.data.chartData) {
        const list = []
        const data = this.data.chartData
        for (const key in data) {
          const obj = {
            name: key
          }
          const row = data[key]
          for (const cKey in row) {
            obj[cKey] = row[cKey]
          }
          list.push(obj)
        }
        const tableColumnLabel = []
        const tableData = []
        for (const key in this.data.legendObj) {
          const obj = {
            key,
            name: this.data.legendObj[key]
          }
          list.forEach(item => {
            obj.xname = item.name
            obj[this.data.part3[item.name] + this.data.tableLabel] = item[key] + '%'
            obj.type = 'bar'
            if (key.indexOf('Rate') > -1) {
              item[`${key}_`] = item[key] + '%'
            }
          })
          tableData.push(obj)
        }
        list.forEach(item => {
          tableColumnLabel.push(this.data.part3[item.name] + this.data.tableLabel)
        })
        const colors = {}
        const itemStyle = {
          color: function(info) {
            if (!colors[info.seriesName]) {
              colors[info.seriesName] = info.color
            }
            return info.color
          }
        }
        const label = {
          show: true,
          position: 'top',
          formatter: function(info) {
            const str = info.seriesName + '_'
            return info.value[str]
          }
        }
        this.lineBarData = {
          id: this.data.id,
          height: 360,
          title: this.data.chartTitle,
          tableColumnLabel,
          tableData,
          list,
          colors,
          xAxisObj: this.data.part3,
          dimensions: this.data.dimensions,
          legendObj: this.data.legendObj,
          legend: ['近一月', '当日'],
          yData: [{
            type: 'value',
            name: '合格率',
            unit: '%'
          }],
          series: [{
            type: 'bar',
            barMaxWidth: 20,
            itemStyle,
            label
          }, {
            type: 'bar',
            barMaxWidth: 20,
            itemStyle,
            label
          }]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-bar-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 580px;

  .report-list-box {
    width: 320px;
    height: 100%;
    text-align: center;
    border: 15px solid #f8f8f8;
    padding: 15px;

    .report-title {
      height: 36px;
      line-height: 36px;
      font-weight: bold;
      font-size: 18px;
      color: #333;
      margin-bottom: 76px;
    }
  }
  .pass-rate {
    margin-left: 20px;
    width: calc(100% - 320px);
    height: 100%;
    border: 15px solid #f8f8f8;
    padding: 15px;
  }
}
</style>
