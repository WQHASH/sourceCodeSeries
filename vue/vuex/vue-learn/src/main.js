import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

Vue.config.productionTip = false
Vue.use(Vuex);
//创建Store实例
const store = new Vuex.Store({
	//存储状态值
	state: {},
	//状态值改变的地方,这里也是唯一能够改变vuex状态的方法
	mutations: {},
	//可以认为是store的计算属性 （Getters接收state作为其第一个函数）
	getters: {},
	actions: {},
});

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 将store实例注入到根组件下的所有子组件中
  // 子组件通过this.$store来方位store
  store
})
