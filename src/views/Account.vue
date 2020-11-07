<template>
  <div class="outer"  :style="{height:h+'px'}">
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
      <Tags :contact.sync="record.type" :selectTag.sync="record.tag"></Tags>
    </div>
    <div class="account-bottom">
      <div class="formItem">
        <label>
          <input
              type="text"
              placeholder="请输入备注"
              v-model="record.note"
          />
        </label>
      </div>
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
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
    tag: {id: "0", name: "其它", value: "其它"},
    note: "",
    type: "-",
    amount: 0,
    createAt: dayjs(new Date().toISOString()).format("YYYY-MM-DD")
  };
  // type = "-";
  // time = new Date().toISOString();
  placeholder = dayjs(new Date().toISOString()).format("MM-DD");
  recordTypeList = recordTypeList;

  created() {
    this.$store.commit("fetchRecords");
  }

  saveRecord() {
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已记一笔");
      this.$router.push({ path: '/' })
    }
  }

  goBack(){
    this.$router.back()
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

.account-center {
  //background-color: $color-shadow;
}

.formItem {
  font-size: 14px;
  padding: 8px 0;

  input {
    width: 100vw;
    height: 40px;
    background: transparent;
    border: none;
    padding: 0 16px;

  }
}




</style>