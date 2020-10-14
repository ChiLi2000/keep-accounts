<template>
  <Layout>
    <ol class="outer">
      <li>
        <h3 class="title">
          10月14日<span class="type">支出：￥200 收入：￥1000 </span>
        </h3>
        <ol>
          <li class="record">
            <div class="left">
              <Icon name="detail" class="icon"/>
              <p>标签<span class="note">备注</span></p></div>
            <span>$100</span>
          </li>
          <li class="record">
            <div class="left">
              <Icon name="detail" class="icon"/>
              <p>标签<span class="note">备注</span></p></div>
            <span>$100</span>
          </li>
          <li class="record">
            <div class="left">
              <Icon name="detail" class="icon"/>
              <p>标签<span class="note">备注</span></p></div>
            <span>$100</span>
          </li>
        </ol>
      </li>
      <li>
        <h3 class="title">
          10月14日<span class="type">支出：￥200 收入：￥1000 </span>
        </h3>
        <ol>
          <li class="record">
            <div class="left">
              <Icon name="detail" class="icon"/>
              <p>标签<span class="note">备注</span></p></div>
            <span>$100</span>
          </li>
          <li class="record">
            <div class="left">
              <Icon name="detail" class="icon"/>
              <p>标签<span class="note">备注</span></p></div>
            <span>$100</span>
          </li>
          <li class="record">
            <div class="left">
              <Icon name="detail" class="icon"/>
              <p>标签<span class="note">备注</span></p></div>
            <span>$100</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>

</template>

<script lang="ts">
export default {
  name: "Detail"
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

%item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;

}

.outer {
  margin-top: 10px;

  .title {
    @extend %item;
    line-height: 24px;
    background-color: #fbfbfb;
    padding: $out-padding;

    .type {
      font-size: 14px;
    }
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

      .note {
        color: $textLighterColor;
        font-size: 12px;
        font-weight: normal;
        margin-left: 8px;
      }
    }
  }
}

</style>