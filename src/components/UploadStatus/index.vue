<!--
 * @Description: UploadStatus 上传状态组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 13:44:56
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-23 15:59:18
-->
<template>
  <ElSelect
    v-bind="$attrs"
    v-on="$listeners"
    placeholder="请选择上传状态"
  >
    <ElOption label="全部" value="">全部</ElOption>
    <ElOption
      v-for="(value, key) in UPLOAD_STATUS_TEXT"
      :key="key"
      :label="value"
      :value="+key"
    />
  </ElSelect>
</template>

<script>
// 上传状态
import { UPLOAD_STATUS_TEXT } from 'src/common/constants'
export default {
  name: 'UploadStatus',
  data() {
    return {
      UPLOAD_STATUS_TEXT
    }
  }
}
</script>
