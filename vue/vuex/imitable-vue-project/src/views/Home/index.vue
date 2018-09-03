<template>
    <article class="home-wrapper">
        <!-- 转圈动画部分 -->
        <div class="swiper-mask df-c" v-show="newsLoading">
            <CircleLoading></CircleLoading>
        </div>
        <!-- 中间部分 -->
        <swiper ref="swiper-wrapper" id="swiper-container"  @slideChangeTransitionEnd="end">
            <swiper-slide v-for="(news, index) in newsList" :key="index">
                <section class="swiper-box">
                    <ul>
                        <li v-for="item in news.list" class="item border-half-bottom">
                            <div v-if="item.images.length === 0">
                                <h4>{{item.title}}</h4>    
                                <p class="wes-3">{{item.intro}}</p>
                                <div class="df-sb">
                                    <span>{{item.source}}</span>
                                    <span>评论：{{item.comment}}</span>
                                    <span>{{item.time}}</span>
                                </div>
                            </div>

                            <div class="df-sb" v-else-if="item.images.length==1">
                                 <div class="item-l">
                                    <h4>{{item.title}}</h4>
                                    <p class="wes-2">{{item.intro}}</p>
                                    <div class="df-sb">
                                        <div class="small-box">
                                            <span>{{item.source}}</span>
                                            <span>评论：{{item.comment}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-r">
                                    <img :src="item.images[0]" alt="">
                                </div>
                            </div>

                            <div v-else>
                                 <div class="item-t">
                                    <h4>{{item.title}}</h4>
                                    <p class="wes-1">{{item.intro}}</p>
                                </div>
                                <div class="item-b df-sb">
                                    <img :src="img" :alt="img" :style="{width: item.images.length === 2 ? '40%':'25%'}" v-for="img in item.images">
                                </div>
                                <div class="df-sb">
                                    <div class="small-box">
                                        <span>{{item.source}}</span>
                                        <span>评论：{{item.comment}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
            </swiper-slide>
        </swiper>
    </article>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState, mapGetters } from "vuex";
// 这里简单总结下import和export姿势 => http://www.php.cn/js-tutorial-401597.html
// 1. export导出多个对象，export default只能导出一个对象
// 2. export导出对象需要用{ }，export default不需要{ }，同理在import使用时default的不需要{},

export default {
    components: {
        swiper,
        swiperSlide,
    },
    created() {
        // console.log(this.$store.state.home);  =>由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态在计算属性中返回某个状态：
        this.$store.dispatch('getHomeList', this.newsList[this.homeNewsIndex]);
    },

    methods: {
        async end (){
            // 参考 this.$store
            this.$store.state.home.newsIndex = this.swiper.activeIndex, 
            this.$store.state.home.newsPrevIndex = this.swiper.previousIndex
            // this.homeNewsIndex = this.swiper.activeIndex,   ??
            // this.homeNewsPrevIndex = this.swiper.previousIndex
            let data = await this.$store.dispatch('getHomeList', this.newsList[this.homeNewsIndex])
        },
    },
    computed: {
        /**
         * 这里可以对比 mapState 和 ...mapGetters这两种方法的使用场景
         *     个人感觉 mapGetters 可以替代mapState 都是得到vuex中的state且是响应式改变的，
         *     但是 mapState 会把 computed的结构固定死，而 mapGetter还是挺灵活的，还可以填充其他在计算属性中
         */
        swiper(){
             return this.$refs['swiper-wrapper'].swiper
        },
        ...mapGetters([
            'newsList',
            'newsLoading',
            'homeNewsIndex',
            'homeNewsPrevIndex',
            'homeEnd'
        ])        
    },

    watch: {},
};
</script>
<style lang="less" scoped>
    .home-wrapper {
        overflow-y: scroll;
    }

    .swiper-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0.4rem;
        background: #f4f4f4;
        z-index: 9;
    }

    #swiper-container {
        width: 100%;
        height: e("calc(100% - 0.4rem)");
        .swiper-box {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
        }
        .item {
            padding: 0.2rem 0.1rem;
            h4 {
                color: @font-normal;
            }
            p {
                font-size: 0.16rem;
                line-height: 0.2rem;
                margin: 0.1rem 0;
            }
            .small-box {
                >* {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 0.1rem;
                    margin-right: 0.04rem;
                    color: #999;
                }
            }
        }
        .item-l {
            width: 70%;
            padding-right: 10px;
        }
        .item-r {
            width: 30%;
            img {
                width: 100%;
            }
        }
    }
</style>