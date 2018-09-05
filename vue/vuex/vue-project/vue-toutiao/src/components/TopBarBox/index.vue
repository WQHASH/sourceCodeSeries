<template>
    <div class="top-bar-box">        
        <Icon name="close" class="close" @click.native="$emit('close')"></Icon>
        <div class="self-box">
            <div class="title df-sb">
                <div class="title-l">
                    <span >我的频道</span>
                    <small>点击删除以下频道</small>
                </div>
            </div>
            <ul class="cf">
                <li class="fl" v-for="news in newsList">
                    <a href="javascript:;" @click="$store.dispatch('delHomeTag', news)">{{news.title}}</a>
                </li>
            </ul>
        </div>
        <div class="recommend-box">
            <div class="title df-sb">
                <div class="title-l">
                    <span>推荐频道</span>
                    <small>点击添加以下频道</small>
                </div>
            </div>
            <ul class="cf">
                <li class="fl" v-for="news in allNewsList">
                    <a href="javascript:;" @click="$store.dispatch('addHomeTag', news)">{{news.title}}</a>
                </li>
            </ul>
        </div>
        <div>
            xxx:<input type="text" v-model="message" >
            <p>{{message}}</p>
            <p>{{allFooterBarList}}</p>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    // 另外再起一个名字  [来自所有的newsList的state]
    import { newsList as allNewsList } from 'src/store/modules/classify';
    import { footerBarList as allFooterBarList } from 'src/store/modules/classify';
    export default {
        data () {
            return {
                animate: 'slide-top',
                message: 'Hello'
            }
        },
        created () {
            console.log(this.animate)
        },
        methods: {
            plus(){
                this.count++;
                console.log(this.count,"this")
            },
            reduce(){
                this.count--;
            },
            changeEvent(){
                this.message = this.message
            },
        },
        computed: {
            // [来自所有的store.home.newsList的过滤后的部分state]
            ...mapGetters([
                'newsList'
            ]),
            /**
             * filter():返回一个符合func条件的元素数组
             * some():返回一个boolean，判断是否有元素是否符合func条件
             */
            allNewsList () {
                // console.log(allNewsList1,"allNewsList+");
                console.log(this.newsList,"newsList+");
                return allNewsList.filter( news => {
                    return !this.newsList.some( v => news.title === v.title)
                }) 
            },
            //wq 该方法用于测试 import as 修改名字和 data(){}
            allFooterBarList(){
                 // return this.message.split('').reverse().join('')
                 return this.message
            },

        },
    }
    /**
     * 关于@click 和@click.native之间的关系：   https://segmentfault.com/q/1010000011186651
     * 简单些： 意思就是当你给一个vue组件绑定事件时候，要加上native！如果是普通的html元素！就不需要
     *
     *
     * 关于 import as修改名字 和 data(){}
     * As: 
     *     import { newsList as allNewsList } from 'src/store/modules/classify'; =>这里会配合mapGetters取到state
     *     data(){return { message:"xx"}};  => 自命名的state
     *     然后到
     *     computed:{
     *         allNewsList(){},  =>不报错  
     *         message(){},      => 报错   
     *         理解： 暂时不清楚，可能因为自命名的已经存在2个名字 计算中的方法名是方法名，数据名是数据名
     *     },
     * 
     */
</script>
<style lang="less" scoped>
    
    .top-bar-box {
        position: fixed;
        top: 100%;left:0;
        width: 100%;
        height: e("calc(100% - 0.1rem)");
        background: #f5f5f5;
        text-align: left;
        border-top-right-radius: 0.1rem;
        border-top-left-radius: 0.1rem;
        z-index: 99;
        padding: 0.1rem;
        padding-top: 0.34rem;
        transition: top .2s ease-out;
        .close {
            position: absolute;
            left: 0.05rem;top: 0.05rem;
            padding: 0.05rem;
            font-size: 0.24rem;
        }
        .title {
            small {
                color: #666
            }
        }
        li {
            width: 25%;
            margin: 0.06rem 0;
            a {
                display: block;
                width: 0.8rem;
                text-align: center;
                line-height: 0.35rem;
                background: #f0f0f0;
                color: @font-gray;
            }
        }

        .recommend-box {
            margin-top: 0.2rem;
        }
    }
</style>