import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RecordView from '../views/RecordView.vue'
import ExchangesView from '../views/ExchangesView.vue'
import AccountView from '../views/AccountView.vue'
import SummaryView from '../views/SummaryView.vue'
import TransactionView from '../views/TransactionView.vue'
import CoinsView from '../views/CoinsView.vue'


const routes = [
  // Home
  {
    path: '/', name: 'home', component: HomeView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  // Login
  {
    path: '/login', name: 'login', component: LoginView,
    beforeEnter: () => {
      // Redirect to home if the user is already logged.
      if (localStorage.getItem('logged')) {
        return { name: 'home' }
      }
    }
  },
  // Record
  {
    path: '/record', name: 'record', component: RecordView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  // Exchanges
  {
    path: '/exchanges', name: 'exchanges', component: ExchangesView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  // Account
  {
    path: '/account', name: 'account', component: AccountView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  // Summary
  {
    path: '/summary', name: 'summary', component: SummaryView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  // Transaction
  {
    path: '/transaction', name: 'transaction', component: TransactionView,
    beforeEnter: () => {
      // Redirect to login if the user is not logged.
      if (localStorage.getItem('logged') === null || !localStorage.getItem('logged')) {
        return { name: 'login' }
      }
    }
  },
  // Coins
  {
    path: '/coins', name: 'coins', component: CoinsView,
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
