import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
import {
  meta,
} from '../../meta'

import {
  h, 
} from 'vue'

export const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home as unknown as typeof h,
  //   meta: {
  //     title: 'Home',
  //   },
  // },

  // {
  //   path: '/coinflip',
  //   name: 'Coinflip Lobby',
  //   component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "coinflip-lobby" */ '@/views/games/coinflip/Lobby.vue'),
  //   meta: {
  //     title: 'Coinflip',
  //   },
  // },
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
