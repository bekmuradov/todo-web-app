<template lang="html">
  <app-dialog
    v-model="showAddTodolistDialog"
    :maximized="$q.screen.lt.sm ? true: false"
    @hide="resetTodolistForm"
  >
    <!-- Input for todo list title -->
    <template v-slot:title>
      <app-input
        v-model="addTodolistForm.title"
        placeholder="Title"
        class="q-mb-sm text-body1"
      />
    </template>
    <!-- input for new todo items -->
    <app-input
      v-model="addTodolistForm.newItem"
      placeholder="What needs to be done?"
      class="q-mb-sm"
      autofocus
      @blur="addTodoitem"
      @keyup.enter="addTodoitem"
    />
    <!-- show added todo items -->
    <q-card
      flat
      class="overflow-hidden bg-grey-1"
      v-for="task in addTodolistForm.todoitems"
      :key="task.description"
    >
      <q-card-section horizontal>
        <q-card-section class="q-pa-none col-10">
          <q-item
            @click="task.isDone = !task.isDone"
            :class="{ 'done': task.isDone }"
            class="text-size-16 text-primary"
            clickable
            v-ripple
            active
          >
            <q-item-section avatar>
              <q-checkbox
                v-model="task.isDone"
                color="grey-5"
                class="no-pointer-events"
              />
            </q-item-section>

            <q-item-section class="text-body1">
              {{ task.description }}
            </q-item-section>

          </q-item>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-none col">
          <q-btn
            @click.stop="removeTodoitem(task)"
            size="sm"
            color="grey-6 fit"
            flat
            icon="delete"
          />
      </q-card-section>
    </q-card-section>
  </q-card>

    <!-- create todo list button -->
    <template v-slot:buttons>
      <btn
        label="Create"
        color="secondary"
        :disable="!addTodolistForm.title"
        class=""
        round
        @click="createTodolist"
      />
    </template>

  </app-dialog>
</template>

<script>
import { reactive, inject, computed } from 'vue'

export default {
  setup () {
    const store = inject('store')

    const showAddTodolistDialog = computed({
      get () {
        return store.state.todolists.showAddTodolistDialog
      },
      set () {
        store.commit('todolists/showAddTodolistDialog', false)
      }
    })

    const addTodolistForm = reactive({
      title: '',
      newItem: '',
      todoitems: []
    })

    function removeTodoitem (task) {
      const index = addTodolistForm.todoitems.indexOf(task)
      addTodolistForm.todoitems.splice(index, 1)
    }

    function addTodoitem () {
      const value = addTodolistForm.newItem && addTodolistForm.newItem.trim()
      if (!value) {
        return
      }
      const task = {
        description: addTodolistForm.newItem,
        isDone: false,
        todoListId: null,
        addedBy: store.state.auth.user.id
      }
      addTodolistForm.todoitems.push(task)
      addTodolistForm.newItem = ''
    }

    function createTodolist () {
      const data = Object.assign({}, addTodolistForm)
      const newTodoList = {
        title: data.title,
        addedBy: store.state.auth.user.id
      }
      store.dispatch('todolists/addTodolist', newTodoList).then((data) => {
        // if there are any todoitems in the list
        if (addTodolistForm.todoitems.length) {
          // get the id of newly created todo list (succesfull response from the server)
          const newTodoListId = data.data.id
          // create array of todoitems with the relation by todo list id
          const todoitems = addTodolistForm.todoitems.map(item => {
            const props = {
              todoListId: newTodoListId
            }
            return Object.assign(item, props)
          })
          // then add all todoitems
          bulkInsertTodoItems(todoitems)
        }
        // reset the state
        resetTodolistForm()
      }, (error) => {
        console.error(error)
      })
      // commit so dialog will close
      store.commit('todolists/showAddTodolistDialog', false)
    }

    function bulkInsertTodoItems (items) {
      store.dispatch('todoitems/addTodoitems', items).then((data) => {
        // once we added todo items -> fetch again todo lists to update the DOM
        store.dispatch('todolists/fetchTodolists')
      }, (error) => {
        console.error(error)
      })
    }

    function resetTodolistForm () {
      addTodolistForm.title = ''
      addTodolistForm.newItem = ''
      addTodolistForm.todoitems = []
    }

    return {
      showAddTodolistDialog,
      addTodolistForm,
      addTodoitem,
      createTodolist,
      store,
      bulkInsertTodoItems,
      removeTodoitem,
      resetTodolistForm
    }
  }
}
</script>

<style lang="scss" scoped>
  .done {
    .q-item__section {
      text-decoration: line-through;
      color: #bbb;
    }
  }
</style>
