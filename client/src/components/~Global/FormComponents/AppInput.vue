<template lang="html">
  <q-input
    borderless
    dense
    :type="type"
    bg-color="white"
    :placeholder="placeholder"
    lazy-rules
    class="new-todo"
  />
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style media="screen">
  .q-field__native {
    padding-left: 15px;
  }
</style>
