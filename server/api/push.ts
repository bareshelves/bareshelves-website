import Router from 'koa-router'
import {
  KoaState,
} from '@types'
import {
  vapid, 
} from '../../config'
import {
  pushNewSubscription, 
} from '../utils'

const router = new Router<KoaState>()

router.get('/vapid-public-key', ctx => ctx.body = vapid.publicKey)

router.post('/new-subscription', ctx => {
  // TODO: validate
  const subscription = ctx.request.body

  pushNewSubscription(subscription)

  ctx.body = ''
})

export default router.routes()
