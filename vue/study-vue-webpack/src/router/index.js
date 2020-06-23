/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-27 16:02:13
 * @LastEditTime: 2020-05-29 16:55:35
 */

import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App.vue';
console.log(App, "App")
// import Home from '@/views/Home.vue'
// import Other from '@/views/Other.vue'

Vue.use(Router)
// const routes = [
//     {
//         path: '/',
//         component: App,
//         children: [
//             {
//                 path: '',
//                 redirect: '/home'
//             },
//             {
//                 path: '/home',
//                 component: Home
//             },
//         ],

//     }
// ]

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        name: "home",
        component: import("@/views/Home.vue")
    },
    {
        path: '/other',
        name: "other",
        component: import("@/views/Home.vue")
    }
]

const router = new Router({
    // hash || history
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})
export default router
