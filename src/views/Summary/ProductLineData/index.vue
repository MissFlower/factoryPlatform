<template>
  <div class="wp100">
    <TableBarMixedChart v-if="part3Data" :data="part3Data" style="margin-top: 20px;" />
    <TableBarMixedChart v-if="part4Data" :data="part4Data" style="margin-top: 20px;" />
    <LineBarMixedChart v-if="part5Data" :data="part5Data" class="part p15" style="margin-top: 20px;" />
  </div>
</template>

<script>
import TableBarMixedChart from '../TableBarMixedChart'
import LineBarMixedChart from '../LineBarMixedChart'
export default {
  components: {
    TableBarMixedChart,
    LineBarMixedChart
  },
  props: {
    requestCount: {
      type: Function,
      require: true,
      default: () => {}
    },
    requestRate: {
      type: Function,
      default: () => {}
    },
    requestDeviceSucRate: {
      type: Function,
      require: true,
      default: () => {}
    },
    value: {
      type: Number,
      default: 0
    },
    product: {
      type: String,
      default: 'T1'
    }
  },
  data() {
    return {
      part3Data: null,
      part3: {
        chargeBoard: '充电板',
        commBoard: '通信板',
        device: '整机',
        smeifi: '半成品',
        complete: '整机',
        semiProduct: '半成品'
      },
      part3TestData: {
        testCount: '测试数量',
        sucCount: '合格数量'
      },
      part3Legend: {
        sucRateByMonth: '近一月',
        sucRate: '当日'
      },
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
      part5Data: null
    }
  },
  mounted() {
    this.getPart3()
    if (this.requestRate) {
      this.getPart4()
    }
    this.getPart5()
  },
  methods: {
    getPart3() {
      this.requestCount(this.product).then(data => {
        if (!this.requestRate) {
          this.dealDataForPart4(data)
        }
        const list = []
        for (const key in this.part3) {
          if (data[key]) {
            const row = data[key]
            for (const key1 in this.part3TestData) {
              list.push({
                name: this.part3[key] + this.part3TestData[key1],
                value: row[key1]
              })
            }
          }
        }
        this.part3Data = {
          id: `part3${this.value}`,
          title: `当日${this.product}产投测试数据`,
          chartTitle: `${this.product}单工序合格率数据`,
          dimensions: ['name', 'sucRateByMonth', 'sucRate'],
          tableLabel: '测试合格率',
          tableData: list,
          chartData: data,
          part3: this.part3,
          legendObj: this.part3Legend,
          tableCols: [{
            label: '',
            prop: 'name'
          }, {
            label: '',
            prop: 'value'
          }],
          showHeaderFlag: false
        }
      })
    },
    getPart4() {
      this.requestRate(this.product).then(data => {
        console.log('----4----')
        console.log(data)
        this.dealDataForPart4(data)
      })
    },
    dealDataForPart4(data) {
      const list = []
      for (const key in this.part3) {
        if (data[key]) {
          const row = data[key]
          const obj = {
            key,
            name: this.part3[key]
          }
          for (const key1 in this.part4TestData) {
            obj[key1] = row[key1]
          }
          list.push(obj)
        }
      }
      this.part4Data = {
        id: `part4${this.value}`,
        title: `当日${this.product}一次/最终合格数据`,
        chartTitle: `${this.product}一次合格率数据`,
        tableLabel: '一次合格率',
        dimensions: ['name', 'sucRate', 'firstSucRate'],
        tableData: list,
        chartData: data,
        part3: this.part3,
        legendObj: this.part4Legend,
        tableCols: [{
          label: '',
          prop: 'name'
        }, {
          label: '一次合格',
          prop: 'firstSucCount'
        }, {
          label: '最终合格',
          prop: 'sucCount'
        }],
        showHeaderFlag: true
      }
    },
    getPart5() {
      this.requestDeviceSucRate(this.product).then(data => {
        if (data && data.length > 0) {
          const tableData = []
          for (const key in this.part5Legend) {
            const obj = {
              key,
              name: this.part5Legend[key]
            }
            data.forEach(item => {
              obj.xname = item.name
              obj[item.date] = item[key] + '%'
              obj.type = 'line'
              if (key.indexOf('Rate') > -1) {
                item[`${key}_`] = item[key] + '%'
              }
            })
            tableData.push(obj)
          }
          const tableColumnLabel = []
          data.forEach(item => {
            tableColumnLabel.push(item.date)
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
          this.part5Data = {
            id: `part5${this.value}`,
            title: `${this.product}近30日整机合格率数据`,
            tableColumnLabel,
            tableData,
            list: data,
            colors,
            dimensions: ['date', 'sucRate'],
            legendObj: this.part5Legend,
            legend: ['30日整机合格率'],
            yData: [{
              type: 'value',
              unit: '%'
            }],
            series: [{
              type: 'line',
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
    }
  }
}
</script>

<style lang="scss" scoped>
.w100 {
  width: 100%;
  position: relative;
}
</style>
