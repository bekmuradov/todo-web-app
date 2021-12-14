<template lang="html">
  <q-dialog
    class="app-dialog"
    :full-width="$q.screen.lt.sm"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-backdrop q-pt-md" flat>
      <q-form @submit="$emit('submit')">

        <q-card-section class="row items-center q-pb-none q-pt-none">
          <slot name="title"></slot>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <slot />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <slot name="buttons"></slot>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  emits: ['submit']
}
</script>
