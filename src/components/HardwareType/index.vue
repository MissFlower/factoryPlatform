<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-27 13:57:45
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-25 15:28:23
-->
<template>
  <div>
    <ElSelect
      ref="select"
      v-bind="$attrs"
      collapse-tags
      placeholder="请选择硬件类型"
      v-on="$listeners"
    >
      <ElOption v-if="showAllOptions" label="全部" value="" />
      <ElOption
        v-for="(hardware, index) in options"
        :key="index"
        :label="hardware"
        :value="hardware"
      />
    </ElSelect>
  </div>
</template>

<script>
// 硬件类型 已弃用(暂时先不删除)
import { getHardwareType } from 'src/api/dataDictionary'
export default {
  name: 'HardwareType',
  props: {
    showAllOptions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      // 获取硬件类型数据
      const data = await getHardwareType()
      this.options = data || []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
