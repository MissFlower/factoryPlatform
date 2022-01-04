<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-27 11:03:15
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-29 11:32:47
-->
<template>
  <div>
    <SearchFormBox>
      <ElForm ref="searchForm" :model="form">

        <ElFormItem label="型号" prop="modelCode" class="required-item">
          <ModelSelect ref="model" v-model="form.modelCode" showAllOptions />
        </ElFormItem>

        <ElFormItem label="工序" prop="process" class="required-item">
          <ProductionProcesses v-model="form.process" showAllOptions />
        </ElFormItem>

        <ElFormItem label="硬件版本" prop="hardwareVersion">
          <ElInput v-model="form.hardwareVersion" placeholder="请输入硬件版本" />
        </ElFormItem>
      </ElForm>
      <template slot="searchBtn">
        <ElButton type="primary" @click="search">查询</ElButton>
        <ElButton @click="reset">重置</ElButton>
      </template>
    </SearchFormBox>

    <TableListBox>
      <template>
        <div slot="left">
          <!-- icon="el-icon-circle-plus" -->
          <ElButton type="primary" @click="addRelationship">新增关系</ElButton>
        </div>
      </template>

      <ElTable :data="tableData" border>
        <ElTableColumn prop="modelName" label="型号" min-width="120" />

        <ElTableColumn prop="process" label="工序" min-width="120">
          <template slot-scope="{row: { process }}">
            <span>{{ MODEL_NAME_TEXT[process] }}</span>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="hardwareVersion" label="硬件版本" min-width="120" />

        <ElTableColumn prop="createdTime" label="创建日期" min-width="160" />

        <ElTableColumn prop="creator" label="创建人" width="100" />

        <div slot="empty" class="table-defalut-graph">
          <DefaultGraph :src="require('src/assets/icons/empty.svg')" text="暂无数据" />
        </div>
      </ElTable>

    </TableListBox>

    <RelationshipDialog
      :visible.sync="visible"
    />
  </div>
</template>

<script>
// 上位机型号硬件
import SearchFormBox from 'src/components/SearchFormBox'
import TableListBox from 'src/components/TableListBox'
import ModelSelect from 'src/components/ModelSelect'
import ProductionProcesses from 'src/components/ProductionProcesses'
import DefaultGraph from 'src/components/DefaultGraph'
import RelationshipDialog from './RelationshipDialog'
import { getHardwareDataList } from 'src/api/dataDictionary'
import { MODEL_NAME_TEXT } from 'src/common/constants'
export default {
  name: 'DictionaryHostMode',
  components: {
    SearchFormBox,
    TableListBox,
    ModelSelect,
    ProductionProcesses,
    DefaultGraph,
    RelationshipDialog
  },
  data() {
    return {
      MODEL_NAME_TEXT,
      form: {
        modelCode: '',
        process: '',
        hardwareVersion: ''
      },
      tableData: [],
      visible: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const data = await getHardwareDataList(this.form)
      this.tableData = data || []
    },
    search() {
      // 搜索
      this.getList()
    },
    reset() {
      // 重置
      this.$refs.searchForm.resetFields()
      this.getList()
    },
    addRelationship() {
      // 新增关系
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
