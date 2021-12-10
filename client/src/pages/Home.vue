<template>
  <div class="q-pa-m">
    <div class="column">
      <h1 class="text-h3 text-weight-bold">World's Friendliest To-Do List App</h1>
      <h2 class="text-h6 col">Have things that needs to be done?</h2>
      <q-btn label="Get Started" :to="{ name: 'Login' }" no-caps padding="sm" color="accent" />
      <div class="row">
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home'
})
</script>

<style lang="css" scoped>
</style>
