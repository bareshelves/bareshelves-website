<template lang="pug">
nav
  .logo
  h2 bareshelves
  SearchIcon
  BellIcon
</template>

<script lang="ts">
import {
  defineComponent, 
} from "vue"
import SearchIcon from '/@/assets/svg/search.svg'
import BellIcon from '/@/assets/svg/bell.svg'

const Navigation = defineComponent({
  components: {
    SearchIcon,
    BellIcon,
  },
})

export default Navigation
</script>
