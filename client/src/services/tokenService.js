import { LocalStorage } from 'quasar'

export default {
  getLocalRefreshToken () {
    const user = JSON.parse(LocalStorage.getItem('todo-app-user'))
    return user?.refreshToken
  },

  getLocalAccessToken () {
    const user = JSON.parse(LocalStorage.getItem('todo-app-user'))
    return user?.accessToken
  },

  updateLocalAccessToken (token) {
    const user = JSON.parse(LocalStorage.getItem('todo-app-user'))
    user.accessToken = token
    LocalStorage.set('todo-app-user', JSON.stringify(user))
  },

  getUser () {
    return JSON.parse(LocalStorage.getItem('todo-app-user'))
  },

  setUser (user) {
    LocalStorage.set('todo-app-user', JSON.stringify(user))
  },

  removeUser () {
    LocalStorage.remove('todo-app-user')
  }
}
