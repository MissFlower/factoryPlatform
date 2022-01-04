<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-03-15 15:37:51
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-15 18:15:32
-->
<template>
  <div>
    <ElSelect
      ref="select"
      v-bind="$attrs"
      collapse-tags
      placeholder="请选择电芯厂商"
      v-on="$listeners"
    >
      <ElOption v-if="showAllOptions" label="全部" value="" />
      <ElOption
        v-for="supplier in options"
        :key="supplier.key"
        :label="supplier.value"
        :value="supplier.key"
      />
    </ElSelect>
  </div>
</template>

<script>
// 硬件类型
import { getSupplierList } from 'src/api/common'
export default {
  name: 'SupplierSelect',
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
      // 获取电芯供应商列表数据
      const data = await getSupplierList()
      this.options = data || []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
