<template lang="html">
  <q-input
    borderless
    dense
    type="text"
    bg-color="backdrop"
    placeholder="Search"
    lazy-rules
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {
}
</script>
