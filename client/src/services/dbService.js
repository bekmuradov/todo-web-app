import { api } from 'boot/axios'
import authHeader from './authHeader'

export default {
  getTodolists (id) {
    return api.get('/todolist/list', {
      headers: authHeader(),
      params: {
        id: id
      }
    })
  },

  getTodolist () {
    return api.get('/todolist/:id' + 'user', { headers: authHeader() })
  },

  addTodolist (data) {
    console.log(authHeader())
    const options = {
      headers: authHeader()
    }
    api.post('/todolist/create', { data: data }, options).then(res => {
      console.log(res)
    }, (err) => {
      console.error(err)
    })
  }
}
