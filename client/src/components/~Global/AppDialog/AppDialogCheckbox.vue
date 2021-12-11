<template lang="html">
  <q-item tag="label" v-ripple>
    <q-item-section avatar>
      <q-checkbox
        v-model="todoitem"
        :color="color"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    label: String,
    color: {
      type: String,
      default: 'primary'
    }
  },
  setup () {
    return {
      todoitem: ref('')
    }
  }
}
</script>
