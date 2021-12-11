<template lang="html">
  <q-input
    borderless
    dense
    :type="type"
    bg-color="backdrop"
    :placeholder="placeholder"
    lazy-rules
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
