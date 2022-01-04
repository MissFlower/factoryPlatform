<!--
 * @Description: PieChartBox
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-02 20:13:44
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-03 10:05:11
-->
<template>
  <div class="chart-container">
    <p class="chart-title">{{ title }}</p>
    <div class="pie-chart-box">
      <PieChart
        v-for="item in datas"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :data="item.data"
        :emptyTitle="item.showTitle"
      />
    </div>
  </div>
</template>

<script>
import PieChart from '../PieChart'
export default {
  name: 'PieChartBox',
  components: {
    PieChart
  },
  props: {
    title: {
      type: String,
      required: true
    },
    datas: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  margin-bottom: 24px;
  .chart-title {
    text-align: center;
    font-size: 18px;
    color: #333;
    font-weight: bold;
    height: 36px;
    line-height: 36px;
    margin-bottom: 24px;
  }
  .pie-chart-box {
    display: flex;
    justify-content: space-around;
    align-items: center;

    /deep/.pie-chart {
      flex: 1;
      height: 300px;
    }
  }
}
.chart-container + .chart-container {
  border-top: 10px solid #f8f8f8;
}
</style>
