<template>
  <div id="indexHeader">
    <header>
      <div class="top_bar">
        <div class="logo"></div>
        <div class="search">
          <div class="search_wrap">
            <i class="icon-search"></i>
            <div class="hot_topic">{{hot_topic}}</div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "indexHeader",
  data() {
    return {
      hot_topic: "搜你想搜的",
      move: 0
    };
  },
  methods: {}
};
</script>
<style lang="less">
@header_height: 1.335rem;
@nav_height: 0.96rem;

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
}
</style>
