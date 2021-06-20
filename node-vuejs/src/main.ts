import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.config.productionTip = false

/**** Setting prototype ****/
Vue.prototype.$http = Axios;
Vue.prototype.$appName = 'JusteManger'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
