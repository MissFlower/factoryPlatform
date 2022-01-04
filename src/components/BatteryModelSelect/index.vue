<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-15 18:14:06
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-22 14:53:16
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
      v-for="battery in options"
      :key="battery.key"
      :label="battery.value"
      :value="battery.key"
    />
  </ElSelect>
</template>

<script>
// 电池型号
import { getBatteryModelList } from 'src/api/common'
export default {
  name: 'ProductSelect',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    showAllOptions: {
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
      // 获取电池型号列表数据
      const data = await getBatteryModelList()
      this.options = data || []
      this.keyArr = this.options.map(item => item.key)
      this.multiple && this.allHandler()
      this.$emit('change', this.options)
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
