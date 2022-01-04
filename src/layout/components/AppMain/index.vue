<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 14:52:35
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-28 15:06:09
-->
<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
      <!-- <router-view :key="key" /> -->
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    key() {
      if (document.querySelector('.app-main')?.scrollTop) {
        document.querySelector('.app-main').scrollTop = 0
      }
      return this.$route.path
    },
    ...mapGetters([
      'cachedViews'
    ])
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  overflow: auto;
  height: calc(100% - 37px);
  min-width: 1100px;
  padding: 12px 15px 24px;
}
</style>
