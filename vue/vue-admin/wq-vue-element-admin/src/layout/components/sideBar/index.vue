<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
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
import { mapGetters } from 'vuex'
import sideBarItem from "./sideBarItem";

export default {
  name: "sideBar",
  components: {
    sideBarItem
  },
  data() {
    return {
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
          name: "拖拽表格",
          id: "3",
          path: "dragtable"
        },

        {
          class: "el-icon-menu",
          name: "组件",
          id: "4",
          path: "icon"
        },
       
      ]
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),

    //改变左侧栏的状态
    isCollapse() {
      this.$emit("getCollapseState",!this.sidebar.opened);
      return !this.sidebar.opened;
    }
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