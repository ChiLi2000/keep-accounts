<template>
  <div class="date-outer" :class="classPrefix && `${classPrefix}-wrapper`">
  <div class="date" :class="classPrefix && `${classPrefix}-content`">
    2020年10月
    <Icon name="down" class="down_icon"></Icon>
  </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "date",
  props: ["classPrefix"],
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.date-outer {
  display: flex;
  justify-content: center;
  align-items: center;
  .date{
    font-weight: $font-height;
    margin: 12px 0;
    font-size: 20px;
    border: 1px solid #E5E5E5;
    border-radius: 25px;
    padding: $padding-radio;
  }
}

</style>