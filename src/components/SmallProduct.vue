<template lang="pug">
li.product
  router-link( :to="`/product/${String(id)}`" )
    img( :src="productimg" )
    
  .details
    router-link( :to="`/product/${String(id)}`" )
      h4 {{ productname }}

    .price
      template( v-if="product.instock.toLowerCase() === 'true'" )
        .badge In Stock
        p ${{ product.price }}

      template( v-if="product.instock.toLowerCase() === 'delayed'" )
        .badge.orange Delayed
        p ${{ product.price }}

      template( v-if="product.instock.toLowerCase() === 'false'" )
        .badge.red Out Of Stock

    a( :href="`https://www.amazon.com/gp/product/${product._id}`" )
      AmazonIcon
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.product {
  display: flex;
  height: 10rem;
  width: 100%;

  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  h4 {
    display: -webkit-box;
    font-size: 1.15em;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    transition: color 0.1s;

    &:hover {
      color: var(--text);
    }
  }

  .price {
    display: flex;
    align-items: center;
    // margin-top: auto;
    padding-top: 5px;
    
    p {
      font-size: 1.1rem;
      margin-left: 7px;
      color: var(--text);
    }
  }
  
  img {
    height: 10rem;
    width: 10rem;
    min-width: 10rem;
    object-fit: contain;
    margin-right: 2rem;
  }

  svg {
    height: 20px;
    margin-top: 10px;
    transition: transform 0.1s;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>

<script lang="ts">
import {
  defineComponent, 
} from "vue"
import {
  Product,
} from '@types'
import AmazonIcon from '../assets/svg/amazon.svg'

const SmallProduct = defineComponent({
  components: {
    AmazonIcon,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  setup (props: {
    product: Product,
  }) {
    const {
      _id,
      productimg,
      productname,
      price,
      instock,
    } = props.product

    const [dollars, cents] = price ? String(price).split('.') : ['0', '0']

    return {
      id: _id,
      productimg,
      productname,
      price: price ? `${dollars}.${(cents || '00').padEnd(2, '0')}` : null,
      instock,
    }
  },
})

export default SmallProduct
</script>
