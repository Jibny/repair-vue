import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

//axios.defaults.baseURL = 'https://shmly.top/repair'
axios.defaults.baseURL = 'http://localhost:8888/repair'
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
