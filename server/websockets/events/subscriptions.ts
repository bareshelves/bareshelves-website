import {
  subscriptions, 
} from '../subscriptions'

import {
  wsLogTag,
  WebsocketEvent, 
  WebsocketSubscription,
} from '../../utils'
import {
  WebsocketMessage, 
} from '../../../@types'

export const subscribe: WebsocketEvent = {
  regex: /^subscribe$/,
  
  callback ({ peer, message }): void {
    let name = message as string
    let payload: WebsocketMessage | undefined
    
    if (typeof message !== 'string') {
      name = message['name']
      payload = message['payload']
    }

    const subscription: WebsocketSubscription<WebsocketMessage> = subscriptions.find(
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

      console.log(wsLogTag, `Subscribed peer to ${name}.`)

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

    const subscription: WebsocketSubscription<WebsocketMessage> = subscriptions.find(
      ({ regex }) => {
        return regex.test(message as string)
      },
    )

    // TODO: fix unsubscribe

    if (subscription) {
      // const index = subscription.subscriptions.findIndex(subscription => peer)

      // if (index > -1) {
      //   subscription.peers.splice(index, 1)

      //   subscription.onUnsubscribe?.(peer)

      //   console.log(wsLogTag, `Unsubscribed peer from ${message}.`)
      // }
    }
  },
}
