<template>
    <article class="home-wrapper">
        <!-- 转圈动画部分 -->
        <div class="swiper-mask df-c">
            <CircleLoading></CircleLoading>
        </div>
        <!-- 中间部分 -->
        <swiper ref="swiper-wrapper" id="swiper-container">
            <swiper-slide>
                <section class="swiper-box">
                    <ul>
                        <li>11111</li>
                    </ul>
                </section>
            </swiper-slide>
        </swiper>
    </article>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapGetters } from "vuex";
// 这里简单总结下import和export姿势 => http://www.php.cn/js-tutorial-401597.html
// 1. export导出多个对象，export default只能导出一个对象
// 2. export导出对象需要用{ }，export default不需要{ }，同理在import使用时default的不需要{},

export default {
    components: {
        swiper,
        swiperSlide,
    },
    created() {
        // console.log(this, "this.newsList")
        this.$store.dispatch('getHomeList', this.newsList[this.homeNewsIndex])
    },

    methods: {

    },
    computed: {
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