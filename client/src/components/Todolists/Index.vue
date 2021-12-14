<template lang="html">
  <div class="restrain-400">
    <div class="q-pa-md">
      <list-todolists
        v-if="store.state.todolists.lists.length"
      />

      <nothing-here
        v-else
        label="No lists"
        icon="list"
      />
    </div>
  </div>

  <q-page-sticky position="bottom" :offset="[0, 18]">
    <q-btn
      color="accent"
      icon="add"
      rounded
      padding="sm"
      unelevated
      @click="store.commit('todolists/showAddTodolistDialog', true)"
    />
  </q-page-sticky>

  <dialog-add-todolist />
</template>

<script>
import { inject, onMounted } from 'vue'
export default {
  setup () {
    const store = inject('store')

    const getUserTodolists = () => store.dispatch('todolists/fetchTodolists')

    onMounted(getUserTodolists)

    return {
      store
    }
  },
  components: {
    'list-todolists': require('components/Todolists/ListTodolists').default,
    'dialog-add-todolist': require('components/Todolists/DialogAddTodolist').default
  }
}
</script>
