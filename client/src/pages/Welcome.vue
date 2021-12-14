<template>
  <div class="fullscreen bg-accent text-white q-pa-none flex flex-center">
    <div class="col-12 col-sm-6 row justify-center">
      <div class="col-8">
        <h1 class="text-h3 text-weight-bold">The Friendliest To-Do List App</h1>
        <h2 class="text-h6 col">Have things that needs to be done?</h2>
        <btn
          label="Get Started"
          color="white"
          text-color="accent"
          fullWidth="true"
          :to="{ name: 'Login' }"
        />
      </div>
    </div>
    <div class="col">
      <q-img
        src="../statics/hero-img.png"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Welcome'
})
</script>

<style lang="css" scoped>

</style>
