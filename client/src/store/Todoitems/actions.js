import dbService from '../../services/dbService'

export function fetchTodoitems ({ commit, rootState }, todoListId) {
  const payload = {
    addedBy: rootState.auth.user.id,
    todoListId
  }
  return dbService.getAllTodoItems(payload).then(
    (response) => {
      commit('setTodoitems', response.data.data)
      return Promise.resolve(response.data.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}

export function addTodoitems ({ dispatch, commit }, payload) {
  return dbService.addManyTodoItems(payload).then(
    (response) => {
      dispatch('fetchTodoitems')
      return Promise.resolve(response.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}

export function addTodoitem ({ dispatch, commit }, payload) {
  const { todoListId } = payload
  return dbService.addOneTodoItem(payload).then(
    (response) => {
      dispatch('todolists/getTodolistById', todoListId, { root: true })
      return Promise.resolve(response.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}

export function deleteItem ({ dispatch, commit }, payload) {
  return dbService.deleteOneItem(payload).then(
    (response) => {
      dispatch('fetchTodoitems')
      return Promise.resolve(response.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}

export function todoIsComplete ({ dispatch, commit }, payload) {
  const { todoListId } = payload
  return dbService.updateTodoitem(payload).then(
    (response) => {
      dispatch('todolists/getTodolistById', todoListId, { root: true })
      return Promise.resolve(response.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}

export function generateLink ({ commit }, payload) {
  return dbService.generateMagicLink(payload).then(
    (response) => {
      commit('setMagicLink')
      return Promise.resolve(response.data)
    },
    (error) => {
      commit('setFailure')
      return Promise.reject(error)
    })
}
