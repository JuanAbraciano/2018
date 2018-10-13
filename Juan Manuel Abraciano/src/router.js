import Vue from 'vue'
import Router from 'vue-router'
import Lista from './views/lista.vue'
import CrearPersona from './views/crear-persona.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/lista',
      name: 'lista',
      component: Lista
    },
    {
      path: '/crear-persona',
      name: 'crearPersona',
      component: CrearPersona
    }
  ]
})
