<template lang="pug">
#app
  Navigation
  main
    h1 Hello
    p World
    button h
</template>

<style lang="scss" scoped>
#app {
  max-width: 1600px;
  padding: 30px;
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
