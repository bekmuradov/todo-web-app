import MainLayout from 'layouts/MainLayout.vue'
import Welcome from 'pages/Welcome.vue'

const Register = () => import('components/Account/AccountRegister.vue')
const Login = () => import('components/Account/AccountLogin.vue')
const Account = () => import('components/Account/AccountLogout.vue')
const TodoList = () => import('components/Todolists/Index.vue')
const SharedTodoitems = () => import('components/Todoitems/SharedTodoitems.vue')
const ViewTodolist = () => import('components/Todolists/ViewTodolist.vue')
const ViewSharedTask = () => import('pages/ViewSharedTask.vue')

const routes = [
  {
    path: '/',
    component: Welcome,
    name: Welcome
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/public/todoitem',
    name: 'ViewSharedTask',
    component: ViewSharedTask
  },
  {
    path: '/me',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'lists',
        name: 'Lists',
        component: TodoList
      },
      {
        path: 'shared-todos',
        name: 'SharedTodoitems',
        component: SharedTodoitems
      },
      {
        path: 'account',
        name: 'Account',
        component: Account
      },
      {
        path: '/list/:todolistId',
        name: 'ViewTodolist',
        component: ViewTodolist
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
