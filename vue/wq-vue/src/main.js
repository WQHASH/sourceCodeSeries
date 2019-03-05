import Vue from 'vue'
import App from './App'
import router from './router'
// import {store} from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'lib-flexible'

Vue.use(ElementUI, {})
Vue.config.productionTip = false
Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App),
})
