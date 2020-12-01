import path from 'path'
import fs from 'fs'
import koa from 'koa'
import compression from 'koa-compress'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import api from './api'
import {
  port, 
} from '../config'
import WebsocketServer from './websockets'
import http from 'http'
import {
  KoaState,
} from '../@types'
import {
  httpLogTag,
} from './utils'

const app = new koa<KoaState>()
const router = new Router<KoaState>()
const httpServer = http.createServer(app.callback())

httpServer.on('upgrade', async (request, socket, head) => {
  WebsocketServer.server.handleUpgrade(request, socket, head, ws => {
    WebsocketServer.server.emit('connection', ws, request)
  })
})

app.use(compression({
  filter (contentType: string) {
    return /text\/(?!javascript|css)/i.test(contentType)
  },
}))

app.use(bodyParser())

app.on('error', console.error)

router.use('/api', api)

app.use(router.routes())

if (process.env.NODE_ENV === 'production') {
  app.use(ctx => {
    if (ctx.status !== 404) return

    const file = path.join(process.cwd(), 'dist', ctx.path)
    const index = path.join(process.cwd(), 'dist/index.html')

    if (fs.existsSync(index)) {
      const result = ctx.path === '/' || !fs.existsSync(file) ? index : file
      const [extension] = /\.[^.]+$/.exec(result)
      ctx.type = extension
      ctx.body = fs.createReadStream(result)
    } else {
      throw new Error('Client hasn\'t been built yet.')
    }
  })
}

httpServer.listen(port)

console.log(`${httpLogTag} HTTP server running on port ${port}.`)
