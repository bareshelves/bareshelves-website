import {
  WebsocketSubscription,
  db,
} from '../../utils'
import {
  ProductSubscription,
} from '../../../@types'

export const stock: WebsocketSubscription = {
  regex: /stock/,
  subscriptions: [],

  onSubscribe (peer, payload: ProductSubscription) {

  },
}

db.doc(A)
