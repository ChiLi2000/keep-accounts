<template>
  <div class="outer">
    <div class="top" :class="classPrefix && `${classPrefix}-top`">
      <Date class-prefix="date"/>
    </div>
    <Tabs class-prefix="tabs">
      <span>1000</span>
    </Tabs>
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
  background-color: $color-shadow;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    .date-wrapper {
      font-weight: $font-height;
      margin: 12px 0;
      font-size: 20px;
    }
  }
.tabs-wrapper{
  span{
    font-size:28px;
    font-weight: $font-height;
  }
}
}


</style>