export const LOGIN_SUC = 'LOGIN_SUC';
export const SHOW_LOGIN = 'SHOW_LOGIN';

export default {
	state: {
		mobile: '',
		password: '',
		isShowLogin: true,
		msg: 'wangqi',
	},

	actions: {
		/**
		 * [addMyInfo 该方法作用是提交 mutations中定义的方法]
		 * 它有3个参数，({context => 与store实例具有相同方法（因为有vuex将store分割成模块module））}, {state=>通过在组件中dispatch携带的}, undefined) 
		 *  === 这里用es6结构的方法 将其里边的参数剖析了边 
		 *  === 还需要注意的是如果用了 mapMutation辅助函数 那么这里也将不用提交了，直接在组件中使用即可
		 * @DateTime 2018-08-05T23:11:17+0800
		 */
		addMyInfo({commit, state, rootState}, loginInfo){
			commit(LOGIN_SUC, loginInfo);
		},
		showLogin({commit}, flag){
			commit(SHOW_LOGIN, flag);
		},
	},

	mutations: {
		/**
		 * [描述: store中唯一能改变state的方法,这里定义了怎么改变state,供actions提交调用]
		 * 	该方法接收2个参数
		 * 		state: 		该store（modules）局部中的state
		 *   	loginInfo: 	该参数的值来自 commit提交时的第二个参数,(大部分情况下该参数为 对象) 
		 */
		[LOGIN_SUC] (state, loginInfo){
			// console.log(arguments, "arguments+++ mutations")
			state.mobile = loginInfo.mobile;
			state.password = loginInfo.password;
		},

		[SHOW_LOGIN] (state, flag){
			state.isShowLogin = flag
		},
	},
	getters: {},
};