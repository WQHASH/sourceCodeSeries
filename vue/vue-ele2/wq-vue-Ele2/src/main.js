import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})


// 1. vux使用前需要配置, 具体可参考官网
// 2. 每当git分支合并代码前看是否需要重新下载依赖项
