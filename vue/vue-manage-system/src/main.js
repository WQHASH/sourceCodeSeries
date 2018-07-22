import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    console.log(to, "main-arguments");
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

/**
 * 对于 render函数的理解： ====>
 *     render: function(createElement){ return createElement(App)}  [es5]
 *     render(createElement){ return createElement(App)}            [es6]
 *     render(h){ render h(App)}  === render: h => (App)            [箭头函数的缩写]
 *
 *     这里 createElement函数充分体现了函数式编程的思想，
 *     该函数是用来生成一个VNode节点，render函数得到这个VNode节点之后，返回给vue.js的 mount函数，
 *     渲染成真实的DOM节点，并挂载到根节点上
 *     
 */