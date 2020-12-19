import {
  Plugin, 
} from 'vuex'
import {
  NotificationsPlugin, 
  notifications, 
} from './notifications'

export interface state {
  notifications: notifications
}

export const plugins: Plugin<state>[] = [
  NotificationsPlugin,
]
