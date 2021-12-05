import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import Movue from 'movue'
import * as mobx from 'mobx'
Vue.use(Movue, mobx)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
