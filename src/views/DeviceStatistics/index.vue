<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-28 13:29:00
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-28 18:08:51
-->
<template>
  <ElTabs type="border-card" class="device-tab-container">
    <ElTabPane label="整机测试">
      <Machine />
    </ElTabPane>
    <ElTabPane label="半成品测试">
      <semiStatisitics />
    </ElTabPane>

    <ElTabPane label="通讯板测试">
      <CommunicationBoard />
    </ElTabPane>

    <ElTabPane label="充电板测试">
      <ChargeBoard />
    </ElTabPane>
  </ElTabs>
</template>

<script>
// 设备测试统计
import Machine from './Machine'
import CommunicationBoard from './CommunicationBoard'
import ChargeBoard from './ChargeBoard'
import semiStatisitics from './semiStatisitics'
export default {
  name: 'DeviceStatistics',
  components: {
    Machine,
    CommunicationBoard,
    ChargeBoard,
    semiStatisitics
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
