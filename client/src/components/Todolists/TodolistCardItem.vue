<template lang="html">
  <q-card
    flat
    bordered
    v-touch-pan.mouse.prevent="moveItem"
    class="border-rounded overflow-hidden bg-grey-1 todolist-card"
    :style="`transform: translateX(${itemOffser}px); transition: transform ${transitionDuration}s`"
    @mouseup="handleTouchEnd"
    @touchend="handleTouchEnd"
    @click="showList(list.id) && store.commit('todolist/showEditTodolistDialog', true)"
  >
    <q-card-section horizontal>
      <q-card-section class="q-pa-none col-10">
        <q-item
          @click="storeShowTodolistItems"
          class="text-size-16 text-primary"
          clickable
          v-ripple
          active
        >
          <q-item-section class="text-body1">
            {{ list.title }}
          </q-item-section>

          <q-item-section side>
            {{ list.todoitems.length }}
          </q-item-section>

          <q-item-section avatar>
            <q-icon color="primary" name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="q-pa-none col">
        <q-btn
          class="no-border-radius fit"
          round
          color="primary"
          flat
        >
        <q-icon name="more_vert" size="32px" />
      </q-btn>
    </q-card-section>
  </q-card-section>
  </q-card>
  <dialog-edit-todolist />
</template>

<script>
import { inject, computed } from 'vue'

export default {
  props: {
    list: Object
  },
  setup () {
    const store = inject('store')
    // const router = inject('router')

    const todolists = computed(() => store.state.todolist.todolists)

    function handleEdit () {
      // const id = props.id
    }

    function handleDelete () {
      // const id = props.id
    }

    function showList (id) {
      const list = todolists.value.find(list => list.id === id)
      console.log(list)
    }

    return {
      store,
      todolists,
      handleEdit,
      handleDelete,
      showList
    }
  },
  components: {
    'dialog-edit-todolist': require('components/Todolists/DialogEditTodolist').default
  }
}
</script>

<style media="screen">
  .todolist-card {
    padding: 5px;
    margin: 5px;
  }
</style>
