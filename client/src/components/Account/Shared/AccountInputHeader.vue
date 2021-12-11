<template lang="html">
  <div class="text-center">
    <!-- <img src="../../../assets/hello-monster.jpg" alt=""> -->
    <div class="label q-pa-md text-h5 text-weight-bold">
      {{ $trim(label) }}
      <div v-if="subLabel">
        {{ $trim(subLabel) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    subLabel: String
  }
}
</script>
