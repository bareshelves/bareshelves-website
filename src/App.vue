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
import { SubscriptionInterface } from "../@types/Subscription"
import {
  refreshServiceWorker, 
  api,
} from "./utils"
import Navigation from '/@/components/Navigation.vue'
import RequestNotifications from '/@/components/RequestNotifications.vue'

const App = defineComponent({
  components: {
    Navigation,
    RequestNotifications,
  },

  setup () {
    void (async () => {
      await import('./product-sw')
      refreshServiceWorker()
    })().catch(console.error)
  },
})

export default App
</script>
