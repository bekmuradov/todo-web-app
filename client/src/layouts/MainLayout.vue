<template>
  <q-layout view="lHh lpr lFf" class="rounded-borders">
    <q-header bordered class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title class="text-center">
        <!-- <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="text-center"> -->
          <span class="q-ml-sm text-weight-bold">ToDos</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <footer-tab-panel />

    <q-page-container class="q-pa-none q-ma-none">
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'TodosLayout',
  components: {
    'footer-tab-panel': require('../components/Footer/FooterTabPanel').default
  }
}
</script>
