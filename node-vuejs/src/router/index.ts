import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import AppWelcome from '../views/AppWelcome.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', component: AppWelcome },
  { path: "*", component: NotFound },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
