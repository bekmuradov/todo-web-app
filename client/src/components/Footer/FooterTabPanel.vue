<template>
  <q-footer bordered class="bg-white text-primary">
    <q-tabs no-caps active-color="accent" indicator-color="transparent" class="text-grey">
      <q-route-tab default name="lists" label="Lists" :to="{ name: 'Lists' }" />
      <q-route-tab name="shared" label="Shared Todos" :to="{ name: 'Lists' }" />
      <q-route-tab name="account" label="Me" :to="{ name: 'Account' }" />
    </q-tabs>
  </q-footer>
</template>

<script>
export default {
}
</script>
