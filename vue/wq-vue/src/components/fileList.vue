<template>
  <div class="fileList">
    <ul>
      <li v-for="(item, index) in fileList" :key="index">
        <div class="box">
          <p class="file-name">{{item.showname}}</p>
          <p class="file-info">
            <!-- <x-button mini  action-type="button" style="font-weight:800;">...</x-button> -->
            <group>
              <x-switch :title="fileTip" v-model="show5" ></x-switch>
            </group>
          </p>
        </div>
        <x-progress :percent="0"></x-progress>
      </li>
    </ul>
		
   <actionsheet v-model="show5" :menus="actionSheetMenus"  show-cancel @on-click-menu="actionSheetMenusEvent(index)"></actionsheet>
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
			fileTip:"文件信息",
      actionSheetMenus: [
        {
          label: "55555555555",
          type: 'disabled'
        },
        {
          label: "重命名",
          type: "primary",
          value: "primary",
          otherProp: "hey"
				},
				 {
          label: "历史版本",
          type: "primary",
          value: "历史版本",
				},
      ]
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
		...mapGetters(["fileList"]),
  },
  methods: {
    actionSheetMenusEvent (key, item) {
    },
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
.weui-mask{
    // background: rgba(0, 0, 0, 0.05) !important;
}
</style>