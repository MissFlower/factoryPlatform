<!--
 * @Description: 概述
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 17:20:23
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-22 10:17:51
-->
<template>
  <div id="summary">
    <div v-for="(item, index) in navigations" :key="index">
      <div class="nav" @click="show(item)">
        <img :src="require('src/assets/icons/watch.svg')" alt="" class="nav-icon">
        <div class="title">{{ item.title }}</div>
        <i class="ml20" :class="item.flag ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" />
      </div>
      <template v-if="item.flag">
        <div v-for="(child, cIndex) in item.children" :key="index + cIndex">
          <div class="nav ml20 w180" @click="show(child)">
            <div class="title">{{ child.title }}</div>
            <i class="ml20" :class="child.flag ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" />
          </div>
          <template v-if="child.flag">
            <!-- 下级图表展示 -->
            <LineBarMixedChart v-if="child.value == 1 && lineBarData" :data="lineBarData" class="part p15" />
            <div class="part" v-if="child.value == 2">
              <PieChartBox v-for="(tdata, tIndex) in TData" :key="tIndex" :title="tdata.title" :datas="tdata.data" />
            </div>
            <template v-if="child.value > 2">
              <productLineData
                :requestCount="child.requestCount"
                :requestRate="child.requestRate ? child.requestRate : null"
                :requestDeviceSucRate="child.requestDeviceSucRate"
                :value="child.value"
                :product="child.product"
              />
            </template>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {
  getSamplingData,
  getClassisuProblemData,
  getSingleProcessTestDataByType,
  // getSucRateByType,
  getDeviceSucRateByType,
  getSPTestDataByS01,
  getSPSucRateDataByS01,
  getDeviceSucRateByS01,
  getSPTestDataByS02,
  getSPSucRateDataByS02,
  getDeviceSucRateByS02,
  getSingleProcessTestDataByT4,
  getDeviceSucRateByT4
} from '@/api/summary'

