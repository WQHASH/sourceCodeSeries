<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-27 16:02:59
 * @LastEditTime: 2020-05-28 19:39:34
-->
<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less">
  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity 0.3s;
  }

  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
</style>