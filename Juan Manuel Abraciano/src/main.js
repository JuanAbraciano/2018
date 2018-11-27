import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from '../node_modules/element-ui/lib/element-ui.common.js'
import '../theme/index.css'

Vue.use(ElementUI);
Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
