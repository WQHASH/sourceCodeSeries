<template>
  <div :class="classObj" class="app-wrapper">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <side-bar class="sidebar-container"/>
        </div>
      </el-col>
      <el-col :span="20">
        <nav-bar></nav-bar>
        <div class="grid-content bg-purple">
          <section class="app-main">
            <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <router-view/>
              </keep-alive>
            </transition>
          </section>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { appMain, sideBar, navBar, tagsView } from "./components";

export default {
  name: "layout",
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
  methods: {}
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
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>