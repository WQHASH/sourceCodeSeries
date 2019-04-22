import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/index'
import dashboard from '@/views/dashboard/index'
import documentation from '@/views/documentation/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  //处理切换路由时改变滚动条的位置
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
      path: '',
      redirect: '/dashboard',
      component: layout,
      children: [{
        path: '/dashboard',
        component: dashboard,
        name: "dashboard",
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }]
    },
    {
      path: '/documentation',
      component: layout,
      children: [{
        path: "",
        name: "documentation",
        component: documentation,
      }]
    }


  ]
})
