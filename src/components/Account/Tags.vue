<template>
  <ul class="tags">
    <li v-for="tag in tagList" :key="tag.id" v-longpress="showTest(`${tag.id}`,`${tag.value}`)" @click="test">
      <Icon :name="`${tag.name}`" />
      {{ tag.value }}
      <!--      <AccDialog :dialog-visible.sync="showDialog" :value.sync="tag.value"></AccDialog>-->
    </li>
    <li @click="createTag">
      <Icon name="add"/>
      添加
    </li>
    <AccDialog :dialog-visible.sync="showDialog" :value.sync="middleName" :id="middleId" ></AccDialog>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";
import AccDialog from "@/components/AccDialog.vue";
import longpress from '@/lib/longpress';

const map: { [key: string]: string } = {
  "tag name null": "标签名不能为空",
  "tag name duplicated": "标签名重复了"
};
@Component({
  components: {AccDialog},
  directives: {longpress}
})
export default class Tags extends Vue {
  @Prop(String) readonly contact!: string;
  showDialog = false;
  middleName = "";
  middleId = "";

  @Watch("contact")
  onContact() {
    if (this.contact === "-") {
      this.$store.commit("fetchDisburseTags");
    } else {
      this.$store.commit("fetchIncomeTags");
    }
  }
  test(){
    console.log("test")
  }

  showTest(id: string, value: string) {
    return ()=>{

      this.middleId = id;
      this.middleName = value;
      this.showDialog = true;
    }
  }

  get tagList() {
    if (this.contact === "-") {
      return this.$store.state.disburseTagList;
    } else {
      return this.$store.state.incomeTagList;
    }
  }
  created() {
    this.$store.commit("fetchDisburseTags");
  }
  createTag() {
    const value = window.prompt("请输入标签名");
    if (value !== null) {
      if (this.contact === "-") {
        this.$store.commit("createDisburseTag", {name: "left", value: value});
      } else {
        this.$store.commit("createIncomeTag", {name: "left", value: value});
      }

      if (this.$store.state.createTagError) {
        window.alert(
            map[this.$store.state.createTagError.message] || "未知错误"
        );
      }
    }
  }

// @click="remove(`${tag.id}`)"
  remove(id: string) {
    if (this.contact === "-") {
      this.$store.commit("removeDisburseTag", id);
    } else {
      this.$store.commit("removeIncomeTag", id);
    }
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

    ::v-deep svg {
      width: 32px;
      height: 32px;
    }
  }
}

::v-deep .el-dialog {
  width: 60%;

  .el-dialog__body {
    padding: 15px 20px 0px 20px;
  }
}

::v-deep .el-form-item__content {
  margin-left: 10px !important;
  //border:1px solid red;
}

.addClass{
  color:red;
}
</style>