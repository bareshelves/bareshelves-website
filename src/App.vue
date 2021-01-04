<template lang="pug">
#app
  Navigation
  main
    router-view
  RequestNotifications
</template>

<style lang="scss" scoped>
#app {
  max-width: 1600px;
  padding: 30px;
  margin: 0 auto;
}
</style>

<script lang="ts">
import {
  defineComponent, 
} from "vue"
import Navigation from '/@/components/Navigation.vue'
import RequestNotifications from '/@/components/RequestNotifications.vue'

const App = defineComponent({
  components: {
    Navigation,
    RequestNotifications,
  },

  setup () {
    import('./scripts/product-sw').then(({ default: ProductWorker }) => {
      const path = process.env.NODE_ENV === 'development' ? '/@/scripts/product-sw.ts' : '/_assets/product-sw.js'

      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(r => r.unregister())

        navigator.serviceWorker.register(path).then(
          registration => console.log('Service worker registration succeeded:', registration), 
          error => console.log('Service worker registration failed:', error),
        )
      })

      // console.log(ProductWorker)

      // const worker: Worker = ProductWorker()
    })
  },
})

export default App
</script>
