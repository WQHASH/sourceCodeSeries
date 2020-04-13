<template>
  <div class="navbar">
    <div class="collapse el-icon-d-arrow-left" @click="toggleSideBar"></div>

    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "navBar",
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    // 需要注意的是这里通过mapActions不能直接获取到，  ...mapActions(['toggleSideBar']),
    // 因为层级关系, 还需要研究?
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .collapse {
    width: 80px;
    height: 50px;
    line-height: 50px;
    margin-right: 10px;
    float: left;
    background: pink;
    opacity: 0.5;
  }
  .breadcrumb {
    float: left;
    height: 50px;
    line-height: 50px;
  }
}
</style>

