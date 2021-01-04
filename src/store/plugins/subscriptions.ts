import {
  Plugin, 
} from 'vuex'
import {
  state, 
} from './'
import localforage from 'localforage'
import {
  refreshServiceWorker, 
} from '/@/utils'
import {
  api,
} from '../../utils'

export interface subscriptions {
  products: string[]
}

export const SubscriptionsPlugin: Plugin<state> = (store) => {
  store.registerModule<subscriptions>('subscriptions', {
    state () {
      return {
        products: [],
      }
    },

    mutations: {
      setProducts (state, payload: string[]) {
        state.products = payload
      },

      insertProduct (state, payload: string) {
        state.products.push(payload)

        store.dispatch('saveProducts')

        api.post('/products/follow', { id: payload }).catch(r => r)
      },

      removeProduct (state, payload: string) {
        state.products.splice(state.products.indexOf(payload), 1)

        store.dispatch('saveProducts')
      },
    },

    actions: {
      async loadProducts (store) {
        try {
          const products: string = await localforage.getItem('products')

          if (products === null) return

          store.commit('setProducts', JSON.parse(products))
        } catch (error) {
          console.error(error)
        }
      },

      async saveProducts (store) {
        try {
          await localforage.setItem('products', JSON.stringify(store.state.products))
          refreshServiceWorker()
        } catch (error) {
          console.error(error)
        }
      },
    },
  })

  store.dispatch('loadProducts')
}
