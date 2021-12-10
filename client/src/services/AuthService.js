import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'

export default {
  register (credentials) {
    return api.post('/auth/register', credentials)
  },
  login (credentials) {
    return api.post('/auth/login', credentials).then(response => {
      if (response.data.data.token) {
        LocalStorage.set('todo-app-user', JSON.stringify(response.data.data))
      }
      return response.data.data
    })
  },
  getUserToken () {
    const user = JSON.parse(LocalStorage.getItem('todo-app-user'))
    if (user && user.token) {
      return { token: user.token }
    } else {
      return {}
    }
  },
  logout () {
    LocalStorage.remove('todo-app-user')
  }
}
