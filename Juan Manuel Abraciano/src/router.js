import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import League from './views/League.vue'
import Cup from './views/Cup.vue'
import Calendar from './views/Calendar.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/league/:id',
      name: 'league',
      component: League
    },
    {
      path: '/cup/:id',
      name: 'cup',
      component: Cup
    },
    {
      path: '/calendario',
      name: 'calendario',
      component: Calendar
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
