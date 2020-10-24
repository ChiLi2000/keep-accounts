<template>
  <el-dialog :append-to-body="true" title="请编辑类别名" :visible.sync="dialogVisible" :before-close="cancel">
    <input :value="value"
           @change="onValueChanged($event.target.value)"/>

    <div slot="footer" class="dialog-footer">
      <el-button @click="remove(id)">删除</el-button>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="update(id,value)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

const map: { [key: string]: string } = {
  "tag name null": "标签名不能为空",
  "tag name duplicated": "标签名重复了"
};
@Component
export default class AccDialog extends Vue {

  @Prop({type: Boolean})
  dialogVisible: boolean | undefined;
  @Prop() readonly value?: string;
  @Prop() id!: string;
  @Prop() type!: string;

  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
  cancel() {
      this.$emit("update:dialogVisible", false);
  }

  get tagList() {
    if (this.type === "-") {
      return this.$store.state.disburseTagList;
    } else {
      return this.$store.state.incomeTagList;
    }
  }
  update(id: string, value: string) {
    if(this.type ==='-'){
      this.$store.commit("updateDisburseTag", {
        id,
        value,
      });
    }else{
      this.$store.commit("updateIncomeTag", {
        id,
        value,
      });
    }

    if (this.$store.state.createTagError) {
      window.alert(
          map[this.$store.state.createTagError.message] || "未知错误"
      );
    }else{
      this.$emit("update:dialogVisible", false);
    }
  }

  remove(id: string) {
    if (this.type === "-") {
      this.$store.commit("removeDisburseTag", id);
    } else {
      this.$store.commit("removeIncomeTag", id);
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  width: 80%;

  .el-dialog__body {
    padding: 15px 20px ;
    margin-bottom:15px ;

    input{
    border-radius: 4px;
      border:1px solid #DCDFE6;
      height: 40px;
      font-size: inherit;
      padding: 0 15px 0 0;
      outline: 0;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
  }
  .el-dialog__footer{
    display: flex;
    .el-button{
      justify-content: space-between;
      padding: 8px 10px;
    }
  }
}

::v-deep .el-form-item__content {
  margin-left: 10px !important;
  //border:1px solid red;
}
</style>