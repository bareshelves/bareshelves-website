import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
import {
  meta,
} from '../../meta'
import Home from '/@/views/Home.vue'
import {
  h, 
} from 'vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home as unknown as typeof h,
    meta: {
      title: 'Home',
    },
  },

  {
    path: '/notifications',
    name: 'Notifications',
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "notifications" */ '/@/views/Home.vue'),
    meta: {
      title: 'Notifications',
    },
  },

  {
    path: '/search',
    name: 'Search',
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "search" */ '/@/views/Search.vue'),
    meta: {
      title: 'Search',
    },
  },
]

const isSSR = typeof window === 'undefined'

export const router = createRouter({
  history: isSSR ? createMemoryHistory('') : createWebHistory(''),
  routes,
})

if (!isSSR) router.beforeEach((to, _, next) => {
  if (to.meta.title) document.title = `${to.meta.title} - ${meta.title}`

  next()
})

export default router
