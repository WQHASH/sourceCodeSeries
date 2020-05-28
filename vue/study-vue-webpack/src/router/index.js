/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-27 16:02:13
 * @LastEditTime: 2020-05-28 20:49:15
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '@/App.vue';
console.log(App, "App")
import Home from '@/views/Home.vue'
import Other from '@/views/Other.vue'

Vue.use(VueRouter)
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
        component: Home
    },
    {
        path: '/other',
        name: "other",
        component: Other
    }
]

const router = new VueRouter({
    // hash || history
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})
export default router
