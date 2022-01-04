<!--
 * @Description: DataField 数据字段选择框组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 13:05:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-27 13:58:32
-->
<template>
  <ElSelect
    ref="select"
    v-bind="$attrs"
    :multiple="multiple"
    collapse-tags
    placeholder="请选择数据字段"
    v-on="$listeners"
  >
    <p v-if="multiple" :class="['el-select-dropdown__item', isAllSelect ? 'selected' : '']" @click="allHandler">
      <span>全部</span>
    </p>
    <ElOption v-else label="全部" value="" />
    <ElOption
      v-for="(name, key) in options"
      :key="key"
      :label="name"
      :value="key"
    />
  </ElSelect>
</template>

<script>
// 数据字段
import { DATA_FIELDS } from 'src/common/constants'
export default {
  name: 'DataField',
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAllSelect: false,
      options: DATA_FIELDS,
      keyArr: Reflect.ownKeys(DATA_FIELDS)
    }
  },
  watch: {
    '$attrs.value': {
      handler(newValue) {
        this.isAllSelect = newValue.length === this.keyArr.length
      }
    }
  },
  mounted() {
    this.multiple && this.allHandler()
  },
  methods: {
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
