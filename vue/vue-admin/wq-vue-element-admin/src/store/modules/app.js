import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'

const state = {
    device: 'desktop',
    language: getLanguage(),
    size: Cookies.get('size') || 'medium'
};

const mutations = {};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}