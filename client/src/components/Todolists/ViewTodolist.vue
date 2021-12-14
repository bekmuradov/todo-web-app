<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm row justify-center items-center restrain-600">
      <div class="col-12">
        <div class="text-center text-h5">
          {{ todolist.title }}
          <span class="text-grey-5 q-px-md">{{ remainingTasks.length + ' tasks left' }}</span>
        </div>
        <!-- input for todo items -->
        <app-input
          v-model="newTask"
          placeholder="What needs to be done?"
          class="q-my-sm"
          autofocus
          @blur="addTask"
          @keyup.enter="addTask"
        />
      </div>
      <!-- tasks panels ['ALL', 'REMAINING', 'COMPLETED'] -->
       <div class="q-gutter-y-md col-12">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            no-caps
            class="bg-transparent text-grey-6"
          >
            <q-tab name="all" label="All" />
            <q-tab name="active" label="Active" />
            <q-tab name="completed" label="Completed" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="all">
              <todoitem
                v-for="item in todoitems"
                :key="item.id"
                :item="item"
              />
            </q-tab-panel>
            <q-tab-panel name="active">
              <todoitem
                v-for="item in remainingTasks"
                :key="item.id"
                :item="item"
              />
            </q-tab-panel>
            <q-tab-panel name="completed">
              <todoitem
                v-for="item in completedTasks"
                :key="item.id"
                :item="item"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'TodolistPage',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return store.dispatch('todolists/getTodolistById', currentRoute.params.todolistId)
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const todolistId = Number(route.params.todolistId)
    const todolist = computed(() => store.state.todolists.listToView)
    const todoitems = computed(() => store.getters['todolists/getTasksFromList'])
    const getTodolist = () => {
      store.dispatch('todolists/getTodolistById', todolistId)
    }
    onMounted(getTodolist)
    const newTask = ref('')

    function addTask () {
      const value = newTask.value && newTask.value.trim()
      if (!value) {
        return
      }
      const task = {
        description: newTask.value,
        isDone: false,
        todoListId: todolistId,
        addedBy: store.state.auth.user.id
      }
      store.dispatch('todoitems/addTodoitem', task)
      getTodolist()
      newTask.value = ''
    }

    const remainingTasks = computed(() => todoitems.value.filter(task => task.is_done === 'false'))
    const completedTasks = computed(() => todoitems.value.filter(task => task.is_done === 'true'))

    return {
      todoitems,
      todolist,
      newTask,
      addTask,
      tab: ref('all'),
      remainingTasks,
      completedTasks

    }
  },
  components: {
    todoitem: require('components/Todoitems/Todoitem').default
  }
})
</script>
