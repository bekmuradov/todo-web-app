import AuthService from '../../services/AuthService'

export function register ({ commit }, credentials) {
  return AuthService.register(credentials).then(
    response => {
      commit('registerSuccess')
      return Promise.resolve(response.data)
    },
    error => {
      commit('registerFailure')
      return Promise.reject(error)
    })
}

export function login ({ commit }, credentials) {
  return AuthService.login(credentials).then(
    user => {
      commit('loginSuccess', user)
      return Promise.resolve(user)
    },
    error => {
      commit('loginFailure')
      return Promise.reject(error)
    })
}

export function logout ({ commit }) {
  AuthService.logout()
  commit('logout')
}
