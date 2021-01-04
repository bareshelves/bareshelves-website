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
import {
  refreshServiceWorker, 
} from "./utils"
import Navigation from '/@/components/Navigation.vue'
import RequestNotifications from '/@/components/RequestNotifications.vue'

const App = defineComponent({
  components: {
    Navigation,
    RequestNotifications,
  },

  setup () {
    import('./scripts/product-sw').then(() => refreshServiceWorker())
  },
})

export default App
</script>
