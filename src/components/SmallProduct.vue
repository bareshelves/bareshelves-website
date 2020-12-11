<template lang="pug">
li.product
  img( :src="productimg" )
  .details
    h4 {{ productname }}
    .price
      template( v-if="instock === 'true'" )
        p ${{ price }}
        .badge {{ instock === 'delayed' ? 'Delayed' : 'In Stock' }}

      template( v-else )
        .badge.red {{ 'Out Of Stock' }}

    AmazonIcon
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  height: 10rem;
  width: 100%;

  h4 {
    display: -webkit-box;
    font-size: 1.15em;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  .price {
    display: flex;
    align-items: center;
    margin-top: 5px;
    
    p {
      font-size: 1.1rem;
      margin-right: 7px;
    }
  }
  
  img {
    height: 10rem;
    width: 10rem;
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
    product: Product
  }) {
    const {
      productimg,
      productname,
      price,
      instock,
    } = props.product

    const [dollars, cents] = price ? String(price).split('.') : ['0', '0']

    return {
      productimg,
      productname,
      price: price ? `${dollars}.${(cents || '00').padEnd(2, '0')}` : null,
      instock,
    }
  },
})

export default SmallProduct
</script>
