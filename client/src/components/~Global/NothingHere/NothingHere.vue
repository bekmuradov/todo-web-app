<template lang="html">
  <div class="absolute-center text-center">
    <q-icon
      :name="icon"
      size="100px"
      color="light"
    />
    <div class="text-size-21 text-light">
      {{ $trim(label) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    icon: String
  }
}
</script>
