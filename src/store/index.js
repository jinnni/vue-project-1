import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    loadDashboard({ commit}){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.get('http://106.14.164.125:8082/api/v1/dashboard')
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login({commit}, user){
      console.log("user", user);
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://106.14.164.125:8082/api/v1/users/login_cpanel', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp);
        })
        .catch((err) => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err);
        })
      })
    },
    logout({commit}){
      return new Promise(() => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      })
    }
  },
  modules: {}
});
