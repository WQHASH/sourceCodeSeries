<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <br>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :router="true"
      >
        <el-menu-item v-for="(item, index) in sideBarIconList" :key="index" :index="item.path">
          <i :class="[item.class]"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import sideBarItem from "./sideBarItem";

export default {
  name: "sideBar",
  data() {
    return {
      isCollapse: true,
      sideBarIconList: [
        {
          class: "el-icon-success",
          name: "首页",
          id: "1",
          path: "dashboard"
        },
        {
          class: "el-icon-document",
          name: "文档",
          id: "2",
          path: "documentation"
        },
        {
          class: "el-icon-goods",
          name: "引导页",
          id: "3",
          path: "guide"
        },
        {
          class: "el-icon-menu",
          name: "组件",
          id: "4",
          path: "icon"
        },
        {
          class: "el-icon-menu",
          name: "组件",
          id: "4",
          path: "icon"
        },
        {
          class: "el-icon-menu",
          name: "组件",
          id: "4",
          path: "icon"
        },
        {
          class: "el-icon-menu",
          name: "组件",
          id: "4",
          path: "icon"
        },
        {
          class: "el-icon-menu",
          name: "组件",
          id: "4",
          path: "icon"
        },
        {
          class: "el-icon-menu",
          name: "组件",
          id: "4",
          path: "icon"
        },
        {
          class: "el-icon-menu",
          name: "组件",
          id: "4",
          path: "icon"
        },
        {
          class: "el-icon-menu",
          name: "组件",
          id: "4",
          path: "icon"
        }
      ]
    };
  },
  components: {
    sideBarItem
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse {
  //   width: 200px;
}
.el-menu-item {
  color: rgb(191, 203, 217);
  background-color: rgb(48, 65, 86);
  &:hover {
    background-color: rgb(38, 52, 69);
  }
}

.el-menu-item.is-active {
  color: #1890ff;
}
</style>