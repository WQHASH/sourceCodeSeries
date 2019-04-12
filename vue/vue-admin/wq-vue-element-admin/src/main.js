import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import Cookies from 'js-cookie'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import i18n from './lang'




Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
