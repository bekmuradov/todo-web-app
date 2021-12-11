import { boot } from 'quasar/wrappers'

export default boot(async ({ app }) => {
  app.config.globalProperties.$trim = (str) => {
    return str.trim()
  }
})
