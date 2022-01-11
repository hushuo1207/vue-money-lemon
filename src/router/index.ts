import Vue from 'vue'
import VueRouter from 'vue-router'
import LabelsTest from '@/views/LabelsTest.vue'
import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue'
import Xxx from '@/views/Xxx.vue'
import KeepAccount from '@/views/KeepAccount.vue'
import NumberPadTest from '@/components/Money/NumberPadTest.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/keep'
  },
  {
    path: '/labels',
    component: LabelsTest
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/account',
    component: NumberPadTest
  },
  {
    path: '/keep',
    component: KeepAccount
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




  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
