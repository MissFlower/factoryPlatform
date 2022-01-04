<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-28 13:26:40
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-15 18:07:58
-->
<template>
  <ElTabs type="border-card" class="device-tab-container">
    <ElTabPane label="整机测试">
      <Machine />
    </ElTabPane>

    <ElTabPane label="半成品测试">
      <Semifinished />
    </ElTabPane>
  </ElTabs>
</template>

<script>
// 电池测试统计
import Machine from './Machine'
import Semifinished from './Semifinished'
export default {
  name: 'BatteryStatistics',
  components: {
    Machine,
    Semifinished
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
