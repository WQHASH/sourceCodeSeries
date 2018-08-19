<template>
    <div id="app">
        <transition :name="animate">
            <keep-alive>
                <router-view id="view"></router-view>
            </keep-alive>
        </transition>

        <!-- <Login :class="{'login-active': isLogin}" @close="$store.state.user.isLogin=false"></Login> -->
        <!-- wq 修改-->
        <Login :class="{'login-active': isLogin}" @close="tempMethod()"></Login>
        <!--wq: 转圈加载 -->
        <FullCircleLoading v-show="pageLoading"></FullCircleLoading>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Login from 'components/Login/index'
    export default {
        components: { Login },
        data () {
            return {
                animate: ''
            }
        },
        // wq: 理解 只要可以动过this的方式拿到的属性，watch 就可以监听到
        watch: {
            $route (to, from) {
                /*
                0: 不做动画
                1: 左切换
                2: 右切换
                3: 上切换
                4: 下切换
                 */
                let animate = this.$router.animate || to.meta.slide
                    this.animate = '' 
                if (!animate) {
                }else{
                    this.animate = animate === 1 ?  'slide-left' :
                        animate === 2 ?  'slide-right' :
                        animate === 3 ?  'slide-top' :
                        animate === 4 ?  'slide-bottom' : ''
                }
                this.$router.animate = 0
            }
        },
        computed: {
            ...mapGetters([
                'isLogin',
                'pageLoading'
            ])
        },
        // wq 修改
        methods: {
            tempMethod(data){
                this.$store.state.user.isLogin = data;
            },
        },
    }
</script>
<style lang="less" scoped>
    #app {
        width: 100%;
        height: 100%;
        .login-active {
            opacity: 1;
            top: 0;
        }
    }
    #view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        transform: translate(-100%, 0);
    }



    .slide-top-enter,
    .slide-bottom-leave-active {
        opacity: 0;
        transform: translate(0, 100%);
    }

    .slide-top-leave-active,
    .slide-bottom-enter {
        opacity: 0;
        transform: translate(0, -100%);
    }
</style>