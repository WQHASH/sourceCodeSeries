// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import '@/assets/css/reset.css'
import '@/assets/css/icon.css'
import '@/assets/css/transition.css'
import '@/assets/css/global.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//适配
// import '@/config/rem.js';
// import 'lib-flexible/flexible.js'
import 'amfe-flexible/index.js';

//全局组件
import myHeader from '@/components/myHeader'



Vue.config.productionTip = false
//注册全局组件
Vue.component('my-header', myHeader)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
