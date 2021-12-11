<template lang="html">
  <!-- title input -->
  <!-- todo items input -->
  <!-- if todo items then list items -->
  <!-- save button -->
  <app-dialog
    v-model="showAddTodolistDialog"
    label="New list"
    @submit="createTodolist"
  >
    <template v-slot:title>
      <app-dialog-input
        v-model="addTodolistForm.title"
        placeholder="Title"
        class="q-mb-sm text-body1"
      />
    </template>

    <app-dialog-input
      v-model="addTodolistForm.newItem"
      placeholder="What needs to be done?"
      class="q-mb-sm"
      autofocus
      @keyup.enter="addTodoitem"
    />

    <app-dialog-checkbox
      v-for="item in addTodolistForm.todoitems"
      :key="item.id"
      :label="item.description"
      v-model="item.isDone"
      color="secondary"
    />

    <template v-slot:buttons>
      <btn
        label="Create"
        color="secondary"
        :disable="!addTodolistForm.title"
        type="submit"
      />
    </template>

  </app-dialog>
</template>

<script>
import { reactive, inject, computed } from 'vue'
import { uid } from 'quasar'

export default {
  setup () {
    const store = inject('store')

    const showAddTodolistDialog = computed({
      get () {
        return store.state.todolist.showAddTodolistDialog
      },
      set () {
        store.commit('todolist/showAddTodolistDialog', false)
      }
    })

    const addTodolistForm = reactive({
      id: uid(),
      title: '',
      newItem: '',
      todoitems: []
    })

    function addTodoitem () {
      if (addTodolistForm.newItem) {
        const task = {
          description: addTodolistForm.newItem,
          id: uid(),
          isDone: false,
          todoListId: addTodolistForm.id
        }
        addTodolistForm.todoitems.push(task)
        addTodolistForm.newItem = ''
      }
    }

    function createTodolist () {
      const newTodoList = Object.assign({}, addTodolistForm)
      store.commit('todolist/setTodolists', newTodoList)
      store.commit('todolist/showAddTodolistDialog', false)
    }

    return {
      showAddTodolistDialog,
      addTodolistForm,
      addTodoitem,
      createTodolist,
      store
    }
  }
}
</script>

<style lang="css" scoped>
</style>
