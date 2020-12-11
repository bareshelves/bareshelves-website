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

const Products = db.collection<Product>('collection')

Products.createIndex({
  productname: "text",
  desc: "text",
}).catch(console.error)

router.get('/all/:page', LimitMiddleware(100), async ctx => {
  const page = Number(ctx.params.page)
  const limit = ctx.state.limit || 100

  if (isNaN(page)) return ctx.throw(400, 'Invalid page number.')

  const productsCursor = await Products.find({}, {
    limit,
  })

  productsCursor.skip(limit * page)

  const products = await productsCursor.toArray()

  ctx.body = products
})

router.get('/search/:page', LimitMiddleware(100), async ctx => {
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
  }, {
    limit,
  })

  productsCursor.skip(limit * page)

  const products = await productsCursor.toArray()

  ctx.body = products
})

export default router.routes()
