import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import League from './views/League.vue'
import Cup from './views/Cup.vue'
import Calendar from './views/Calendar.vue'
import Login from './views/Login.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
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
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.name !== "login"){
    if(!store.state.token){
      next("/");
    } else{
      next();
    }
  } else {
      if(store.state.token){
        next("/home");
      } else {
        next();
      }
  }
})
export default router
