import dotenv from 'dotenv'
import path from 'path'
import svgPlugin from './plugins/svg'
import {
  UserConfig,
} from 'vite'

dotenv.config()

const config: UserConfig = {
  entry: 'index.pug',

  plugins: [
    svgPlugin,
  ],

  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
}

export default config
