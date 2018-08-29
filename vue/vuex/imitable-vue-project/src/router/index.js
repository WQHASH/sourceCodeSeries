import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
Router.prototype.animate = 0
const _import_ = file => () => import('views/' + file + '.vue')

export const constantRouterMap = [
	{
		path: "/",
		name: "首页",
		meta: {page: true},
		component: _import_('Layout/index'),
		redirect: "/home",
		children: [
			{
				path: "home",
				component: _import_('Home/index'),
				name: "首页",
			}
		],
	},

	{
		path: "/video",
		name: "视频",
		meta: {page: true},
		component: _import_('Layout/index'),
		redirect: "/",
		children: [
			{
				path: "/",
				component: _import_('Video/index'),
				name: "视频",
			}
		],
	},

	{
		path: "/headline",
		name: "微头条",
		meta: {page: true},
		component: _import_('Layout/index'),
		redirect: "/",
		children: [
			{
				path: "/",
				component: _import_('Headline/index'),
				name: "微头条",
			}
		],
	},
	
];

export const router = new Router({
    // mode: 'history',
    routes: constantRouterMap
})