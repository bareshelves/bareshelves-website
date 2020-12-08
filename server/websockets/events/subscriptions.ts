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
    let name = message as string
    let payload: unknown | undefined
    
    if (typeof message !== 'string') {
      name = message['type']
      payload = message['payload']
    }

    const subscription: WebsocketSubscription = subscriptions.find(
      ({ regex }) => {
        return regex.test(name)
      },
    )

    if (subscription) {
      subscription.subscriptions.push({
        peer,
        payload,
      })

      subscription.onSubscribe?.(peer, payload)

      console.log(wsLogTag, `Subscribed peer to ${message}.`)

      peer.onClose(() => {
        const index = subscription.subscriptions.indexOf({
          peer,
          payload,
        })

        if (index > -1) {
          subscription.subscriptions.splice(index, 1)

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
