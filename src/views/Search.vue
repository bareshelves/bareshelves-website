<template lang="pug">
.search.rounded.rounded( @click="() => $refs.input.focus()" )
  SearchIcon
  input( ref="input" v-model="query" placeholder="enter search query.." )

ul
  SmallProduct( v-for="product in products" :key="product._id" :product="product" )
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  // border-bottom: 1px solid var(--highlight);
  background-color: var(--alt-background);
  display: flex;
  align-items: center;
  padding: 7.5px;
  margin-top: 5rem;
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

ul {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 5rem;

  li {
    list-style: none;
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
import SmallProduct from '../components/SmallProduct.vue'
import SearchIcon from '../assets/svg/search.svg' 

const Search = defineComponent({
  components: {
    SmallProduct,
    SearchIcon,
  },

  setup () {
    const query = ref<string>('a')
    const products = ref<Product[]>([])
    const page = ref(0)
    const limit = ref(50)

    const submit = async () => {
      if (!/\S/.test(query.value)) return

      const { data } = await api.get<Product[]>(`/products/search/0?limit=${limit.value}&query=${query.value}`)

      products.value = data
    }

    submit()

    watch(query, submit)

    return {
      query,
      products,
      page,
      limit,
      submit,
    }
  },
})

export default Search
</script>
