import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from 'axios'
import VueECharts from 'vue-echarts'

// import Review from './views/Reviews.vue'
Vue.component('v-chart', VueECharts)
Vue.use(vuetify);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
new Vue({
  router,
  store,
  vuetify,
  // Review,
  render: h => h(App)
}).$mount("#app");



