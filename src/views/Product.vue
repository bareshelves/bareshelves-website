<template lang="pug">
.product.box( v-if="product !== null" )
  img( :src="product.productimg" )
  .details
    h2 {{ product.productname }}

    .price
      template( v-if="product.instock === 'true'" )
        .badge {{ product.instock === 'delayed' ? 'Delayed' : 'In Stock' }}
        p ${{ product.price }}

      template( v-else )
        .badge.red {{ 'Out Of Stock' }}

    a( :href="`https://www.amazon.com/gp/product/${product._id}`" )
      AmazonIcon

    .about
      h3 About this product
      ul
        li( v-for="item in product.desc" ) {{ item }}

    a.button( :href="`https://www.amazon.com/gp/product/${product._id}`" ) View product on Amazon
    button.follow( @click="follow" ) follow
</template>

<style lang="scss" scoped>
.follow {
  margin-top: 1rem;
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

  svg {
    height: 20px;
    margin-top: 10px;

    &:hover {
      transform: scale(1.05);
    }
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

    const follow = () => {

    }

    api.get<Product>(`/products/${id}`)
      .then(({ data }) => {
        product.value = data
        document.title = document.title.replace('...', data.productname)
      })

    return {
      product,
      follow,
    }
  },
})

export default ProductPage
</script>
