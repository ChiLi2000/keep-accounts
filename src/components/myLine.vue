<template>
  <div id="chartLine"/>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";

const echarts = require("echarts");
// import echarts from 'echarts'
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import dayjs from "dayjs";
//
@Component
// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class myLine extends Vue {
  @Prop() public readonly title!: string;
  @Prop() dataLine!: testResult;
  chartLine = null;
  options = {
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: []
    },
    grid: {
      left: "1%", //grid 组件离容器左侧的距离
      right: "4%", //同理
      bottom: "3%",
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: []
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
    series: [
      {
        name: "",
        type: "line",
        data: []
      }
    ]
  };

  mounted() {
    this.init();
  }

  @Watch("dataLine", {deep: true})
  onData(){
    this.options.xAxis.data=[]
    this.options.series[0].data=[]
    this.changeData()
    this.chartLine.setOption(this.options,true)
  }

  // @Watch("options",{deep:true})
  // onOptions(){
  //   this.chartLine.setOption(this.options,true)
  //   console.log(this.options)
  // }
changeData(){
  for (let i = 1; i <= dayjs(this.dataLine.title).daysInMonth(); i++) {
    for (let j = 0; j < this.dataLine.items.length; j++) {
      if (i === dayjs(this.dataLine.items[j].createAt).date()) {
        this.options.xAxis.data.push(i);
        this.options.series[0].data.push(this.dataLine.items[j].amount);
      } else {
        this.options.xAxis.data.push(i);
        this.options.series[0].data.push(0);
      }
    }
  }
}
  init() {
    this.changeData()
    // 执行图表对象的初始化
    this.chartLine = echarts.init(document.getElementById("chartLine"));
    // 为图标表对象赋值
      this.chartLine.setOption(this.options,true);
  }
}
</script>

<style scoped lang="scss">
#chartLine {
  width: 100%;
  min-height: 200px;
}

</style>