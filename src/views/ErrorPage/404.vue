<!--
 * @Description: 404
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-03 18:00:01
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-07 11:25:32
-->
<template>
  <div class="error-container">
    <ElImage :src="require('src/assets/images/404.png')" class="image" />
    <div class="tips-container">
      <div class="tip-text">您的访问出错了</div>
      <div class="tip-text">很抱歉，您访问的页面不存在，请检查您输入的地址是否正确</div>
      <ElButton type="success" class="back-index" @click="backIndex">返回首页</ElButton>
    </div>
  </div>
</template>

<script>
export default {
  name: '404',
  data() {
    return {

    }
  },
  methods: {
    backIndex() {
      this.$router.replace({
        path: '/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.error-container {
  text-align: center;
  .image {
    width: 300px;
    height: 300px;
    margin-top: 10vh;
  }

  .tip-text {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
  }

  .back-index {
    margin-top: 12px;
  }
}
</style>
