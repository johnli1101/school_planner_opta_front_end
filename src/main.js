import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
window.$ = window.jQuery = require('jquery');
import VueAxios from './plugins/axios'

Vue.use(VueAxios)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
