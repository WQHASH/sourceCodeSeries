import Vue from 'vue';
// 作为入口
import App from './App.vue';

// 样式
// import './styles/index.css';
// import './styles/index.less';

// 工具类
import './utils/iconfont.js';
import './utils/rem.js';


// new Vue({
// 	el: "#app",
// 	// router,
// 	// store,
// 	template: "<App/>",
// 	components: { App }
// });

new Vue({
	// router
	render: h => h(App)
}).$mount("#app");

