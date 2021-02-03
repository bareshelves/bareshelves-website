import {
  PushSubscription, 
} from 'web-push'

export interface SubscriptionInterface {
  id: string
  subscription: PushSubscription
}
