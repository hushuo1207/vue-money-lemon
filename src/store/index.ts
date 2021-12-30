
import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';
import paymentList from '@/constants/paymentList';
import incomeList from '@/constants/incomeList';

// incomeList

// console.log(typeof   paymentList);



Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    
    recordList: [],
    paymentList: [],
    incomeList: [],
    currentTag: undefined,
    createRecordError: null,
    createTagError: null

  } as RootState,
  mutations: {
    fetchRecords(state) {
      if(window.localStorage.getItem('recordList') === 'undefined'){
        
        
      return;}
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      
    },
    createRecord(state, record: RecordItem) {
        const record2: RecordItem = clone(record);
        record2.createdAt = record2.createdAt || new Date().toISOString();
        state.recordList.push(record2);
        // console.log(state.recordList);
        store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      
      state.paymentList = JSON.parse(window.localStorage.getItem('paymentList') || '[]');
      if(!state.paymentList || state.paymentList.length === 0 ){
        // store.commit('saveTags');

        for (let i = 0; i < paymentList.length; i++) {
          store.commit('createTag',{name: paymentList[i].text, iconName: paymentList[i].name});
     
        //  console.log('1');
          
        }
        for (let i = 0; i < incomeList.length; i++) {
          store.commit('createTag',{name: incomeList[i].text, iconName: incomeList[i].name});
          // console.log('2');
     
          
        }
      return;
      }
    },
    fetchTagsIncome(state) {
      
      state.incomeList = JSON.parse(window.localStorage.getItem('incomeList') || '[]');
      if(!state.incomeList || state.incomeList.length === 0 ){
        // store.commit('saveTags');

        for (let i = 0; i < incomeList.length; i++) {
          store.commit('createTagIncome',{name: incomeList[i].text, iconName: incomeList[i].name});
          
        }
      return;
      }
    },
    setCurrentTag(state, id) {
       state.currentTag = state.paymentList.filter(t => t.id === id)[0];
    },
    createTag(state, aaa: {name: string, iconName:string}) {
      
        state.createTagError = null;
        const names = state.paymentList.map(item => item.name);
        if ( names.indexOf(aaa.name) >= 0) {
          // window.alert('标签名重复了');
          state.createTagError = new Error('tag name duplicated.');
          return ;
        }
        const id = createId().toString();
        // console.log({id, name: aaa.name, iconName: aaa.iconName});
        state.paymentList.push({id, name: aaa.name, iconName: aaa.iconName});
        store.commit('saveTags');

        
    },
    createTagIncome(state, aaa: {name: string, iconName:string}) {
      
      state.createTagError = null;
      const names = state.incomeList.map(item => item.name);
      if ( names.indexOf(aaa.name) >= 0) {
        // window.alert('标签名重复了');
        state.createTagError = new Error('tag name duplicated.');
        return ;
      }
      const id = createId().toString();
      // console.log({id, name: aaa.name, iconName: aaa.iconName});
      state.incomeList.push({id, name: aaa.name, iconName: aaa.iconName});
      store.commit('saveTagsIcon');

      
  },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.paymentList.length; i++) {
        if (state.paymentList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0){
        state.paymentList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      }else {
        window.alert('删除失败');
      }
      
      
    },
    updateTag(state, paylod: {id: string, name: string}) {

      const {id, name} = paylod;
      const idList = state.paymentList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.paymentList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('yuoule afjajfka')
        } else {
          const tag = state.paymentList.filter(item => item.id === id)[0];
          tag.name = name;
          // this.saveTags();
          store.commit('saveTags');
        }
      }
    },
    saveTags(state) {
      
      
      window.localStorage.setItem('paymentList', JSON.stringify(state.paymentList));
    },
    saveTagsIcon(state) {
      
      
      window.localStorage.setItem('incomeList', JSON.stringify(state.incomeList));
    },
  //};
  },
  actions: {
  },
  modules: {
  }
})


export default store;