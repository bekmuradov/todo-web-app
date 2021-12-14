<template lang="html">
  <q-card
    flat
    bordered
    class="border-rounded overflow-hidden bg-grey-1 todolist-card"
  >
    <q-card-section horizontal>
      <q-card-section class="q-pa-none col-10">
        <q-item
          @click="navigateToListPage(list.id)"
          class="text-size-16 text-primary"
          clickable
          v-ripple
          active
        >
          <q-item-section class="text-body1">
            {{ list.title }}
          </q-item-section>

          <q-item-section side>
            <!-- show only remaining tasks -->
            {{ list.todolist_items.filter(task => task.is_done === 'false').length }}
          </q-item-section>

          <q-item-section avatar>
            <q-icon color="primary" name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="q-pa-none col">
        <q-icon
          class="no-border-radius fit cursor-pointer"
          size="sm"
          color="grey-6"
          flat
          name="more_vert"
        >
          <q-menu cover auto-close>
            <q-list>
              <q-item clickable>
                <q-item-section @click="navigateToListPage(list.id)">Edit list</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section @click="handleDelete(list)">Delete list</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
      </q-icon>
    </q-card-section>
  </q-card-section>
  </q-card>
</template>

<script>
import { inject, computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  props: {
    list: Object
  },
  setup () {
    const $q = useQuasar()
    const store = inject('store')
    const router = useRouter()

    const todolists = computed(() => store.state.todolists.lists)

    function handleDelete (list) {
      $q.dialog({
        title: 'Confirm',
        message: 'Realy delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        store.dispatch('todolists/deleteTodolist', list.id).then((data) => {
          $q.notify('Todo list deleted')
        }, (error) => {
          $q.notify(error.message)
        })
      })
    }

    function navigateToListPage (id) {
      store.dispatch('todolists/getTodolistById', id)
      router.push({ name: 'ViewTodolist', params: { todolistId: id } })
    }

    return {
      store,
      todolists,
      handleDelete,
      navigateToListPage
    }
  }
})
</script>

<style media="screen">
  .todolist-card {
    padding: 5px;
    margin: 5px;
  }
</style>
