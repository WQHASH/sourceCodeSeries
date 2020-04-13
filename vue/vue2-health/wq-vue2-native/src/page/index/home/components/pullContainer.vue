<template>
  <div
    class="container"
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
  >
    <!-- 顶部提示 -->
    <div class="globalTip">
      <div class="dataCount">已为你推荐{{dataCount}}条新内容</div>
      <div class="noNewData">没有最新的内容了</div>
      <div class="requestFail">网络请求失败,请检查网络</div>
    </div>

    <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore">
      <!-- 下拉提示 -->
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus === 'pull'">
          <img class="pullLoading" src="~@/assets/img/loading.png"> 下拉刷新↓
        </span>
        <span v-show="topStatus === 'drop'">
          <img class="pullLoading" src="~@/assets/img/loading.png"> 释放更新↑
        </span>
        <span v-show="topStatus ==='loading'">
          <img class="pullLoading" src="~@/assets/img/loading.gif"> 加载中...
        </span>
      </div>

      <!-- listItem -->
      <list-item :itemJson="contentJson" v-if="contentJson.length > 0"></list-item>
      <!-- 底部提示 bottomLoad来自 global.css-->
      <!-- 这里可以考虑使用功能 slot来替代 -->
      <div class="bottomLoad" v-if="contentJson.length > 0">
        <div class="loading" v-show="bottomLoading">加载中...</div>
        <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "pullContainer",
  props: {
    type: String
  },
  data() {
    return {
      classPage: 1, //当前栏目的页数
      bottomLock: false, //无线上拉开关
      topStatus: "", //下拉状态
      contentJson: [], //整个列表数据
      dataCount: 0, // 推荐文章数量
      bottomLoading: true, //底部loading
      bottomNoData: false, //底部没有数据提示
      loading: false,
      error: false
    };
  },
  computed: {
    ...mapGetters("index", [
      "indexActive", // 获取栏目中选中的项
      "indexPage", // 获取所有栏目中的listItem的页码
      "indexLocation",
      "activePage", //当前选中项的页码
      "activeLocation",
      "indexSwiper"
    ])
  },
  watch: {
    //监听当前选中栏目项的变化, 来重新发送请求
    indexActive() {
      this.init();
    }
  },
  mounted() {
    this.init();
    this.lookHereClick();
  },
  methods: {
    ...mapActions("index", [
      "get_banner_data", //获取banner数据
      "get_listItem_data", //获取当前栏目列表数据
      "get_listItem_cache" //获取缓存的当前栏目列表数据
    ]),

    init() {
      if (this.indexActive === this.type && !(this.contentJson.length > 0)) {
        this.classPage = this.activePage;
        this.error = false;
        this.loading = true;
        // 获取banner列表数据
        this.get_banner_data()
          .then(res => {
            if (res) {
              this.bannerJon = res;
            }
          })
          .catch(err => {
            throw new Error(err);
          });
        //获取置顶数据
        this.loadTopAjax();
      }
    },

    //无限上拉函数
    loadBottomAjax() {
      if (!this.bottomNoData) {
        this.bottomLock = true;
        this.get_listItem_data(this.classPage)
          .then(res => {
            if (res) {
              this.contentJson.push(...res);
              this.classPage++;
            } else {
              this.bottomLoading = false;
              this.bottomNoData = true;
            }
            this.bottomLock = false;
          })
          .catch();
      }
    },

    //下拉刷新执行的方法, [该方法如果写了，才会ui样式，上拉(:bottom-method) 没写怎没有ui样式]
    loadTopAjax() {
      this.get_listItem_data(this.classPage)
        .then(res => {
          this.loading = false;
          if (res) {
            this.contentJson.unshift(...res);
            this.dataCount = res.length;
            this.classPage++;
            //头部没有数据的提示
            $(`.container.${this.type} .dataCount`)
              .slideDown(200)
              .delay(1000)
              .slideUp(200);
          } else {
            //头部没有数据的提示
            $(`.container.${this.type} .noNewData`)
              .slideDown(200)
              .delay(1000)
              .slideUp(200);
          }
          this.$refs.loadmore.onTopLoaded();
          this.error = false;
          $(`.container.${this.type} .requestFail`).hide();
        })
        .catch(err => {
          if (this.contentJson.length > 0) {
            $(`.container.${this.type} .requestFail`).show();
          } else {
            this.get_listItem_cache()
              .then(cache => {
                if (cache) {
                  this.contentJson = cache;
                } else {
                  this.error = true;
                }
              })
              .catch(err => {
                throw new Error(err);
              });
          }
        });
    },

    // 组件顶部状态发生变化时的回调函数 drop->loading->pull
    handleTopChange(status) {
      this.topStatus = status;
    },

    // 点击look元素，发送请求 [属于后续补充功能，第一页和第二间存在个容器：上次看到这里，点击刷新]
    lookHereClick() {
      $(`.container.${this.type}`).on("click", "#lookHere", () => {
        $(`.container.${this.indexActive}`).animate({ scrollTop: 0 }, () => {
          this.loadTopAjax();
        });
      });
    }
  }
};
</script>
<style lang="less">
.container {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .globalTip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    div {
      height: 32px;
      line-height: 34px;
      font-size: 14px;
      color: #2a90d7;
      background: rgba(213, 233, 247, 0.9);
      text-align: center;
      display: none;
      &.requestFail {
        color: #f56767;
        background: #fbe9ef;
      }
    }
  }
  .mint-loadmore-top {
    height: 50px;
    line-height: 50px;
    margin-top: -50px;
    font-size: 14px;
    text-align: center;
  }
  .pullLoading {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    // margin-top:;
  }
}
</style>
