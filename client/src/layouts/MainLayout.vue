<template>
  <q-layout view="lHh LpR lff" class="bg-grey-2">
    <q-header bordered class="bg-grey-2 text-grey-8" height-hint="64">
      <q-toolbar class="" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mx-none"
        />

        <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap">
          <span class="q-ml-sm">Todos</span>
        </q-toolbar-title>

        <q-space />

        <!-- <q-input class="GPL__toolbar-input" dense standout="bg-primary" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input> -->

        <q-space />

        <div v-if="!loggedIn" class="q-gutter-sm row items-center no-wrap">
          <q-btn label="Login" :to="{ name: 'Login' }" no-caps class="my-btn" color="accent" />
          <q-btn label="Register" :to="{ name: 'Register' }" type="submit" text-color="accent" class="my-btn" no-caps flat />
        </div>
        <div v-else class="q-gutter-sm row items-center no-wrap">
          <q-btn label="Logout" no-caps class="my-btn" color="accent" @click="handleLogout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="200"
      :breakpoint="400"
      class="bg-grey-2"
    >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding class="text-grey-8">
        <q-item
          v-for="link in links1"
          :key="link.text"
          :to="{ name: link.to }"
          v-ripple
          clickable
          class=""
          >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset class="q-my-sm" />
      </q-list>
    </q-scroll-area>

    <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
        <div class="text-weight-bold">Razvan Stoenescu</div>
        <div>@rstoenescu</div>
      </div>
    </q-img>
  </q-drawer>

    <q-page-container class="q-pa-none q-ma-none">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TodosLayout',

  setup () {
    const $store = useStore()
    const leftDrawerOpen = ref(false)
    const search = ref('')

    const loggedIn = computed(() => $store.state.auth.status.loggedIn)

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function handleLogout () {
      $store.dispatch('auth/logout')
    }

    return {
      leftDrawerOpen,
      search,
      loggedIn,

      links1: [
        { icon: 'list', text: 'Lists', to: 'Lists' },
        { icon: 'people', text: 'Shared Todos', to: '' }
      ],

      toggleLeftDrawer,
      handleLogout
    }
  }
}
</script>

<style lang="sass">
</style>
