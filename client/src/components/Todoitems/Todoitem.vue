<template lang="html">
  <q-card
    flat
    class="overflow-hidden bg-grey-1"
  >
      <q-card-section horizontal>
        <q-card-section class="q-pa-none col-10">
          <q-item
            class="text-size-16 text-primary"
            :class="{ 'done': isDone }"
          >
            <q-item-section avatar>
              <q-checkbox
                color="grey-5"
                v-model="isDone"
              />
            </q-item-section>

            <q-item-section class="text-body1">
              {{ item.description }}
            </q-item-section>
          </q-item>
        </q-card-section>

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
                  <q-item-section @click="handleShare(item)">Share</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section @click="handleDelete(item)">Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </q-icon>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { inject, ref, toRefs, watch, defineComponent } from 'vue'
import { useQuasar, copyToClipboard } from 'quasar'

export default defineComponent({
  props: {
    item: Object
  },
  setup (props) {
    const $q = useQuasar()
    const store = inject('store')
    const { item } = toRefs(props)
    const isDone = ref(item.value.is_done === 'true')

    function updateTodoIsComplete () {
      const payload = {
        id: item.value.id,
        todoListId: item.value.todolist_id,
        addedBy: item.value.added_by,
        description: item.value.description,
        isDone: isDone.value
      }
      store.dispatch('todoitems/todoIsComplete', payload)
    }

    watch(isDone, updateTodoIsComplete)

    function handleShare (item) {
      // get id of todo item and user.id
      // then populate one time link on the server
      const payload = {
        todoitemId: item.id
      }
      // then copy to clipboard the link
      // and notify that link is copied and will expire in 24 hours
      store.dispatch('todoitems/generateLink', payload).then((res) => {
        copyToClipboard(res)
          .then(() => {
            $q.notify('Link copied! It will expire in 24 hours')
          })
          .catch(() => {
            $q.notify('Something is wrong!')
          })
      })
    }

    function handleDelete (item) {
      // get id of todo item
      store.dispatch('todoitems/deleteItem', item.id).then((data) => {
        const todolistId = item.todolist_id
        // once we removed todo items-> fetch again todo lists to update the DOM
        store.dispatch('todolists/getTodolistById', todolistId)
        $q.notify('Task deleted')
      }, (error) => {
        $q.notify(error.message)
      })
      // fetch again
    }
    return {
      isDone,
      handleShare,
      handleDelete
    }
  }
})
</script>

<style lang="scss" scoped>
  .done {
    .q-item__section {
      text-decoration: line-through;
      color: #bbb;
    }
  }
</style>
