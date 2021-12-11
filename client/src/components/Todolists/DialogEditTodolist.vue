<template lang="html">

  <app-dialog
    v-model="showEditTodolistDialog"
    @submit="editTodolist"
    transition-show="slide-up"
    transition-hide="slide-down"
    :maximized="$q.screen.lt.md ? true: false"
  >
    <template v-slot:title>
      <app-dialog-input
        v-model="editTodolistForm.title"
        :placeholder="editTodolistForm.title"
        class="q-mb-sm"
      />
    </template>

    <app-dialog-input
      v-model="editTodolistForm.newItem"
      placeholder="What needs to be done?"
      class="q-mb-sm"
      autofocus
      @keyup.enter="addTodoitem"
    />

    <app-dialog-checkbox
      v-for="item in editTodolistForm.todoitems"
      :key="item.id"
      :label="item.description"
      color="secondary"
      @click="editTodoitem(item)"
    />

    <template v-slot:buttons>
      <btn
        label="Save"
        color="secondary"
        type="submit"
      />
    </template>
  </app-dialog>
</template>

<script>
import { reactive, inject, computed } from 'vue'
import { uid } from 'quasar'

export default {
  setup (props) {
    const store = inject('store')

    const showEditTodolistDialog = computed({
      get () {
        return store.state.todolist.showEditTodolistDialog
      },
      set () {
        store.commit('todolist/showEditTodolistDialog', false)
      }
    })

    const editTodolistForm = reactive({
      id: '',
      title: '',
      newItem: '',
      todoitems: []
    })

    function addTodoitem () {
      if (editTodolistForm.newItem) {
        const task = {
          description: editTodolistForm.newItem,
          id: uid(),
          isDone: false,
          todoListId: editTodolistForm.id
        }
        editTodolistForm.todoitems.push(task)
        editTodolistForm.newItem = ''
      }
    }

    function editTodoitem (item) {
      console.log(item)
    }

    function updateTodolist () {
      const editedTodoList = Object.assign({}, editTodolistForm)
      store.commit('todolist/setTodolists', editedTodoList)
      store.commit('todolist/showEditTodolistDialog', false)
    }

    return {
      showEditTodolistDialog,
      editTodolistForm,
      addTodoitem,
      editTodoitem,
      updateTodolist,
      store
    }
  }
}
</script>

<style lang="css" scoped>
</style>
