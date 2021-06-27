import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import middlewares from './middlewares';

import AppWelcome from '../views/AppWelcome.vue';
import NotFound from '../views/NotFound.vue';
import UserProfile from '../views/UserProfile.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: "*", component: NotFound },
  { path: '/', name: 'home', component: AppWelcome},
  { path: "/profile", name: 'user-profile', component: UserProfile, beforeEnter: middlewares.authentificated},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
