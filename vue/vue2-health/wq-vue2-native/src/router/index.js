import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import seleMen from '@/components/header/seleMen';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'seleMen',
      component: seleMen
    }
  ]
})
