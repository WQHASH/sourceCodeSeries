<template>
  <div id="home">
    <home-header></home-header>
    <!-- <swiper-container></swiper-container> -->
  </div>
</template>
<script>
import homeHeader from "./components/homeHeader";
import swiperContainer from "./components/swiperContainer";
import { mapActions } from "vuex";

export default {
  name: "home",
  components: {
    homeHeader,
    swiperContainer
  },
  methods: {
    ...mapActions("index", ["get_indexColumn_data"])
  },
  created() {
    this.get_indexColumn_data();
  }
};
</script>
<style lang="less">
#home {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-bottom: 48px;
}
</style>