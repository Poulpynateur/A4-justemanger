import Vue from 'vue'
import Buefy from 'buefy'

import App from './App.vue'
import router from './router'
import store from './store'
import {i18n} from './plugins/i18n';

Vue.config.productionTip = false;
Vue.prototype.$appName = 'JusteManger';

Vue.use(Buefy);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
