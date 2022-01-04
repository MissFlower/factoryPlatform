<!--
 * @Description: FatorySelect 工厂选择框组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-01 17:48:55
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-27 13:59:08
-->
<template>
  <ElSelect
    ref="select"
    v-bind="$attrs"
    :multiple="multiple"
    collapse-tags
    placeholder="请选择工厂"
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
// 工厂选择框
import { dictList } from 'src/api/common'
import { DICTIONARY_TYPE } from 'src/common/constants'
export default {
  name: 'FatorySelect',
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      DICTIONARY_TYPE,
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
        dictType: DICTIONARY_TYPE.FACTORY
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
