<template>
  <div class="outer" :style="{height:h+'px'}">
    <div class="account-top">
      <div class="navbar">
        <Icon class="leftIcon" name="left" @click.native="goBack"/>
        <span class="title">记账</span>
        <span></span>
      </div>
      <div class="smart">
        <Tabs :data-source="recordTypeList" :value.sync="record.type" class-prefix="tabs"/>
        <Date :value.sync="record.createAt" :placeholder="placeholder" type="date" format="MM-dd" class-prefix="date"/>
      </div>
    </div>
    <div class="account-center">
      <Tags :contact.sync="record.type" :selectTag.sync="record.tag" :valueType="record.type"></Tags>
    </div>
    <div class="account-bottom">
      <div class="formItem">
        <label>
          <input
              type="text"
              placeholder="请输入备注"
              v-model="record.note"
              @input="overLength"
          />
          <span class="msg">{{ record.note.length }} / 10</span>
        </label>
      </div>
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import NumberPad from "@/components/Account/NumberPad.vue";
import Tags from "@/components/Account/Tags.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";

@Component({
  components: {Tags, NumberPad}
})
export default class Account extends Vue {
  h = document.body.clientHeight;
  record: RecordItem = {
    tag: {id: "1", name: "餐饮 ", value: "餐饮"},
    note: "",
    type: "-",
    amount: 0,
    createAt: dayjs(new Date().toISOString()).format("YYYY-MM-DD")
  };
  // type = "-";
  // time = new Date().toISOString();
  placeholder = dayjs(new Date().toISOString()).format("MM-DD");
  recordTypeList = recordTypeList;

  overLength() {
    this.record.note = this.record.note.substring(0, 10);
    this.$emit("change", this.record.note);
  }

  @Watch("record.type")
  onType() {
    if (this.record.type === "-") {
      this.record.tag = {id: "1", name: "餐饮 ", value: "餐饮"};
    } else {
      this.record.tag = {id: "17", name: "退款", value: "退款"};
    }
  }

  created() {
    this.$store.commit("fetchRecords");
    this.$store.commit("fetchDisburseTags");
  }

  saveRecord() {
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已记一笔");
      this.$router.push({path: "/"});
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.outer {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .account-top {
    height: 112px;
  }

  .account-bottom {
    height: 356px;
  }

  .account-center {
    flex: 1;
    width: 100%;
    &::-webkit-scrollbar {
      display: none;
    }

    overflow: auto;
    background-color: #ffffff;
  }
}

%item {
  background-color: $color-shadow;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep .navbar {
  @extend %item;
  padding: $out-padding;
  border-bottom: 1px solid gray;

  svg {
    width: 28px;
    height: 28px;
  }
}

.smart {
  @extend %item;

  ::v-deep .date-wrapper {
    .el-date-editor.el-input {
      width: 80px;
    }
  }

  ::v-deep .tabs-wrapper {

    li {
      border: 1px solid #DCDFE6;
      text-align: center;
      border-radius: 25px;
      background: #f2f2f2;

    }
  }

  ::v-deep {
    .tabs-item {
      background: white;

      &.selected {
        border: 1px solid $color-label;
        color: $color-label;
      }
    }
  }
}
.formItem {
  font-size: 14px;
  padding: 8px 0;
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      flex-grow: 1;
      height: 40px;
      background: transparent;
      border: none;
      padding-left:16px;
    }
    .msg {
      text-align: right;
      font-size: 12px;
      color: #999999;
      padding-right:16px;
    }
  }

}


</style>