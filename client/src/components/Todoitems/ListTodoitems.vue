<template lang="html">
  <active-todoitem
    v-for="item in todoitems"
    :key="item.id"
    :item="item"
  />
</template>

<script>
import { inject, toRefs, defineComponent, watch } from 'vue'

export default defineComponent({
  props: {
    todoitems: Array
  },
  setup (props) {
    const store = inject('store')
    const { todoitems } = toRefs(props)
    watch(todoitems, () => {
      console.log(todoitems)
    })
    return {
      store
    }
  },
  components: {
    'active-todoitem': require('components/Todoitems/ActiveTodoitem').default
  }
})
</script>
