<template>
  <div :class="classObj" class="app-wrapper">
    <div :class="isCollapse?'lf-content-set':'lf-content'">
      <side-bar class="sidebar-container" @getCollapseState="getCollapseState"/>
    </div>
    <div :class="isCollapse?'rt-content-set':'rt-content'">
      <nav-bar></nav-bar>
      <div class>
        <section class="app-main">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </transition>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { appMain, sideBar, navBar, tagsView } from "./components";

export default {
  name: "layout",
  data() {
    return {
      //侧栏缩放是否打开，false:打开,  true:关闭
      isCollapse: ""
    };
  },
  components: {
    appMain,
    sideBar,
    navBar,
    tagsView
  },
  mounted() {},
  computed: {
    classObj() {
      return {
        hideSidebar: true,
        openSidebar: false,
        withoutAnimation: false,
        mobile: false
      };
    }
  },
  methods: {
    getCollapseState(isCollapse) {
      this.isCollapse = isCollapse;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .lf-content {
    width: 200px;
    float: left;
  }
  .lf-content-set {
    float: left;
    width: 65px;
  }
  .rt-content {
    width: calc(100% - 200px);
    float: left;
  }
  .rt-content-set {
    float: left;
    width: calc(100% - 65px);
  }
}
</style>