<template lang="pug">
.search.rounded( @click="() => $refs.input.focus()" )
  SearchIcon
  input( ref="input" v-model="query" placeholder="enter search query.." )

template( v-if="query" )
  ProductGrid.search-result( v-show="searchResult.length > 0" :list="searchResult" )

  h2.no-results( v-show="searchResult.length === 0" ) No results.

template( v-else )
  h1 Back in stock
   a( href="#" ) see more
  ProductGrid.popular( :list="popular" :rows="2" )

  h1 Popular
   a( href="#" ) see more
  ProductGrid.popular( :list="popular" :rows="2" )

  h1 Out of stock
   a( href="#" ) see more
  ProductGrid.popular( :list="popular" :rows="2" )
  
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
    const popular = ref<Product[]>([])

    const submit = async () => {
      if (!/\S/.test(query.value)) return

      const { data } = await api.get<Product[]>(`/products/search/0?limit=${limit.value}&query=${query.value}`)

      searchResult.value = data
    }

    submit()

    watch(query, submit)

    api.get<Product[]>(`/products/all/0?limit=${limit.value}`)
      .then(({ data }) => popular.value = data)

    return {
      query,
      searchResult,
      popular,
      page,
      limit,
      submit,
    }
  },
})

export default Search
</script>
