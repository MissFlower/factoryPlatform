<!--
 * @Description: 出货抽检列表
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 17:22:09
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-13 16:56:02
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">
        <ElFormItem label="工厂" prop="factoryCode" class="required-item">
          <FactorySelect ref="factory" v-model="form.factoryCode" multiple />
        </ElFormItem>

        <ElFormItem label="型号" prop="modelCode" class="required-item">
          <ModelSelect ref="model" v-model="form.modelCode" origin="ERP" multiple />
        </ElFormItem>

        <ElFormItem label="问题分类" prop="issue">
          <ProblemClassify ref="classify" v-model="form.issue" multiple />
        </ElFormItem>

        <ElFormItem label="关键字" prop="search">
          <ElInput v-model="form.search" placeholder="请输入原因/问题点" />
        </ElFormItem>

        <ElFormItem label="日期" prop="date" class="required-item">
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

      <ElTable
        :data="tableData"
        border
      >
        <ElTableColumn prop="factoryName" label="工厂" min-width="100" show-overflow-tooltip />

        <ElTableColumn prop="dataDate" label="日期" min-width="100" />

        <ElTableColumn prop="productName" label="产品" min-width="100" show-overflow-tooltip />

        <ElTableColumn prop="modelName" label="型号" min-width="100" show-overflow-tooltip />

        <ElTableColumn prop="total" label="送检数量" min-width="80" />

        <ElTableColumn prop="samplingInspection" label="抽检数量" min-width="80" />

        <ElTableColumn prop="qualified" label="合格数量" min-width="80" />

        <ElTableColumn prop="unqualified" label="不良数量" min-width="80" />

        <ElTableColumn prop="issueArtificial" label="人员问题" min-width="80" />

        <ElTableColumn prop="issueMaterial" label="来料问题" min-width="80" />

        <ElTableColumn prop="issueEquipment" label="设备问题" min-width="80" />

        <ElTableColumn prop="issueNetwork" label="网络问题" min-width="80" />

        <ElTableColumn prop="issueQuality" label="品质标准" min-width="80" />

        <ElTableColumn prop="issueTechnology" label="工艺问题" min-width="80" />

        <ElTableColumn prop="issueOther" label="其它问题" min-width="80" show-overflow-tooltip />

        <ElTableColumn prop="passRate" label="合格率" min-width="70" show-overflow-tooltip>
          <template slot-scope="{ row: { passRate } }">
            {{ passRate | passRate }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="examiner" label="抽检人" min-width="100" show-overflow-tooltip />

        <ElTableColumn prop="mainPoints" label="问题点" min-width="200" show-overflow-tooltip />

        <ElTableColumn prop="reason" label="原因" min-width="240" show-overflow-tooltip />

        <ElTableColumn prop="measures" label="改善措施" min-width="240" show-overflow-tooltip />

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
// 出货抽检列表
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import FactorySelect from 'src/components/FactorySelect'
import ModelSelect from 'src/components/ModelSelect'
import ProblemClassify from 'src/components/ProblemClassify'
import DatePicker from 'src/components/DatePicker'
import DefaultGraph from 'src/components/DefaultGraph'
import Pagination from 'src/components/Pagination'
import { samplings, download } from 'src/api/spotCheck'
import { parseTime, deepClone } from 'src/utils'
import { downLoadExcel } from 'src/utils'
export default {
  name: 'SpotCheck',
  components: {
    SearchFormBox,
    TableListBox,
    FactorySelect,
    ModelSelect,
    ProblemClassify,
    DatePicker,
    DefaultGraph,
    Pagination
  },
  filters: {
    passRate(rate) {
      return rate + '%'
    }
  },
  data() {
    const endTime = parseTime(new Date(new Date().toLocaleDateString()).getTime() - 1 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    const startTime = parseTime(new Date(new Date().toLocaleDateString()).getTime() - 1 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    return {
      form: {
        factoryCode: [],
        productCode: [],
        modelCode: [],
        issue: [],
        search: '',
        date: [startTime, endTime],
        page: 1,
        size: 10
      },
      tableData: [],
      total: 0,
      spanArr0: [],
      spanArr1: [],
      spanArr2: []
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
    async getList() {
      // 获取列表
      const { list, total } = await samplings({
        ...this.form,
        dataDateStart: this.form.date[0],
        dataDateEnd: this.form.date[1]
      })
      this.tableData = list || []
      this.total = total
      // 工厂二期需求去掉表格合并 方法暂时保留
      // this.dealData()
    },
    pageChange() {
      // 页面查询
      this.getList()
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
      ;['factory', 'product', 'model', 'classify'].forEach(item => {
        this.$refs[item].reset()
      })
      this.getList()
    },
    dealData() {
      // 处理数据 表格数据合并
      this.spanArr0 = []
      this.spanArr1 = []
      this.spanArr2 = []
      let contactDot0 = 0
      let contactDot1 = 0
      let contactDot2 = 0
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr0.push(1)
        } else {
          if (item.factoryCode === this.tableData[index - 1].factoryCode) {
            this.spanArr0[contactDot0] += 1
            this.spanArr0.push(0)
          } else {
            this.spanArr0.push(1)
            contactDot0 = index
          }
        }
      })

      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr1.push(1)
        } else {
          if (this.spanArr0[index] === 0 && item.dataDate === this.tableData[index - 1].dataDate) {
            this.spanArr1[contactDot1] += 1
            this.spanArr1.push(0)
          } else {
            this.spanArr1.push(1)
            contactDot1 = index
          }
        }
      })

      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr2.push(1)
        } else {
          if (this.spanArr1[index] === 0 && item.productCode === this.tableData[index - 1].productCode) {
            this.spanArr2[contactDot2] += 1
            this.spanArr2.push(0)
          } else {
            this.spanArr2.push(1)
            contactDot2 = index
          }
        }
      })
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

      if (columnIndex === 2) {
        const rowspan = this.spanArr2[rowIndex]
        const colspan = rowspan > 0 ? 1 : 0
        return {
          rowspan,
          colspan
        }
      }
    },
    async download() {
      // 下载数据
      const fromData = delete deepClone(this.form).date
      const data = await download({
        ...fromData,
        dataDateStart: this.form.date[0],
        dataDateEnd: this.form.date[1]
      })
      downLoadExcel(data)
    }
  }
}
</script>
