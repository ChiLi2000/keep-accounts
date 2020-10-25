<template>
  <div>
  <li class="record" v-for="item in items" :key="item.id">
    <div class="left">
      <Icon :name="`${item.tag.name}`" class="icon"/>
      <p>{{ item.tag.value }}<span class="note">{{ item.note }}</span></p>
    </div>
    <p class="right">${{ item.amount }}</p>
  </li>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Record extends Vue {
  @Prop() items!: RecordItem;
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

  .right {
    text-align: center;
    padding: 8px 0;
  }

  span {
    color: $textLighterColor;
    font-size: 12px;
    font-weight: normal;
    margin: 0 16px;
  }

}

</style>