<template>
  <div class="outer">
    <div class="statistics-top">
      <Date/>
      <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="tabs">
        <span class="additional">1000</span>
      </Tabs>
    </div>
    <div class="statistics-center">
      <div class="day">
        <h3>每日支出</h3>
        <div>折线统计图</div>
      </div>
      <div class="classify">
        <h3>支出分类</h3>
        <div>饼状图</div>
      </div>
      <ol>
        <p class="title">
          10月支出排行
        </p>
        <Record/>
        <Record/>
        <Record/>
        <Record/>
        <Record/>
        <Record/>
        <Record/>
      </ol>
    </div>
    <Footer/>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
@Component
export default class Statistics extends Vue{
  recordTypeList = recordTypeList;
  type = "-";
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.outer {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .statistics-top {
    //height: 121px;
    background-color: $color-shadow;
  }

  .statistics-center {
    flex: 1;
    width: 100%;
    overflow: auto;
  }
}

::v-deep .tabs-wrapper {
  .selected{
    border-bottom:2px solid gray;
  }
}
.additional {
  font-size: 28px;
  font-weight: $font-height;
}

.title{
  font-size: 14px;
  background-color: #fbfbfb;
  padding: $out-padding;
}
h3{
  line-height: 24px;
  background-color: #fbfbfb;
  padding: $out-padding;
}

</style>