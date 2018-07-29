import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      // 用来承接home的子级路由
      children: [{
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },

        {
          path: '/table',
          component: resolve => require(['../components/page/BaseTable.vue'], resolve),
          meta: { title: '基础表格' }
        },
      ]

    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },


  ]
})
