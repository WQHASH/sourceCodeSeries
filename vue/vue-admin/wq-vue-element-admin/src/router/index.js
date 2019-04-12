import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/index'

Vue.use(Router)

export default new Router({
  //处理切换路由时改变滚动条的位置
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout
    }
  ]
})
