<!--
 * @Description: ModelSelect 型号选择框组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 11:52:38
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-14 11:47:30
-->
<template>
  <ElSelect
    ref="select"
    v-bind="$attrs"
    :multiple="multiple"
    collapse-tags
    placeholder="请选择型号"
    v-on="$listeners"
  >
    <p v-if="multiple" :class="['el-select-dropdown__item', isAllSelect ? 'selected' : '']" @click="allHandler">
      <span>全部</span>
    </p>
    <ElOption v-if="!multiple && showAllOptions" label="全部" value="" />
    <ElOption
      v-for="item in options"
      :key="item.key"
      :label="item.value"
      :value="item.key"
    />
  </ElSelect>
</template>

<script>
// 型号选择框
import { dictList, getModelList } from 'src/api/common'
import { DICTIONARY_TYPE, MODEL_NAME } from 'src/common/constants'
export default {
  name: 'ModelSelect',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    showAllOptions: {
      type: Boolean,
      default: false
    },
    // 型号来源 取值有FACTORY | ERP
    origin: {
      type: String,
      default: 'FACTORY'
    },
    type: {
      type: [String, Number],
      default: '',
      validator: value => ['', ...Object.values(MODEL_NAME)].includes(value)
    }
  },
  data() {
    return {
      isAllSelect: false,
      options: [],
      keyArr: []
    }
  },
  watch: {
    '$attrs.value': {
      handler(newValue) {
        if (!newValue?.length) { return }
        this.isAllSelect = newValue.length === this.options.length
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let data = null
      let res = null
      switch (this.origin) {
        case 'FACTORY':
          res = await getModelList({
            process: this.type
          })
          data = res.length && res.map(({ modelName, modelCode }) => ({
            key: modelCode,
            value: modelName
          }))
          break
        case 'ERP':
          data = await dictList({
            dictType: DICTIONARY_TYPE.MODEL
          })
          break

        default:
          break
      }
      this.options = data || []
      this.keyArr = this.options.map(item => item.key)
      this.multiple && this.allHandler()
      this.$emit('getList', this.options)
    },
    allHandler() {
      this.isAllSelect = !this.isAllSelect
      this.$emit('input', this.isAllSelect ? this.keyArr : [])
      this.$refs.select.blur()
    },
    reset() {
      this.isAllSelect = false
      this.allHandler()
    }
  }
}
</script>
