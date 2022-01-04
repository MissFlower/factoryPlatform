<!--
 * @Description: TableListBox
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-01 14:05:33
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-17 16:28:29
-->
<template>
  <div class="table-list-box">
    <div v-if="showFunctionBtn" class="clearfix">
      <div v-if="showLeft" class="fl">
        <slot name="left" />
      </div>

      <div v-if="showRight" class="fr right">
        <slot name="right" />
      </div>
    </div>

    <slot />

    <div v-if="showFooter" class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
// 表格容器
export default {
  name: 'TableListBox',
  data() {
    return {
    }
  },
  computed: {
    showFunctionBtn() {
      const { left = [], right = [] } = this.$slots
      return left.length + right.length
    },
    showLeft() {
      return this.$slots?.left?.length
    },
    showRight() {
      return this.$slots?.right?.length
    },
    showFooter() {
      return this.$slots?.footer?.length
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.table-list-box /deep/ {
  .el-table {
    margin-top: 24px;
  }

  .el-dropdown {
    margin-left: 12px;
  }

  .footer {
    text-align: right;
    margin-top: 24px;
  }
}

</style>
