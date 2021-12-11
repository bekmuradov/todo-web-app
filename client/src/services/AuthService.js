import { api } from 'boot/axios'
import TokenService from './tokenService'

export default {
  register (credentials) {
    return api.post('/auth/register', credentials)
  },
  login (credentials) {
    return api.post('/auth/login', credentials).then(response => {
      if (response.data.data.token) {
        TokenService.setUser(response.data.data)
      }
      return response.data.data
    })
  },
  logout () {
    TokenService.removeUser()
  }
}
