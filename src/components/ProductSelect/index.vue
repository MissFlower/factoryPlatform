<!--
 * @Description: ProductSelect 产品选择框组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 11:25:28
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-27 14:00:55
-->
<template>
  <ElSelect
    ref="select"
    v-bind="$attrs"
    :multiple="multiple"
    collapse-tags
    placeholder="请选择产品"
    v-on="$listeners"
  >
    <p v-if="multiple" :class="['el-select-dropdown__item', isAllSelect ? 'selected' : '']" @click="allHandler">
      <span>全部</span>
    </p>
    <ElOption v-else label="全部" value="" />
    <ElOption
      v-for="item in options"
      :key="item.key"
      :label="item.value"
      :value="item.key"
    />
  </ElSelect>
</template>

<script>
// 产品选择框
import { dictList } from 'src/api/common'
import { DICTIONARY_TYPE } from '@/common/constants'
export default {
  name: 'ProductSelect',
  props: {
    multiple: {
      type: Boolean,
      default: false
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
        if (!newValue.length) { return }
        this.isAllSelect = newValue.length === this.options.length
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const data = await dictList({
        dictType: DICTIONARY_TYPE.PRODUCT
      })
      this.options = data || []
      this.keyArr = this.options.map(item => item.key)
      this.multiple && this.allHandler()
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
