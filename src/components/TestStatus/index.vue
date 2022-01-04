<!--
 * @Description: TestStatus 测试状态
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 14:41:01
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-18 13:30:22
-->
<template>
  <ElSelect
    v-bind="$attrs"
    v-on="$listeners"
    placeholder="请选择测试状态"
  >
    <ElOption label="全部" value="">全部</ElOption>
    <ElOption
      v-for="(value, key) in TEST_STATUS"
      :key="key"
      :label="value"
      :value="key"
    />
  </ElSelect>
</template>

<script>
// 测试状态
import { TEST_STATUS } from 'src/common/constants'
export default {
  name: 'TestStatus',
  data() {
    return {
      TEST_STATUS
    }
  }
}
</script>
