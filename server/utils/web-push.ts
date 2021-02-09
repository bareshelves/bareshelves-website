import {
  vapid, 
} from '../../config'
import webpush from 'web-push'
import {
  db,
} from './db'
import {
  ProductUpdate,
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

export const sync = (update: ProductUpdate): void => {
  console.log('Sync with:', subscriptions.map(({ id }) => id))

  const filteredSubscriptions = subscriptions
    .filter(({ products }) => {
      try {
        return products.includes(update.product._id as string)
      } catch (error) {
        console.error('Error validating subscription')
        console.error(error)

        return false
      }
    })

  filteredSubscriptions
    .forEach(subscription => {
      try {
        webpush.sendNotification(subscription.subscription, JSON.stringify(update))
      } catch (error) {
        console.error(error)
      }
    })
}
