<template lang="html">
  <q-input
    filled
    dense
    :type="type"
    bg-color="backdrop"
    :placeholder="$trim(placeholder)"
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
