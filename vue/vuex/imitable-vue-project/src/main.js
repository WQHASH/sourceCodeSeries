import Vue from 'vue';
// 作为入口
import App from './App.vue';
import { router } from './router/index.js';
// 样式
import './styles/index.css'
import './styles/index.less'

// 工具类
import './utils/iconfont.js';
import './utils/rem.js';

//全局组件
import customComponents from './custom-components.js';
Vue.use(customComponents);

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'; 
Vue.use(VueAwesomeSwiper);


// new Vue({
// 	el: "#app",
// 	router,
// 	// store,
// 	template: "<App/>",
// 	components: { App }
// });

new Vue({
	router,
	render: h => h(App),
}).$mount("#app");

