<!--
 * @Description: FieldFilter 字段筛选
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-04 17:59:51
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-16 14:32:53
-->

<template>
  <ElDropdown
    :hide-on-click="false"
    @visible-change="change"
    trigger="click"
  >
    <ElButton type="primary" :disabled="disabled">
      {{ title }}
      <i class="el-icon-arrow-down el-icon--right" />
    </ElButton>

    <ElDropdownMenu slot="dropdown">
      <div class="field-filter-content">
        <ElScrollbar wrap-class="field-filter-scroll">
          <p class="field-title">数据字段</p>
          <ElCheckboxGroup v-model="checkedFields" class="field-filter-group">
            <ElCheckbox
              v-for="(field, key) in fields"
              :label="+key"
              :key="+key"
            >
              {{ field }}
            </ElCheckbox>
          </ElCheckboxGroup>

          <!-- <ElDivider /> -->
          <p class="field-title">{{ typeName }}</p>
          <ElCheckboxGroup v-model="checkedModels" class="field-filter-group">
            <ElCheckbox
              v-for="model in data"
              :label="model.key"
              :key="model.key"
            >
              {{ model.value }}
            </ElCheckbox>
          </ElCheckboxGroup>
        </ElScrollbar>
      </div>
    </ElDropdownMenu>
  </ElDropdown>
</template>

<script>
// 字段过滤
// 整机： 型号(T1...)
// 充电宝 通讯板 ： 硬件版本(多个版本号)
import { DATA_FIELDS } from 'src/common/constants'
export default {
  name: 'FieldFilter',
  props: {
    title: {
      type: String,
      default: '数据对比'
    },
    disabled: {
      type: Boolean,
      default: true
    },
    /**
     * 型号 | 硬件版本
     */
    typeName: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkAll: false,
      checkedFields: [],
      fields: DATA_FIELDS,
      checkedModels: [],
      models: [],
      isIndeterminate: true,
      saveFields: {}
    }
  },
  methods: {
    change(status) {
      if (status) { return }
      // 逻辑。。。
      const checkedFieldsLen = this.checkedFields.length
      const checkedModelsLen = this.checkedModels.length

      if (!checkedFieldsLen || !checkedModelsLen) {
        this.$message({
          type: 'warning',
          message: '数据字段、型号各自至少选择一项！'
        })
        return
      }

      if (checkedFieldsLen + checkedModelsLen > 10) {
        this.$message({
          type: 'warning',
          message: '对比项不能超过10条！'
        })
        return
      }

      const checkedDataFields = {
        checkedFields: this.checkedFields,
        checkedModels: this.checkedModels
      }

      // TODO 粗暴的对比方式
      this.$emit('change', checkedDataFields, JSON.stringify(checkedDataFields) !== JSON.stringify(this.saveFields))
      this.saveFields = checkedDataFields
    }
  }
}
</script>

<style lang="scss" scoped>
.field-filter-content {
  max-height: 300px;
  overflow: hidden;

}
.all-checked {
  padding-left: 12px;
}
.field-title {
  height: 32px;
  line-height: 32px;
  padding-left: 12px;
}
.field-filter-group /deep/ {
  width: 108px;
  padding-left: 12px;
  .el-checkbox {
    width: 100%;
    height: 28px;
    line-height: 28px;
  }
}
</style>
<style>
.field-filter-scroll {
  max-height: 300px;
}
.field-filter-content .is-horizontal {
  display: none;
}
</style>
