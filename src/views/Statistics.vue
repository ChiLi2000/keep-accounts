<template>
  <div class="outer">
    <div class="statistics-top">
      <Date :value.sync="time" :placeholder="placeholder" type="month" format="yyyy-MM" class-prefix="date"/>
      <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="tabs">
      </Tabs>
    </div>
    <div class="statistics-center">
      <div class="myLine-wrapper">
        <my-line :data-line="lineList" v-if="check(lineList,this.time)"/>
        <div  v-else>
        </div>
      </div>
      <ol v-if="check(finallyList,this.time)">
        <h3 class="title">
          {{ formatTitle(finallyList.title,"M月") }}排行榜
        </h3>
        <Record :items="finallyList.items" v-if="check(finallyList,this.time)"/>
      </ol>
      <div class="noResult" v-else>
        当月没有任何记录哦
      </div>
    </div>
    <Footer/>
  </div>

</template>

<script lang="ts">

import {Component} from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import MyLine from "@/components/myLine.vue";
import CheckDateList from "@/mixins/CheckDateList";
import {mixins} from "vue-class-component";

@Component({
  components: {MyLine}
})
// eslint-disable-next-line no-undef
export default class Statistics extends mixins(CheckDateList) {
  recordTypeList = recordTypeList;
  type = "-";
  time = new Date().toISOString();
  placeholder = dayjs(new Date().toISOString()).format("YYYY-MM");

  created() {
    this.$store.commit("fetchRecords")
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length===0) {
      return [];
    }
    const newList = clone(recordList)
        .filter((r) => r.type === this.type)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if (newList.length === 0 ) {
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
    //1年的记录
    if (this.groupedList === undefined) {
      return undefined;
    }
    //将没有数据的月份统一设计成当前月的数据
    let mouthList = this.groupedList[0];
    for (let i = 0; i < this.groupedList.length; i++) {
      //某个月的记录
      if (this.groupedList[i].title === dayjs(this.time).format("YYYY-MM")) {
        mouthList = this.groupedList[i];
        mouthList.items.sort(function (a, b) {
          return b.amount - a.amount;
        });
      }
    }
    return mouthList;
  }

  get lineList() {
    const {finallyList} = this;
    if (finallyList !== undefined) {
      const list = clone(finallyList);
      const items = list.items;
      for (let i = 0; i < items.length - 1; i++) {
        for (let j = i + 1; j < items.length; j++) {
          if (items[i].createAt === items[j].createAt) {
            items[i].amount += items[j].amount;
            items.splice(j, 1);
          }
        }
      }
      return list;
    }else{
      return undefined;
    }

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
    .myLine-wrapper{
      overflow: auto;
      background-color: #fbfbfb;
    }
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
  padding: $out-padding;
}

h3 {
  line-height: 24px;
  padding: $out-padding;
}

</style>