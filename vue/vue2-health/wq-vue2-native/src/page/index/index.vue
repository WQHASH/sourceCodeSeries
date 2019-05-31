<template>
  <transition name="slideIn" mode="in-out">
    <div id="index">
      <transition name="fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
      
      <!-- 底部导航栏 -->
      <nav-bar></nav-bar>
    </div>
  </transition>
</template>
<script>
import navBar from "./navBar";
export default {
  name: "index",
  components: {
    navBar
  }
};
</script>
<style lang="less">
#index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
