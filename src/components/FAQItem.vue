<template lang="pug">
.faq-item(@click="show = !show")
  .header
    .title(v-html="question.title")
    .plus(v-show="!show")
    .minus(v-show="show")
  
  .answer(@click="show = !show" v-html="question.answer" v-show="show")
</template>

<style lang="scss" scoped>
.faq-item {
  padding: 2.5rem 0;
  cursor: pointer;

  &:not(:last-child) {
    // border-bottom: 2px solid var(--text);
  }

  .header {
    display: flex;
    align-items: center;
    // justify-content: center;
  }

  .plus {
    position: relative;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;

    &::before, &::after {
      content: '';
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      background-color: var(--text);
    }

    &::after {
      transform: rotate(90deg);
    }
  }

  .minus {
    position: relative;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;

    &::before {
      content: '';
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      background-color: var(--text);
    }
  }

  .title {
    width: calc(100% - 2rem);
    user-select: none;
  }

  .answer {
    width: calc(100% - 2rem);
    padding-top: 0.6rem;
    cursor: text;
  }
}
</style>

<script lang="ts">
import {
  defineComponent, 
  ref,
} from "vue"

const FAQItem = defineComponent({
  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  setup () {
    const show = ref(false)

    return {
      show,
    }
  },
})

export default FAQItem
</script>
