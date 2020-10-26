<template>
  <div class="outer">
    <div class="detail-top">
      <Date :value.sync="time" :placeholder="placeholder" type="month" format="yyyy-MM" class-prefix="date"/>
      <Tabs :data-source="recordTypeList" class-prefix="tabs">
        <span v-if="check(finallyList)">{{finallyList.disburseTotal}}</span><span v-else class="noResult">0</span>
      </Tabs>
    </div>
    <div class="detail-center">
      <ol v-if="check(finallyList)">
        <li v-for="(group,index) in finallyList.items" :key="index">
          <h3 class="title">
            {{ formatTitle(group.title) }}<span class="type">支出：￥{{ group.disburseTotal }} 收入：￥{{
              group.incomeTotal
            }} </span>
          </h3>
          <ol>
            <Record :items="group.items"/>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        无
      </div>
    </div>
    <Footer/>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
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

  check(finallyList: {
    title: string;
    disburseTotal?: number;
    incomeTotal?: number;
    items: Result;
  }) {
    if(this.finallyList!==undefined){
      if (this.finallyList.title === dayjs(this.time).format("YYYY-MM")) {
        return true;
      }
    }
    return false;
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

  get mouthGroupedList() {
    const {groupedList} = this;
    if (groupedList.length === 0) {
      return undefined;
    }
    const result: mouthResult = [
      {
        title: dayjs(groupedList[0].title).format("YYYY-MM"),
        items: [groupedList[0]]
      }
    ];
    for (let i = 1; i < groupedList.length; i++) {
      const current = groupedList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.title), "month")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.title).format("YYYY-MM"),
          items: [current]
        });
      }
    }
    result.map((group) => {
      group.disburseTotal = group.items.reduce((sum, item) => {
        if (item.disburseTotal === undefined) {
          item.disburseTotal = 0;
        }
        return sum + item.disburseTotal;
      }, 0);
    });
    result.map((group) => {
      group.incomeTotal = group.items.reduce((sum, item) => {
        if (item.incomeTotal === undefined) {
          item.incomeTotal = 0;
        }
        return sum + item.incomeTotal;
      }, 0);
    });
    return result;
  }

  get finallyList() {
    if(this.mouthGroupedList===undefined){
      return undefined;
    }
    let mouthList = this.mouthGroupedList[0]
    for (let i = 0; i < this.mouthGroupedList.length; i++) {
      if (this.mouthGroupedList[i].title === dayjs(this.time).format("YYYY-MM")) {
        mouthList = this.mouthGroupedList[i];
      }
    }
    return mouthList;
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.noResult {
  padding: 16px;
  text-align: center;
}

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