import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'

// import tagListModel from './Models/tagListModel'
// import recordListModel from './Models/recordList'


Vue.config.productionTip = false

Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)


// 转移至store下的index.ts


// window.store = {
// //record store
// recordList: recordListModel.fetch(),
// createRecord: (record: RecordItem) => recordListModel.create(record),
// //全局變量太多
// //严重依赖window

// //Tag store
// tagList: tagListModel.fetch(),
// findTag(id: string) {
//   return this.tagList.filter(t => t.id === id)[0];
// },
// createTag: (name: string) => {
//   const message = tagListModel.create(name);
//   if (message === 'duplicated') {
//       window.alert('重复标签');
//   }else{
//       window.alert('添加成功');
      
//   }
// },
// removeTag: (id: string) =>{
//   return tagListModel.remove(id);
// },
// updateTag:(id: string, name: string) =>{
//   return tagListModel.update(id, name);
// }

// }


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
