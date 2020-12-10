import Router from 'koa-router'
import {
  KoaState,
  Product,
} from '@types'
import {
  db,
} from '../../utils/db'
import {
  LimitMiddleware,
} from '../../middleware'

const router = new Router<KoaState>()

const Products = db.collection('products')

router.get('/all/:page', LimitMiddleware(100), async ctx => {
  const page = Number(ctx.params.page)
  const limit = ctx.state.limit || 100

  if (isNaN(page)) return ctx.throw(400, 'Invalid page number.')

  const { docs } = await Products
    .limit(limit)
    .orderBy('timestamp')
    .startAt(limit * Number(page))
    .get()

  const products = docs.map(doc => doc.data() as Product)

  ctx.body = products
})

export default router.routes()
