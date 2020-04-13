import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'

const state = {
    sidebar:{
        opened: true,
        withoutAnimation: false
    },
    device: 'desktop',
    language: getLanguage(),
    size: Cookies.get('size') || 'medium'
};

const mutations = {
    TOGGLE_SIDEBAR: (state)=>{
        state.sidebar.opened = !state.sidebar.opened;
    }
};

const actions = {
    toggleSideBar({commit}){
        commit('TOGGLE_SIDEBAR')
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}