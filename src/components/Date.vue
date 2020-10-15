<template>
  <div class="date" :class="classPrefix && `${classPrefix}-wrapper`">
    10月14日
    <Icon name="down" class="down_icon"></Icon>
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

.date {
  background: #F5F5F5;
  border: 1px solid #E5E5E5;
  border-radius: 25px;
  padding: 4px 8px;
  .down_icon {
    margin-left: 4px;
  }
}

</style>