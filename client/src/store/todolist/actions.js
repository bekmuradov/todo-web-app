import dbService from '../../services/dbService'

export function fetchTodolists ({ commit }, payload) {
  return dbService.getTodolists(payload).then(
    response => {
      commit('setTodolists', response.data)
      return Promise.resolve(response.data)
    },
    error => {
      commit('setFailure')
      return Promise.reject(error)
    })
}

export function addTodolist ({ commit }, payload) {
  return dbService.addTodolist(payload).then(
    response => {
      commit('setTodolists', response.data)
      return Promise.resolve(response.data)
    },
    error => {
      commit('setFailure')
      return Promise.reject(error)
    })
}
