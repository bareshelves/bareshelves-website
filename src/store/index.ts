import {
  createStore,
  Store,
} from 'vuex'

import {
  plugins,
  // state, 
} from './plugins'
// export { state } from './plugins'

const store = createStore({
  plugins,
}) as Store<null>

// store.subscribe((mutation, state) => {
//   console.log('MUTATION', mutation.type, mutation.payload, '\n\nSTATE', JSON.parse(JSON.stringify(state)))
// })

window['store'] = store

export default store
