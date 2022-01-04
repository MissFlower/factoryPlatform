<!--
 * @Description: 通讯板统计
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 17:28:12
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-07 18:12:00
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">

        <ElFormItem label="硬件版本" prop="hardwareVersion">
          <HardwareVersion ref="hardware" v-model="form.hardwareVersion" :type="MODEL_NAME.COMMUNICATION_BOARD" multiple />
        </ElFormItem>

        <ElFormItem label="数据字段" prop="dataField">
          <DataField ref="field" v-model="form.dataField" multiple />
        </ElFormItem>

        <ElFormItem label="日期" prop="date">
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
            :type="MODEL_NAME.COMMUNICATION_BOARD"
            :form-data="form"
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
        <ElTableColumn prop="version" label="硬件版本" min-width="100" />

        <ElTableColumn prop="dataType" label="数据字段" min-width="110" />

        <ElTableColumn :label="item" min-width="100" v-for="(item,index) in dateList" :key="index">
          <template slot-scope="scope">
            {{ scope.row.dateInfoList[index].count }}
          </template>
        </ElTableColumn>
        <div slot="empty" class="table-defalut-graph">
          <DefaultGraph :src="require('src/assets/icons/empty.svg')" text="暂无数据" />
        </div>
      </ElTable>
    </TableListBox>

    <ElDialog
      :visible.sync="linesChartVisible"
      width="60%"
    >
      <LinesChart :datas="linesChartData" />
      <span slot="footer" class="dialog-footer">
        <ElButton type="primary" @click="linesChartVisible = false">确 定</ElButton>
      </span>
    </ElDialog>
  </div>
</template>

<script>
// 通讯板统计
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import HardwareVersion from 'src/components/HardwareVersion'
import DataField from 'src/components/DataField'
import DatePicker from 'src/components/DatePicker'
import LinesChart from 'src/components/LinesChart'
import DefaultGraph from 'src/components/DefaultGraph'
import FieldFilter from 'src/components/FieldFilter'
import { MODEL_NAME } from 'src/common/constants'
import { commBoard, commBoardDownload, commBoardContrast } from '@/api/communication'
import { parseTime, downLoadExcel } from 'src/utils'
export default {
  name: 'CommunicationBoardStatistics',
  components: {
    SearchFormBox,
    TableListBox,
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
        hardwareVersion: [],
        dataField: [],
        date: [startTime, endTime]
      },
      tableData: [],
      dateList: [],
      linesChartVisible: false,
      linesChartData: {},
      spanArr: []
    }
  },
  computed: {
    btnDisabled() {
      return !this.tableData.length
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 返回查询参数
    returnParams() {
      const form = this.form
      !form.date && (form.date = [])
      return {
        startDate: form.date[0],
        endDate: form.date[1],
        version: form.hardwareVersion.toString(),
        dataType: form.dataField.toString()
      }
    },
    async getList() {
      // 获取列表
      const data = await commBoard(this.returnParams())
      this.tableData = data.data || []
      this.dateList = data.dateList || []

      // 拿到数据后 进行处理
      this.dealData()
    },
    search() {
      // 查询
      this.getList()
    },
    reset() {
      // 重置
      this.$refs.searchForm.resetFields()
      ;['field', 'hardware'].forEach(item => {
        this.$refs[item].reset()
      })
      this.getList()
    },
    // 解析json数据
    untieData(data) {
      const legend = []
      const series = []
      data.forEach(item => {
        legend.push(item.version + item.dataType)
        const dateInfoList = item.dateInfoList.map(item => item.count)
        series.push({
          name: item.version + item.dataType,
          type: 'line',
          data: dateInfoList
        })
      })
      return { legend, series }
    },
    async download() {
      // 下载数据
      const data = await commBoardDownload(this.returnParams())
      downLoadExcel(data)
    },
    dealData() {
      let contactDot = 0
      this.spanArr = []
      this.tableData.forEach((item, index) => {
        index === 0
          ? (this.spanArr.push(1))
          : (item.version === this.tableData[index - 1].version
            ? (this.spanArr[contactDot] += 1, this.spanArr.push(0))
            : (this.spanArr.push(1), contactDot = index))
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const rowspan = this.spanArr[rowIndex]
        const colspan = rowspan > 0 ? 1 : 0
        return {
          rowspan,
          colspan
        }
      }
    },
    async compare(data, flag) {
      // 数据对比
      const form = this.form
      !form.date && (form.date = [])

      if (flag) {
        const res = await commBoardContrast({
          startDate: form.date[0],
          endDate: form.date[1],
          version: data.checkedModels.toString(),
          dataType: data.checkedFields.toString()
        })
        const { legend, series } = this.untieData(res.data)

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
