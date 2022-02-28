import Vue from 'vue'
import VueRouter from 'vue-router'

// import Labels from '@/components/label/Labels.vue'
import EditorRecord from '@/components/label/EditorRecord.vue'

// import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue'

// import AddLabel from '@/components/label/AddLabel.vue'
import DetailAccount from '@/views/DetailAccount.vue'

// import KeepAccounts from '@/views/KeepAccounts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/detail'
  },
  {
    path: '/detail',
    component: DetailAccount
  },
  {
    path: '/statistics',
    component: () => import('../views/Statistics.vue')
  },
  {
    path: '/account',
    component: () => import('../views/KeepAccounts.vue')
  },
  {
    path: '/labels',
    component: () => import('../components/label/Labels.vue')
  },
  {
    path: '/editrecord',
    name: 'editrecord',
    component: EditorRecord
  },
  {
    path: '/xxx',
    component: () => import('../components/label/AddLabel.vue')
  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue')
  },
  //除了上述的其他路由均显示此路由
]

const router = new VueRouter({
  routes
})

export default router
