<template>
  <div id="header">
    <x-header :left-options="{showBack: false}" class="header">
      <i class="iconfont icon-search-1-copy"></i>
      <slot name="header-title" ></slot>
    </x-header>
  </div>
</template> 

<script>
// 注意在使用vux时需要在 build/webpack.base.conf.js 中配置，具体请看官网
import { XHeader } from "vux";
export default {
  name: "msite",
  data() {
    return {};
  },
  components: {
    XHeader
  },  
  methods: {}
};
</script>

<style lang="scss" scoped>
.icon-search-1-copy {
  font-size: 20px;
  position: absolute;
  left: 15px;
  color: #fff;
}
.header {
  height: 40px;
  line-height: 40px;
  background-color: rgba(49, 144, 232, 1);
 
}
</style>

