<template>
  <div class="outer">
    <div class="detail-top">
      <Date :value.sync="time" :placeholder="placeholder" type="month" format="yyyy-MM" class-prefix="date"/>
      <ul class="tabs">
        <li>
          支出
          <span v-if="check(finallyList,this.time)">{{ numberFilter(finallyList.disburseTotal) }}</span><span v-else
                                                                                                              class="noResult">0</span>
        </li>
        <li>
          收入
          <span v-if="check(finallyList,this.time)">{{ numberFilter(finallyList.incomeTotal) }}</span><span v-else
                                                                                                            class="noResult">0</span>
        </li>
      </ul>
    </div>
    <div class="detail-center">
      <ol v-if="check(finallyList,this.time)">
        <li v-for="(group,index) in finallyList.items" :key="index">
          <h3 class="title">
            {{ formatTitle(group.title, "M月D日") }}
            <span class="type">
              支出：￥{{ numberFilter(group.disburseTotal) }} 收入：￥{{
                numberFilter(group.incomeTotal)
              }} </span>
          </h3>
          <ol>
            <Record :items="group.items"/>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        当月没有任何记录哦
      </div>
    </div>
    <Footer/>
  </div>

</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import {mixins} from "vue-class-component";
import CheckDateList from "@/mixins/CheckDateList";

@Component
export default class Detail extends mixins(CheckDateList) {
  time = new Date().toISOString();
  placeholder = dayjs(new Date().toISOString()).format("YYYY-MM");

  // numberFilter(value){
  //   return parseFloat(value).toFixed(2)
  // }
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
    if (this.mouthGroupedList === undefined) {
      return undefined;
    }
    let mouthList = this.mouthGroupedList[0];
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

.tabs {
  display: flex;
  justify-content: space-between;
  text-align: center;

  li {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: $padding-radio;
    margin: $out-margin;
  }

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
  padding: $out-padding;

  .type {
    font-size: 14px;
  }
}

</style>