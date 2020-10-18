<template>
  <ul class="tags">
    <li v-for="tag in tagList" :key="tag.id" @click="remove(`${tag.id}`)">
      <Icon :name="`${tag.name}`"/>
      {{ tag.value }}
    </li>
    <li @click="createTag">
      <Icon name="add"/>
      添加
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";

const map: { [key: string]: string } = {
  "tag name null": "标签名不能为空",
  "tag name duplicated": "标签名重复了"
};

@Component
export default class Tags extends Vue {
  @Prop(String) readonly contact!: string;

  @Watch("contact")
  onContact() {
    if (this.contact === "-") {
      this.$store.commit("fetchDisburseTags");
    } else {
      this.$store.commit("fetchIncomeTags");
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

  update(id: string, value: string) {
    if (this.$store.state.createTagError) {
      window.alert(
          map[this.$store.state.createTagError.message] || "未知错误"
      );
    }
    this.$store.commit("updateDisburseTag", {
      id,
      value,
    });
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
</style>