<template lang="pug">
.search.rounded( @click="() => $refs.input.focus()" )
  SearchIcon
  input( ref="input" v-model="query" placeholder="enter search query.." )

template( v-if="query" )
  ProductGrid.search-result( v-show="searchResult.length > 0" :list="searchResult" )

  h2.no-results( v-show="searchResult.length === 0" ) No results.

template( v-else )
  template( v-if="inStockProducts.length > 0")
    h1 Back in stock
      router-link( to="/browse/in-stock" ) see more
    ProductGrid.popular( :list="inStockProducts" :rows="2" )

  h1 Popular
    router-link( to="/browse/popular" ) see more
  ProductGrid.popular( :list="popularProducts" :rows="2" )

  template( v-if="outOfStockProducts.length > 0" )
    h1 Out of stock
      router-link( to="/browse/out-of-stock" ) see more
    ProductGrid.popular( :list="outOfStockProducts" :rows="2" )
  
  template( v-if="allProducts.length > 0" )
    h1 All
      router-link( to="/browse/all" ) see more
    ProductGrid.popular( :list="allProducts" :rows="2" )
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  // border-bottom: 1px solid var(--highlight);
  background-color: var(--alt-background);
  display: flex;
  align-items: center;
  padding: 7.5px;
  margin-top: 8rem;
  color: var(--text);
  cursor: text;

  svg {
    width: 2rem;
    margin-right: 4px;
  }

  input {
    padding: 0;
    border: none;
    outline: none;
    font-size: 1.3rem;
    color: inherit;
    background: none;
    width: 100%;
  }
}

h2.no-results {
  width: 100%;
  max-width: 100%;
  text-align: center;
}

.search-result, h2 {
  margin-top: 4rem;
}

h1 {
  margin-top: 6rem;
  margin-bottom: 4rem;
  font-size: 1.8rem;
  display: flex;
  max-width: 100%;
  align-items: center;

  a {
    font-size: 1rem;
    margin-left: auto;
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch, 
} from "vue"
import {
  Product,
} from '@types'
import {
  api,
} from '../utils'
import SearchIcon from '../assets/svg/search.svg' 
import ProductGrid from '../components/ProductGrid.vue'

// TODO: push routes

const Search = defineComponent({
  components: {
    SearchIcon,
    ProductGrid,
  },

  setup () {
    const query = ref<string>('')
    const searchResult = ref<Product[]>([])
    const page = ref(0)
    const limit = ref(100)
    const popularProducts = ref<Product[]>([])
    const inStockProducts = ref<Product[]>([])
    const outOfStockProducts = ref<Product[]>([])
    const allProducts = ref<Product[]>([])

    const submit = async () => {
      if (!/\S/.test(query.value)) return

      const { data } = await api.get<Product[]>(`/products/search/0?limit=${limit.value}&query=${query.value}`)

      searchResult.value = data
    }

    submit()

    watch(query, submit)

    api.get<Product[]>(`/products/all/0?limit=${limit.value}`)
      .then(({ data }) => allProducts.value = data)

    api.get<Product[]>(`/products/all/0?limit=${limit.value}&sort=popular`)
      .then(({ data }) => popularProducts.value = data)

    api.get<Product[]>(`/products/all/0?limit=${limit.value}&instock=true&sort=newest`)
      .then(({ data }) => inStockProducts.value = data)

    api.get<Product[]>(`/products/all/0?limit=${limit.value}&instock=false&sort=newest`)
      .then(({ data }) => outOfStockProducts.value = data)

    return {
      query,
      searchResult,
      popularProducts,
      inStockProducts,
      outOfStockProducts,
      allProducts,
      page,
      limit,
      submit,
    }
  },
})

export default Search
</script>
