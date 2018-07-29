import Vue from 'vue';
import App from './App';
import router from './router';
// 类似Ajax请求
import axios from "axios";
import ElementUI from 'element-ui';
//使用elementUI这个主题必须加上的
import 'element-ui/lib/theme-chalk/index.css';
//将es6语法转成es5 可以跑在大部分游览器中	
import "babel-polyfill";

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

// Vue.config.productionTip = false
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
