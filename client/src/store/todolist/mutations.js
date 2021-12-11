export function setTodolists (state, payload) {
  state.todolists.push(payload)
}

export function showAddTodolistDialog (state, payload) {
  state.showAddTodolistDialog = payload
}

export function showEditTodolistDialog (state, payload) {
  state.showEditTodolistDialog = payload
}
