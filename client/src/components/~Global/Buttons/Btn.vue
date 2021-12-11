<template lang="html">
  <q-btn
    :label="$trim(label)"
    :color="color"
    :class="{ 'full-width': fullWidth }"
    :type="type"
    :icon="icon"
    padding="5px 26px"
    no-caps
    unelevated
    class="my-btn"
  />
</template>

<script>
export default {
  props: {
    label: String,
    color: String,
    fullWidth: String,
    type: {
      type: String,
      default: 'button'
    },
    icon: String
  }
}
</script>
