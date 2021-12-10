
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/register', name: 'Register', component: () => import('pages/Register.vue') },
      { path: '/login', name: 'Login', component: () => import('pages/Login.vue') },
      { path: '/lists', name: 'Lists', component: () => import('pages/Todolist.vue') }
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
