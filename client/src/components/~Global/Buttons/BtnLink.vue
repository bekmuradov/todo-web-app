<template lang="html">
  <span :class="`text-size-${textSize}`">
    {{ $trim(label) }}
  </span>
</template>

<script>
export default {
  props: {
    textSize: {
      type: String,
      default: '12'
    },
    label: String
  }
}
</script>
