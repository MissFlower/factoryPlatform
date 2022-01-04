<!--
 * @Description: SpotCheckUpload 出货抽检上传
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 17:25:28
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-13 17:56:50
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">

        <ElFormItem label="数据状态" prop="uploadStatus" class="required-item">
          <UploadStatus v-model="form.uploadStatus" />
        </ElFormItem>

        <ElFormItem label="工厂" prop="factoryCode" class="required-item">
          <FactorySelect v-model="form.factoryCode" />
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
      <template slot="left">
        <ElButton type="primary" @click="download">下载模板</ElButton>
      </template>

      <ElTable :data="tableData" border style="width: 100%">
        <ElTableColumn prop="dataDate" label="数据日期" min-width="160" />

        <ElTableColumn prop="factoryName" label="工厂" min-width="160" />

        <ElTableColumn prop="uploadStatus" label="数据状态" min-width="100">
          <template slot-scope="{ row }">
            {{ UPLOAD_STATUS_TEXT[row.uploadStatus] }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="uploadDate" label="上传日期" min-width="160" />

        <ElTableColumn prop="operation" label="操作" fixed="right" width="180">
          <template slot-scope="{row}">
            <ElLink :underline="false" @click="upload(row.uploadStatus, row.id)">{{ fileOperationText(row.uploadStatus) }}</ElLink>
            <ElDivider direction="vertical" />
            <ElLink :underline="false" :disabled="row.uploadStatus === UPLOAD_STATUS_SIGN.NODATA" @click="signNoData(row)">无数据日</ElLink>
            <ElDivider direction="vertical" />
            <ElLink :underline="false" @click="log(row.id)">日志</ElLink>
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

    <UploadFile
      :visible.sync="uploadVisible"
      :type="type"
      :id="currenId"
      @update="updateList"
    />

    <LogDialog
      :visible.sync="logVisible"
      :log-data="logData"
    />
  </div>
</template>

<script>
// 出货抽检上传
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import FactorySelect from 'src/components/FactorySelect'
import UploadStatus from 'src/components/UploadStatus'
import DatePicker from 'src/components/DatePicker'
import UploadFile from 'src/components/UploadFile'
import DefaultGraph from 'src/components/DefaultGraph'
import Pagination from 'src/components/Pagination'
import LogDialog from './LogDialog'
import { UPLOAD_STATUS_TEXT, UPLOAD_STATUS_SIGN, FILE_OPERATOR_TEXT, FILE_OPERATOR_SIGN } from 'src/common/constants'
import { uploadReportList, downloadTemp, logs, setNoDataDay } from 'src/api/spotCheck'
import { parseTime, downLoadExcel } from 'src/utils'
export default {
  name: 'SpotCheckUpload',
  components: {
    SearchFormBox,
    TableListBox,
    FactorySelect,
    UploadStatus,
    DatePicker,
    UploadFile,
    DefaultGraph,
    Pagination,
    LogDialog
  },
  data() {
    const endTime = parseTime(new Date(new Date().toLocaleDateString()).getTime(), '{y}-{m}-{d}')
    const startTime = parseTime(new Date(new Date().toLocaleDateString()).getTime() - 6 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
    return {
      form: {
        uploadStatus: 0,
        factoryCode: '',
        date: [startTime, endTime],
        page: 1,
        size: 10
      },
      total: 0,
      UPLOAD_STATUS_TEXT,
      UPLOAD_STATUS_SIGN,
      FILE_OPERATOR_TEXT,
      FILE_OPERATOR_SIGN,
      tableData: [],
      uploadVisible: false,
      logVisible: false,
      type: 1,
      currenId: '',
      logData: []
    }
  },
  computed: {
    fileOperationText() {
      // 文件操作文案 当前状态为无数据日 则操作文件为更新 反之正常展示
      return status => {
        return status === UPLOAD_STATUS_SIGN.NODATA
          ? FILE_OPERATOR_TEXT[FILE_OPERATOR_SIGN.UPDATE]
          : FILE_OPERATOR_TEXT[status]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      // 获取列表
      const { list, total } = await uploadReportList({
        ...this.form,
        dataDateStart: this.form.date[0],
        dataDateEnd: this.form.date[1]
      })
      this.tableData = list
      this.total = total
      // TODO 返回total并设置
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
      this.getList()
    },
    upload(status, id) {
      // 上传 | 更新
      this.type = +status === UPLOAD_STATUS_SIGN.NODATA ? FILE_OPERATOR_SIGN.UPDATE : +status
      this.currenId = id
      this.uploadVisible = true
    },
    signNoData({ dataDate, factoryName, id }) {
      // 标记无数据日
      this.$confirm(`确认要把${dataDate + factoryName}数据标记为无数据日？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await setNoDataDay(id)
        this.getList()
      })
    },
    async log(id) {
      // 日志
      const data = await logs(id)
      data.length && (data[0].color = '#0bbd87')
      this.logData = data || []
      this.logVisible = true
    },
    async download() {
      // 下载模板
      const data = await downloadTemp()
      downLoadExcel(data)
    },
    updateList() {
      // 上传文件后 更新列表
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
