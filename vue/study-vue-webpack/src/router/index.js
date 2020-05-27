/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-27 16:02:13
 * @LastEditTime: 2020-05-27 20:48:19
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})
export default router
