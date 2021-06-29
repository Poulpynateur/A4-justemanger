import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import store from '../store/index';

import AppMain from '../views/AppMain.vue';
import NotFound from '../views/NotFound.vue';
import UserProfile from '../views/layout/UserProfile.vue';
import RestaurantOrder from '../views/layout/RestaurantOrder.vue';
import OrderBasket from '../views/layout/OrderBasket.vue';
import OrderHistory from '../views/layout/OrderHistory.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: "*", component: NotFound },
  { path: '/', name: 'home', component: AppMain, props: true},
  { path: "/profile", name: 'user-profile', component: UserProfile, meta: {auth: true }},
  { path: "/restaurant/:restaurantId", name: 'restaurant', component: RestaurantOrder, props: true},
  { path: "/basket", name: 'basket', component: OrderBasket, meta: {auth: true }},
  { path: "/order-history", name: 'order-history', component: OrderHistory, meta: {auth: true }}
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
