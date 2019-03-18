import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
// import ElementUI from 'element-ui'
import Mint from 'mint-ui'
// import 'vux/src/theme.less'

// import './styles/index.scss' 
import 'mint-ui/lib/style.css'
import axios from 'axios'
import 'lib-flexible'

// Vue.use(ElementUI, {})
Vue.use(Mint);

// (function(doc, win) {
//   var docEl = doc.documentElement,
//       resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//       recalc = function() {
//           var clientWidth = docEl.clientWidth;
//           if (!clientWidth) return;
//           docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//       };
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);


Vue.config.productionTip = false
Vue.prototype.axios = axios

let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.use({
  vm
})
