import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

// TODO: emulate AUTH
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {layout: 'main-layout'},
    // beforeEnter: Auth.routeGuard,
  },
  {
    path: '/instance/:id',
    name: 'Instance',
    meta: {layout: 'main-layout'},
    // beforeEnter: Auth.routeGuard,
    component: () => import('../views/Instance.vue'),
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   beforeEnter: Auth.routeGuard,
  //   component: () =>
  //     import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
