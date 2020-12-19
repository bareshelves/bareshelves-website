import {
  Middleware, 
} from 'koa'
import {
  KoaState,
  Product, 
} from '@types'
import {
  FilterQuery,
  SortOptionObject, 
} from 'mongodb'

export const FilterMiddleware: Middleware<KoaState> = async (ctx, next) => {
  const filter: FilterQuery<Product> = {}
  const sort: SortOptionObject<Product> = {}

  const {
    instock,
    maxprice,
    minprice,
    sort: sortType,
  } = ctx.query as {
    instock?: 'true' | 'false'
    maxprice?: string
    minprice?: string
    sort?: 'popular' | 'name_ascending' | 'name_descending' | 'price_descending' | 'price_ascending' | 'newest' | 'oldest'
  }

  if (instock === 'true') {
    filter.instock = {
      $regex: /true|delayed/,
    }
  } else if (instock === 'false') {
    filter.instock = 'false'
  }

  if (!isNaN(Number(maxprice))) {
    filter.price = {}

    filter.price.$lte = Number(maxprice)
  } else if (!isNaN(Number(minprice))) {
    filter.price = filter.price as Record<string, unknown> || {}

    filter.price.$gte = Number(maxprice)
  }

  switch (sortType) {
    case 'popular':
      sort.subscription = -1
      break

    case 'price_descending':
      filter.instock = 'true'
      sort.price = -1
      break

    case 'price_ascending':
      filter.instock = 'true'
      sort.price = 1
      break

    case 'name_descending':
      sort.productname = -1
      break

    case 'name_ascending':
      sort.productname = 1
      break

    case 'newest':
      sort.timestamp = -1
      break

    case 'oldest':
      sort.timestamp = 1
      break
  }

  ctx.state.filter = filter
  ctx.state.sort = sort

  await next()
}
