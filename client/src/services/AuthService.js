import { api } from 'boot/axios'
import TokenService from './tokenService'
import authHeader from './authHeader'

export default {
  register (credentials) {
    return api.post('/auth/register', credentials)
  },
  login (credentials) {
    return api.post('/auth/login', credentials).then(response => {
      if (response.data.data.token) {
        // set token in LocalStorage
        TokenService.setUser(response.data.data)
        // then set axios Auth header
        api.defaults.headers.common.Authorization = 'Bearer ' + response.data.data.token
      }
      return response.data.data
    })
  },
  async logout () {
    const res = await api({
      method: 'post',
      url: '/auth/logout',
      headers: authHeader()
    })
    TokenService.removeUser()
    return res
  }
}
