<template>
  <div id="detail">
    <my-header fixed :title="title">
      <a slot="left" class="back-black" @click.stop="$router.go(-1)"></a>
      <a slot="right" class="menu"></a>
    </my-header>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      title: "健康头条" // header的title
    };
  }
};
</script>
<style lang="less">
#detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f8f8f8;
  header {
    background: #fff;
    color: #333;
    font-size: 16px;
    .menu {
      background: url(../../assets/img/menu.png) no-repeat center center;
      background-size: 20px;
    }
  }
}
</style>
