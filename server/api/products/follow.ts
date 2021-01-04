import Router from 'koa-router'
import {
  KoaState,
  Product,
} from '@types'
import {
  db,
} from '../../utils/db'

const router = new Router<KoaState>()

const Products = db.collection<Product>('collection')

router.post('/', async ctx => {
  const { id } = ctx.request.body

  if (!id || typeof id !== 'string') return ctx.throw(400, 'Invalid ID.')
  
  const product = await Products.updateOne({ _id: id }, {
    $inc: {
      subscription: +1,
    },
  })

  if (product.modifiedCount === 0) return ctx.throw(404, 'Product not found.')

  ctx.body = 'success'
})

export default router.routes()
