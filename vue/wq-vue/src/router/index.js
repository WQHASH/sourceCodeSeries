import Vue from 'vue'
import Router from 'vue-router'
import fileList from '@/components/fileList'
import problemList from '@/components/problemList'
import HelloWorld from '@/components/HelloWorld'
import layout from "../views/Layout/layout.vue"

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    children:[
      {
        path: '/problemList',
        name: 'problemList',
        component: problemList
      },
      {
        path: '/fileList',
        name:"fileList",
        component: fileList,
      },
    ],
   
  },
  
  
];
export default new Router({
  routes: constantRouterMap
})
