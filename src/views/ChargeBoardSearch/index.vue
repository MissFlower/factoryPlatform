<!--
 * @Description: 充电板查询
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 17:27:08
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-29 16:09:28
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">

        <ElFormItem label="硬件版本" prop="hardwareVersion">
          <HardwareVersion v-model="form.hardwareVersion" :type="MODEL_NAME.CHARGE_BOARD" />
        </ElFormItem>

        <ElFormItem label="充电板ID" prop="chargeId">
          <ElInput v-model="form.chargeId" placeholder="请输入充电板ID" />
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

        <ElTableColumn prop="chargeBoardId" label="充电板ID" min-width="100" />

        <ElTableColumn prop="testStatus" label="测试状态" min-width="80" />

        <ElTableColumn prop="testTime" label="测试时间" min-width="160" />

        <ElTableColumn prop="operator" label="工位MAC" min-width="160" />

        <ElTableColumn prop="t1" label="通讯串口测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t1]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t2" label="写ID测试" min-width="80">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t2]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t3" label="前键抬起测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t3]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t4" label="前键按下测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t4]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t5" label="后键抬起测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t5]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t6" label="后键按下测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t6]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t7" label="iic测试" min-width="70">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t7]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t8" label="充电测试" min-width="80">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t8]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t9" label="电池弹出测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t9]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t10" label="Flash测试" min-width="90">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t10]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t11" label="调试串口测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t11]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t12" label="测试结果写入" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t12]}" />
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
// 充电板查询
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import HardwareVersion from 'src/components/HardwareVersion'
import TestStatus from 'src/components/TestStatus'
import DatePicker from 'src/components/DatePicker'
import Pagination from 'src/components/Pagination'
import DefaultGraph from 'src/components/DefaultGraph'
import { MODEL_NAME, TEST_STATUS_COLOR } from 'src/common/constants'
import { chargeBoardItem, chargeBoardItemDownload } from '@/api/chargeBoard'
import { parseTime, downLoadExcel } from 'src/utils'
export default {
  name: 'ChargeBoardSearch',
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
        chargeId: '',
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
        chargeBoardId: form.chargeId,
        testStatus: form.testStatus,
        operator: form.mac,
        page: form.page,
        size: form.size

      }
    },
    async getList() {
      // 获取列表
      const data = await chargeBoardItem(this.returnParams())
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
      const data = await chargeBoardItemDownload(this.returnParams())
      downLoadExcel(data)
    },
    pageChange() {
      //
      this.getList()
    }
  }
}
</script>
