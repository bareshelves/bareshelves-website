<template lang="pug">
nav
  router-link(to="/")
    Logo.logo
    h2 bareshelves
  
  router-link(to="/browse")
    SearchIcon
  
  router-link(to="/notifications")
    BellIcon
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 0.75rem;
  }

  > *:first-child {
    display: flex;
    align-items: center;
    margin-right: auto;
    text-decoration: none;

    .logo {
      width: 25px;
      height: 25px;
      background-color: black;
      margin-right: 0.75rem;
    }

    h2 {
      font-size: 2em;
    }
  }

  @media (max-width: 400px) {
    h2 {
      display: none;
    }
  }

  a {
    color: var(--highlight);

    // &:hover {
    //   color: var(--text)
    // }

    svg {
      width: 2rem;
    }
  }
}
</style>

<script lang="ts">
import {
  defineComponent, 
} from "vue"
import SearchIcon from '/@/assets/svg/search.svg'
import BellIcon from '/@/assets/svg/bell.svg'
import Logo from '/@/assets/op1.svg'

const Navigation = defineComponent({
  components: {
    SearchIcon,
    BellIcon,
    Logo,
  },
})

export default Navigation
</script>
