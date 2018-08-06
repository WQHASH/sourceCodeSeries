import Vue from 'vue';
import App from './App';
import store from './vuex/store';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
