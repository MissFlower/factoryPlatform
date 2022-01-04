<!--
 * @Description: 通讯板查询
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 17:28:49
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-18 13:43:51
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">

        <ElFormItem label="硬件版本" prop="hardwareVersion">
          <HardwareVersion v-model="form.hardwareVersion" :type="MODEL_NAME.COMMUNICATION_BOARD" />
        </ElFormItem>

        <ElFormItem label="IMEI" prop="imei">
          <ElInput v-model="form.imei" placeholder="请输入IMEI" />
        </ElFormItem>

        <ElFormItem label="测试状态" prop="testStatus">
          <TestStatus v-model="form.testStatus" />
        </ElFormItem>

        <ElFormItem label="工位MAC" prop="mac">
          <ElInput v-model="form.mac" placeholder="请输入工位MAC" />
        </ElFormItem>

        <ElFormItem label="日期" prop="date">
          <DatePicker v-model="form.date" />
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

        <ElTableColumn prop="t2" label="调试串口测试" align="center" min-width="140">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t2]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t3" label="SIM卡及CSQ测试" align="center" min-width="140">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t3]}" />
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
import HardwareVersion from 'src/components/HardwareVersion'
import TestStatus from 'src/components/TestStatus'
import DatePicker from 'src/components/DatePicker'
import Pagination from 'src/components/Pagination'
import DefaultGraph from 'src/components/DefaultGraph'
import { MODEL_NAME, TEST_STATUS_COLOR } from 'src/common/constants'
import { commBoardItem, commBoardItemDownload } from '@/api/communication'
import { parseTime, downLoadExcel } from 'src/utils'

export default {
  name: 'CommunicationBoardSearch',
  components: {
    SearchFormBox,
    TableListBox,
    HardwareVersion,
    TestStatus,
    DatePicker,
    Pagination,
    DefaultGraph
  },
  data() {
    const endTime = parseTime(new Date(new Date().toLocaleDateString()).getTime(), '{y}-{m}-{d}')
    const startTime = parseTime(new Date(new Date().toLocaleDateString()).getTime(), '{y}-{m}-{d}')
    return {
      MODEL_NAME,
      TEST_STATUS_COLOR,
      form: {
        hardwareVersion: [],
        date: [startTime, endTime],
        imei: '',
        testStatus: '',
        mac: '',
        page: 1,
        size: 10
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
        imei: form.imei,
        testStatus: form.testStatus,
        operator: form.mac,
        page: form.page,
        size: form.size
      }
    },
    async getList() {
      // 获取列表
      const data = await commBoardItem(this.returnParams())
      this.tableData = data.list || []
      this.total = data.total
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
    async download() {
      // 下载数据
      const data = await commBoardItemDownload(this.returnParams())
      downLoadExcel(data)
    },
    pageChange() {
      this.getList()
    }
  }
}
</script>
