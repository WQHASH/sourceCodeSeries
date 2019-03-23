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
</style>
