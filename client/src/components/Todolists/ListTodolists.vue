<template lang="html">
  <todolist-card-item
    v-for="list in todolists"
    :key="list.id"
    :list="list"
  />
</template>

<script>
import { inject, computed } from 'vue'

export default {
  setup () {
    const store = inject('store')

    const todolists = computed(() => store.getters['todolists/getTodolists'])

    return {
      store,
      todolists
    }
  },
  components: {
    'todolist-card-item': require('components/Todolists/TodolistCardItem').default
  }
}
</script>
