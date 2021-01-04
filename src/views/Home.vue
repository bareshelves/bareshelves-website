<template lang="pug">
.home
  section.landing
    h1 Get notified when your favorite products are back in stock.
    h2 No account required.
    .links
      router-link.button(to="/browse")
        SearchIcon
        | Search for products

      router-link.button(to="/notifications")
        BellIcon
        | Manage notifications

  //- section.faq( v-if="FAQ[0]" )
  //-   //- h1 F.A.Q.
  //-   FAQItem(v-for="(question, key) in FAQ" :key="key" :question="question")
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem 0;
  margin: 6rem 0;
  width: 100%;
  // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5rem' height='5rem' viewBox='0 0 32 32'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='Artboard-5' fill='%23000000' fill-opacity='0.07' fill-rule='nonzero'%3E%3Cpath d='M6 18h12V6H6v12zM4 4h16v16H4V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

  h1 {
    text-align: center;
  }
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
  color: var(--text);
  margin-top: 1rem;
}

.links {
  display: flex;
  margin-top: 3rem;

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

.faq {
  width: 100%;
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
