<template>
  <div class="q-pa-md">
    <div class="row justify-between items-center" style="border-bottom: 1px solid grey;">
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
          @click="addTodolist"
        />

      </div>
    </div>

    <div class="todolists">
      <q-list separator>
        <q-item clickable v-ripple v-for="list in todolists" :key="list.id">
          <q-item-section>
            <q-input
              class=""
              borderless
              rounded
              :placeholder="list.title"
            >
              <template v-slot:prepend>
                <q-icon name="list" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const $store = useStore()
    const $router = useRouter()

    const currentUser = computed(() => $store.state.auth.user)

    onMounted(() => {
      if (!currentUser.value) {
        $router.push({ name: 'Login' })
      } else {
        const userId = currentUser.value.id
        $store.dispatch('todolist/fetchTodolists', userId).then((data) => {
          console.log(data)
        }, (error) => {
          console.log(error)
        })
      }
    })

    const defaultTodolistName = ref('List')
    const todolists = ref([
      {
        title: 'List #1',
        id: 1
      },
      {
        title: 'List #2',
        id: 2
      },
      {
        title: 'List #3',
        id: 3
      }
    ])
    const addTodolist = (e) => {
      const id = todolists.value.length
      const list = {
        title: `List #${id}`,
        id: id
      }
      todolists.value.push(list)
    }
    return {
      searchTodolist: ref(''),
      todolists,
      defaultTodolistName,

      addTodolist
    }
  }
})
</script>

<style lang="css" scoped>
</style>
