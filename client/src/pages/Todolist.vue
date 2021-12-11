<template>
  <div class="q-px-md q-py-xs">
    <div class="q-gutter-sm row justify-center no-wrap">
      <div class="sidebar col-12 column">

        <div class="row justify-between items-center search-block">
          <div class="col-11">
            <q-input
              v-model="searchTodolist"
              class=""
              borderless
              rounded
              placeholder="Search"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-btn
              color="accent"
              icon="add"
              rounded
              padding="xs"
              @click="showTodolistDialog = true"
            />
          </div>
        </div>

        <div v-if="todolists.length" class="todolists">
          <q-list separator>
            <todo-list v-for="list in todolists" :key="list.id" :title="list.title" :todoitemsNumber="list.todoitems" />
          </q-list>
        </div>

        <div class="">
          <nothing-here
            label="No lists"
            icon="list"
          />
        </div>

        <dialog-add-todolist v-model="showTodolistDialog" />

      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import DialogAddTodolist from '../components/Todolists/DialogAddTodolist'

export default defineComponent({
  name: 'TodolistPage',
  components: { DialogAddTodolist },
  setup () {
    const $q = useQuasar()
    const $store = useStore()
    const $router = useRouter()

    const currentUser = computed(() => $store.state.auth.user)
    const todolists = $store.state.todolist.todolists

    onMounted(() => {
      if (!currentUser.value) {
        $router.push({ name: 'Login' })
      } else {
        const userId = currentUser.value.id
        $store.dispatch('todolist/fetchTodolists', userId).then((data) => {
          todolists.value = data.data
        }, (error) => {
          $q.notify(error.message)
        })
      }
    })

    const defaultTodolistName = ref('List')

    function addTodolist (addTodolistForm) {
      const newTodolist = Object.assign({}, addTodolistForm)
      console.log(newTodolist)
    }
    // const addTodolist = (e) => {
    //   const id = todolists.value.length
    //   const newList = {
    //     title: `List #${id}`,
    //     addedBy: currentUser.value.id
    //   }
    //   console.log(currentUser.value.token)
    //   $store.dispatch('todolist/addTodolist', newList).then((data) => {
    //     todolists.value = data.data
    //   }, (error) => {
    //     $q.notify(error.message)
    //   })
    // }

    return {
      searchTodolist: ref(''),
      todolists,
      defaultTodolistName,
      showTodolistDialog: ref(false),

      addTodolist
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  flex: 0 0 350px;
  max-width: 350px;
}
.lists-block {
}
.search-block {
  border-bottom: 1px solid $grey-4;
}
.todoitems {
  border-left: 1px solid $grey-4;
}

.todoitems-cover-img {
  position: relative;
  height: 15vw;
  max-height: 18vh;
}
</style>
