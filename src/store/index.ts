
import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as  RecordItem[]
  },
  mutations: {
    fetchRecords(state) {
      if(window.localStorage.getItem('recordList') === 'undefined'){
        console.log('2');
        
        return;}
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      
    },
    createRecord(state, record) {
        const record2: RecordItem = clone(record);
        record2.createdAt = new Date();
        state.recordList.push(record2);
        console.log(state.recordList);
        store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
  },
  actions: {
  },
  modules: {
  }
})

// recordList: [] as RecordItem[];
  // fetchRecords() {
  //   this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  //   return this.recordList;
  // },
  // saveRecords() {
  //   window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  // },
  // createRecord(record: RecordItem) {
  //   const record2: RecordItem = clone(record);
  //   record2.createdAt = new Date();
  //   this.recordList && this.recordList.push(record2);
  //   recordStore.saveRecords();
  // },


export default store;