<template>
  <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
    <swiper-slide v-for="(item,index) in indexColumn" :key="index">
      <pull-container :type="item.classpath"></pull-container>
    </swiper-slide>
  </swiper>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import pullContainer from "./pullContainer";
export default {
  name: "swiperContainer",
  data() {
    return {
      //需要注意的是 swiper3 和 swiper4调用api不太一样
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，
        //假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        on: {
          // 事件将在动画开始时触发到其他幻灯片（在swiper移动就触发）
          slideChangeTransitionStart: this.slideChangeTransitionStartCallBack,
          // 当用户触摸并将手指移过Swiper并移动它时，将触发事件
          sliderMove: this.sliderMoveCallBack,
          // 用户释放Swiper时将触发事件
          touchEnd: this.touchEndCallBack
        }
      }
    };
  },
  components: {
    pullContainer
  },
  watch: {
    indexActive() {
      this.slideTo();
    }
  },
  computed: {
    // 当前选中的项
    ...mapGetters("index", ["indexActive", "activeIndex", "indexColumn"])
  },
  methods: {
    ...mapMutations("index", ["set_indexActive"]),

    slideChangeTransitionStartCallBack() {
      let index = this.$refs.mySwiper.swiper.activeIndex;
      // 当Swiper发生变化时, 让栏目项滚动相应的index上
      this.set_indexActive(this.indexColumn[index].classpath);
    },

    // 当栏目变化时, 让Swiper滚到相应的index上
    slideTo() {
      this.$refs.mySwiper.swiper.slideTo(this.activeIndex, 300, true);
    },

    // 处理移动不能下拉
    sliderMoveCallBack(event) {},
    touchEndCallBack(event) {}
  }
};
</script>
<style lang="less">
.swiper-box {
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #fff;
  padding-top: 2.32168rem;
}
</style>
