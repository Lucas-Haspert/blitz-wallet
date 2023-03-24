import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RecordView from '../views/RecordView.vue'
import ExchangesView from '../views/ExchangesView.vue'

const routes = [
  {
    path: '/', name: 'home', component: HomeView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('isLogged') === null || !localStorage.getItem('isLogged')) {
        return { name: 'login' }
      }
    }
  },
  {
    path: '/login', name: 'login', component: LoginView,
    beforeEnter: () => {
      // Redirect to home if the user is already logged.
      if (localStorage.getItem('isLogged')) {
        return { name: 'home' }
      }
    }
  },
  {
    path: '/record', name: 'record', component: RecordView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('isLogged') === null || !localStorage.getItem('isLogged')) {
        return { name: 'login' }
      }
    }
  },
  {
    path: '/exchanges', name: 'exchanges', component: ExchangesView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('isLogged') === null || !localStorage.getItem('isLogged')) {
        return { name: 'login' }
      }
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
