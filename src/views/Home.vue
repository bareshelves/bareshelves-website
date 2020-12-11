<template lang="pug">
section.landing
  h1 Get notified when your favorite products are back in stock. 
  .links 
    router-link.button(to="/browse")
      SearchIcon
      | Search for products

    router-link.button(to="/notifications")
      BellIcon
      | Manage notifications

section.faq( v-if="FAQ[0]" )
  //- h1 F.A.Q.
  FAQItem(v-for="(question, key) in FAQ" :key="key" :question="question")
</template>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18rem 0;

  h1 {
    text-align: center;
  }
}

h1 {
  font-size: 2em;
}

.links {
  display: flex;
  margin-top: 0.75rem;

  a:not(:last-child) {
    margin-right: 0.75rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;

    a:not(:last-child) {
      margin-right: 0;
      margin-bottom: 0.75rem;
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
import FAQ from '../../resources/faq'
import FAQItem from '/@/components/FAQItem.vue'

const Home = defineComponent({
  components: {
    SearchIcon,
    BellIcon,
    FAQItem,
  },

  setup () {
    console.log(FAQ)

    return {
      FAQ,
    }
  },
})

export default Home
</script>
