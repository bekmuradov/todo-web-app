<template>
  <q-input
    filled
    dense
    :type="isPwd ? 'password' : 'text'"
    :color="color"
    :text-color="textColor"
    :bg-color="bgColor"
    placeholder="password"
    lazy-rules
    :rules="[val => !!val || 'Password is required']"
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    color: {
      type: String
    },
    bgColor: {
      type: String,
      default: 'backdrop'
    },
    textColor: {
      type: String,
      default: 'primary'
    }
  },
  setup () {
    return {
      isPwd: ref(true)
    }
  }
}
</script>
