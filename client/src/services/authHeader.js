import { LocalStorage } from 'quasar'

export default function authHeader () {
  const user = JSON.parse(LocalStorage.getItem('todo-app-user'))
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token }
  } else {
    return {}
  }
}
