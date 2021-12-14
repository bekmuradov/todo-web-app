export function getTodolists (state) {
  return state.lists
}

export function getTasksFromList (state) {
  return state.listToView.todolist_items
}
