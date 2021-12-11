import { boot } from 'quasar/wrappers'
import axios from 'axios'
import TokenService from '../services/tokenService'

const api = axios.create({ baseURL: 'http://localhost:8081/api/v1' })
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// axios interceptors for request
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken()
    if (token) {
      config.headers['x-access-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

// axios interceptors for response
// api.interceptors.response.use((res) => {
//     return res
//   },
//   async (err) => {
//     const originalConfig = err.config
//
//     if (originalConfig.url !== '/auth/login' && err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true
//
//         try {
//           const rs = await axiosInstance.post('/auth/refreshtoken', {
//             refreshToken: TokenService.getLocalRefreshToken(),
//           })
//
//           const { accessToken } = rs.data
//
//           store.dispatch('auth/refreshToken', accessToken)
//           TokenService.updateLocalAccessToken(accessToken)
//
//           return axiosInstance(originalConfig)
//         } catch (_error) {
//           return Promise.reject(_error)
//         }
//       }
//     }
//
//     return Promise.reject(err)
//   })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
})

export { api }
