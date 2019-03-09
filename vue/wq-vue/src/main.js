import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
// import Mint from 'mint-ui'
import 'vux/src/theme.less'

// import './styles/index.scss' 
// import 'mint-ui/lib/style.css'
import axios from 'axios'
import 'lib-flexible'

Vue.use(ElementUI, {})
// Vue.use(Mint);



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
