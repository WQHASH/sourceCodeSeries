<template>
  <div>
      <input v-model="sidebar.opened">
      {{sidebar.opened}}
      <button  @click="change">按钮</button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "documentation",
  data(){return {} },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods:{
    change(){
      this.sidebar.opened = 11;
    }
  }
};
</script>

