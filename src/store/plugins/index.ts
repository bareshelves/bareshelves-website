import {
  Plugin, 
} from 'vuex'
import {
  NotificationsPlugin, 
  notifications, 
} from './notifications'
import {
  SubscriptionsPlugin, 
  subscriptions, 
} from './subscriptions'

export interface state {
  notifications: notifications
  subscriptions: subscriptions
}

export const plugins: Plugin<state>[] = [
  NotificationsPlugin,
  SubscriptionsPlugin,
]
