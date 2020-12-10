import Router from 'koa-router'
import {
  getTimestamp,
  httpLogTag,
} from '../utils'
import {
  KoaState,
} from '@types'
import Products from './products'

const router = new Router<KoaState>()

router.use(async (ctx, next) => {
  await next()
  
  const { request } = ctx
  const { body } = request

  console.log(`${httpLogTag}`, getTimestamp(), {
    request,
    body: body && (JSON.stringify(body).length < 500 ? body : '...'),
  })
})

router.use('/products', Products)

export default router.routes()
