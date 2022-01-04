<!--
 * @Description: FullScreenLayout
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-03 15:31:57
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-03 15:51:56
-->
<template>
  <div class="full-screen-wrapper">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FullScreenLayout',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.full-screen-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
