/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  compileTemplate, 
} from '@vue/compiler-sfc'
import {
  readFileSync, 
} from 'fs'
import {
  Plugin,
} from 'vite'
import {
  TransformContext, 
} from 'vite/dist/node/transform'
import hashSum from 'hash-sum'

const cache = new Map<string, string>()

const svgPlugin: Plugin = {
  transforms: [
    {
      test ({
        path,
        query,
        isBuild,
      }): boolean {
        const isSVG = path.endsWith('.svg')

        return isBuild
          ? isSVG
          : isSVG && query.import != null
      },

      transform ({
        path, 
        isBuild,
      }: TransformContext): string {
        const result = cache.get(path)

        if (result) return result

        const { code } = compileTemplate({
          source: readFileSync(path, 'utf8'),
          id: hashSum(path),
          filename: path,
        })

        if (isBuild) {
          cache.set(path, code)
        }

        return `${code}\n\n export default render`
      },
    },
  ],
}

export default svgPlugin
