<template lang="html">
  <div class="bg-accent text-white q-pa-none restrain-600">
    <div class="text-h5 text-center">
      Not yet implemented
    </div>
    <q-img
      src="../../statics/error.jpg"
      class="error-image absolute-top"
    />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .error-image {
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    filter: grayscale($accent);
  }
</style>
