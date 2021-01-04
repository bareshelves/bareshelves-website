<template lang="pug">
section.notifications
  h1.box Notifications
  
  div.box
    ul( v-if="products.length > 0" )
      li( v-for="product in products" :key="product.productname" )
        SmallProduct( :product="product" )
        button.follow( v-if="!subscriptions.includes(product._id)" @click="follow(product._id)" )
          StarIcon
          | follow
        button.follow( v-else @click="unfollow(product._id)" )
          XIcon
          | unfollow

    template( v-else )
      h2 You aren't subscribed to any products.
      router-link.button(to="/browse")
        SearchIcon
        | Search for products
</template>

<style lang="scss" scoped>
.notifications {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      text-align: center;
      opacity: 0.7;
      margin-bottom: 1rem;
      font-size: 1.7rem;
    }
  }

  > div > ul, > div > ul > li {
    width: 100%;
  }

  > div > ul > li {
    list-style: none;
    display: flex;
    align-items: center;

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: center;
      
      > button {
        margin-top: 1rem;
      }
    }

    > button {
      margin-left: 1rem;
    }

    &:not(:last-child) {
      border-bottom: 1px solid rgba(black, 0.05);
      margin-bottom: 2rem;
      padding-bottom: 2rem;
    }
  }
}

h1 {
  margin-bottom: 4rem;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

button svg, .button svg {
  width: 1.4rem;
  margin-right: 0.4rem;
}
</style>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch, 
} from "vue"
import {
  useStore, 
} from "vuex"
import SmallProduct from '/@/components/SmallProduct.vue'
import {
  state,
} from '../store'
import {
  api, 
} from "../utils"
import {
  Product, 
} from "../../@types/Products"
import SearchIcon from '/@/assets/svg/search.svg'
import StarIcon from '../assets/svg/star.svg'
import XIcon from '../assets/svg/x.svg'

const Notifications = defineComponent({
  components: {
    SmallProduct,
    SearchIcon,
    StarIcon,
    XIcon,
  },

  setup () {
    const store = useStore<state>()
    const products = ref<Product[]>([])

    const subscriptions = computed(() => store.state.subscriptions.products)

    const checkProducts = async () => {
      if (!subscriptions || products.value.length > 0) return products.value

      const { data } = await api.post<Product[]>(`/products/0`, {
        products: subscriptions.value,
      })

      products.value = data
    }

    watch(subscriptions, checkProducts)

    checkProducts()

    const follow = (id) => {
      store.commit('insertProduct', id)
    }

    const unfollow = (id) => {
      store.commit('removeProduct', id)
    }

    return {
      products,
      follow,
      unfollow,
      subscriptions,
    }
  },
})

export default Notifications
</script>
