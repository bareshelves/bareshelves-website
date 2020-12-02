import {
  createApp, 
} from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './utils'
import './scss/index.scss'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('body')

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => console.log('Service worker registration succeeded:', registration))
//       .catch(error => console.log('Service worker registration failed:', error))
//   })
// }
