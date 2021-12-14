import dbService from '../../services/dbService'

export function fetchTodolists ({ commit, rootState }) {
  const userId = rootState.auth.user.id
  return dbService.getAll(userId).then(
    (response) => {
      commit('setTodolists', response.data.data)
      return Promise.resolve(response.data.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}

export function getTodolistById ({ commit }, payload) {
  return dbService.getOne(payload).then(
    (response) => {
      commit('setTodolist', response.data.data)
      return Promise.resolve(response.data.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}

export function addTodolist ({ commit }, payload) {
  return dbService.addOne(payload).then(
    (response) => {
      // dispatch('fetchTodolists')
      return Promise.resolve(response.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}

export function deleteTodolist ({ dispatch, commit }, payload) {
  return dbService.deleteOne(payload).then(
    (response) => {
      dispatch('fetchTodolists')
      return Promise.resolve(response.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}
