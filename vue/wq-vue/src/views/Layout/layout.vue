<template>
  <div class="layout">
    <!-- <mt-navbar v-model="selected">
      <mt-tab-item id="1">
        <span @click="handleClick('fileList')" class="file-list">文件列表</span>
      </mt-tab-item>
      <mt-tab-item id="2">
        <span @click="handleClick('problemList')" class="problem-list">问题列表</span>
      </mt-tab-item>
    </mt-navbar>-->
    <mt-header fixed title="主页">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <tab>
      <tab-item selected @on-item-click="handleClick('fileList')">文件列表</tab-item>
      <tab-item @on-item-click="handleClick('problemList')">问题列表</tab-item>
    </tab>

    <keep-alive style="width:100%; height:100%; overflow:auto;">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import { Navbar, TabItem } from "mint-ui"
import Vue from "vue";
import { mapGetters } from "vuex";
import { Tab, TabItem } from "vux";
import fileList from "@/components/fileList";

export default {
  name: "layout",
  data() {
    return {
      // mintUI自带属性
      selected: 1,
      //文件列表数据
      fileListData: [],
      demo01: 0
    };
  },
  components: {
    Tab,
    TabItem
  },
  mounted() {
    //当组件挂载是需要跳转到 fileList
    this.$router.push({ name: "fileList" });
    this.$store.dispatch("getFileList", { name: "www" });
  },
  computed: {
    ...mapGetters(["fileList", "problemList"])
  },
  methods: {
    handleClick(type) {
      switch (type) {
        case "fileList":
          this.$store.dispatch("getFileList", {});
          this.$router.push({ name: "fileList" });
          break;
        case "problemList":
          this.$router.push({ name: "problemList" });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scope>
.layout {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
}
.file-list,
.problem-list {
  font-size: 38px;
}
</style>