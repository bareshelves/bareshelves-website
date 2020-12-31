import {
  WebsocketSubscription,
  db,
  convertNestedProps,
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
}

Products.watch().on('change', async (event) => {
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
  } else if (event.operationType === 'insert') {
    // const peers = stock.subscriptions.filter(({ payload }) => payload.includes(id)).map(({ peer }) => peer)

    // broadcastTo(peers, 'product-update', event.fullDocument)
  }
})
