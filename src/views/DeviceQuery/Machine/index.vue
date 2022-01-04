<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-28 15:27:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-14 11:38:40
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form" :rules="rules">

        <ElFormItem label="型号" prop="modelCode" class="required-item">
          <ModelSelect ref="model" v-model="form.modelCode" :type="MODEL_NAME.MACHINE" @getList="getModelList" />
        </ElFormItem>

        <ElFormItem label="测试状态" prop="testStatus" class="required-item">
          <TestStatus v-model="form.testStatus" />
        </ElFormItem>

        <ElFormItem label="设备ID" prop="sid">
          <ElInput v-model="form.sid" placeholder="请输入设备ID" />
        </ElFormItem>

        <ElFormItem label="IMEI" prop="imei">
          <ElInput v-model="form.imei" placeholder="请输入IMEI" />
        </ElFormItem>

        <ElFormItem label="充电板ID" prop="chargeBoardId">
          <ElInput v-model="form.chargeBoardId" placeholder="请输入充电板ID" />
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

        <ElTableColumn prop="sid" label="设备ID" min-width="100" />

        <ElTableColumn prop="imei" label="IMEI" min-width="140" />

        <ElTableColumn prop="chargeBoardId" label="充电板ID" min-width="150" />

        <ElTableColumn prop="testStatus" label="测试状态" min-width="80" />

        <ElTableColumn prop="testTime" label="测试时间" min-width="160" />

        <ElTableColumn prop="operator" label="工位MAC" min-width="160" />
        <template v-for="item in headerData">
          <ElTableColumn :key="item.name" :prop="item.name" :label="item.des" min-width="120">
            <template slot-scope="{ row }">
              <div class="mark" :style="{background: TEST_STATUS_COLOR[row[item.name]]}" />
            </template>
          </ElTableColumn>
        </template>

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
// 整机查询
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import ModelSelect from 'src/components/ModelSelect'
import DatePicker from 'src/components/DatePicker'
import TestStatus from 'src/components/TestStatus'
import Pagination from 'src/components/Pagination'
import DefaultGraph from 'src/components/DefaultGraph'
import { TEST_STATUS_COLOR, MODEL_NAME } from 'src/common/constants'
import { getMachineQueryList, machineQueryDownload } from 'src/api/deviceTest'
import { parseTime, downLoadExcel, deepClone } from 'src/utils'
export default {
  name: 'MachineSearch',
  components: {
    SearchFormBox,
    TableListBox,
    ModelSelect,
    DatePicker,
    TestStatus,
    Pagination,
    DefaultGraph
  },
  data() {
    const currentTime = new Date(new Date().toLocaleDateString()).getTime()
    const endTime = parseTime(currentTime + 60 * 60 * 24 * 1 * 1000 - 1000)
    const startTime = parseTime(currentTime)
    return {
      TEST_STATUS_COLOR,
      MODEL_NAME,
      form: {
        modelCode: '',
        date: [startTime, endTime],
        testStatus: '',
        sid: '',
        operator: '',
        imei: '',
        chargeBoardId: '',
        page: 1,
        size: 10
      },
      rules: {
        date: { required: true, message: '日期不能为空!', trigger: 'blur' }
      },
      total: 0,
      tableData: [],
      headerData: []
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
          const { pageInfo, testItem } = await getMachineQueryList(this.handleParams())
          const { list = [], total } = pageInfo
          this.tableData = list
          this.total = total
          this.headerData = testItem
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
          const data = await machineQueryDownload(this.handleParams())
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
