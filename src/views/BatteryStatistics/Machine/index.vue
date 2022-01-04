<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-15 18:05:46
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-22 14:54:09
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">

        <ElFormItem label="型号" prop="batteryModel" class="required-item">
          <BatteryModelSelect
            ref="model"
            v-model="form.batteryModel"
            showAllOptions
            multiple
            @change="getBatteryModelList"
          />
        </ElFormItem>

        <ElFormItem label="数据字段" prop="queryFiled" class="required-item">
          <DataField ref="field" v-model="form.queryFiled" multiple />
        </ElFormItem>

        <ElFormItem label="日期" prop="date" class="required-item">
          <DatePicker v-model="form.date" :isShowToday="false" />
        </ElFormItem>
      </ElForm>
      <template slot="searchBtn">
        <ElButton type="primary" @click="search">查询</ElButton>
        <ElButton @click="reset">重置</ElButton>
      </template>
    </SearchFormBox>
    <TableListBox>
      <template slot="right">
        <ElButton type="primary" @click="download" :disabled="btnDisabled">数据下载</ElButton>
        <FieldFilter
          type-name="型号"
          :data="batteryModelList"
          :disabled="btnDisabled"
          @change="compare"
        />
      </template>

      <ElTable
        :data="tableData"
        :span-method="objectSpanMethod"
        border
      >
        <ElTableColumn prop="factoryName" label="工厂" min-width="100" show-overflow-tooltip />

        <ElTableColumn prop="modelName" label="型号" min-width="100" show-overflow-tooltip />

        <ElTableColumn prop="field" label="数据字段" min-width="110" />

        <ElTableColumn
          :prop="date"
          :label="date"
          min-width="100"
          v-for="(date,index) in dateList"
          :key="index"
        />

        <div slot="empty" class="table-defalut-graph">
          <DefaultGraph :src="require('src/assets/icons/empty.svg')" text="暂无数据" />
        </div>
      </ElTable>
    </TableListBox>

    <ElDialog
      v-if="linesChartVisible"
      :visible.sync="linesChartVisible"
      width="60%"
    >
      <LinesChart :datas="linesChartData" :visible="linesChartVisible" />
      <span slot="footer" class="dialog-footer">
        <ElButton type="primary" @click="linesChartVisible = false">确 定</ElButton>
      </span>
    </ElDialog>
  </div>
</template>

<script>
// 整机统计
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import BatteryModelSelect from 'src/components/BatteryModelSelect'
import DataField from 'src/components/DataField'
import DatePicker from 'src/components/DatePicker'
import DefaultGraph from 'src/components/DefaultGraph'
import FieldFilter from 'src/components/FieldFilter'
import LinesChart from 'src/components/LinesChart'
import { getMachineStatisticsList, machineStatisticsDownload, machineStatisticsDataContrast } from 'src/api/batteryTest'
import { parseTime, downLoadExcel } from 'src/utils'
export default {
  name: 'BatteryMachineStatistics',
  components: {
    SearchFormBox,
    TableListBox,
    BatteryModelSelect,
    DataField,
    DatePicker,
    DefaultGraph,
    FieldFilter,
    LinesChart
  },
  data() {
    const endTime = parseTime(new Date(new Date().toLocaleDateString()).getTime() - 1 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    const startTime = parseTime(new Date(new Date().toLocaleDateString()).getTime() - 7 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    return {
      form: {
        batteryModel: '',
        queryFiled: '',
        date: [startTime, endTime]
      },
      tableData: [],
      dateList: [],
      linesChartVisible: false,
      linesChartData: {},
      tableColum0: [],
      tableColum1: [],
      batteryModelList: []
    }
  },
  computed: {
    btnDisabled() {
      return !this.tableData.length
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleParams() {
      // 处理参数
      const { batteryModel, queryFiled, date: [startDate, endDate] } = this.form
      return {
        batteryModel: batteryModel.toString(),
        queryFiled: queryFiled.toString(),
        startDate,
        endDate
      }
    },
    async getList() {
      // 获取列表
      const { data = [], dateList = [] } = await getMachineStatisticsList(this.handleParams())
      this.tableData = this.flatData(data)
      this.dateList = dateList
      // 拿到数据后 进行处理
      this.handleData()
    },
    flatData(data) {
      // 扁平化数据
      return data.map(({ dateStatistics, ...rest }) => ({
        ...rest,
        ...dateStatistics
      }))
    },
    handleData() {
      this.tableColum0 = []
      this.tableColum1 = []
      let contactDot = 0

      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.tableColum0.push(1)
        } else {
          if (item.factoryCode === this.tableData[index - 1].factoryCode) {
            this.tableColum0[contactDot] += 1
            this.tableColum0.push(0)
          } else {
            this.tableColum0.push(1)
            contactDot = index
          }
        }
      })

      contactDot = 0
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.tableColum1.push(1)
        } else {
          if (this.tableColum0[index] === 0 && item.modelCode === this.tableData[index - 1].modelCode) {
            this.tableColum1[contactDot] += 1
            this.tableColum1.push(0)
          } else {
            this.tableColum1.push(1)
            contactDot = index
          }
        }
      })
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const rowspan = this.tableColum0[rowIndex]
        const colspan = rowspan > 0 ? 1 : 0
        return {
          rowspan,
          colspan
        }
      }

      if (columnIndex === 1) {
        const rowspan = this.tableColum1[rowIndex]
        const colspan = rowspan > 0 ? 1 : 0
        return {
          rowspan,
          colspan
        }
      }
    },
    search() {
      // 查询
      this.getList()
    },
    reset() {
      // 重置
      this.form.page = 1
      this.$refs.searchForm.resetFields()
      ;['model', 'field'].forEach(item => {
        this.$refs[item].reset()
      })
      this.getList()
    },
    getBatteryModelList(data) {
      // 获取电池型号列表
      this.batteryModelList = data
    },
    handleEchartData(data) {
      // 处理Echarts数据
      const legend = []
      const series = []
      data.forEach(item => {
        legend.push(item.modelName + item.field)
        let unit = ''
        if (item.field.indexOf('合格率') > -1) {
          unit = '%'
        }
        // const dateStatistics = Object.values(item.dateStatistics)
        const dateStatistics = []
        for (const key in item.dateStatistics) {
          let value = item.dateStatistics[key]
          if (value && isNaN(value) && value.indexOf('%') > -1) {
            value = (value.split('%')[0] * 1 / 100.0).toFixed(4)
          }
          dateStatistics.push(value)
        }
        const obj = {
          name: item.modelName + item.field,
          type: 'line',
          data: dateStatistics
        }
        if (unit) {
          obj.unit = unit
        }
        series.push(obj)
      })
      return { legend, series }
    },
    async download() {
      // 下载数据
      const data = await machineStatisticsDownload(this.handleParams())
      downLoadExcel(data)
    },
    async compare({ checkedModels, checkedFields }, isSameData) {
      // 数据对比
      if (isSameData) {
        const res = await machineStatisticsDataContrast({
          startDate: this.form.date[0],
          endDate: this.form.date[1],
          batteryModel: checkedModels.toString(),
          queryFiled: checkedFields.toString()
        })
        const { legend, series } = this.handleEchartData(res.data)
        this.linesChartData = {
          legend,
          series,
          xAxis: res.dateList
        }
      }
      this.linesChartVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

