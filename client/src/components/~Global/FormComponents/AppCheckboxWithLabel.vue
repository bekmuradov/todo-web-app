<template lang="html">
  <div class="q-gutter-sm">
    <q-checkbox
      :label="label"
      :checked="checked"
      @input="(event) => $emit('update:checked',event.target.checked)"
    />
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
  props: {
    label: String,
    color: {
      type: String,
      default: 'grey'
    },
    checked: {
      type: Boolean
    }
  },
  emits: ['update:checked'],
  setup (props) {
    function onChange (val, evt) {
      console.log(val, evt)
    }
    return {
      isDone: ref(props.val),
      onChange
    }
  }
})
</script>
