<template lang="html">
  <todolist-dialog-item
    v-for="item in editTodolistForm.todolist_items"
    :key="item.id"
    :item="item"
    padding
  />
  <dialog-edit-todolist ref="editDialog" :list="todolist" />
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
