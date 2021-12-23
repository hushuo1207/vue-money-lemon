
import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    
    recordList: [] as  RecordItem[],
    tagList: [] as Tag[],

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
    fetchTags(state) {
      if(window.localStorage.getItem('tagList') === 'undefined'){
        console.log('2');
        
        return;}
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state, name: string) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
          return 'duplicated';
        }
        const id = createId().toString();
        state.tagList.push({id, name: name});
        // console.log(state.tagList);
        
        store.commit('saveTags');
        // this.saveTags();
        window.alert('添加成功');
        return 'success';
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags');
      return true;
    },
    // updateTag(state, id: string, name: string) {
    //   const idList = state.tagList.map(item => item.id);
    //   if (idList.indexOf(id) >= 0) {
    //     const names = state.tagList.map(item => item.name);
    //     if (names.indexOf(name) >= 0) {
    //       return 'duplicated';
    //     } else {
    //       const tag = state.tagList.filter(item => item.id === id)[0];
    //       tag.name = name;
    //       // this.saveTags();
    //       store.commit('saveTags');
    //       return 'success';
    //     }
    //   } else {
    //     return 'not found';
    //   }
    // },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  //};
  },
  actions: {
  },
  modules: {
  }
})


export default store;