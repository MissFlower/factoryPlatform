<!--
 * @Description: DefaultGraph 缺省图
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-03 18:02:12
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-18 18:22:54
-->
<template>
  <div class="default-graph">
    <ElImage :src="src" :style="{width: width + 'px', height: height + 'px'}" />
    <span class="tip-text">{{ text }}</span>
  </div>
</template>

<script>
// 缺省图
export default {
  name: 'DefaultGraph',
  props: {
    src: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: '暂无数据'
    },
    width: {
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 100
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.default-graph {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tip-text {
    font-size: 14px;
    color: #555;
    height: 36px;
    line-height: 36px;
    margin-top: 12px;
  }
}
</style>
