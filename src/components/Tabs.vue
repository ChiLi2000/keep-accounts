<template>
  <ul class="tabs" :class="classPrefix && `${classPrefix}-wrapper`">
    <li class="selected">支出<slot/></li>
    <li>收入</li>
  </ul>
</template>

<script lang="ts">
export default {
name: "Tabs",
  props: ["classPrefix"],
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.tabs {
  display: flex;
  justify-content: space-between;
  text-align: center;
  li {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 4px 8px;
    margin: $out-margin;
  }
  li.selected {
    border-bottom:2px solid gray;
  }
}
</style>