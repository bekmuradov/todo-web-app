import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import dbService from '../services/dbService'
import auth from './Auth'
import todolists from './Todolists'
import todoitems from './Todoitems'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      auth: auth,
      todolists: todolists,
      todoitems: todoitems
    },
    state: {
      publicTask: null
    },
    mutations: {
      setPublicTask (state, payload) {
        state.publicTask = payload
      }
    },
    actions: {
      fetchPublicTask ({ commit }, token) {
        return dbService.getSharedTask(token).then(
          (response) => {
            commit('setPublicTask', response.data.data)
            return Promise.resolve(response.data.data)
          })
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
