<template>
  <div class="fullscreen bg-accent text-white q-pa-md flex flex-center">
    <div class="col-12 row justify-center items-center">
      <div class="col-12 col-sm-6 text-h5 text-underline">
        <span>Shared task content: </span>{{ task.description }}
      </div>
      <div class="col-12 col-sm-6">
        <h1 class="text-h3 text-weight-bold">Have things that needs to be done?</h1>
        <h2 class="text-h6 col">Try it. It's Free</h2>
        <btn
          label="Get Started"
          color="white"
          text-color="accent"
          fullWidth="false"
          :to="{ name: 'Login' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  preFetch ({ store, currentRoute }) {
    store.dispatch('fetchPublicTask', currentRoute.query.token)
  },
  setup () {
    const store = useStore()
    const task = computed(() => store.state.publicTask)
    return {
      task
    }
  }
}
</script>

<style lang="css" scoped>
.text-underline {
  text-decoration: underline;
}
</style>
