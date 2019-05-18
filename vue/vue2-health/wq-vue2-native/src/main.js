// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//适配
// import '@/config/rem.js';
// import 'lib-flexible/flexible.js'
import 'amfe-flexible/index.js';
//全局样式
import '@/assets/css/reset.css';
import '@/assets/css/global.css';


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
