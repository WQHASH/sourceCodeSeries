<template>
  <div :class="classObj" class="app-wrapper">

    <side-bar class="sidebar-container" />
    <!-- <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <nav-bar/>
        <tags-view v-if="needTagsView"/>
      </div>
      <app-main/>
    </div> -->
    
  </div>
</template>

<script>
import {appMain, sideBar, navBar, tagsView} from './components'

export default {
  name: "layout",
  components: {
    appMain,
    sideBar,
    navBar,
    tagsView,
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