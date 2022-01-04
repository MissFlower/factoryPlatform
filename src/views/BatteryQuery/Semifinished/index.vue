<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-11 15:39:10
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-29 16:08:33
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form" :rules="rules">

        <ElFormItem label="型号" prop="batteryModel" class="required-item">
          <BatteryModelSelect ref="model" v-model="form.batteryModel" />
        </ElFormItem>

        <ElFormItem label="测试状态" prop="state" class="required-item">
          <TestStatus v-model="form.state" />
        </ElFormItem>

        <ElFormItem label="电芯厂商" prop="supplier" class="required-item">
          <SupplierSelect v-model="form.supplier" showAllOptions />
        </ElFormItem>

        <ElFormItem label="电池ID" prop="batteryId">
          <ElInput v-model="form.batteryId" placeholder="请输入电池ID" />
        </ElFormItem>

        <ElFormItem label="工位MAC" prop="operator">
          <ElInput v-model="form.operator" placeholder="请输入工位MAC" />
        </ElFormItem>

        <ElFormItem label="日期" prop="date">
          <DatePicker v-model="form.date" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" />
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
        </div>
      </template>

      <ElTable :data="tableData" border>
        <ElTableColumn prop="factory" label="工厂" min-width="100" />

        <ElTableColumn prop="batteryModel" label="型号" min-width="80" />

        <ElTableColumn prop="batteryId" label="电池ID" min-width="120" />

        <ElTableColumn prop="supplier" label="电芯厂商" min-width="100" />

        <ElTableColumn prop="testStatus" label="测试状态" align="center" min-width="80" />

        <ElTableColumn prop="testTime" label="测试时间" min-width="160" />

        <ElTableColumn prop="operator" label="工位MAC" min-width="160" />

        <ElTableColumn
          v-for="({ code, name, des, minWidth }) in tableHeader"
          :key="code"
          :prop="name"
          :label="des"
          :min-width="minWidth"
          align="center"
        >
          <template slot-scope="{row}">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[row[name]]}" />
          </template>
        </ElTableColumn>

        <div slot="empty" class="table-defalut-graph">
          <DefaultGraph :src="require('src/assets/icons/empty.svg')" text="暂无数据" />
        </div>
      </ElTable>
      <template slot="footer">
        <Pagination
          :total="total"
          :current-page.sync="form.page"
          :page-size.sync="form.size"
          @change="pageChange"
        />
      </template>
    </TableListBox>
  </div>
</template>

<script>
// 半成品测试
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import BatteryModelSelect from 'src/components/BatteryModelSelect'
import DatePicker from 'src/components/DatePicker'
import TestStatus from 'src/components/TestStatus'
import SupplierSelect from 'src/components/SupplierSelect'
import Pagination from 'src/components/Pagination'
import DefaultGraph from 'src/components/DefaultGraph'
import { TEST_STATUS_COLOR } from 'src/common/constants'
import { getSemifinishedQueryList, semifinishedDownload } from 'src/api/batteryTest'
import { parseTime, downLoadExcel, deepClone, computedStrToPx } from 'src/utils'
export default {
  name: 'MachineSearch',
  components: {
    SearchFormBox,
    TableListBox,
    BatteryModelSelect,
    DatePicker,
    TestStatus,
    SupplierSelect,
    Pagination,
    DefaultGraph
  },
  data() {
    const currentTime = new Date(new Date().toLocaleDateString()).getTime()
    const endTime = parseTime(currentTime + 60 * 60 * 24 * 1 * 1000 - 1000)
    const startTime = parseTime(currentTime)
    return {
      TEST_STATUS_COLOR,
      form: {
        batteryModel: '1', // 默认S01
        supplier: '',
        date: [startTime, endTime],
        state: '',
        operator: '',
        batteryId: '',
        page: 1,
        size: 10
      },
      rules: {
        date: { required: true, message: '日期不能为空!', trigger: 'blur' }
      },
      total: 0,
      tableData: [],
      tableHeader: []
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
    handleParams() {
      // 处理参数
      const { date: [startTime, endTime] } = this.form
      const params = deepClone(this.form)
      delete params.date
      return {
        ... params,
        startTime,
        endTime
      }
    },
    getList() {
      // 获取列表
      this.$refs.searchForm.validate(async valid => {
        if (valid) {
          const { pageInfo: { list = [], total }, testItem } = await getSemifinishedQueryList(this.handleParams())
          this.tableData = list
          this.total = total
          this.handleTableData(testItem)
        }
      })
    },
    handleTableData(testItem) {
      this.tableHeader = testItem.map(item => {
        item.minWidth = computedStrToPx(item.des)
        return item
      })
    },
    search() {
      // 查询
      this.form.page = 1
      this.getList()
    },
    reset() {
      // 重置
      this.form.page = 1
      this.$refs.searchForm.resetFields()
      this.getList()
    },
    download() {
      // 下载数据
      this.$refs.searchForm.validate(async valid => {
        if (valid) {
          const data = await semifinishedDownload(this.handleParams())
          downLoadExcel(data)
        }
      })
    },
    pageChange() {
      this.getList()
    }
  }
}
</script>
