<template>
    <footer class="footer-wrapper df-c border-half-top">
        <ul class="cf">
            <router-link tag="li" :to="item.path" v-for="(item, index) in footerBarList" :class="{'active': ($route.matched[0].path || $route.matched[1].path) === item.path}" :key="index">
                <Icon :name="item.icon"></Icon>
                <div> {{item.title}}</div>       
                <!-- //wq -->
                <!-- {{recordTypes}}       -->
            </router-link>
        </ul>

    </footer>
</template>
<script>
    import { Local } from 'src/utils/storage'
    import { mapGetters } from 'vuex'
    export default {
        /** 
         * {{$store.state.record}}
         * 如果不明白 mapGetters怎么暴露state，如果不嫌麻烦一些，可以这这种方法来获取每个modules中的state
         * 
         * 理解： 这里需要明白一点的是：store中的 Getter, 他就像 computed方法一样， 的依赖值发生了改变才会被重新计算。
         * 而这里会先将 自己开始预判需要的可能会改变的一些state定义好，所以这里出现了 getter.js
         * ##用来存储 state(理解Getter计算核心)###, 因为stroe只一个全局的，So.定义好的state不论在那里都可以取到值
         * 配合mapGetters来使用!!
         */
        computed: {
            ...mapGetters([
                'footerBarList',
                'user',
                //wq 
                'recordTypes',
            ])
        },
    }
</script>
<style lang="less" scoped>

    .footer-wrapper {
        position: absolute;
        left: 0;bottom: 0;
        width: 100%;
        height: 0.5rem;
        font-size: 0.16rem;
        z-index: 99;
        background-color: #fff;
        ul {
            width: 100%;
        }
        li {
            width: 25%;
            float: left;
            text-align: center;
            color: @theme-black;
            svg {
                width: 0.22rem;
                height: 0.22rem;
            }
            div {
                width: 100%;
                font-size: 0.12rem;
                margin-top: 0.06rem;
            }
        }
        .active {
            color: @theme-red;
        }
    }
</style>