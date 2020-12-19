import {
  Plugin, 
} from 'vuex'
import {
  state, 
} from './'
import {
  getNotificationGranted, 
} from '/@/utils'

export interface notifications {
  granted: boolean | null
}

export const NotificationsPlugin: Plugin<state> = (store) => {
  store.registerModule<notifications>('notifications', {
    state () {
      return {
        granted: null,
      }
    },

    mutations: {
      updateGrantedState (state) {
        state.granted = getNotificationGranted()

        console.log('Notification state:', state.granted)
      },
    },
  })

  store.commit('updateGrantedState')
}
