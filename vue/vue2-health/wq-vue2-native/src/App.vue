<template>
  <div id="app">
    <!-- <transition :name='transitionName'>
            <keep-alive exclude='detail,login'>
                <router-view class='child-view'></router-view>
            </keep-alive>
    </transition>-->
    <router-view class="child-view"></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #f8f8f8;
  .child-view {
    transition: all 0.3s ease;
  }
}
</style>
