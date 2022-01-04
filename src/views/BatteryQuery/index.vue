<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-28 13:28:00
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-11 15:40:34
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
// 电池测试查询
import Machine from './Machine'
import Semifinished from './Semifinished'
export default {
  name: 'BatteryQuery',
  components: {
    Machine,
    Semifinished
  }
}
</script>

<style lang="scss" scoped>
</style>
