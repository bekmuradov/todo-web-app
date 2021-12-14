export function setTodolists (state, payload) {
  state.lists = payload
}

export function setTodolist (state, payload) {
  state.listToView = payload
}

export function showAddTodolistDialog (state, payload) {
  state.showAddTodolistDialog = payload
}

export function showEditTodolistDialog (state, payload) {
  state.showEditTodolistDialog = payload
}

export function setEditList (state, payload) {
  state.editListForDialog = payload
}
