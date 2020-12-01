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
import path from 'path'
import hashSum from 'hash-sum'

const cache = new Map()

const svgPlugin: Plugin = {
  transforms: [
    {
      test ({
        path,
        query,
        isBuild,
      }: TransformContext): boolean {
        const isSVG = path.endsWith('.svg')

        return isBuild
          ? isSVG
          : isSVG && query.import != null
      },

      async transform ({
        path: filePath, 
        isBuild,
      }: TransformContext): Promise<string> {
        const result = cache.get(path)

        if (result) return result

        const { code } = compileTemplate({
          source: readFileSync(filePath, 'utf8'),
          id: hashSum(filePath),
          filename: filePath,
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
