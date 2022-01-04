<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-01-28 13:29:45
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-17 16:36:55
-->
<template>
  <ElTabs
    type="border-card"
    class="device-tab-container"
  >
    <ElTabPane label="整机测试">
      <Machine />
    </ElTabPane>
    <ElTabPane label="半成品测试">
      <semiSearch />
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
// 设备测试查询
import Machine from './Machine'
import CommunicationBoard from './CommunicationBoard'
import ChargeBoard from './ChargeBoard'
import semiSearch from './semiSearch'
export default {
  name: 'DeviceStatistics',
  components: {
    Machine,
    CommunicationBoard,
    ChargeBoard,
    semiSearch
  }
}
</script>

<style lang="scss" scoped>
</style>
