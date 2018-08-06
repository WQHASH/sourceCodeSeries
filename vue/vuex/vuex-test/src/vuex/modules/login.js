/**
 * Created by admin on 2017/1/11.
 */
export const LOGIN_SUC = 'LOGIN_SUC';
export const SHOW_LOGIN = 'SHOW_LOGIN';
export default {
    state: {
        mobile: '',
        password: '',
        isShowLogin: true,
        msg:"wangqi"
    },
    /**
     * 在actions中调用一些mutations里定义好的方法，其中actions调用的方法，
     * 参数1： {commit} 表示的是一个与 store 实例具有相同方法的对象
     * actions中的方法，还需要在相应的组件中的方法[methods]里 dispatch
     * 流程 => 组件中的  method [事件触发了会进行分发actions]  -> 
     *                     actions [可以异步的进行commit mutations] -> 
     *                         mutations [对state进行改变]
     */
    actions: {
        /**
         * [addMyInfo 该方法并没有进行分发 dispatch]
         */
        addMyInfo({ commit } , loginInfo){
            commit(LOGIN_SUC , loginInfo);
        },
        showLogin({ commit } , flag){
            commit(SHOW_LOGIN , flag);
        },
    },
    mutations: {
        [LOGIN_SUC] (state , loginInfo) {
          state.mobile = loginInfo.mobile;
        },

        [SHOW_LOGIN] (state , flag) {
          state.isShowLogin = flag;
        },
    },
    getters: {
        getMsg(state){
            return state.msg;
        }
    }
};
