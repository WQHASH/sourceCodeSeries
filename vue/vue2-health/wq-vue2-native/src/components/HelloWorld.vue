<template>
  <div class="hello">
    <p class="first">woshinibaba</p>
    <p class="two">haishinibabbb</p>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.first {
  font-size: 32px;
  color: red;
}
.two {
  font-size: 1rem;
  color: blue;
}
.box {
  width: 750px;
  height: 750px;
  border: 1px solid red;
}
</style>
