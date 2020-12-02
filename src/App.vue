<template lang="pug">
#app
  Navigation
  main
    router-view
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

const App = defineComponent({
  components: {
    Navigation,
  },
})

export default App
</script>
