<!--
 * @Description: ProblemClassify 问题分类选择框组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 12:01:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-08 15:19:17
-->
<template>
  <ElSelect
    ref="select"
    v-bind="$attrs"
    :multiple="multiple"
    collapse-tags
    placeholder="请选择问题分类"
    v-on="$listeners"
  >
    <p v-if="multiple" :class="['el-select-dropdown__item', isAllSelect ? 'selected' : '']" @click="allHandler">
      <span>全部问题</span>
    </p>
    <ElOption v-else label="全部问题" value="" />
    <ElOption
      v-for="(name, key) in options"
      :key="key"
      :label="name"
      :value="key"
    />
  </ElSelect>
</template>

<script>
// 问题分类
import { PROBLEM_CLASSIFY } from 'src/common/constants'
export default {
  name: 'ProblemClassify',
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAllSelect: false,
      options: PROBLEM_CLASSIFY,
      keyArr: Reflect.ownKeys(PROBLEM_CLASSIFY)
    }
  },
  watch: {
    '$attrs.value': {
      handler(newValue) {
        this.isAllSelect = newValue.length === this.keyArr.length
      }
    }
  },
  methods: {
    allHandler() {
      this.isAllSelect = !this.isAllSelect
      this.$emit('input', this.isAllSelect ? this.keyArr : [])
      this.$refs.select.blur()
    },
    reset() {
      this.isAllSelect = true
      this.allHandler()
    }
  }
}
</script>
