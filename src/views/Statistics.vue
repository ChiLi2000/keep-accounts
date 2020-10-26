<template>
  <div class="outer">
    <div class="statistics-top">
      <Date :value.sync="time" :placeholder="placeholder" type="month" format="yyyy-MM" class-prefix="date"/>
      <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="tabs">
      </Tabs>
    </div>
    <div class="statistics-center">
      <div class="day">
        <h3>每日支出</h3>
        <div>折线统计图</div>
      </div>
      <div class="classify">
        <h3>支出分类</h3>
        <div>饼状图</div>
      </div>
      <ol v-if="check(finallyList)">
        <h3 class="title">
          {{ formatTitle(finallyList.title) }}{{type}}排行<span class="type">${{finallyList.disburseTotal}}</span>
        </h3>
        <Record :items="finallyList.items" v-if="check(finallyList)"/>

      </ol>
      <div class="noResult" v-else>
        无
      </div>
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
export default class Statistics extends Vue {
  recordTypeList = recordTypeList;
  type = "-";
  time = new Date().toISOString();
  placeholder = dayjs(new Date().toISOString()).format("YYYY-MM");

  created() {
    this.$store.commit("fetchRecords");
    console.log(this.finallyList);
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList)
        .filter((r) => r.type === this.type)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    const result: Result = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM"),
        items: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), "month")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createAt).format("YYYY-MM"),
          items: [current]
        });
      }
    }
    result.map((group) => {
      group.disburseTotal = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  get finallyList() {
    if (this.groupedList === undefined) {
      return undefined;
    }
    let mouthList = this.groupedList[0];
    for (let i = 0; i < this.groupedList.length; i++) {
      if (this.groupedList[i].title === dayjs(this.time).format("YYYY-MM")) {
        mouthList = this.groupedList[i];
        mouthList.items.sort(function(a,b){
          return b.amount-a.amount
        });
      }
    }
    return mouthList;
  }


  check(finallyList: {
    title: string;
    disburseTotal?: number;
    incomeTotal?: number;
    items: Result;
  }) {
    if (this.finallyList !== undefined) {
      if (this.finallyList.title === dayjs(this.time).format("YYYY-MM")) {
        return true;
      }
    }
    return false;
  }

  formatTitle(string: string) {
    return dayjs(string).format("M月");
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

  .statistics-top {
    //height: 121px;
    background-color: $color-shadow;
  }

  .statistics-center {
    flex: 1;
    width: 100%;
    overflow: auto;
  }
}

::v-deep .tabs-wrapper {
  .selected {
    border-bottom: 2px solid gray;
  }
}

.additional {
  font-size: 28px;
  font-weight: $font-height;
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

h3 {
  line-height: 24px;
  background-color: #fbfbfb;
  padding: $out-padding;
}

</style>