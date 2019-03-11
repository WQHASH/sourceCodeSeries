<template>
  <div class="fileList">
    <ul>
      <li v-for="(item, index) in fileList" :key="index">
        <div class="box">
          <p class="file-name">{{item.showname}}</p>
          <p class="file-info">
            <!-- <x-button mini  action-type="button" style="font-weight:800;">...</x-button> -->
            <group>
              <!-- <x-switch :title="fileTip" v-model="show5" @on-click="onSwitchClick(item, index)"></x-switch> -->
              <input type="button" v-model="show5" @click="onSwitchClick(item, index)">
            </group>
          </p>
        </div>
        <x-progress :percent="0"></x-progress>
      </li>
    </ul>

    <actionsheet
      v-model="show5"
      :menus="actionSheetMenus"
      show-cancel
      @on-click-menu="actionSheetMenusEvent"
    ></actionsheet>
  </div>
</template>

<script>
// import { Navbar, TabItem } from "mint-ui";
import { XButton, XProgress, Box } from "vux";
import { TransferDom, Actionsheet, Group, XSwitch, Toast } from "vux";
import { mapGetters } from "vuex";
export default {
  name: "fileList",
  data() {
    return {
      selected: 1,
      fileListData: [],
      //文件列表的横线使用精度条组件代替了 =>有坑必须在响应式改变,比如在computed函数中改变
      percent1: 0,
      //文件sheetAction需要的数据
      show5: false,
      //注意这里必须传递String类型
      fileTip: "文件信息",
      actionSheetMenus: [
        {
          label: "",
          type: "disabled"
        },
        {
          label: "重命名",
          type: "primary",
          value: "rename",
          otherProp: "hey"
        },
        {
          label: "历史版本",
          type: "primary",
          value: "historicalVersion"
        }
      ],
      currentFile: {}
    };
  },
  components: {
    XButton,
    XProgress,
    Box,
    TransferDom,
    Actionsheet,
    Group,
    XSwitch,
    Toast
  },
  mounted() {
    //这里使用数据  this.fileListData第一次视图刷不过来
    // this.fileListData = this.fileList;
  },
  computed: {
    ...mapGetters(["fileList","renameText"])
  },
  methods: {
    onSwitchClick(item, index) {
      this.show5 = !this.show5;
      this.currentFile = item;
      this.actionSheetMenus[0]["label"] = item.showname.slice(0, 10);
    },
    actionSheetMenusEvent(...item) {
      let [value] = item;
      switch (value) {
        case "rename":
        //路由中 path 和 params同时存在是 path不生效需换成name, 而query 不会这样
            this.$router.push({ name: 'rename', params: {index: '0'}}) // 
          break;
        case "historicalVersion":
          break;
        default:
          break;
      }

    }


  }
};
</script>

<style lang="scss">
$color: red;
ul,
li {
  list-style-type: none;
  color: $color;
  font-size: 18px;
  text-align: left;
  padding-left: 0;
}
.box {
  overflow: hidden;
}
.file-name {
  float: left;
}
.file-info {
  float: right;
}
.weui-mask {
  // background: rgba(0, 0, 0, 0.05) !important;
}
</style>