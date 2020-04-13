<template>
  <div id="app">
    <router-view/>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
export default {
  name: "App",
  components: {
    FooterGuide
  }
};
</script>

<style lang='scss'>
@import "./style/common.scss";
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
