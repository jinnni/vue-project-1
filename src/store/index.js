import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    baseUrl: 'http://106.14.164.125:8082/api/v1/',
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
    campaignList({ commit}, pageInfo){
      console.log(pageInfo);
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.get(this.state.baseUrl + 'campaign/page/' + pageInfo.page + '?size=' + pageInfo.size + '&status=' + pageInfo.campaignStatus)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    loadDashboard({ commit}){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.get(this.state.baseUrl + 'dashboard')
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
        axios({url: this.state.baseUrl + 'users/login_cpanel', data: user, method: 'POST' })
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
