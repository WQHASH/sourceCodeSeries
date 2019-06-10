import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'

export default {
    namespaced: true,
    state: {
        indexActive: 'news_recommend',      // active的栏目                => 当前选中的项
        indexPage: { news_recommend: 1 },   // 记录所有栏目中的listItem的页码
        indexLocation: { news_recommend: 0 },  // 各个栏目location的对象    => 点击删除一下频道中的数据
        //栏目数据
        indexColumn: [{
            classname: '推荐',
            classid: 0,
            classpath: 'news_recommend'
        }],
        currentContent: '',     // 当前栏目的数据，为了缓存各个栏目的数据，刷新时不用再次请求
        indexSwiper: false      // 是否在滑动

    },
    getters: {
        indexActive: (state) => {
            return state.indexActive
        },
        indexColumn: (state) => {
            return state.indexColumn
        },
        indexPage: state => {
            return state.indexPage
        },
        indexLocation: state => {
            return state.indexLocation
        },
        indexSwiper: (state)=>{
            return state.indexSwiper
        },

        //当前选中项在栏目中的下标
        activeIndex: (state) => {
            return state.indexColumn.findIndex((obj) => {
                return obj.classpath === state.indexActive;
            })
        },
        activeClassid: (state, getters)=>{
            return state.indexColumn[getters.activeIndex].classid
        },
        //当前选中项的页码
        activePage: (state) => {
            return state.indexPage[state.indexActive]
        },
        activeLocation: state => {
            return state.indexLocation[state.indexActive]
        }
    },

    mutations: {
        //设置选中的栏目
        set_indexActive(state, val) {
            state.indexActive = val;
        },
        //设置缓存 indexPage
        set_indexPage(state, obj) {
            state.indexPage = obj;
            setCache('index_Page', obj);
        },
        set_indexLocation(state, obj) {
            state.indexLocation = obj
        },
        //设置缓存 indexColumn
        set_indexColumn(state, arr) {
            state.indexColumn = arr;
            set_local_cache('index_Column', arr);
        },
        set_indexSwiper(state, val){
            state.indexSwiper = val;
        },
    },

    actions: {
        //获取page缓存
        get_indexPage_cache({ commit, state, dispatch }, indexColumn) {
            const data = JSON.parse(getCache('index_Page'));
            if (data) {
                commit("set_indexPage", data);
            } else {
                if (indexColumn) {
                    let pageObj = {};
                    for (let i = 0; i < indexColumn.length; i++) {
                        pageObj[indexColumn[i]["classpath"]] = 1;
                    }
                    commit('set_indexPage', pageObj)
                }
            }
        },

        //获取Location缓存
        get_indexLocation_cache({ commit }, indexColumn) {
            if (indexColumn) {
                let locationObj = {};
                for (let i = 0; i < indexColumn.length; i++) {
                    locationObj[indexColumn[i]["classpath"]] = 0;
                }
                commit('set_indexLocation', locationObj)
            }
        },

        // 获取列表数据缓存
        get_listItem_cache(){
            let data = JSON.parse(getCache(`$(sate.indexActive)_json`));
            return data;
        },

        //获取栏目 
        async get_indexColumn_data({ commit, state, dispatch }) {
            let res;
            const data = JSON.parse(get_local_cache('index_Column'));
            if (data) {
                res = data
            } else {
                let json = await fetch('post', 'classID')
                res = [...state.indexColumn, ...json]
            }

            dispatch('get_indexPage_cache', res);
            dispatch('get_indexLocation_cache', res);
            commit('set_indexColumn', res);
            return res
        },

        //获取未选择的频道
        async get_channel_data({commit, state, dispatch}){
            let res = await fetch('post', 'classID', { 'channel': 'channel' })
            return res;    
        },

        //获取文章列表
        async get_listItem_data({rootState, getters}, page){
            let params = {
                'classid': getters.activeClassid,
                'page': page,
                'userid': rootState.userid,
                'firsttime': rootState.firsttime,
                'count': 20,
                'time': new Date().getTime(),
            };

            let res = await fetch('post', 'Class', params);
            return res;
        },

        //获取banner数据
        async get_banner_data({commit, getters}){
            let params = {'classid': getters.activeClassid, 'type':'banner'};
            let res = await fetch('post', 'Stick', params);
            return  res;
        },

    },
};




