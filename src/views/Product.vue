<template lang="pug">
.product.box( v-if="product !== null" )
  img( :src="product.productimg" )
  .details
    h2 {{ product.productname }}

    .price
      template( v-if="product.instock.toLowerCase() === 'true'" )
        .badge In Stock
        p ${{ product.price }}

      template( v-if="product.instock.toLowerCase() === 'delayed'" )
        .badge.orange Delayed
        p ${{ product.price }}

      template( v-if="product.instock.toLowerCase() === 'false'" )
        .badge.red Out Of Stock

    a.external-icon( :href="product.link" )
      AmazonIcon

    .about
      h3 About this product
      ul
        li( v-for="item in product.desc" ) {{ item }}

    div.controls
      button.follow( v-if="!following" @click="follow" )
        StarIcon
        | follow
      button.follow( v-else @click="unfollow" )
        XIcon
        | unfollow
      a.button( :href="product.link" )
        ExternalLinkIcon
        | View product on Amazon
</template>

<style lang="scss" scoped>
.controls {
  display: flex;
}

.follow {
  margin-right: 1rem;
}

ul {
  list-style: inside;
}

.about {
  margin: 2rem 0;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  li {
    font-size: 1.2rem;
    max-width: 60rem;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}

button svg, .button svg {
  width: 1.4rem;
  margin-right: 0.4rem;
}

a.external-icon > svg {
  height: 20px;
  margin-top: 10px;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }
}

.product {
  display: flex;
  width: 100%;
  margin-top: 4rem;

  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  h2 {
    display: -webkit-box;
    font-size: 2.2em;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    max-width: 60rem;
  }

  p.desc {
    margin: 2rem 0;
    max-width: 60rem;
  }

  .price {
    display: flex;
    align-items: center;
    // margin-top: auto;
    padding-top: 5px;
    
    p {
      font-size: 1.1rem;
      margin-left: 7px;
    }
  }
  
  img {
    height: 35rem;
    width: 35rem;
    min-width: 10rem;
    object-fit: contain;
    margin-right: 2rem;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;

    img {
      margin-right: 0rem;
      margin-bottom: 2rem;
    }
  }
}
</style>

<script lang="ts">
import {
  computed,
  defineComponent, ref, 
} from "vue"
import {
  useRoute, 
} from "vue-router"
import {
  Product,
} from "@types"
import {
  api, 
} from "../utils"
import AmazonIcon from '../assets/svg/amazon.svg'
import StarIcon from '../assets/svg/star.svg'
import ExternalLinkIcon from '../assets/svg/external-link.svg'
import XIcon from '../assets/svg/x.svg'
import {
  useStore, 
} from "vuex"
import {
  state, 
} from "/@/store"

const ProductPage = defineComponent({
  components: {
    AmazonIcon,
    StarIcon,
    ExternalLinkIcon,
    XIcon,
  },

  setup () {
    const product = ref<Product>(null)
    const route = useRoute()
    const store = useStore<state>()

    const products = computed(() => store.state.subscriptions.products)

    const id = String(route.params.id)

    const following = computed(() => products.value.includes(id))

    const follow = () => {
      store.commit('insertProduct', id)
    }

    const unfollow = () => {
      store.commit('removeProduct', id)
    }

    api.get<Product>(`/products/${id}`)
      .then(({ data }) => {
        product.value = data
        document.title = document.title.replace('...', data.productname)
      })

    return {
      product,
      follow,
      unfollow,
      following,
    }
  },
})

export default ProductPage
</script>
