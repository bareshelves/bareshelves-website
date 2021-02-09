import {
  PushSubscription, 
} from 'web-push'
import {
  ProductSubscription, 
} from './Products'

export interface SubscriptionInterface {
  id: string
  subscription: PushSubscription
  products: ProductSubscription
}
