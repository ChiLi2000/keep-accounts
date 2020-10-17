<template>
  <ul class="tabs" :class="{ [classPrefix + '-wrapper']: classPrefix }">
    <li v-for="item in dataSource"
        :key="item.value"
        @click="select(item)"
        :class="liClass(item)">{{item.text}}
      <slot/>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };
@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item: DataSourceItem){
    return{
      [this.classPrefix+"-item"]: this.classPrefix,
      selected:item.value === this.value
    }
  }

  select(item: DataSourceItem){
    this.$emit("update:value",item.value)
  }


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
    padding: $padding-radio;
    margin: $out-margin;
  }

  //li.selected {
  //  border-bottom:2px solid gray;
  //}
}
</style>