<template lang="html">
  <div class="restrain-400">
    <div class="q-pa-md">
      <div class="row justify-center items-center q-px-md border-rounded">
        <search-todolists class="col-11" />
        <div class="col-1">
          <add-todolist-button @click="store.commit('todolist/showAddTodolistDialog', true)" />
        </div>
      </div>
    </div>

    <div class="q-pa-md">
      <list-todolists
        v-if="store.state.todolist.todolists.length"
      />

      <nothing-here
        v-else
        label="No lists"
        icon="list"
      />
    </div>
  </div>

  <dialog-add-todolist />
  <!-- list all todolists -->
  <!-- add todo list button -->
</template>

<script>
import { inject } from 'vue'
export default {
  setup () {
    const store = inject('store')
    return {
      store
    }
  },
  components: {
    'list-todolists': require('./ListTodolists').default,
    'search-todolists': require('./SearchTodolists').default,
    'add-todolist-button': require('./AddTodolistButton').default,
    'dialog-add-todolist': require('./DialogAddTodolist').default
  }
}
</script>
