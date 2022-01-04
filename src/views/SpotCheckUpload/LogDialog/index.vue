<!--
 * @Description: LogDialog 日志Dialog
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-04 13:41:18
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-08 13:38:54
-->
<template>
  <ElDialog
    v-bind="$attrs"
    width="400px"
    :title="title"
    top="10vh"
    class="log-dialog"
    v-on="$listeners"
  >
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <ElTimeline v-if="isData">
        <ElTimelineItem
          v-for="(log, index) in logData"
          :key="index"
          :color="log.color"
          :timestamp="log.uploadDate"
          placement="top"
        >
          <div>
            <p class="info-item">{{ LOG_STATUS[log.uploadType] }}：{{ logInfo(log) }}</p>
            <p class="info-item">操作账号：{{ log.uploader }}</p>
          </div>
        </ElTimelineItem>
      </ElTimeline>

      <DefaultGraph
        v-else
        :src="require('src/assets/icons/empty.svg')"
        width="60"
        height="60"
        text="暂无数据"
      />
    </el-scrollbar>

    <span slot="footer" class="dialog-footer">
      <ElButton type="primary" @click="sure">确认</ElButton>
    </span>
  </ElDialog>
</template>

<script>
import DefaultGraph from 'src/components/DefaultGraph'
import { LOG_STATUS, UPLOAD_STATUS_SIGN } from 'src/common/constants'
export default {
  name: 'LogDialog',
  components: {
    DefaultGraph
  },
  props: {
    title: {
      type: String,
      default: '文件日志'
    },
    logData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      LOG_STATUS,
      UPLOAD_STATUS_SIGN
    }
  },
  computed: {
    isData() {
      return !!this.logData.length
    },
    logInfo() {
      return ({ uploadType, fileName }) => {
        return uploadType === UPLOAD_STATUS_SIGN.NODATA
          ? '标记为无数据日'
          : fileName
      }
    }
  },
  methods: {
    sure() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.info-item {
  height: 32px;
  line-height: 32px;
}

/deep/ .el-dialog {
  margin: 0 auto;
}

/deep/ .el-dialog__body {
  padding: 10px 20px 0;
  max-height: 400px;
  overflow: hidden;

  .scrollbar-wrapper {
    max-height: 400px;
    padding-left: 2px;
  }
}

/deep/ .el-dialog__footer {
  padding: 10px 20px;
}
</style>
