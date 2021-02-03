import {
  vapid, 
} from '../../config'
import webpush from 'web-push'
import {
  db,
} from './db'
import {
  SubscriptionInterface,
} from '../../@types'

const subscriptions: SubscriptionInterface[] = []

const Subscriptions = db.collection<SubscriptionInterface>('subscriptions')

export const pushNewSubscription = async (subscription: SubscriptionInterface): Promise<void> => {
  await Subscriptions.deleteOne({ id: subscription.id }).catch(console.error)

  subscriptions.splice(
    subscriptions.findIndex(({ id }) => id === subscription.id),
    1,
  )

  await Subscriptions.insertOne(subscription)
  subscriptions.push(subscription)
}

Subscriptions.find({})
  .toArray()
  .then(list => subscriptions.push(...list))

webpush.setVapidDetails(
  'mailto:example@example.com',
  vapid.publicKey,
  vapid.privateKey,
)

const sync = async (): Promise<void> => {
  console.log('Sync with:', subscriptions.map(({ id }) => id))

  for (const subscription of subscriptions) {
    try {
      webpush.sendNotification(subscription.subscription, 'wake')
    } catch (error) {
      console.error(error)
    }

    await new Promise(r => setTimeout(r, 100))
  }
}

setInterval(sync, 1000 * 60 * 15)

// This is the same output of calling JSON.stringify on a PushSubscription
// const pushSubscription = {
//   endpoint: '.....',
//   keys: {
//     auth: '.....',
//     p256dh: '.....',
//   },
// }
 
// webpush.sendNotification(pushSubscription, 'Your Push Payload Text')
