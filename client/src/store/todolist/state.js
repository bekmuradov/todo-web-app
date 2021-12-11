import { reactive } from 'vue'

export default function () {
  return reactive({
    todolists: [],
    showAddTodolistDialog: false,
    showEditTodolistDialog: false
  })
}
