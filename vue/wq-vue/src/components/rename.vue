<template>
  <div class="rename">
    <div class="x-icon-box">
      <x-icon type="ios-arrow-back" size="30" @click="backEvent"></x-icon>
    </div>
    <group title>
      <x-input
        title
        type="text"
        placeholder="请输入名称"
        v-model="renameTextStr"
        @on-enter="onEnter"
        @on-click-clear-icon="onError"
      ></x-input>
    </group>

    <x-button type="primary" class="x-button" @click.native="onEnter(renameTextStr)">submit</x-button>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { Group, Cell, XButton, XInput } from "vux";
import { watch } from "fs";
export default {
  name: "rename",
  data() {
    return {
      renameTextStr: "",
      seleFileIndex: ""
    };
  },
  created() {
    this.seleFileIndex = this.$route.params.index;
  },
  computed: {
    ...mapGetters(["fileList", "renameText"])
  },
  components: {
    Group,
    Cell,
    XButton,
    XInput
  },
  methods: {
    backEvent() {
      this.$router.go(-1);
    },
    onEnter(val) {
      let renameFile = {
        renameTextStr: this.renameTextStr,
        seleFileIndex: this.seleFileIndex
      };
      this.$store.dispatch("renameFile", renameFile);
      this.$router.go(-1);
    },
    //该方法暂时没起作用
    onError() {
      console.log("click enter!");
    }
  }
};
</script>

<style lang="scss">
.vux-x-icon {
  fill: #f70968;
  float: left;
}
.cell-x-icon {
  display: block;
  fill: green;
}
.x-icon-box {
  overflow: hidden;
  clear: both;
}

.ipt-rename {
  clear: both;
  margin: 5px;
}
.x-button {
  position: fixed;
  top: 200px;
}
</style>