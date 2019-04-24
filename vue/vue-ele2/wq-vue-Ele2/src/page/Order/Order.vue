<template>
  <div id="order">
    <Header>
      <span class="header-title" slot="header-title">{{headerTitle}}</span>
    </Header>
  </div>
</template> 

<script>
import Header from "../../components/Header/Header";
export default {
  name: "order",
  data() {
    return {
        headerTitle:"排序",
    };
  },
  components:{
      Header,
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#order {
  .header-title {
    font-size: 16px;
    color: #fff;
  }
}
</style>

