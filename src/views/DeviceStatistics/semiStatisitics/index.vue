<!--
文件作者：mawenjuan
创建日期：2021.5.18
文件说明：半成品统计
 -->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">

        <ElFormItem label="型号" prop="modelCode" class="required-item">
          <ModelSelect ref="model" v-model="form.modelCode" :type="MODEL_NAME.SEMIFINISHED" multiple />
        </ElFormItem>

        <ElFormItem label="硬件版本" prop="version" class="required-item">
          <HardwareVersion
            ref="hardware"
            v-model="form.version"
            :type="MODEL_NAME.SEMIFINISHED"
            multiple
            @getList="getVersionList"
          />
        </ElFormItem>

        <ElFormItem label="数据字段" prop="dataType" class="required-item">
          <DataField ref="field" v-model="form.dataType" multiple />
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
      <template>
        <div slot="right">
          <ElButton type="primary" @click="download" :disabled="btnDisabled">数据下载</ElButton>
          <FieldFilter
            type-name="硬件版本"
            :data="hardwareVersionList"
            :disabled="btnDisabled"
            @change="compare"
          />
        </div>
      </template>

      <ElTable
        :data="tableData"
        :span-method="objectSpanMethod"
        border
      >
        <ElTableColumn prop="factoryName" label="工厂" min-width="100" />

        <ElTableColumn prop="modelName" label="型号" min-width="100" />

        <ElTableColumn prop="version" label="硬件版本" min-width="100" />

        <ElTableColumn prop="dataType" label="数据字段" min-width="110" />

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
// 半成品统计
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import ModelSelect from 'src/components/ModelSelect'
import HardwareVersion from 'src/components/HardwareVersion'
import DataField from 'src/components/DataField'
import DatePicker from 'src/components/DatePicker'
import LinesChart from 'src/components/LinesChart'
import DefaultGraph from 'src/components/DefaultGraph'
import FieldFilter from 'src/components/FieldFilter'
import { MODEL_NAME } from 'src/common/constants'
import { getSemiStatisticsList, downloadSemiStatisticsList, communicationBoardStatisticsDataContrast } from 'src/api/deviceTest'
import { parseTime, downLoadExcel, dealChartData } from 'src/utils'
export default {
  name: 'CommunicationBoardStatistics',
  components: {
    SearchFormBox,
    TableListBox,
    ModelSelect,
    HardwareVersion,
    DataField,
    DatePicker,
    LinesChart,
    DefaultGraph,
    FieldFilter
  },
  data() {
    const endTime = parseTime(new Date(new Date().toLocaleDateString()).getTime() - 1 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    const startTime = parseTime(new Date(new Date().toLocaleDateString()).getTime() - 7 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    return {
      MODEL_NAME,
      form: {
        modelCode: '',
        version: '',
        dataType: '',
        date: [startTime, endTime]
      },
      tableData: [],
      dateList: [],
      linesChartVisible: false,
      linesChartData: {},
      tableColum0: [],
      tableColum1: [],
      tableColum2: [],
      hardwareVersionList: [],
      returnList: [] // 列表接口返回的list
    }
  },
  computed: {
    btnDisabled() {
      return !this.tableData.length
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    // 返回查询参数
    handleParams() {
      // 处理参数
      const { version, dataType, date: [startDate, endDate] } = this.form
      return {
        version: version.toString(),
        dataType: dataType.toString(),
        startDate,
        endDate
      }
    },
    async getList() {
      // 获取列表
      const { data = [], dateList = [] } = await getSemiStatisticsList(this.handleParams())
      this.returnList = JSON.parse(JSON.stringify(data))
      this.tableData = this.flatData(data)
      this.dateList = dateList

      // 拿到数据后 进行处理
      this.handleData()
    },
    flatData(data) {
      // 扁平化数据，获取传递到数据对比的版本数组
      this.hardwareVersionList = []
      const version = []
      return data.map(({ dateStatistics, ...rest }) => {
        if (version.indexOf(rest.version) === -1) { // 获取返回数据的版本
          version.push(rest.version)
          this.hardwareVersionList.push({
            key: rest.version,
            value: rest.version
          })
        }
        return {
          ...rest,
          ...dateStatistics
        }
      })
    },
    handleData() {
      this.tableColum0 = []
      this.tableColum1 = []
      this.tableColum2 = []
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

      contactDot = 0
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.tableColum2.push(1)
        } else {
          if (this.tableColum1[index] === 0 && item.version === this.tableData[index - 1].version) {
            this.tableColum2[contactDot] += 1
            this.tableColum2.push(0)
          } else {
            this.tableColum2.push(1)
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

      if (columnIndex === 2) {
        const rowspan = this.tableColum2[rowIndex]
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
      this.$refs.searchForm.resetFields()
      ;['model', 'field', 'hardware'].forEach(item => {
        this.$refs[item].reset()
      })
      this.getList()
    },
    getVersionList(data) {
      // 获取通讯板硬件版本列表
      // this.hardwareVersionList = data
    },
    async download() {
      // 下载数据
      const data = await downloadSemiStatisticsList(this.handleParams())
      data && downLoadExcel(data)
    },
    handleEchartsData(data) {
      // 处理Echarts数据
      const legend = []
      const series = []
      data.forEach(item => {
        const obj = { type: 'line' }
        const name = item.version + item.dataType
        legend.push(name)
        obj.name = name
        if (item.dataType.indexOf('合格率') > -1) {
          obj.unit = '%'
        }
        // const dateInfoList = item.dateInfoList.map(item => item.count)
        obj.data = dealChartData(item.dateStatistics)
        series.push(obj)
      })
      return { legend, series }
    },
    async compare({ checkedModels, checkedFields }) {
      // 数据对比
      // if (flag) {
      //   const res = await communicationBoardStatisticsDataContrast({
      //     startDate: this.form.date[0],
      //     endDate: this.form.date[1],
      //     version: checkedModels.toString(),
      //     dataType: checkedFields.toString()
      //   })
      // }
      const data = this.returnList.filter(item => {
        return checkedModels.indexOf(item.version) > -1 && checkedFields.indexOf(item.dataTypeNum) > -1
      })
      const { legend, series } = this.handleEchartsData(data)
      this.linesChartData = {
        legend,
        series,
        xAxis: this.dateList
      }
      this.linesChartVisible = true
    }
  }
}
</script>
