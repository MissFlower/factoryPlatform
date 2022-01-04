<!--
 * @Description: UploadFile 上传文件组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-03 14:41:30
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-27 14:01:51
-->
<template>
  <ElDialog
    v-bind="$attrs"
    width="420px"
    :title="`${FILE_OPERATOR_TEXT[type]}文件`"
    :close-on-click-modal="false"
    class="upload-dialog"
    v-on="$listeners"
    @close="close"
  >
    <ElUpload
      ref="upload"
      :multiple="false"
      :file-list="fileList"
      action=""
      :auto-upload="false"
      :http-request="uploadFile"
      accept=".xlsx,.xls"
      :show-file-list="false"
      :on-change="handleChange"
      class="upload-demo"
    >
      <div class="upload-content">
        <ElButton slot="trigger" size="small" type="primary">选取文件</ElButton>
        <div slot="tip" class="el-upload__info ellipsis" @click.stop>{{ fileInfo }}</div>
      </div>
      <div slot="tip" class="el-upload__tip">Tips: 只能上传xlsx/xls文件，且不超过1M</div>
    </ElUpload>
    <span slot="footer" class="dialog-footer">
      <ElButton type="primary" :disabled="!isUpload" @click="update">{{ FILE_OPERATOR_TEXT[type] }}</ElButton>
    </span>
  </ElDialog>
</template>

<script>
// 上传文件
import { formatSize } from 'src/utils'
import { FILE_OPERATOR_TEXT } from 'src/common/constants'
import { upload } from 'src/api/spotCheck'
export default {
  name: 'UploadFile',
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isUpload: false,
      fileInfo: '',
      fileList: [],
      FILE_OPERATOR_TEXT
    }
  },
  methods: {
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]
      }
      const { name, raw: { size }} = this.fileList[0]
      this.fileInfo = `${name + ' (' + formatSize(size) + ')'}`
      this.isUpload = size < 1024 * 1024
      if (!this.isUpload) {
        this.$message({
          type: 'warning',
          message: '文件上传大小已超出限制!'
        })
      }
    },
    async uploadFile({ file }) {
      // 上传|更新
      const formData = new FormData()
      formData.append('file', file)
      try {
        await upload({
          id: this.$attrs.id,
          fileData: formData
        })
        this.$emit('update')
      } catch (error) {
        console.log(error)
      } finally {
        this.$refs.upload.clearFiles()
        this.$emit('update:visible', false)
      }
    },
    update() {
      // 上传文件接口调用
      this.$refs.upload.submit()
    },
    close() {
      this.isUpload = false
      this.fileInfo = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-dialog /deep/ {

  .el-dialog__body {
    padding-top: 24px;
    padding-bottom: 0;
  }

  .upload-content {
    display: flex;
    align-items: center;
  }

  .el-upload__info {
    width: 290px;
    height: 32px;
    line-height: 32px;
    margin-top: 0;
    margin-left: 8px;
    color: #606266;
    cursor: default;
  }

  .el-upload__tip {
    height: 32px;
    line-height: 32px;
    cursor: default;
  }
  .el-upload-list__item-name {
    display: block;
  }
}
</style>
