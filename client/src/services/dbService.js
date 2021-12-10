import { api } from 'boot/axios'
import authHeader from './authHeader'

export default {
  getTodolists () {
    return api.get('/todolist/list' + 'user', { headers: authHeader() })
  },

  getTodolist () {
    return api.get('/todolist/:id' + 'user', { headers: authHeader() })
  },

  addTodolist (data) {
    return api.post('/todolist/:id' + 'user', { headers: authHeader() }, data)
  }
}
