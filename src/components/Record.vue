<template>
      <li class="record">
        <div class="left">
          <Icon name="detail" class="icon"/>
          <p>标签<span class="note">备注</span></p>
        </div>
        <p class="right"><span>12:00</span>$100</p>
      </li>
</template>

<script lang="ts">
export default {
name: "Record"
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
%item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;

}

.record {
  background-color: $color-shadow;
  @extend %item;
  padding: $out-padding;

  .left {
    @extend %item;
    line-height: 32px;
    .icon {
      margin-right: 10px;
    }

    ::v-deep svg {
      width: 32px;
      height: 32px;
    }
  }

  .right{
    text-align: center;
    padding:8px 0;
  }

  span {
    color: $textLighterColor;
    font-size: 12px;
    font-weight: normal;
    margin: 0 16px;
  }

}

</style>