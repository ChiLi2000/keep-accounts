<template>
  <div id="chartLine"/>
</template>

<script lang="ts">

import {Component, Prop, Watch} from "vue-property-decorator";
const echarts = require("echarts");
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import dayjs from "dayjs";
import Vue from 'vue'

@Component
// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class myLine extends Vue {
  @Prop() public readonly title!: string;
  @Prop() dataLine!: testResult;
  chartLine: any = null;
  options = {
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis",
      position: "top",
      triggerOn: "click",
      formatter: "{c}"
    },
    legend: {
      data: [""]
    },

    grid: {
      left: 0,
      right: "1%",
      bottom: "10%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [] as any,
      axisTick: {alignWidthLabel: true},
      axisLine: {lineStyle: {color: "#666"}},
    },
    yAxis: {
      type: "value",
      splitNumber: 2,
      scale: true,
      show: false,
      splitLine: {
        show: false
      }
    },
    series: [{
      symbol: "circle",
      lineStyle: {
        color: "#e1c748"
      },
      itemStyle: {
        borderWidth: 5,
        color: "#e1c748",
      },
      name: "",
      type: "line",
      data: [] as any
    }
    ]
  };

  mounted() {
    this.init();
  }

  @Watch("dataLine", {deep: true})
  onData() {
    this.options.xAxis.data = [];
    this.options.series[0].data = [];
    this.changeData();
      this.chartLine.setOption(this.options, true);
  }

  changeData() {
    for (let i = 1; i <= dayjs(this.dataLine.title).daysInMonth(); i++) {
      let t = 0;
      for (let j = 0; j < this.dataLine.items.length; j++) {
        if (i === dayjs(this.dataLine.items[j].createAt).date()) {
          t++;
          this.options.xAxis.data.push(i + "日");
          this.options.series[0].data.push(parseFloat(this.dataLine.items[j].amount.toString()).toFixed(2));
          break;
        }
      }
      if (t === 0) {
        this.options.xAxis.data.push(i + "日");
        this.options.series[0].data.push(0);
      }
    }
  }

  init() {
    this.changeData();
    // 执行图表对象的初始化
    this.chartLine = echarts.init(document.getElementById("chartLine"));
    // 为图标表对象赋值

      this.chartLine.setOption(this.options, true);

  }
}
</script>

<style scoped lang="scss">
#chartLine {
  width: 430%;
  min-height: 30vh;
}

</style>