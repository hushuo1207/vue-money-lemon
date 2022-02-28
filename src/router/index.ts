import Vue from 'vue'
import VueRouter from 'vue-router'
import LabelsTest from '@/components/label/LabelsTest.vue'
import EditorRecord from '@/components/label/EditorRecord.vue'
import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue'
import Xxx from '@/components/label/Xxx.vue'
import DetailAccount from '@/views/DetailAccount.vue'
import KeepAccounts from '@/views/KeepAccounts.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/detail'
  },
  {
    path: '/labels',
    component: LabelsTest
  },
  {
    path: '/editrecord',
    name: 'editrecord',
    component: EditorRecord
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/account',
    component: KeepAccounts
  },
  {
    path: '/detail',
    component: DetailAccount
  },
  {
    path: '/xxx',
    component: Xxx
  },
  {
    path: '*',
    component: NotFound
  },
  //除了上述的其他路由均显示此路由

]

const router = new VueRouter({
  routes
})

export default router
