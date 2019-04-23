<template>
  <div class="navbar">
    <el-row>
      <el-button @click="toggleSideBar">收侧栏</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  name: "navBar",
  computed:{
    ...mapGetters(['sidebar'])
  },
  methods: {
    // 需要注意的是这里通过mapActions不能直接获取到，  ...mapActions(['toggleSideBar']),
    // 因为层级关系, 还需要研究?
    toggleSideBar(){
      this.$store.dispatch('app/toggleSideBar')
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
}
</style>

