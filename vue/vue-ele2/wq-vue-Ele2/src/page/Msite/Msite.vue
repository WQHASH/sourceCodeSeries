<template>
  <div id="msite">
    <Header>
      <span class="header_title" slot="header-title">{{headerTitle}}</span>
    </Header>

    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide food_types_container"
            v-for="(item, index) in navList"
            :key="index"
          >
            <div class="link_to_food">{{item}}</div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
  </div>
</template> 

<script>
import Swiper from "swiper";
import Header from "../../components/Header/Header";

export default {
  data() {
    return {
      headerTitle: "首页",
      navList: "1234".split("")
    };
  },
  mounted() {
    //获取nav对象列表
    console.log(new Swiper());
    new Swiper(".swiper-container", {
      pagination: "swiper-pagination",
      loop: true
    });
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/swiper/dist/css/swiper.css";
#msite {
  .header_title {
    font-size: 16px;
    color: #fff;
  }
  .msite_nav {
    .food_types_container {
      display: flex;
      flex-wrap: wrap;
      .link_to_food {
        width: 100%;
        height: 150px;
        background: pink;
        border: 1px solid yellowgreen;
      }
    }
  }
}
</style>

