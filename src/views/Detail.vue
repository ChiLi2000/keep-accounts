<template>
  <div class="outer">
    <div class="detail-top">
      <Date :value.sync="time" :placeholder="placeholder" type="month" format="yyyy-MM" class-prefix="date"/>
      <Tabs :data-source="recordTypeList" class-prefix="tabs">
        <span>1000</span>
      </Tabs>
    </div>
    <div class="detail-center">
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">
            {{ formatTitle(group.title) }}<span class="type">支出：￥{{ group.disburseTotal }} 收入：￥{{ group.incomeTotal }} </span>
          </h3>
          <ol>
            <Record :items="group.items"/>
          </ol>
        </li>
      </ol>
    </div>
    <Footer/>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component
export default class Detail extends Vue {
  recordTypeList = recordTypeList;
  time = new Date().toISOString();
  placeholder = dayjs(new Date().toISOString()).format("YYYY-MM");

  created() {
    this.$store.commit("fetchRecords");
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    const result: Result = [
      {
        title: newList[0].createAt,
        items: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: current.createAt,
          items: [current]
        });
      }
    }

    result.map((group) => {
      group.disburseTotal = group.items.filter(r => r.type === "-").reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    result.map((group) => {
      group.incomeTotal = group.items.filter(r => r.type === "+").reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  formatTitle(string: string) {
    return dayjs(string).format("M月D日");
  }





}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.outer {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .detail-top {
    //height: 121px;
    background-color: $color-shadow;
  }

  .detail-center {
    flex: 1;
    width: 100%;
    overflow: auto;
  }
}

.tabs-wrapper {
  span {
    font-size: 28px;
    font-weight: $font-height;
  }
}

.title {
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  line-height: 24px;
  background-color: #fbfbfb;
  padding: $out-padding;

  .type {
    font-size: 14px;
  }
}

</style>