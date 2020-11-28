import {
  subscriptions, 
} from '../subscriptions'

import {
  wsLogTag,
  WebsocketEvent, 
  WebsocketSubscription,
} from '../../utils'

export const subscribe: WebsocketEvent = {
  regex: /^subscribe$/,
  
  callback ({ peer, message }): void {
    if (typeof message !== 'string') return

    const subscription: WebsocketSubscription = subscriptions.find(
      ({ regex }) => {
        return regex.test(message as string)
      },
    )

    if (subscription) {
      subscription.peers.push(peer)

      subscription.onSubscribe?.(peer)

      console.log(wsLogTag, `Subscribed peer to ${message}.`)

      peer.onClose(() => {
        const index = subscription.peers.indexOf(peer)

        if (index > -1) {
          subscription.peers.splice(index, 1)

          subscription.onUnsubscribe?.(peer)

          console.log(wsLogTag, `Unsubscribed peer from ${message}.`)
        }
      })
    }
  },
}

export const unsubscribe: WebsocketEvent = {
  regex: /^unsubscribe$/,
  
  callback ({ peer, message }): void {
    if (typeof message !== 'string') return

    const subscription: WebsocketSubscription = subscriptions.find(
      ({ regex }) => {
        return regex.test(message as string)
      },
    )

    if (subscription) {
      const index = subscription.peers.indexOf(peer)

      if (index > -1) {
        subscription.peers.splice(index, 1)

        subscription.onUnsubscribe?.(peer)

        console.log(wsLogTag, `Unsubscribed peer from ${message}.`)
      }
    }
  },
}
