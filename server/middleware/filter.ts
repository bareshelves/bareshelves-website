import {
  Middleware, 
} from 'koa'
import {
  KoaState, 
} from '@types'

export const FilterMiddleware = (maxLimit: number): Middleware<KoaState> => async (ctx, next) => {
  const limit = ctx.query.limit ? Number(ctx.query.limit) : undefined
 
  if (limit !== undefined && (isNaN(limit) || limit > maxLimit)) return ctx.throw(400, 'Invalid limit')

  ctx.state.limit = limit

  await next()
}
