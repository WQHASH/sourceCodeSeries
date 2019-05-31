import Vue from 'vue';
import Vuex from 'vuex';

import index_module from './index/index';

Vue.use(Vuex);

const state = {
    // device: 'android',                       // 设备
    userid: 'oqKkTvySObkOpp6L2z__GjacVFN8',  // 我微信的id: oqKkTvySObkOpp6L2z__GjacVFN8
    // firstTime: ''                            // 第一次进入app时间
};

const getters = {
    userid: state => {
        return state.userid
    },
};

const mutations = {
    set_userid(state, val) {
        state.userid = val
    },
};

const actions = {};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        index: index_module,
    }

});


