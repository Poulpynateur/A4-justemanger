import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import store from '../store/index';

import AppMain from '../views/AppMain.vue';
import NotFound from '../views/NotFound.vue';
import UserProfile from '../views/UserProfile.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: "*", component: NotFound },
  { path: '/', name: 'home', component: AppMain, props: true},
  { path: "/profile", name: 'user-profile', component: UserProfile, meta: {auth: true }},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.state.currentUser) {
      next({ name: 'home', params: {login: 'true' }})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
