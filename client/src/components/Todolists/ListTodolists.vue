<template lang="html">
  <todolist-card-item
    v-for="list in todolists"
    :key="list.id"
    :list="list"
    @click="store.commit('todolist/showEditTodolistDialog', true) && editTodolist(list)"
  />
  <dialog-edit-todolist ref="editDialog" :list="todolist" />
</template>

<script>
import { inject, computed, ref } from 'vue'

export default {
  setup () {
    const store = inject('store')
    const todolists = computed(() => store.state.todolist.todolists)
    const editDialog = ref(null)
    const todolist = ref(null)

    function editTodolist (list) {
      todolist.value = list
      editDialog.value.show()
    }

    return {
      store,
      todolists,
      todolist,
      editDialog,
      editTodolist
    }
  },
  components: {
    'todolist-card-item': require('components/Todolists/TodolistCardItem').default,
    'dialog-edit-todolist': require('components/Todolists/DialogEditTodolist').default
  }
}
</script>
