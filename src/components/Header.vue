<template>
  <div class="outer">
    <div class="top" :class="classPrefix && `${classPrefix}-top`">
      <div class="time">
        2020年10月
        <Icon name="down" class="icon"></Icon>
      </div>

    </div>

    <ul class="tabs">
      <li class="selected">支出<span>1000</span></li>
      <li>收入<span>1000</span></li>
    </ul>

  </div>


</template>

<script lang="ts">
export default {
  name: "Header",
  props: ["classPrefix"],

};
</script>

<style scoped lang="scss">

@import "~@/assets/style/helper.scss";

.outer {
  background-color: #fff;

  .top {
    display: flex;
    justify-content: center;
    align-items: center;

    .time {
      font-weight: $font-height;
      background: #F5F5F5;
      border: 1px solid #E5E5E5;
      border-radius: 15px;
      padding: 4px 8px;
      margin: 8px 0;

      .icon {
        margin-left: 4px;
      }
    }
  }

  .tabs {
    display: flex;
    justify-content: space-between;
    text-align: center;

    li {
      width: 50%;
      display: flex;
      flex-direction: column;
      padding: 8px 0;
      margin:$out-margin;

      span{
        font-size:28px;
        font-weight: $font-height;
      }
    }
    li.selected {
      border-bottom:2px solid gray;
    }

  }

}


</style>