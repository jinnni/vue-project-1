import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../components/Login.vue';
import Secure from '../components/Secure.vue';
import store from './index.js';

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import( "../views/Home.vue")
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/secure',
    name: 'secure',
    component: Secure,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: "/campaignTable",
    name: "CampaignTable",
    component: () => import( "../views/CampaignTable.vue")
  },
  {
    path: "/chart",
    name: "Chart",
    component: () => import( "../views/Chart.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import( "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
});

export default router;
