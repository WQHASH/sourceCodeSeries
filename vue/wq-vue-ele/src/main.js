import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible'
import axios from 'axios'
import FastClick from 'fastclick'

//处理移动端一次300ms
if('addEventListener' in document){
  document.addEventListener('DOMContentLoaded', function(){
    FastClick.attach(document.body);
  }, false);
}

Vue.prototype.axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
