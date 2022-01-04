<!--
 * @Description: 工序选择组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-25 15:21:00
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-01 18:13:27
-->
<template>
  <ElSelect
    ref="select"
    v-bind="$attrs"
    :multiple="multiple"
    collapse-tags
    placeholder="请选择工序"
    v-on="$listeners"
  >
    <p v-if="multiple" :class="['el-select-dropdown__item', isAllSelect ? 'selected' : '']" @click="allHandler">
      <span>全部</span>
    </p>
    <ElOption v-if="!multiple && showAllOptions" label="全部" value="" />
    <ElOption
      v-for="(name, key) in options"
      :key="+key"
      :label="name"
      :value="+key"
    />
  </ElSelect>
</template>

<script>
// 工序
import { MODEL_NAME_TEXT } from 'src/common/constants'
export default {
  name: 'ProblemClassify',
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
      options: MODEL_NAME_TEXT,
      keyArr: Reflect.ownKeys(MODEL_NAME_TEXT)
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
