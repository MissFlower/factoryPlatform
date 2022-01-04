<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-27 11:02:54
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-13 17:20:49
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">
        <ElFormItem label="投料信息" prop="cellBatch">
          <ElInput v-model="form.cellBatch" v-emoji placeholder="二维码中间5位" />
        </ElFormItem>

        <ElFormItem label="电池ID" prop="batteryId">
          <ElInput v-model="form.batteryId" placeholder="请输入电池ID" />
        </ElFormItem>

        <ElFormItem label="包装信息" prop="wrapInfo">
          <ElInput v-model="form.wrapInfo" placeholder="二维码前7位" />
        </ElFormItem>

        <ElFormItem label="流水号" prop="serialNumber">
          <ElInput v-model="form.serialNumber" placeholder="二维码后5位" />
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
        <ElTableColumn prop="code" label="二维码编号" min-width="120" />

        <ElTableColumn prop="batteryId" label="电池ID" min-width="120" />

        <ElTableColumn prop="cellFactory" label="电芯厂商" min-width="120" />

        <ElTableColumn prop="bindTime" label="绑定日期" min-width="160" />

        <!-- <ElTableColumn prop="processFlowPoint" label="工序流程点" min-width="80" /> -->

        <!-- <ElTableColumn prop="testDate" label="测试时间" min-width="80" /> -->

        <!-- <ElTableColumn prop="testStatus" label="测试状态" min-width="80">
          <template slot-scope="{ row }">
            {{ TEST_STATUS[row.testStatus] }}
          </template>
        </ElTableColumn> -->

        <ElTableColumn prop="operation" label="操作" width="100">
          <template slot-scope="{ row }">
            <ElLink :underline="false" @click="unbind(row)">解绑</ElLink>
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
// 电芯数据-批次查询
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import DefaultGraph from 'src/components/DefaultGraph'
import Pagination from 'src/components/Pagination'
import { TEST_STATUS } from 'src/common/constants'
import emoji from 'src/directive/emoji'
import { downLoadExcel } from 'src/utils'
import { getCellDataList, batteryUnbind, batteryDownload } from 'src/api/cellData'
export default {
  name: 'CellBatchQuery',
  components: {
    SearchFormBox,
    TableListBox,
    DefaultGraph,
    Pagination
  },
  directives: {
    emoji
  },
  data() {
    return {
      form: {
        cellBatch: '',
        batteryId: '',
        wrapInfo: '',
        serialNumber: '',
        page: 1,
        size: 10
      },
      tableData: [],
      total: 0,
      TEST_STATUS
    }
  },
  computed: {
    btnDisabled() {
      return !this.tableData.length
    }
  },
  methods: {
    async getList() {
      // 获取Table数据
      const { list = [], total } = await getCellDataList(this.form)
      this.tableData = list
      this.total = total
    },
    search() {
      // 搜索
      const { cellBatch, batteryId } = this.form
      if (cellBatch !== '' || batteryId !== '') {
        // 请求接口
        this.form.page = 1
        this.getList()
      } else {
        this.$message({
          type: 'warning',
          message: '投料信息和电池ID至少填写一个!'
        })
      }
    },
    pageChange() {
      // 翻页
      this.getList()
    },
    unbind({ code, batteryId }) {
      // 解绑
      this.$confirm('解绑后该条绑定关系将会删除，确认解绑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        try {
          await batteryUnbind({
            code,
            batteryId
          })
          this.$message({
            type: 'success',
            message: '解绑成功!'
          })
          this.getList()
        } catch (error) {
          console.log(error)
        }
      })
      .catch(e => {
        console.log(e)
      })
    },
    reset() {
      // 重置
      this.form.page = 1
      this.$refs.searchForm.resetFields()
      this.tableData = []
    },
    async download() {
      // 下载
      const data = await batteryDownload(this.form)
      downLoadExcel(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
