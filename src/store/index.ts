import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";
import paymentList from "@/constants/paymentList";
import incomeList from "@/constants/incomeList";

// incomeList

// console.log(typeof   paymentList);

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    paymentList: [],
    incomeList: [],
    createdAt: '',
    currentTag: undefined,
    createRecordError: null,
    createTagError: null,
  } as RootState,
  mutations: {
    fetchRecords(state) {
      if (window.localStorage.getItem("recordList") === "undefined") {
        return;
      }
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = record2.createdAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit("saveRecords");
    },
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    removeRecord(state, time: string) {
      let index = -1;
      const tagList = state.recordList;
      for (let i = 0; i < tagList.length; i++) {
        if (tagList[i].createdAt === time) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        tagList.splice(index, 1);
        store.commit("saveRecords");
      }
    },
    updateRecord(state, record: RecordItem) {
      let index = -1;
      const tagList = state.recordList;
      for (let i = 0; i < tagList.length; i++) {
        if (tagList[i].createdAt === record.createdAt) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        tagList.splice(index, 1, record);
        store.commit("saveRecords");
      }
    },
    setCreatedAt(state, time) {
        state.createdAt = time;
    },
    fetchTags(state) {
      state.paymentList = JSON.parse(
        window.localStorage.getItem("paymentList") || "[]"
      );
      state.incomeList = JSON.parse(
        window.localStorage.getItem("incomeList") || "[]"
      );
      if (!state.paymentList || state.paymentList.length === 0) {
        for (let i = 0; i < paymentList.length; i++) {
          store.commit("createTag", {
            type: '-',
            name: paymentList[i].text,
            iconName: paymentList[i].name,
          });
        }
        for (let i = 0; i < incomeList.length; i++) {
          store.commit("createTag", {
            type: '+',
            name: incomeList[i].text,
            iconName: incomeList[i].name,
          });
        }
        return;
      }
    },
    setCurrentTag(state, id) {
      state.currentTag = state.paymentList.filter((t) => t.id === id)[0];
    },
    createTag(state, aaa: { type: string; name: string; iconName: string }) {
      let tagList;
      state.createTagError = null;
      if (aaa.type === "-") {
        tagList = state.paymentList;
      } else {
        tagList = state.incomeList;
      }
      const names = tagList.map((item) => item.name);
      if (names.indexOf(aaa.name) >= 0) {
        // window.alert('标签名重复了');
        state.createTagError = new Error("tag name duplicated.");
        return;
      }
      const id = createId().toString();
      tagList.push({ id, name: aaa.name, iconName: aaa.iconName });
      store.commit("saveTags", aaa.type);
    },
    removeTag(state, deleteTagList: {id: string, type: string}) {
      let index = -1;
      let tagList;
      if (deleteTagList.type === "-") {
        tagList = state.paymentList;
      } else {
        tagList = state.incomeList;
      }
      for (let i = 0; i < tagList.length; i++) {
        if (tagList[i].id === deleteTagList.id) {
          index = i;
          break;
        }
      }
      if (index >= 0 && window.confirm("确定要删除吗？")) {
        tagList.splice(index, 1);
        store.commit("saveTags");
      }
    },
    updateTag(state, paylod: { id: string; name: string }) {
      const { id, name } = paylod;
      const idList = state.paymentList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.paymentList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("yuoule afjajfka");
        } else {
          const tag = state.paymentList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    saveTags(state, type: string) {
      if (type === "-") {
        store.commit("saveTagsPaymentList");
      } else {
        store.commit("saveTagsIncomeList");
      }
    },
    saveTagsPaymentList(state) {
      window.localStorage.setItem(
        "paymentList",
        JSON.stringify(state.paymentList)
      );
    },
    saveTagsIncomeList(state) {
      window.localStorage.setItem(
        "incomeList",
        JSON.stringify(state.incomeList)
      );
    },
  },
  actions: {},
  modules: {},
});

export default store;
