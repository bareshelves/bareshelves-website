declare module "@config" {
  import {
    Config, 
  } from '@types'
  const config: Config
  export default config
}

declare module "@meta" {
  import {
    Meta, 
  } from '@types'
  const meta: Meta
  export default meta
}

declare module "*.pug" {
  function template (locals?: Record<string, unknown>): string
  export default template
}
