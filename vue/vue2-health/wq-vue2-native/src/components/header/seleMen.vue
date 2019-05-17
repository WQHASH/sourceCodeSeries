<template>
  <div class="sele-men">
    <div class="nav-ul">
      <a
        href="javascript:;"
        :class="{active: currentActive == item.classpath}"
        v-for="(item, index) in indexColumn"
        :key="index"
        @click="activeNav(index)"
      >{{item.classname}}</a>
    </div>

    <div class="nav-menu">
      <div class="showdow"></div>
      <a href="javascript:;" class="more-btn">+</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //当前选中项的名称
      currentActive: "news_recommend",
      //选中项偏移的距离
      move: 0,
      //当前选中项的下标
      currentIndex: 0,
      indexColumn: [
        { classname: "推荐", classid: 0, classpath: "news_recommend" },
        {
          classid: "1",
          classname: "男性",
          classpath: "news_men",
          showclass: "0"
        },
        {
          classid: "2",
          classname: "女性",
          classpath: "news_abby",
          showclass: "0"
        },
        {
          classid: "3",
          classname: "育儿",
          classpath: "news_baby",
          showclass: "0"
        },
        {
          classid: "4",
          classname: "中医",
          classpath: "news_tcm",
          showclass: "0"
        },
        {
          classid: "5",
          classname: "本地",
          classpath: "news_local",
          showclass: "0"
        },
        {
          classid: "6",
          classname: "政策",
          classpath: "news_policy",
          showclass: "0"
        },
        {
          classid: "7",
          classname: "产业",
          classpath: "news_canye",
          showclass: "0"
        },
        {
          classid: "8",
          classname: "旅游",
          classpath: "news_travel",
          showclass: "0"
        },
        {
          classid: "9",
          classname: "美食",
          classpath: "news_food",
          showclass: "0"
        }
      ]
    };
  },
  watch: {
    currentActive: {
      handler(newVal, oldVal) {
        this.slideTo(this.currentIndex);
      },
      //初始化是是否执行
      immediate: false
    }
  },
  methods: {
    //nav列表点击方法
    activeNav(index) {
      this.currentIndex = index;
      this.indexColumn.forEach((item, key, list) => {
        if (item["classid"] == index) {
          this.currentActive = item["classpath"];
        }
      });
    },

    //列表的滑动
    slideTo(index) {
      //列表容器
      let _container = jQuery(".nav-ul");
      //列表容器宽度
      let _container_width = _container.width();
      //选中的元素
      let _currentActiveEle = jQuery(".nav-ul a").eq(index);
      //选中的元素宽度
      let _currentActiveEle_width = _currentActiveEle.width();
      //容器左滚动的距离
      let _container_left = _container.scrollLeft();
      console.log(_container_left, "scrollLeft");
      //选中的元素的做偏移量
      let _currentActiveEle_left = _currentActiveEle.position().left;
      console.log(_currentActiveEle_left, "left");
      let midWidth = (_container_width - _currentActiveEle_width) / 2;

      //判断是否存在偏移
      if (_container_left == 0 && _currentActiveEle_left < midWidth) {
        this.move = 0;
      } else {
        this.move = _container_left + (_currentActiveEle_left - midWidth);
      }
      _container.animate({ scrollLeft: this.move }, 300);
    }
  }
};
</script>
<style lang="scss" scoped>
.sele-men {
  position: relative;
  background-color: #f4f5f6;
  border-bottom: 1px solid #ddd;
  padding-right: 35px;
  .nav-ul {
    overflow-x: auto;
    white-space: nowrap;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }
    a {
      display: table-cell;
      vertical-align: middle;
      height: 25px;
      font-size: 17px;
      padding: 5px;
    }
    .active {
      color: #00939c;
      border-bottom: 2px solid #00939c;
      font-weight: bold;
    }
  }
  .nav-menu {
    width: 34px;
    height: 34px;
    position: absolute;
    top: 0;
    right: 0;
    background: yellowgreen;
  }
}
</style>