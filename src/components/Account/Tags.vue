<template>
  <ul class="tags">
    <li v-for="tag in tagList"
        :key="tag.id"
        v-longpress="addLiFlag(tag.id) && showTest(`${tag.id}`,`${tag.value}`)"
        @click="toggle(tag)"
        :class="{selected:tag.id === selectedTagAdd.id}"
    >
      <Icon :name="`${tag.name}`"/>
      {{ tag.value }}
    </li>
    <li @click="createTag">
      <Icon name="add"/>
      添加
    </li>
    <el-dialog :append-to-body="true" title="请编辑类别名" :visible.sync="showDialog" :before-close="cancel">
      <el-form>
        <el-form-item>
          <el-input v-model="middleName" @input="overLength"></el-input>
          <p class="msg">{{ middleName.length }} / 4</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="remove">删除</el-button>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateTag">确 定</el-button>
      </div>
    </el-dialog>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop,Watch} from "vue-property-decorator";
import longpress from "@/lib/longpress";

const map: { [key: string]: string } = {
  "tag name null": "类别名不能为空",
  "tag name duplicated": "类别名重复了",
  "tag name lengthOver": "类别名超长了"

};
@Component({
  directives: {longpress}
})
export default class Tags extends Vue {
  @Prop(String) readonly contact!: string;
  @Prop(String) readonly valueType!: string;
  @Prop() selectTag!: Tag;
  selectedTagAdd: Tag = this.selectTag;
  showDialog = false;
  middleName = "";
  middleId = "";

@Watch("valueType")
onType(){
  if(this.valueType === '-'){
    this.selectedTagAdd = this.$store.state.disburseTagList[0];
  }else{
    this.selectedTagAdd = this.$store.state.incomeTagList[0];
  }
}
  addLiFlag(id: string) {
    return parseInt(id) > 22;
  }

  created() {
    this.$store.commit("fetchDisburseTags");
    this.$store.commit("fetchIncomeTags");
    // console.log(this.selectTag)
  }

  showTest(id: string, value: string) {
    return () => {
      this.middleId = id;
      this.middleName = value;
      this.showDialog = true;
    };
  }

  cancel() {
    this.showDialog = false;
  }

  overLength() {
    this.middleName = this.middleName.substring(0, 4);
    this.$emit("change", this.middleName);
  }

  updateTag() {
    if (this.contact === "-") {
      this.$store.commit("updateDisburseTag", {
        id: this.middleId,
        value: this.middleName,
      });

    } else {
      this.$store.commit("updateIncomeTag", {
        id: this.middleId,
        value: this.middleName,
      });
    }
    if (this.$store.state.createTagError) {
      window.alert(
          map[this.$store.state.createTagError.message] || "未知错误"
      );
    } else {
      this.cancel();
    }
  }

  remove() {
    if (this.contact === "-") {
      this.$store.commit("removeDisburseTag", this.middleId);
      this.toggle(this.$store.state.disburseTagList[0]);
    } else {
      this.$store.commit("removeIncomeTag", this.middleId);
      this.toggle(this.$store.state.incomeTagList[0]);
    }
    window.alert("删除成功");
    this.cancel();

  }

  get tagList(): Tag[] {
    if (this.contact === "-") {
      return this.$store.state.disburseTagList;
    } else {
      return this.$store.state.incomeTagList;
    }
  }


  createTag() {
    const value = window.prompt("请输入类别名", "类别名4字以内且不重复");
    if (value !== null) {
      if (this.contact === "-") {
        this.$store.commit("createDisburseTag", {name: "其它", value: value});
      } else {
        this.$store.commit("createIncomeTag", {name: "其它", value: value});
      }

      if (this.$store.state.createTagError) {
        window.alert(
            map[this.$store.state.createTagError.message] || "未知错误"
        );
      }
    }
  }

  toggle(tag: Tag) {
    this.$emit("update:selectTag", tag);
    this.selectedTagAdd = tag;
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.tags {
  margin: 8px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    padding: 6px 0;
    width: 25%;

    &.selected {
      color: $color-label;
    }

    ::v-deep svg {
      width: 32px;
      height: 32px;
    }
  }
}

::v-deep .el-dialog {
  width: 80%;

  .el-dialog__body {
    padding: 15px 20px 0 20px;
  }

  .el-dialog__footer {
    padding: 0 20px 20px 20px;

    .dialog__footer {

      display: flex;

      .el-button {
        justify-content: space-between;
        padding: 10px 14px;
      }
    }
  }

}

::v-deep .el-form-item__content {
  margin-left: 10px !important;

}

.msg {
  text-align: right;
  font-size: 12px;
  color: #999999;
}

.addClass {
  color: red;
}

::v-deep svg {
  width: 32px;
  height: 32px;
}
</style>