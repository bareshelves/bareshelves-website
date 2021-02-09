import {
  WebsocketSubscription,
  db,
  convertNestedProps,
  sync,
} from '../../utils'
import {
  Product,
  ProductSubscription,
  ProductUpdate,
} from '../../../@types'
import {
  broadcastTo,
} from '../'

const Products = db.collection<Product>('collection')

export const stock: WebsocketSubscription<ProductSubscription> = {
  regex: /products/,
  subscriptions: [],

  onSubscribe (peer, payload: string[]) {
    const filteredUpdates = updates.filter(update => payload.includes(update.product._id as string))

    peer.sendEvent<ProductUpdate[]>('product-updates', filteredUpdates)
  },
}

// TODO: make persistent
const updates: ProductUpdate[] = []

Products.watch().on('change', async (event) => {
  try {
    if (event.operationType === 'update') {
      const id = event.documentKey._id as unknown as string
  
      const updatedFields: Product = convertNestedProps(event.updateDescription.updatedFields)
  
      const keys = Object.keys(updatedFields)
      
      if (!keys.includes('instock')) return
  
      const peers = stock.subscriptions.filter(({ payload }) => payload.includes(id)).map(({ peer }) => peer)
  
      const product = await Products.findOne({ _id: id })
  
      broadcastTo<ProductUpdate>(peers, 'product-update', {
        product,
        updatedFields,
      })
  
      if (product.instock !== 'false') {
        product.lastUpdate = Date.now() as unknown as Date
  
        const update = {
          product,
          updatedFields,
        }
  
        updates.push(update)
  
        sync(update)
  
        console.log('Update pushed from ' + product._id)
      } else {
        const index = updates.findIndex(update => update.product._id === id)
  
        if (index) {
          updates.splice(index, 1)
        }
      }
    } else if (event.operationType === 'insert') {
      // const peers = stock.subscriptions.filter(({ payload }) => payload.includes(id)).map(({ peer }) => peer)
  
      // broadcastTo(peers, 'product-update', event.fullDocument)
    }
  } catch (error) {
    console.error(error)
  }
})
