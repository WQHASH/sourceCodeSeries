import Vue from 'vue'
import Router from 'vue-router'

import Msite from '@/page/Msite/msite.vue'
import Order from '@/page/Order/Order.vue'
import ProFile from '@/page/ProFile/ProFile.vue'
import Search from '@/page/Search/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/msite',
    },
    {
      path: '/msite',
      name: "msite",
      component: Msite,
    },
    {
      path: '/order',
      name: "order",
      component: Order,
    },
    {
      path: '/proFile',
      name: "proFile",
      component: ProFile,
    },
    {
      path:"/search",
      name:"search",
      component: Search,
    }
  ]
})
