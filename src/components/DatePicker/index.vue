<!--
 * @Description: DatePicker 日期选择器
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 14:46:28
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-04-14 11:09:52
-->
<template>
  <ElDatePicker
    v-bind="$attrs"
    :type="type"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :value-format="valueFormat"
    :clearable="false"
    v-on="$listeners"
    :picker-options="pickerOptions"
  />
</template>

<script>
// 日期选择器
export default {
  name: 'DatePicker',
  props: {
    type: {
      type: String,
      default: 'daterange'
    },
    /**
     * 时间跨度
     */
    dateRange: {
      type: [String, Number],
      default: 30
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    /**
     * 当天是否可选
     */
    isShowToday: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pickerOptions() {
      return {
        onPick: date => {
          if (date.minDate && !date.maxDate) {
            this.timeOptionRange = date.minDate
          }
          if (date.maxDate) {
            this.timeOptionRange = null
          }
        },
        disabledDate: date => {
          const timeOptionRange = this.timeOptionRange
          const oneDayTime = 60 * 60 * 24 * 1 * 1000
          const range = oneDayTime * (this.dateRange - 1)
          const currentDayLastSecond = new Date(new Date().toLocaleDateString()).getTime() + oneDayTime - 1000
          if (timeOptionRange) {
            return (
              date.getTime() > timeOptionRange.getTime() + range ||
              date.getTime() < timeOptionRange.getTime() - range ||
              date.getTime() > (currentDayLastSecond - (this.isShowToday ? 0 : oneDayTime))
            )
          } else {
            return date.getTime() > (currentDayLastSecond - (this.isShowToday ? 0 : oneDayTime))
          }
        }
      }
    }
  }
}
</script>
