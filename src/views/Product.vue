<template lang="pug">
.product( v-if="product !== null" )
  img( :src="product.productimg" )
  .details
    h2 {{ product.productname }}

    p.desc {{ product.desc }}

    .price
      template( v-if="product.instock === 'true'" )
        .badge {{ product.instock === 'delayed' ? 'Delayed' : 'In Stock' }}
        p ${{ product.price }}

      template( v-else )
        .badge.red {{ 'Out Of Stock' }}

    AmazonIcon
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.product {
  display: flex;
  width: 100%;
  margin-top: 8rem;

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

  svg {
    height: 20px;
    margin-top: 10px;
  }
}
</style>

<script lang="ts">
import {
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

const ProductPage = defineComponent({
  components: {
    AmazonIcon,
  },

  setup () {
    const product = ref<Product>(null)
    const route = useRoute()

    const id = String(route.params.id)

    api.get<Product>(`/products/${id}`)
      .then(({ data }) => {
        product.value = data
        document.title = document.title.replace('...', data.productname)
      })

    return {
      product,
    }
  },
})

export default ProductPage
</script>
