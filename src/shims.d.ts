declare module "*.vue" {
  import {
    ComponentOptions, 
  } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module "*.svg" {
  import {
    ComponentOptions, 
  } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module "*.pug" {
  function template (locals?: Record<string, unknown>): string
  export default template
}

declare module "@meta" {
  import {
    Meta, 
  } from '@types'
  const meta: Meta
  export default meta
}
