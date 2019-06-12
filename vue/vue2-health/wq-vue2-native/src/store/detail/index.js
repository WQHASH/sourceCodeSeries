import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        listArticle: {},    // 点进去详情页的列表数据（用于改变列表的评论数）
    },
    getters: {
        listArticle: (state)=>{
            return state.listArticle
        },
    },
    actions: {},
    mutations: {
        set_listArticle: (state, val)=>{
            state.listArticle = val
        },

    },
}