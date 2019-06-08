<template>
  <div id="indexHeader">
    <header>
      <div class="top_bar">
        <div class="logo" @click="goTop"></div>
        <div class="search">
          <div class="search_wrap">
            <i class="icon-search"></i>
            <div class="hot_topic">{{hot_topic}}</div>
          </div>
        </div>
      </div>
    </header>

    <!-- 栏目 -->
    <nav>
      <div class="nav_ul">
        <a
          href="javascript:;"
          v-for="(item, index) in indexColumn"
          :key="index"
          :class="{active: indexActive== item.classpath}"
          @click="navClick(item.classpath)"
        >{{item.classname}}</a>
      </div>

      <!-- 更多栏目 -->
      <div class="nav_menu">
        <div class="shadow"></div>
        <a href="javascript:;" class="more_btn" @click="$router.push('/index/home/channel')"></a>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "indexHeader",
  data() {
    return {
      hot_topic: "搜你想搜的",
      move: 0
    };
  },
  watch: {
    //对当前选中的栏目进行监听，然后滚动到其栏目位置
    indexActive() {
      this.slideTo(this.activeIndex);
    }
  },
  computed: {
    ...mapGetters("index", [
      "indexActive", //  当前选中的栏目
      "activeIndex", // 档案选中栏目的数组位置，因为他在 getters进行了过滤处理
      "indexColumn" //   栏目数据
    ])
  },
  methods: {
    ...mapMutations("index", ["set_indexActive"]),

    //横向滑动
    slideTo(index) {
      this.$nextTick(() => {
        let _container = $(".nav_ul"); // 获取滚动容器元素
        let _column = $(".nav_ul a").eq(index); // 获取当前active栏目元素
        if (_column) {
          let _container_width = _container.width(); // 容器宽度
          let _container_left = _container.scrollLeft(); // 容器当前滚动条的值
          let _column_width = _column.width(); // 栏目宽度
          let _column_left = _column.position().left; // 栏目距离屏幕左边的距离
          let midWidth = (_container_width - _column_width) / 2; // 屏幕中心线的宽度
          // 容器滚动为0，并且active栏目位于中间线左边？滚动值为0 ：当前容器滚动值 + （active栏目相对于中间线的值，有正负）
          if (_container_left === 0 && _column_left <= midWidth) {
            this.move = 0;
          } else {
            this.move = _container_left + (_column_left - midWidth);
          }
          _container.animate({ scrollLeft: this.move }, 300);
        }
      });
    },

    navClick(type) {
      //修改选中的栏目 => 这里type就是classpath ，然后又在vuex中 对indexActive进行设置
      this.set_indexActive(type);
    },

    //回到顶部
    goTop() {
      $(`.container.${this.indexActive}`).animate({ scrollTop: 0 });
    },
  }
};
</script>
<style lang="less">
@header_height: 1.335rem;
@nav_height: 0.96rem;
@menu_width: 1.058937rem;

#indexHeader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  overflow: hidden;
  header {
    display: block;
    position: relative;
    overflow: hidden;
    background: #00939c;
    color: #fff;
    .top_bar {
      position: relative;
      height: @header_height;
      user-select: none;
      display: flex;
      align-items: center;
      .logo {
        flex: 1.5;
        height: 100%;
        margin-left: 0.4rem;
        background: url(~@/assets/img/news_logo.png) no-repeat center center;
        background-size: contain;
      }
      .search {
        flex: 2.5;
        height: 100%;
        padding: 0.3rem 0.4rem 0.25rem;
        color: #00939c;
        overflow: hidden;
        .search_wrap {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 50px;
          overflow: hidden;
          padding: 0 0.266987rem;
          .icon-search {
            font-size: 15px;
          }
          .hot_topic {
            margin-left: 0.16rem;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  nav {
    position: relative;
    background: #f4f5f6;
    border-bottom: 1px solid #ddd;
    padding-right: @menu_width;
    .nav_ul {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;
      font-size: 0;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }
      a {
        display: table-cell;
        vertical-align: middle;
        font-size: 17px;
        padding: 0 0.267005rem;
        height: 0.966184rem;
        white-space: nowrap;
        text-decoration: none;
        &:last-child {
          margin-right: 0.133rem;
        }
        &.active {
          color: #00939c;
          border-bottom: 2px solid #00939c;
          font-weight: bold;
        }
      }
    }

    .nav_menu {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      .shadow {
        position: absolute;
        width: 0.2657rem;
        height: 100%;
        left: -0.2657rem;
        background-size: contain;
        background-color: rgba(244, 245, 246, 0.3);
      }
      .more_btn {
        display: block;
        width: @menu_width;
        height: 100%;
        background-size: 16px;
        background-color: #f4f5f6;
      }
    }
  }
}
</style>
<style>
/* 如果写在上边注意的是需要先引入图片, 后设置size */
.nav_menu .shadow {
  background: url(~@/assets/img/shadow.png) no-repeat 100%;
}
.nav_menu .more_btn {
  background: url(~@/assets/img/menu_more.png) no-repeat 50%;
}
</style>
