import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

Router.prototype.go = function () {
  this.isBack = true;
  window.history.go(-1);
};

//路由
const index = () => import('@/page/index/index');
const home = () => import('@/page/index/home/home');
const video = () => import('@/page/index/video/video');
const collect = () => import('@/page/index/collect/collect');
const user = () => import('@/page/index/user/user');


export default new Router({
  routes: [
    {
      path: '',
      redirect: '/index/home',
      component: App,
      children: [
        {
          name: 'index',
          path: '/index',
          redirect: '/index/home',
          component: index,
          children: [
            {
              name: 'home',
              path: 'home',
              component: home,
            },
            {
              name: 'video',
              path: 'video',
              component: video,
            },
            {
              name: 'collect',
              path: 'collect',
              component: collect,
            },
            {
              name: 'user',
              path: 'user',
              component: user,
            },

          ]
        },
      ],

    }
  ]
})
