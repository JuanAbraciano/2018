import Vuex from 'vuex'
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