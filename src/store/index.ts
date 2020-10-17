import Vue from "vue";
import Vuex from "vuex";
import createId from "@/lib/createId";


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    disburseTagList:[],
    incomeTagList: [],
    createTagError: null,
  } as RootState,

  mutations: {
    fetchDisburseTags(state) {
      state.disburseTagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (!state.disburseTagList || state.disburseTagList.length === 0) {
        store.commit("createTag", {name: "add", value: "添加"});
        store.commit("createTag", {name: "detail", value: "明细"});
        store.commit("createTag", {name: "account", value: "记账"});
        store.commit("createTag", {name: "statistics", value: "统计"});
      }
    },
    fetchIncomeTags(state) {
      state.incomeTagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (!state.incomeTagList || state.incomeTagList.length === 0) {
        store.commit("createTag", {name: "add", value: "工资"});
        store.commit("createTag", {name: "detail", value: "红包"});
        store.commit("createTag", {name: "account", value: "转账"});
        store.commit("createTag", {name: "statistics", value: "人情"});
      }
    },

    createTag(state, payload: {name: string; value: string}) {
      const {name,value} = payload
      state.createTagError = null;
      const values = state.disburseTagList.map((item) => item.value);
      if (values.indexOf(value) >= 0) {
        state.createTagError = new Error("tag name duplicated");
        return;
      }
      const id = createId().toString();
      state.disburseTagList.push({id, name: name, value: value});
      store.commit("saveTags");
    },

    saveTags(state) {
      window.localStorage.setItem("disburseTagList", JSON.stringify(state.disburseTagList));
    },


    removeTag(state,id: string){
      let index=-1;
      for(let i=0;i<state.disburseTagList.length;i++){
        if(state.disburseTagList[i].id===id){
          index = i;
          break;
        }
      }
      state.disburseTagList.splice(index,1);
      store.commit("saveTags")
    }
  },
});

export default store;
