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
        window.localStorage.getItem("disburseTagList") || "[]"
      );
      if (!state.disburseTagList || state.disburseTagList.length === 0) {
        store.commit("createDisburseTag", {name: "detail", value: "明细"});
        store.commit("createDisburseTag", {name: "account", value: "记账"});
        store.commit("createDisburseTag", {name: "statistics", value: "统计"});
      }
    },

    createDisburseTag(state, payload: {name: string; value: string}) {
      const {name,value} = payload
      state.createTagError = null;
      const values = state.disburseTagList.map((item) => item.value);
      if(!value){
        state.createTagError = new Error("tag name null");
        return;
      } else if (values.indexOf(value) >= 0) {
        state.createTagError = new Error("tag name duplicated");
        return;
      }
      const id = createId().toString();
      state.disburseTagList.push({id, name: name, value: value});
      store.commit("saveDisburseTags");
    },

    saveDisburseTags(state) {
      window.localStorage.setItem("disburseTagList", JSON.stringify(state.disburseTagList));
    },

    removeDisburseTag(state,id: string){
      let index=-1;
      for(let i=0;i<state.disburseTagList.length;i++){
        if(state.disburseTagList[i].id===id){
          index = i;
          break;
        }
      }
      state.disburseTagList.splice(index,1);
      store.commit("saveDisburseTags")
    },

    updateDisburseTag(state,payload: {id: string; value: string}){
      const {id,value} = payload;
      state.createTagError = null;
      const idList = state.disburseTagList.map((item => item.id))
      if(idList.indexOf(id)>=0){
        const values = state.disburseTagList.map(item=>item.value)
        if(!value){
          state.createTagError = new Error("tag name null");
          return;
        }else if(values.indexOf(value)>=0){
          state.createTagError = new Error("tag name duplicated");
          return;
        }else{
          const tag = state.disburseTagList.filter((item=>item.id === id))[0]
          tag.value = value;
          store.commit("saveDisburseTags")
        }
      }
    },

    fetchIncomeTags(state) {
      state.incomeTagList = JSON.parse(
        window.localStorage.getItem("incomeTagList") || "[]"
      );
      if (!state.incomeTagList || state.incomeTagList.length === 0) {
        store.commit("createIncomeTag", {name: "detail", value: "明细"});
        store.commit("createIncomeTag", {name: "account", value: "记账"});
      }
    },

    createIncomeTag(state, payload: {name: string; value: string}) {
      const {name,value} = payload
      state.createTagError = null;
      const values = state.incomeTagList.map((item) => item.value);
      if (values.indexOf(value) >= 0) {
        state.createTagError = new Error("tag name duplicated");
        return;
      }
      const id = createId().toString();
      state.incomeTagList.push({id, name: name, value: value});
      store.commit("saveIncomeTags");
    },

    saveIncomeTags(state) {
      window.localStorage.setItem("incomeTagList", JSON.stringify(state.incomeTagList));
    },

    removeIncomeTag(state,id: string){
      let index=-1;
      for(let i=0;i<state.incomeTagList.length;i++){
        if(state.incomeTagList[i].id===id){
          index = i;
          break;
        }
      }
      state.incomeTagList.splice(index,1);
      store.commit("saveIncomeTags")
    },


  },
});

export default store;
