<template lang="pug">
h1 {{ category.name }}
ProductGrid( :list="products" )
</template>

<style lang="scss" scoped>
h1 {
  margin-top: 8rem;
  margin-bottom: 6rem;
  font-size: 2.4rem;
  display: flex;
  width: 100%;
  max-width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>

<script lang="ts">
import {
  Product, 
} from "@types"
import {
  computed,
  defineComponent, ref, 
} from "vue"
import {
  useRoute, 
} from "vue-router"
import {
  api,
} from '../utils'
import ProductGrid from '/@/components/ProductGrid.vue'
    
const categories = {
  'popular': {
    query: '?sort=popular',
    name: 'Popular',
  },
}

const BrowseCategory = defineComponent({
  components: {
    ProductGrid,
  },

  setup () {
    const products = ref<Product[]>([])

    const route = useRoute()

    const category = computed(() => {
      return categories[String(route.params.category)]
    })

    if (category.value) {
      api.get<Product[]>(`/products/all/0${category.value.query}`)
        .then(({ data }) => products.value.push(...data))
    }

    return {
      products,
      category,
    }
  },
})

export default BrowseCategory
</script>
