<template>
  <div>
    <h3 class="title">
      10月14日
      <slot/>
    </h3>
    <ol>
      <li class="record">
        <div class="left">
          <Icon name="detail" class="icon"/>
          <p>标签<span class="note">备注</span></p>
        </div>
        <p><span>12:00</span>$100</p>
      </li>
      <li class="record">
        <div class="left">
          <Icon name="detail" class="icon"/>
          <p>标签<span class="note">备注</span></p></div>
        <p><span>12:00</span>$100</p>
      </li>
      <li class="record">
        <div class="left">
          <Icon name="detail" class="icon"/>
          <p>标签<span class="note">备注</span></p></div>
        <p><span>12:00</span>$100</p>
      </li>
    </ol>
  </div>



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
.title {
  @extend %item;
  line-height: 24px;
  background-color: #fbfbfb;
  padding: $out-padding;
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

  span {
    color: $textLighterColor;
    font-size: 12px;
    font-weight: normal;
    margin: 0 16px;
  }

}

</style>