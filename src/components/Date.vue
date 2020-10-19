<template>
  <div class="date-outer" :class="classPrefix && `${classPrefix}-wrapper`">
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
import {Component, Prop} from "vue-property-decorator";

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
  justify-content: center;
  margin: $out-padding;
  //border:1px solid red;
}
::v-deep .el-date-editor.el-input{
  width:100px;

  input.el-input__inner {
    padding:0 0 0 30px;
    border-radius: 25px;

  }
}

::v-deep .el-icon-circle-close{
  visibility: hidden;
  transition: all 0s;
}
</style>