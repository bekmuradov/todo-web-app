<template>
  <q-layout view="lHh lpr lFf" class="rounded-borders">
    <q-header bordered class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title class="text-center">
        <!-- <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="text-center"> -->
          <span class="q-ml-sm">Todos</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <footer-tab-panel />

    <q-page-container class="q-pa-none q-ma-none">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TodosLayout',
  setup () {
    const $store = useStore()
    const $router = useRouter()
    const leftDrawerOpen = ref(false)
    const search = ref('')

    const loggedIn = computed(() => $store.state.auth.status.loggedIn)

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function handleLogout () {
      $store.dispatch('auth/logout')
      $router.push({ name: 'Login' })
    }

    return {
      leftDrawerOpen,
      search,
      loggedIn,

      links1: [
        { icon: 'home', text: 'Home', to: 'Home' },
        { icon: 'list', text: 'Lists', to: 'Lists' },
        { icon: 'people', text: 'Shared Todos', to: '' }
      ],

      toggleLeftDrawer,
      handleLogout
    }
  },
  components: {
    'footer-tab-panel': require('../components/Footer/FooterTabPanel').default
  }
}
</script>

<style lang="sass">
</style>
