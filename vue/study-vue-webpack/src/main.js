/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-02 23:04:54
 * @LastEditTime: 2020-05-28 19:45:06
 */

import Vue from 'vue';
import router from './router/index'
import App from './App.vue';
let vm = new Vue({
    router,
    render: h => h(App)
}).$mount("#app");


