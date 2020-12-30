<template lang="pug">
ul.popular(
  :style="{ maxHeight: rows === null ? 'auto' : `${rows * 15 - 5}rem`, overflowY: rows === null ? 'initial' : 'hidden' }"
)
  SmallProduct(
    v-for="product in list"
    :key="product._id"
    :product="product"
  )
</template>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 5rem;
  overflow-x: hidden;

  li {
    list-style: none;
  }
}
</style>

<script lang="ts">
import {
  defineComponent, 
} from "vue"
import SmallProduct from './SmallProduct.vue'

const ProductGrid = defineComponent({
  components: {
    SmallProduct,
  },

  props: {
    list: {
      type: Object,
      required: true,
    },

    rows: {
      type: Number,
      default: null,
    },
  },
})

export default ProductGrid
</script>
