import dotenv from 'dotenv'
import path from 'path'
import svgPlugin from './plugins/svg'
import {
  ServerPluginContext,
  UserConfig,
} from 'vite'
import proxy from 'koa-proxy'

dotenv.config()

const config: UserConfig = {
  plugins: [
    svgPlugin,

    {
      configureServer: ({
        app, 
      }: ServerPluginContext): void => {
        app.use(proxy({
          host:  'http://localhost:9898',
          match: /^\/api/,
        }))

        app.use((ctx, next) => {
          if (ctx.path.startsWith('/ws')) ctx.redirect('http://localhost:9898/ws')

          return next()
        })
      },
    },
  ],

  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
}

export default config
