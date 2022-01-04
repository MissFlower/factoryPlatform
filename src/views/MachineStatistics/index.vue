<!--
 * @Description: 整机统计
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 17:24:00
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-07 18:10:56
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">

        <ElFormItem label="产品" prop="product">
          <ProductSelect ref="product" v-model="form.product" multiple />
        </ElFormItem>

        <ElFormItem label="型号" prop="model">
          <ModelSelect ref="model" v-model="form.model" multiple />
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
      <template slot="right">
        <ElButton type="primary" @click="download" :disabled="btnDisabled">数据下载</ElButton>
        <FieldFilter
          :type="MODEL_NAME.MACHINE"
          :form-data="form"
          :disabled="btnDisabled"
          @change="compare"
        />
      </template>

      <ElTable
        :data="tableData"
        :span-method="objectSpanMethod"
        border
      >
        <ElTableColumn prop="productName" label="产品" min-width="100" show-overflow-tooltip />

        <ElTableColumn prop="modelName" label="型号" min-width="100" show-overflow-tooltip />

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
// 整机统计
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import ProductSelect from 'src/components/ProductSelect'
import ModelSelect from 'src/components/ModelSelect'
import DataField from 'src/components/DataField'
import DatePicker from 'src/components/DatePicker'
import DefaultGraph from 'src/components/DefaultGraph'
import FieldFilter from 'src/components/FieldFilter'
import LinesChart from 'src/components/LinesChart'
import { MODEL_NAME } from 'src/common/constants'
import { deviceStatistics, deviceDownload, deviceContrast } from '@/api/machine'
import { parseTime, downLoadExcel } from 'src/utils'
export default {
  name: 'MachineStatistics',
  components: {
    SearchFormBox,
    TableListBox,
    ProductSelect,
    ModelSelect,
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
      MODEL_NAME,
      form: {
        product: [],
        model: [],
        dataField: [],
        date: [startTime, endTime]
      },
      tableData: [],
      dateList: [],
      linesChartVisible: false,
      linesChartData: {},
      spanArr0: [],
      spanArr1: []
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
    // 返回查询参数
    returnParams() {
      const form = this.form
      !form.date && (form.date = [])
      return {
        startDate: form.date[0],
        endDate: form.date[1],
        productCode: form.product.toString(),
        modelCode: form.model.toString(),
        dataType: form.dataField.toString()
      }
    },
    async getList() {
      // 获取列表
      const data = await deviceStatistics(this.returnParams())
      this.tableData = data.data || []
      this.dateList = data.dateList || []
      // 拿到数据后 进行处理
      this.dealData()
    },
    dealData() {
      const tableData = []
      const spanArr0 = []
      const spanArr1 = []
      let cont = 0
      let num = 0
      this.tableData.forEach((item, index) => {
        item.modelList.forEach((modeitem, index) => {
          modeitem.dateList.forEach((dateitem, index) => {
            cont++
            spanArr0.push(0)
            if (index === 0) {
              spanArr1.push(modeitem.dateList.length)
            } else {
              spanArr1.push(0)
            }
            tableData.push(dateitem)
          })
        })
        spanArr0[num] = cont
        num += cont
        cont = 0
      })
      this.tableData = tableData
      this.spanArr0 = spanArr0
      this.spanArr1 = spanArr1
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const rowspan = this.spanArr0[rowIndex]
        const colspan = rowspan > 0 ? 1 : 0
        return {
          rowspan,
          colspan
        }
      }
      if (columnIndex === 1) {
        const rowspan = this.spanArr1[rowIndex]
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
      ;['product', 'model', 'field'].forEach(item => {
        this.$refs[item].reset()
      })
      this.getList()
    },
    // 解析json数据
    untieData(data) {
      const legend = []
      const series = []
      data.forEach(item => {
        legend.push(item.modelName + item.dataType)
        const dateInfoList = item.dateInfoList.map(item => item.count)
        series.push({
          name: item.modelName + item.dataType,
          type: 'line',
          data: dateInfoList
        })
      })
      return { legend, series }
    },
    async download() {
      // 下载数据
      const data = await deviceDownload(this.returnParams())
      downLoadExcel(data)
    },
    async compare(data, isSameData) {
      // 数据对比
      const form = this.form
      !form.date && (form.date = [])

      if (isSameData) {
        const res = await deviceContrast({
          startDate: form.date[0],
          endDate: form.date[1],
          productCode: form.product.toString(),
          modelCode: data.checkedModels.toString(),
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

