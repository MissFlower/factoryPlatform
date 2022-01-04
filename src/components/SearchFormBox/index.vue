<!--
 * @Description: SearchFormBox
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-01 11:46:31
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-25 09:34:46
-->
<template>
  <div class="search-form-container">
    <slot />

    <div class="search-button-box">
      <slot name="searchBtn" />
    </div>
  </div>
</template>

<script>
// 查询表单
export default {
  name: 'SearchFormBox'
}
</script>

<style lang="scss" scoped>
.search-form-container /deep/ {
  margin-bottom: 12px;
  background: #fdfdfd;
  padding-bottom: 12px;
  border-radius: 6px;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

  .el-form{
    display: flex;
    flex-wrap: wrap;
    gap: 10px 18px;
    margin-bottom: 24px;
  }

  .el-form-item {
    flex: 0 1 calc((100% - 54px) / 4);
    margin-right: 0;
    margin-bottom: 0;
  }

  .el-form-item__content,
  .el-select  {
    width: 100%;
  }

  .search-button-box {
    text-align: center;

    .el-button+.el-button {
      margin-left: 18px;
    }
  }

  .el-range-editor--medium.el-input__inner {
    width: 100%;
  }
}
</style>
