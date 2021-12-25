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

window.onload=function(){
  setTimeout(function() {
    window.scrollTo(0, 1000)
  }, 0)
}

if(document.documentElement.clientWidth > 500){
  window.alert('请使用手机打开本页面，以保证浏览效果');
  const img = document.createElement('img');
  img.src = '/lemonWebsite.png';
  img.style.position = 'fixed';
  img.style.left = '50%';
  img.style.top = '50%';
  document.body.appendChild(img);
  img.style.transform = 'translate(-50%, -50%)';

}

// console.log(navigator);

// var browser = {
//   versions: function () {
//    var u = navigator.userAgent, app = navigator.appVersion;
//    return {   //移动终端浏览器版本信息
//     trident: u.indexOf('Trident') > -1, //IE内核
//     presto: u.indexOf('Presto') > -1, //opera内核
//     webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//     gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
//     mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//     ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//     android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
//     iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
//     iPad: u.indexOf('iPad') > -1, //是否iPad
//     webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
//    };
//   }(),
//   language: (navigator.browserLanguage || navigator.language).toLowerCase()
//  }
//  if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
//   var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
//   if (ua.match(/MicroMessenger/i) == "micromessenger") {
//     //在微信中打开
//   }
//   if (ua.match(/WeiBo/i) == "weibo") {
//     //在新浪微博客户端打开
//   }
//   if (ua.match(/QQ/i) == "qq") {
//     //在QQ空间打开
//   }
//   if (browser.versions.ios) {
//     //是否在IOS浏览器打开
//   } 
//   if(browser.versions.android){
//     //是否在安卓浏览器打开
//   }
// } else {
//   //否则就是PC浏览器打开
// }