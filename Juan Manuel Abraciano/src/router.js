import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Lista from './views/lista.vue'
import FormPersona from './views/form-persona.vue'
import EliminarPersona from './views/eliminar-persona.vue'

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
      path: '/lista',
      name: 'lista',
      component: Lista
    },
    {
      path: '/form-persona/:id',
      name: 'formPersona',
      component: FormPersona
    },
    {
      path: '/eliminar-persona/:id',
      name: 'eliminarPersona',
      component: EliminarPersona
    }
  ]
})
