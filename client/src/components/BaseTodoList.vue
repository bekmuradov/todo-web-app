<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <q-input
          v-model="todolist"
        >
        <template v-slot:prepend>
           <q-icon name="place" />
           {{ title }}
         </template>

         <template v-slot:append>
            {{ todoitemsNumber }}
          </template>
       </q-input>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    title: {
      type: String,
      default: 'List'
    },
    todoitemsNumber: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onOKClick () {
      // emit "ok" event (with optional payload)
      // to trigger the Dialog plugin onOK() method
      // otherwise onCancel() will be called
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
