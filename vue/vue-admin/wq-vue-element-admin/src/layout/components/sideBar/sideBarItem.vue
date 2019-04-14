<template>
  <div class="menu-wrapper">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>

    <el-menu-item index="2">
      <i :class="[sideBarIconList[2]['class']]"></i>
      <span slot="title">导航二</span>
    </el-menu-item>


    <!-- <el-menu-item v-for="(item) in sideBarIconList" :key="item.id" index="{{item.id}}" >
      <i class="{{item.class}}"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>-->
  </div>
</template>

<script>
export default {
  name: "sideBarItem",
  props: {},
  data() {
    return {
      sideBarIconList: [
        {
          class: "el-icon-success",
          name: "首页"
        },
        {
          class: "el-icon-document",
          name: "文档"
        },
        {
          class: "el-icon-goods",
          name: "图标"
        },
        {
          class: "el-icon-menu",
          name: "组件"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>