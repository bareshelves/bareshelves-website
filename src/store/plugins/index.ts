import {
  Plugin, 
} from 'vuex'
// import {
//   AuthPlugin, 
//   auth, 
// } from './auth'

export interface state {
  // auth: auth
  a: ''
}

export const plugins: Plugin<state>[] = [
  // AuthPlugin,
]
