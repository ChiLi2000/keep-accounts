<template>
  <div class="outer">
    <div class="detail-top">
      <Date/>
      <Tabs :data-source="recordTypeList"  class-prefix="tabs">
        <span>1000</span>
      </Tabs>
    </div>
    <div class="detail-center">
    <ol>
      <li>
        <h3 class="title">
          10月16日<span class="type">支出：￥200 收入：￥1000 </span>
        </h3>
        <ol>
          <Record/>
          <Record/>
          <Record/><Record/>

        </ol>
      </li>
      <li>
        <h3 class="title">
          10月16日<span class="type">支出：￥200 收入：￥1000 </span>
        </h3>
        <ol>
          <Record/>
          <Record/>
          <Record/><Record/>

        </ol>
      </li>
      <li>
        <h3 class="title">
          10月16日<span class="type">支出：￥200 收入：￥1000 </span>
        </h3>
        <ol>
          <Record/>
          <Record/>
          <Record/><Record/>

        </ol>
      </li>
    </ol>
    </div>
    <Footer />
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
@Component
export default class Detail extends Vue{
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.outer{
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  .detail-top{
    //height: 121px;
    background-color: $color-shadow;
  }
  .detail-center{
    flex: 1;
    width: 100%;
    overflow: auto;
  }
}
.tabs-wrapper{
  span{
    font-size:28px;
    font-weight: $font-height;
  }
}

.title {
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  line-height: 24px;
  background-color: #fbfbfb;
  padding: $out-padding;

  .type {
    font-size: 14px;
  }
}



</style>