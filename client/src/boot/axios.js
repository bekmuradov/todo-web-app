import { boot } from 'quasar/wrappers'
import axios from 'axios'
// import TokenService from '../services/tokenService'

const api = axios.create({ baseURL: 'http://localhost:8081/api/v1' })
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// api.defaults.headers.common.Authorization = 'Bearer ' + TokenService.getLocalAccessToken()

export default boot(({ app, store }) => {
  app.config.globalProperties.$api = api

  api.interceptors.response.use((res) => { return res },
    async (err) => {
      const originalConfig = err.config
      if (originalConfig.url !== '/auth/login' && err.response) {
        // Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          // store.dispatch('auth/logout')
        }
      }
      return Promise.reject(err)
    })
})

export { api }
