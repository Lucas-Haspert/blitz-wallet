import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RecordView from '../views/RecordView.vue'
import ExchangeView from '../views/ExchangeView.vue'
import AccountView from '../views/AccountView.vue'
import SummaryView from '../views/SummaryView.vue'
import TransactionView from '../views/TransactionView.vue'
import ForexView from '../views/ForexView.vue'
import InvestmentsView from '../views/InvestmentsView.vue'

const routes = [
  {
    path: '/', name: 'home', component: HomeView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  {
    path: '/login', name: 'login', component: LoginView,
    beforeEnter: () => {
      // Redirect to home if the user is already logged.
      if (localStorage.getItem('logged')) {
        return { name: 'home' }
      }
    }
  },
  {
    path: '/record', name: 'record', component: RecordView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  {
    path: '/exchange', name: 'exchange', component: ExchangeView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  {
    path: '/account', name: 'account', component: AccountView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  {
    path: '/summary', name: 'summary', component: SummaryView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  {
    path: '/transaction', name: 'transaction', component: TransactionView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  {
    path: '/forex', name: 'forex', component: ForexView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  {
    path: '/investments', name: 'investments', component: InvestmentsView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
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
