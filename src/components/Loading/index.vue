<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-11-30 15:25:12
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-27 13:59:59
-->
<template>
  <div class="loading-mask">
    <div class="loading">
      <i />
    </div>
  </div>
</template>
<script>
// Loading
export default {
  name: 'Loading'
}
</script>
<style lang="scss" scoped>
.loading-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10000;
}
$font-size: 1.2;
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  i {
    height: $font-size + em;
    width: $font-size + em;
    border-radius: 100%;
    background:#4A90E2;
    display: block;
    position: absolute;
    left: 50%;
    animation: spin 2s ease infinite;

    &:before, &:after{
      content: '';
      display: block;
      position:  absolute;
      height: inherit;
      width: inherit;
      background: inherit;
      border-radius: inherit;
      animation: spin 2s ease infinite;
    }
    &:before{
      left: -($font-size * 1.15) + em;
      background: #7FB0EA;
    }
    &:after{
      left: ($font-size * 1.15) + em;
      background: #B5D2F3;
    }
  }

  @keyframes spin{
    0%{
      top: 0;
      transform: rotate(0deg);
    }
    50%{
      top: -($font-size * 2) + em;
      transform: rotate(-180deg);
    }
    100%{
      top: 0;
      transform: rotate(-360deg);
    }
  }

}
</style>
