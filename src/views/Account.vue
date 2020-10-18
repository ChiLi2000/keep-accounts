<template>
  <div class="outer">
    <div class="account-top">
      <div class="navbar">
        <Icon class="leftIcon" name="left"/>
        <span class="title">记账</span>
        <span>.</span>
      </div>
      <div class="smart">
        <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="tabs"/>
        <Date  :value.sync= "time" :placeholder="placeholder" type="date" format="MM-dd" class-prefix="date"/>
      </div>
    </div>
    <div class="account-center">
      <Tags :contact.sync="type"></Tags>
    </div>
    <div class="account-bottom">
      <div class="formItem">
        <label>
          <input
              type="text"
              placeholder="请输入备注"
          />
        </label>
      </div>
      <NumberPad/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component,Watch} from "vue-property-decorator";
import NumberPad from "@/components/Account/NumberPad.vue";
import Tags from "@/components/Account/Tags.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";

@Component({
  components: {Tags, NumberPad}
})
export default class Account extends Vue {
  recordTypeList = recordTypeList;
  type = "-";
  time = new Date().toISOString()
  placeholder = dayjs(new Date().toISOString()).format("MM-DD")
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
    width: 24px;
    height: 24px;
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
      color: #606266;
    }
  }

  ::v-deep {
    .tabs-item {
      background: white;
      &.selected {
        background: #c4c4c4;
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