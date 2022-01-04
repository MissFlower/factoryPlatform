<!--
 * @Description: HardwareVersion 硬件版本选择框组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 13:17:02
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-14 11:44:40
-->
<template>
  <ElSelect
    ref="select"
    v-bind="$attrs"
    :multiple="multiple"
    collapse-tags
    placeholder="请选择硬件版本"
    v-on="$listeners"
  >
    <p v-if="multiple" :class="['el-select-dropdown__item', isAllSelect ? 'selected' : '']" @click="allHandler">
      <span>全部</span>
    </p>
    <ElOption v-else label="全部" value="" />
    <ElOption
      v-for="item in options"
      :key="item.key"
      :label="item.key"
      :value="item.value"
    />
  </ElSelect>
</template>

<script>
// 硬件版本
// import { getChargeBoardVersion, getCommBoardVersion } from 'src/api/common'
import { getHardware } from '@/api/deviceTest'
// import { MODEL_NAME } from 'src/common/constants'
export default {
  name: 'HardwareVersion',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    type: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      isAllSelect: false,
      options: [],
      keyArr: []
    }
  },
  watch: {
    '$attrs.value': {
      handler(newValue) {
        if (!newValue.length) { return }
        this.isAllSelect = newValue.length === this.options.length
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      // 获取硬件版本
      // let data = null
      const data = await getHardware({ process: this.type })
      // switch (this.type) {
      //   case MODEL_NAME.CHARGE_BOARD:
      //     data = await getChargeBoardVersion()
      //     break

      //   case MODEL_NAME.COMMUNICATION_BOARD:
      //     data = await getCommBoardVersion()
      //     break
      //   case MODEL_NAME.SEMIFINISHED:
      //     data = await getCommBoardVersion()
      //     break
      //   default:
      //     break
      // }
      // this.options = data || []
      // this.keyArr = this.options.map(item => item.key)
      this.keyArr = data || []
      this.options = this.keyArr.map(val => {
        return { key: val, value: val }
      })
      this.multiple && this.allHandler()
      this.$emit('getList', this.options)
    },
    allHandler() {
      this.isAllSelect = !this.isAllSelect
      this.$emit('input', this.isAllSelect ? this.keyArr : [])
      this.$refs.select.blur()
    },
    reset() {
      this.isAllSelect = false
      this.allHandler()
    }
  }
}
</script>
