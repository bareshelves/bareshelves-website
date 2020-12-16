<template lang="pug">
.not-found
  h1 404
  h3 This page doesn't exist.
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: 25vh;
}

h1 {
  font-size: 4rem;
}

h3 {
  font-size: 1.9rem;
  opacity: 0.5;
}

a {
  font-size: 1.4rem;
  margin-top: 1rem;
}

.links {
  display: flex;
  margin-top: 0.75rem;

  a:not(:last-child) {
    margin-right: 0.75rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;

    a:not(:last-child) {
      margin-right: 0;
      margin-bottom: 0.75rem;
    }
  }
}
</style>
