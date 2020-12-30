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

const Products = db.collection<Product>('products')

export const stock: WebsocketSubscription<ProductSubscription> = {
  regex: /products/,
  subscriptions: [],
}

Products.watch().on('change', async (event) => {
  const id = event._id as unknown as string

  console.log(id, typeof id)

  if (event.operationType === 'update') {
    const peers = stock.subscriptions.filter(({ payload }) => payload.includes(id)).map(({ peer }) => peer)

    const product = await Products.findOne({ _id: id })

    broadcastTo<ProductUpdate>(peers, 'product-update', {
      product,
      updatedFields: convertNestedProps(event.updateDescription.updatedFields),
    })
  } else if (event.operationType === 'insert') {
    // const peers = stock.subscriptions.filter(({ payload }) => payload.includes(id)).map(({ peer }) => peer)

    // broadcastTo(peers, 'product-update', event.fullDocument)
  }
})
