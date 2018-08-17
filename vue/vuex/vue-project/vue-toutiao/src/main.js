import Vue from 'vue'
import App from './App.vue'
import router from './router/permission.js'
import store from './store'

/*样式*/
import './styles/index.css'
import './styles/index.less'

/*工具类*/
import './utils/iconfont.js'
import './utils/rem.js'

/*指令*/
import './directive'

import { Cookie } from 'src/utils/storage'
Vue.prototype.Cookie = Cookie

// 返回
Vue.prototype.back = (route) => {
    route.animate = 2
    history.go(-1)
}

// 跳转文章页
Vue.prototype.skip = (route, id) => {
    route.push('/article/'+id)
}

// 全局组件
import customComponents from './custom-components.js'
Vue.use(customComponents)

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' 
Vue.use(VueAwesomeSwiper)
// 生成vue的根实例，创建每个组件都会生成一个vue实例
new Vue({
	//wq: #app是vue实例挂载的元素，应该在挂载元素范围内使用组件
    el: '#app',  
    router,
    store,
    template: '<App/>',
    components: { App }
})

/**
 *  理解vue-cli 中的new Vue() 和用 render生成的vue
 *  参考： https://segmentfault.com/q/1010000012470922
 *  
 *  比较 =>  new Vue({render: h=> h(App)}).$mounth('#app');
 *  对比理解：脚手架中的 App相当于一个大组件 大组件需要一个容器[template]
 *  而这个容器要插入到#app节点中去,
 *
 *  而采用render函数的这种，个人理解是， render他是一个函数，用他来生成Vnode,
 *  这里Vnode中做好了一切处理，然后返回到mounth函数，通过该函数渲染真实Dom节点，
 *  并将其挂载到 #app 这个元素下，此时也就替换了index.html中#app的内容
 *
 * 区别于 vue-cli的 el template他们做的工作就是, Vnode => 真实Dom转换的位置
 */