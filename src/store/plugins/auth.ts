// import {
//   Plugin, 
// } from 'vuex'
// import Axios from 'axios'
// import {
//   SafeUser,
// } from '@types'
// import {
//   state, 
// } from '../'

// export interface auth {
//   user?: SafeUser
//   loggedIn: boolean
//   showSignIn: boolean
//   showSignUp: boolean
// }
  
// const api = Axios.create({
//   baseURL: `${window.location.origin}/api`,
//   withCredentials: true,
// })

// export const AuthPlugin: Plugin<state> = (store) => {
//   api.get<SafeUser>('/users/get/@me')
//     .then(({ data: user }) => {
//       store.commit('setLoggedIn', true)
//       store.commit('setUser', user)
//     })
//     .catch(error => {
//       console.error(error)
//       store.commit('setLoggedIn', false)
//     })

//   store.registerModule<auth>('auth', {
//     state () {
//       return {
//         user: null,
//         loggedIn: null,
//         showSignIn: false,
//         showSignUp: false,
//       }
//     },

//     mutations: {
//       setUser (state, user: SafeUser) {
//         state.user = user
//       },

//       setLoggedIn (state, boolean: boolean) {
//         state.loggedIn = boolean
//       },

//       setSignIn (state, boolean: boolean) {
//         state.showSignIn = boolean
//       },

//       setSignUp (state, boolean: boolean) {
//         state.showSignUp = boolean
//       },
//     },

//     getters: {
//       loggedIn: (state) => {
//         return state.loggedIn
//       },
//     },
//   })
// }
