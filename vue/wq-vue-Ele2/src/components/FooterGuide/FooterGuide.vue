<template>
  <div id="footer_guide">
    <ul class="router-list">
      <li
        v-for="(item, index) in routerData"
        :key="index"
        @click="seleRouter(index)"
        :class="{active: item.path == activeClass}"
      >{{item.name}}</li>
    </ul>
  </div>
</template> 

<script>
export default {
  name: "FooterGuide",
  data() {
    return {
      // 是否选择
      activeClass: "msite",
      //路由跳转数据
      routerData: [
        {
          name: "首页",
          path: "msite",
          index: "0"
        },
        {
          name: "排序",
          path: "order",
          index: "1"
        },
        {
          name: "搜索",
          path: "search",
          index: "2"
        },
        {
          name: "个人",
          path: "proFile",
          index: "3"
        }
      ]
    };
  },
  methods: {
    /**
     * 选择底部路由跳转
     * @index: 择的下标
     */
    seleRouter(index) {
      this.routerData.map((item, Curindex, list) => {
        if (index == Curindex) {
          this.activeClass = item.path;
          this.$router.push({ path: item.path });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#footer_guide {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  .router-list {
    display: flex;
    border-top: 1px solid pink;
  }
  .router-list li {
    height: 40px;
    line-height: 40px;
    width: 25%;
    text-align: center;
    font-size: 12px;
  }
  .active {
    color: red;
  }
}
</style>

