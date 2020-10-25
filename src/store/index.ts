import Vue from "vue";
import Vuex from "vuex";
import createId from "@/lib/createId";
import clone from "@/lib/clone";


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    disburseTagList:[],
    incomeTagList: [],
    recordList: [],
    createRecordError: null,
    createTagError: null
  } as RootState,

  mutations: {
    fetchDisburseTags(state) {
      state.disburseTagList = JSON.parse(
        window.localStorage.getItem("disburseTagList") || "[]"
      );
      if (!state.disburseTagList || state.disburseTagList.length === 0) {
        store.commit("createDisburseTag", {name: "餐饮 ", value: "餐饮"});
        store.commit("createDisburseTag", {name: "购物", value: "购物"});
        store.commit("createDisburseTag", {name: "旅游", value: "旅游"});
        store.commit("createDisburseTag", {name: "服饰", value: "服饰"});

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
        store.commit("createIncomeTag", {name: "工资 ", value: "工资"});
        store.commit("createIncomeTag", {name: "转账", value: "转账"});
        store.commit("createIncomeTag", {name: "退款", value: "退款"});
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

    updateIncomeTag(state,payload: {id: string; value: string}){
      const {id,value} = payload;
      state.createTagError = null;
      const idList = state.incomeTagList.map((item => item.id))
      if(idList.indexOf(id)>=0){
        const values = state.incomeTagList.map(item=>item.value)
        if(!value){
          state.createTagError = new Error("tag name null");
          return;
        }else if(values.indexOf(value)>=0){
          state.createTagError = new Error("tag name duplicated");
          return;
        }else{
          const tag = state.incomeTagList.filter((item=>item.id === id))[0]
          tag.value = value;
          store.commit("saveIncomeTags")
        }
      }
    },

    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem("recordList")||"[]")as RecordItem[]
    },
    createRecord(state,record: RecordItem){
      const record2 = clone(record);
      state.recordList.push(record2)
      store.commit("saveRecord")

    },
    saveRecord(state){
      window.localStorage.setItem("recordList",JSON.stringify(state.recordList))
    }

  },
});

export default store;
