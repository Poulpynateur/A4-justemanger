import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import AppWelcome from '../views/AppWelcome.vue';
import AppAuth from '../views/AppAuth.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', component: AppWelcome },
  { path: '/login', component: AppAuth },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
