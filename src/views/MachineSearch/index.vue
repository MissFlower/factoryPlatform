<!--
 * @Description: 整机查询
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 17:25:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-18 13:44:06
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">

        <ElFormItem label="产品" prop="product">
          <ProductSelect ref="product" v-model="form.product" />
        </ElFormItem>

        <ElFormItem label="型号" prop="model">
          <ModelSelect ref="model" v-model="form.model" showAllOptions />
        </ElFormItem>

        <ElFormItem label="设备ID" prop="deviceId">
          <ElInput v-model="form.deviceId" placeholder="请输入设备ID" />
        </ElFormItem>

        <ElFormItem label="IMEI" prop="imei">
          <ElInput v-model="form.imei" placeholder="请输入IMEI" />
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
        <ElTableColumn prop="product" label="产品" min-width="100" />

        <ElTableColumn prop="model" label="型号" min-width="50" />

        <ElTableColumn prop="sid" label="设备ID" min-width="100" />

        <ElTableColumn prop="imei" label="IMEI" min-width="140" />

        <ElTableColumn prop="chargeBoardId" label="充电板ID" min-width="150" />

        <ElTableColumn prop="testStatus" label="测试状态" min-width="80" />

        <ElTableColumn prop="testTime" label="测试时间" min-width="160" />

        <ElTableColumn prop="operator" label="工位MAC" min-width="160" />

        <ElTableColumn prop="t1" label="通讯串口测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t1]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t2" label="充电板流程校验" min-width="120">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t2]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t3" label="通信板流程校验" min-width="120">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t3]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t4" label="IIC测试" min-width="70">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t4]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t5" label="按键按下测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t5]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t6" label="充电测试" min-width="80">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t6]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t7" label="按键抬起测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t7]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t8" label="IIC消失测试" min-width="100">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t8]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t9" label="电池翻转测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t9]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t10" label="电池弹出测试" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t10]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t11" label="网络测试" min-width="80">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t11]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t12" label="绑定" min-width="50">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t12]}" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="t13" label="测试结果写入" min-width="110">
          <template slot-scope="scope">
            <div class="mark" :style="{background: TEST_STATUS_COLOR[scope.row.t13]}" />
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
// 整机查询
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import ProductSelect from 'src/components/ProductSelect'
import ModelSelect from 'src/components/ModelSelect'
import DatePicker from 'src/components/DatePicker'
import TestStatus from 'src/components/TestStatus'
import Pagination from 'src/components/Pagination'
import DefaultGraph from 'src/components/DefaultGraph'
import { TEST_STATUS_COLOR } from 'src/common/constants'
import { deviceGetList, deviceItemDownload } from '@/api/machine'
import { parseTime, downLoadExcel } from 'src/utils'
export default {
  name: 'MachineSearch',
  components: {
    SearchFormBox,
    TableListBox,
    ProductSelect,
    ModelSelect,
    DatePicker,
    TestStatus,
    Pagination,
    DefaultGraph
  },
  data() {
    const endTime = parseTime(new Date(new Date().toLocaleDateString()).getTime(), '{y}-{m}-{d}')
    const startTime = parseTime(new Date(new Date().toLocaleDateString()).getTime(), '{y}-{m}-{d}')
    return {
      TEST_STATUS_COLOR,
      form: {
        product: [],
        model: [],
        dataField: [],
        date: [startTime, endTime],
        testStatus: '',
        mac: '',
        imei: '',
        chargeId: '',
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
        sid: form.deviceId,
        imei: form.imei,
        chargeBoardId: form.chargeId,
        testStatus: form.testStatus,
        operator: form.mac,
        page: form.page,
        size: form.size
      }
    },
    async getList() {
      // 获取列表
      const data = await deviceGetList(this.returnParams())
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
      const data = await deviceItemDownload(this.returnParams())
      downLoadExcel(data)
    },
    pageChange() {
      this.getList()
    }
  }
}
</script>
