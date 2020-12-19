<template lang="pug">
.category
  h1.box {{ category.name }}
  ProductGrid.box.products( :list="products" )
</template>

<style lang="scss" scoped>
.category {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

.products {
  width: 100%;
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

  'in-stock': {
    query: '?instock=true&sort=newest',
    name: 'In stock',
  },

  'out-of-stock': {
    query: '?instock=false&sort=newest',
    name: 'Out of stock',
  },

  'all': {
    query: '',
    name: 'All products',
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
