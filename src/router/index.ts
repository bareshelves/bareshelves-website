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
    path: '/browse',
    name: 'Browse',
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "browse" */ '/@/views/Browse.vue'),
    meta: {
      title: 'Browse',
    },
  },

  {
    path: '/browse/:category',
    name: 'BrowseCategory',
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "browse-category" */ '/@/views/BrowseCategory.vue'),
    meta: {
      title: ':category',
    },
  },

  {
    path: '/product/:id',
    name: 'Product',
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "product" */ '/@/views/Product.vue'),
    meta: {
      title: '...',
    },
  },


  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "404" */ '/@/views/404.vue'),
    meta: {
      title: '404',
    },
  },
]

const isSSR = typeof window === 'undefined'

export const router = createRouter({
  history: isSSR ? createMemoryHistory('') : createWebHistory(''),
  routes,
})

if (!isSSR) router.beforeEach((to, _, next) => {
  /\:(.+)/.test(to.meta.title)

  if (RegExp.$1) to.meta.title = to.meta.title.replace(/\:(.+)/, to.params[RegExp.$1])

  if (to.meta.title) document.title = `${to.meta.title.replace(/^./, to.meta.title[0].toUpperCase())} - ${meta.title}`

  next()
})

export default router
