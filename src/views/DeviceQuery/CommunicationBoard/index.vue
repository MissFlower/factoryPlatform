<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-28 15:36:27
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-14 11:39:16
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form" :rules="rules">

        <ElFormItem label="型号" prop="modelCode" class="required-item">
          <ModelSelect ref="model" v-model="form.modelCode" :type="MODEL_NAME.COMMUNICATION_BOARD" @getList="getModelList" />
        </ElFormItem>

        <ElFormItem label="硬件版本" prop="version" class="required-item">
          <HardwareVersion v-model="form.version" :type="MODEL_NAME.COMMUNICATION_BOARD" />
        </ElFormItem>

        <ElFormItem label="测试状态" prop="testStatus" class="required-item">
          <TestStatus v-model="form.testStatus" />
        </ElFormItem>

        <ElFormItem label="IMEI" prop="imei">
          <ElInput v-model="form.imei" placeholder="请输入IMEI" />
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
        <ElTableColumn prop="factoryName" label="工厂" min-width="100" />

        <ElTableColumn prop="model" label="型号" min-width="80" />

        <ElTableColumn prop="version" label="硬件版本" min-width="80" />

        <ElTableColumn prop="imei" label="IMEI" min-width="140" />

        <ElTableColumn prop="testStatus" label="测试状态" min-width="80" />

        <ElTableColumn prop="testTime" label="测试时间" min-width="160" />

        <ElTableColumn prop="operator" label="工位MAC" min-width="160" />

        <ElTableColumn prop="t1" label="通讯串口测试" align="center" min-width="140">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t1]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t3" label="SIM卡及CSQ测试" align="center" min-width="140">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t3]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t2" label="调试串口测试" align="center" min-width="140">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t2]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t4" label="测试结果写入" align="center" min-width="140">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t4]}" />
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
// 通讯板查询
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import ModelSelect from 'src/components/ModelSelect'
import HardwareVersion from 'src/components/HardwareVersion'
import TestStatus from 'src/components/TestStatus'
import DatePicker from 'src/components/DatePicker'
import Pagination from 'src/components/Pagination'
import DefaultGraph from 'src/components/DefaultGraph'
import { MODEL_NAME, TEST_STATUS_COLOR } from 'src/common/constants'
import { getCommunicationBoardQueryList, communicationBoardQueryDownload } from 'src/api/deviceTest'
import { parseTime, downLoadExcel, deepClone } from 'src/utils'

export default {
  name: 'CommunicationBoardSearch',
  components: {
    SearchFormBox,
    TableListBox,
    ModelSelect,
    HardwareVersion,
    TestStatus,
    DatePicker,
    Pagination,
    DefaultGraph
  },
  data() {
    const currentTime = new Date(new Date().toLocaleDateString()).getTime()
    const endTime = parseTime(currentTime + 60 * 60 * 24 * 1 * 1000 - 1000)
    const startTime = parseTime(currentTime)
    return {
      MODEL_NAME,
      TEST_STATUS_COLOR,
      form: {
        modelCode: '',
        version: '',
        date: [startTime, endTime],
        imei: '',
        testStatus: '',
        operator: '',
        page: 1,
        size: 10
      },
      rules: {
        date: { required: true, message: '日期不能为空!', trigger: 'blur' }
      },
      total: 0,
      tableData: []
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
          const { list = [], total } = await getCommunicationBoardQueryList(this.handleParams())
          this.tableData = list
          this.total = total
        }
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
          const data = await communicationBoardQueryDownload(this.handleParams())
          data && downLoadExcel(data)
        }
      })
    },
    pageChange() {
      this.getList()
    },
    getModelList(modelList) {
      this.form.modelCode = modelList[0]?.key
      this.getList()
    }
  }
}
</script>
