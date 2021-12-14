import { reactive } from 'vue'
import { LocalStorage } from 'quasar'

const user = JSON.parse(LocalStorage.getItem('todo-app-user'))
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null }
export default function () {
  return reactive(initialState)
}
