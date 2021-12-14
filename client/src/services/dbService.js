import { api } from 'boot/axios'
import authHeader from './authHeader'

export default {
  // TODO LISTS
  async getAll (userId) {
    const params = {
      headers: authHeader(),
      params: {
        id: userId
      }
    }
    return await api.get('/todolist/list', params)
  },

  async getOne (todolistId) {
    const res = await api({
      method: 'get',
      url: `/todolist/${todolistId}`,
      headers: authHeader()
    })
    return res
  },

  async addOne (data) {
    const res = await api({
      method: 'post',
      url: '/todolist/create',
      headers: authHeader(),
      data: data
    })
    return res
  },

  async deleteOne (todolistId) {
    const res = await api({
      method: 'delete',
      url: '/todolist/' + todolistId,
      headers: authHeader()
    })
    return res
  },

  // TODO LIST ITEMS
  async addManyTodoItems (data) {
    const res = await api({
      method: 'post',
      url: '/todolistitem/create-bulk',
      headers: authHeader(),
      data: data
    })
    return res
  },

  async addOneTodoItem (data) {
    const res = await api({
      method: 'post',
      url: '/todolistitem/create',
      headers: authHeader(),
      data: data
    })
    return res
  },

  async getAllTodoItems (data) {
    return await api.get('/todolistitem/list', {
      headers: authHeader(),
      params: {
        addedBy: data.addedBy,
        todoListId: data.todoListId
      }
    })
  },

  async deleteOneItem (todoitemId) {
    const res = await api({
      method: 'delete',
      url: '/todolistitem/' + todoitemId,
      headers: authHeader()
    })
    return res
  },

  async updateTodoitem (data) {
    const { id } = data
    const res = await api({
      method: 'put',
      url: `/todolistitem/${id}`,
      headers: authHeader(),
      data: data
    })
    return res
  },

  async generateMagicLink (data) {
    const res = await api({
      method: 'post',
      url: '/public/generate-magic-link',
      headers: authHeader(),
      data: data
    })
    return res
  },

  async getSharedTask (token) {
    const res = await api({
      method: 'get',
      url: '/public/todoitem',
      headers: authHeader(),
      params: {
        token: token
      }
    })
    return res
  }
}
