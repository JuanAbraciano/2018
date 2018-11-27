import Vuex from '../node_modules/vuex/dist/vuex.esm.js'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null
    },
    mutations: {
        setToken(state, token){
            state.token = token;
        },
        removeToken(state){
            state.token = null;
        }
    }
})