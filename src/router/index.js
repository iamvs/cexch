import { createRouter, createWebHashHistory } from 'vue-router'
import Currencies from '../views/Currencies.vue'

const routes = [
  {
    path: '/',
    name: 'Currencies',
    component: Currencies
  },
  {
    path: '/exchange',
    name: 'Exchange',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Exchange.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
})

export default router
