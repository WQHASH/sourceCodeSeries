import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        listArticle: {},        // 点进去详情页的列表数据（用于改变列表的评论数）
        currentArticle: {},     // 当前文章数据（用于跨组件数据共用）
        historyArticle: [],     // 历史文章数据（用于浏览的历史记录功能）
    },      
    getters: {
        listArticle: (state)=>{
            return state.listArticle
        },
        currentArticle: (state) => {
            return state.currentArticle
        },
        historyArticle: (state) => {
            return state.historyArticle
        },
        
    },
    actions: {
        // 获取文章数据
        async get_Article_data({commit, state, rootState}, {id, datafrom}){
            let res;
            if(state.historyArticle && state.historyArticle.length>0){
                for(let i=0; i<state.historyArticle.length;i++){
                    if(state.historyArticle[i] && state.historyArticle[i].id == id){
                        res = state.historyArticle[i];
                    }
                }
            }
            if(!res){
                let params = {
                    'userid': rootState.userid,
                    'id':id,
                    'datafrom': datafrom,
                };
                await fetch('post', 'Artilce', params).then((json)=>{
                    res = json.data;
                    let historyData =  [res, ...state.historyArticle];
                    commit('set_historyArticle', historyData);
                }).catch((err)=>{
                    throw Error(err);
                })
            }
            if (res) {
                commit('set_currentArticle', res)
            }
            return res;

        },
    },
    mutations: {
        set_listArticle: (state, val)=>{
            state.listArticle = val
        },
        set_historyArticle: (state, val)=>{
            state.historyArticle = val
            set_local_cache('history_Article', val)
        },
        set_currentArticle: (state, val)=>{
            state.currentArticle = val
        }
        

    },
}