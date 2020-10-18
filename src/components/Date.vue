<template>
  <div class="date-outer" :class="classPrefix && `${classPrefix}-wrapper`">
    <span></span>
    <el-date-picker
        v-model="dateValue"
        :type="type"
        :placeholder="placeholder"
        :format="format">
    </el-date-picker>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";

@Component
export default class Date extends Vue {
  @Prop(String) classPrefix?: string;
  @Prop() value!: string;
  dateValue = this.value;
  @Prop() type!: string;
  @Prop() placeholder?: string;
  @Prop() format!: string;


}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.date-outer {
  display: flex;
  justify-content: space-between;
  margin: $out-padding;
}

::v-deep input.el-input__inner {
  width: 120px;
  padding-right: 10px;
  border-radius: 25px;
}

</style>