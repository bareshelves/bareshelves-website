/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Plugin,
} from 'vite'
// import {
//   transpile,
// } from 'typescript'
// import {
//   readFileSync,
//   writeFileSync,
// } from 'fs'
// import path from 'path'

// const tsconfig = JSON.parse(readFileSync(path.resolve('src', 'tsconfig.json'), 'utf-8').replace(/\,\s*(?=\}|\])/g, '')) // trailing commas

const svgPlugin: Plugin = {
  rollupOutputOptions: {
    chunkFileNames: '[name].js',
  },

  transforms: [
    {
      test ({ path }) {
        return (path.includes('product-sw'))
      },

      transform ({ code }) {
        return code.replace('{{ ENV }}', process.env.NODE_ENV)
      },
    },
  ],
}

export default svgPlugin
