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
  FilterMiddleware,
} from '../../middleware'

const router = new Router<KoaState>()

const Products = db.collection<Product>('collection')

Products.createIndex({
  productname: "text",
  desc: "text",
}).catch(console.error)

router.get('/all/:page', FilterMiddleware, LimitMiddleware(100), async ctx => {
  const page = Number(ctx.params.page)
  const limit = ctx.state.limit || 100

  if (isNaN(page)) return ctx.throw(400, 'Invalid page number.')

  const productsCursor = await Products.find(ctx.state.filter, { limit }).sort(ctx.state.sort)

  productsCursor.skip(limit * page)

  const products = await productsCursor.toArray()

  ctx.body = products
})

router.get('/search/:page', FilterMiddleware, LimitMiddleware(100), async ctx => {
  const page = Number(ctx.params.page)
  const limit = ctx.state.limit || 100

  if (isNaN(page)) return ctx.throw(400, 'Invalid page number.')
  if (!ctx.query.query) return ctx.throw(400, 'Please provide a search query.')
  if (ctx.query.query.length > 256) return ctx.throw(400, 'Invalid search query.')

  const query = new RegExp(`${ctx.query.query}`, 'i')

  const productsCursor = await Products.find({
    $or: [
      {
        productname: query,
      },
      {
        desc: query,
      },
    ],

    ...ctx.state.filter,
  }, { limit }).sort(ctx.state.sort)

  productsCursor.skip(limit * page)

  const products = await productsCursor.toArray()

  ctx.body = products
})

router.get('/:id', async ctx => {
  if (!ctx.params.id) return ctx.throw(400, 'Please provide an ID.')

  const product = await Products.findOne({
    _id: ctx.params.id,
  })

  if (!product) return ctx.throw(404, 'Product not found.')

  ctx.body = product
})

export default router.routes()
