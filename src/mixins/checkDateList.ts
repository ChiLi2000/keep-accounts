import Vue from "vue";
import Component from "vue-class-component";
import dayjs from "dayjs";

@Component
export class CheckDateList extends Vue {
  check(finallyList: testResult, time: string) {
    if (finallyList !== undefined) {
      if (finallyList.title === dayjs(time).format("YYYY-MM")) {
        return true;
      }
    }
    return false;
  }

  formatTitle(string: string, type: string) {
    return dayjs(string).format(type);
  }
}

export default CheckDateList;