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
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  height: 10rem;
  width: 100%;

  h4 {
    display: -webkit-box;
    font-size: 1.2em;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  .price {
    display: flex;
    align-items: center;
    margin-top: 3px;
    
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
}
</style>

<script lang="ts">
import {
  defineComponent, 
} from "vue"
import {
  Product,
} from '@types'

const SmallProduct = defineComponent({
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

    console.log(props.product)

    return {
      productimg,
      productname,
      price,
      instock,
    }
  },
})

export default SmallProduct
</script>
