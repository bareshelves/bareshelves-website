import {
  createLogger,
  createStore,
  Store,
} from 'vuex'
import {
  plugins,
  state as pluginState,
} from './plugins'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface state extends pluginState {}

const store = createStore({
  plugins: [
    ...plugins,
    createLogger(),
  ],
}) as Store<null>

window['store'] = store

export default store