import { parseTime } from '@/utils'
// 概述
import LineBarMixedChart from './LineBarMixedChart'
import PieChartBox from './PieChartBox'
// import TableBarMixedChart from './TableBarMixedChart'
import productLineData from './ProductLineData'
export default {
  name: 'Summary',
  components: {
    LineBarMixedChart,
    PieChartBox,
    // TableBarMixedChart,
    productLineData
    // LineChart
  },
  data() {
    return {
      lineBarData: null, // 折线柱状数据
      TData: [],
      legendObj: {
        count: '送检数量',
        testCount: '抽检数量',
        sucCount: '合格数量',
        sucRate: '合格率'
      },
      part3: {
        chargeBoard: '充电板',
        commBoard: '通信板',
        device: '整机',
        smeifi: '半成品'
      },
      part3TestData: {
        testCount: '测试数量',
        sucCount: '合格数量'
      },
      part3Legend: {
        sucRateByMonth: '近一月',
        sucRate: '当日'
      },
      part3Data: null,
      part4Legend: {
        firstSucRate: '一次合格率',
        sucRate: '最终合格率'
      },
      part4TestData: {
        firstSucCount: '一次合格',
        sucCount: '最终合格'
      },
      part4Data: null,
      part5Legend: {
        sucRate: '30日整机合格率'
      },
      part5Data: null,
      navigations: [{
        title: '抽检数据',
        flag: true,
        children: [{
          title: '日抽检数据',
          flag: true,
          value: 1
        }, {
          title: '抽检问题数据',
          flag: false,
          value: 2
        }]
      }, {
        title: '产线数据',
        flag: false,
        children: [{
          title: 'T3产线数据',
          flag: false,
          value: 3,
          product: 'T3',
          requestCount: getSingleProcessTestDataByType,
          // requestRate: getSucRateByType,
          requestDeviceSucRate: getDeviceSucRateByType
        }, {
          title: 'T4产线数据',
          flag: false,
          value: 4,
          product: 'T4',
          requestCount: getSingleProcessTestDataByT4,
          // requestRate: getSucRateByType,
          requestDeviceSucRate: getDeviceSucRateByT4
        }, {
          title: 'T1产线数据',
          flag: false,
          value: 5,
          product: 'T1',
          requestCount: getSingleProcessTestDataByType,
          // requestRate: getSucRateByType,
          requestDeviceSucRate: getDeviceSucRateByType
        }, {
          title: 'S01产线数据',
          flag: false,
          value: 6,
          product: 'S01',
          requestCount: getSPTestDataByS01,
          requestRate: getSPSucRateDataByS01,
          requestDeviceSucRate: getDeviceSucRateByS01
        }, {
          title: 'S02产线数据',
          flag: false,
          value: 7,
          product: 'S02',
          requestCount: getSPTestDataByS02,
          requestRate: getSPSucRateDataByS02,
          requestDeviceSucRate: getDeviceSucRateByS02
        }]
      }]
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.getPart1()
      this.getPart2()
    },
    // 折叠隐藏函数
    show(row) {
      row.flag = !row.flag
    },
    getPart1() {
      getSamplingData().then(data => { // 抽检质量数据获取
        const dimensions = ['label', 'count', 'testCount', 'sucCount', 'sucRate']
        const list = data.samplingData ? data.samplingData : []
        if (list && list.length > 0) {
          const tableColumnLabel = []
          const tableData = []
          for (const key in this.legendObj) {
            const obj = {
              key,
              name: this.legendObj[key]
            }
            list.forEach(item => {
              // obj.factoryName = item.factoryName
              obj.label = item.factoryName
              if (item.modelName) {
                obj.label += `(${item.modelName})`
              }
              item.label = obj.label
              obj[item.label] = item[key]
              if (key === 'sucRate') {
                obj.type = 'sucRate'
                obj[item.label] += '%'
              }
              if (key.indexOf('Rate') > -1) {
                item[`${key}_`] = item[key] + '%'
              }
            })
            tableData.push(obj)
          }
          list.forEach(item => {
            tableColumnLabel.push(item.label)
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
            position: 'top'
          }
          this.lineBarData = {
            id: 'part1',
            title: parseTime(new Date(data.date), '{m}月{d}日') + '抽检质量数据',
            tableColumnLabel,
            tableData,
            list,
            colors,
            legendObj: this.legendObj,
            dimensions,
            legend: ['送检数量', '抽检数量', '合格数量', '合格率'],
            yData: [{
              type: 'value',
              name: '数量'
              // interval: 50
            }, {
              type: 'value',
              name: '合格率',
              min: 0,
              max: 100,
              interval: 10,
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
            }, {
              type: 'bar',
              barMaxWidth: 20,
              itemStyle,
              label
            }, {
              type: 'line',
              yAxisIndex: 1,
              itemStyle,
              label: {
                show: true,
                position: 'top',
                formatter: function(info) {
                  return info.value.sucRate_
                }
              }
            }]
          }
        }
      })
    },
    getPart2() {
      // 设备质量问题分类数据
      this.TData = []
      const types = ['byDay', 'byWeek', 'byMonth']
      getClassisuProblemData().then(data => {
        data.forEach((item, index) => {
          const obj = {
            title: item.name + '质量问题分类数据',
            data: []
          }
          this.TData.push(obj)
          const row = obj.data
          types.forEach(val => {
            const child = item[val]
            if (child) {
              const obj1 = {
                id: val + index,
                title: child.name,
                data: []
              }
              child.quList.forEach(c => {
                obj1.data.push({
                  value: c.quCount,
                  name: c.quName
                })
              })
              if (child.uploaded && child.count === 0) {
                // console.log(child.uploaded, child.count, '问题数为0')
                obj1.showTitle = '问题数为0'
              } else if (!child.uploaded) {
                // console.log(child.uploaded, '未上传该型号数据')
                obj1.showTitle = '未上传该型号数据'
              }
              row.push(obj1)
            }
          })
        })
        // console.log(this.TData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#summary {
  .p15 {
    padding: 15px;
  }
  .part {
    border: 15px solid #f8f8f8;
    background-color: #fff;
  }
  .part + .part {
    margin-top: 20px;
  }
  .ml20 {
    margin-left: 20px;
  }
  .w180 {
    width: 180px!important;
  }
  .nav {
    line-height: 40px;
    background: #7487e4;
    width: 200px;
    padding: 0 20px;
    color: #fff;
    margin-bottom: 15px;
    margin-top: 15px;
    display: flex;
    align-items: center;
    // justify-content: flex-end;
    .nav-icon {
      width: 18px;
      margin-right: 15px;
    }
    .title {
      flex: 1;
      text-align: right;
    }
  }
}

</style>
