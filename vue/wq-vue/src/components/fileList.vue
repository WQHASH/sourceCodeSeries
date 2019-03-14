<template>
  <div class="fileList">
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      class="scrollView"
    >
      <ul>
        <li v-for="(item, index) in fileListData" :key="index">
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
    </mescroll-vue>

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
import MescrollVue from "mescroll.js/mescroll.vue";
// import '../../static/index.css';
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
      currentFile: {},
      // mintui使用
      allLoaded: false,

      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        noMoreSize: 5,
        dataList: [], // 列表数据
        limitQuantity: 20, //分页每页显示几条
        getFileSum: null //总页数
      }
    };
  },
  components: {
    MescrollVue,
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
    //这里没采用 vuex中的数据
    // ...mapGetters(["fileList", "renameText"])
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
          this.$router.push({ name: "rename", params: { index: "0" } }); //
          break;
        case "historicalVersion":
          break;
        default:
          break;
      }
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      const tokenId = "9e01f214-e20c-4ef5-9c88-fdb9918e1b13";
      const getfilelistaboutme =
        "/api/documentcoop/file/getfilelistaboutme/279094173439365120/" +
        tokenId;

      let postData = {
        userid: "279094173439365120",
        page: page.num,
        number: 20,
        appCode: -1,
        sceneCode: "",
        modelCode: "",
        fileCondition: "false",
        fileCondition: "",
        themeType: '["DocumentCoopDoc","DocumentCoopMap"]'
      };

      this.axios
        .post("/api" + getfilelistaboutme, postData)
        .then(response => {
          if (response.data.ErrorCode.Code == 0) {
            if (page.num === 1) this.dataList = [];
            this.fileListData = this.dataList = this.dataList.concat(
              response.data.DataContext
            );
            this.$nextTick(() => {
              mescroll.endSuccess(response.data.DataContext.length);
            });
          }
        })
        .catch(function(error) {
          console.log(error, "getfilelistaboutme");
        });
    }
  },

  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    });
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next();
  }
};
</script>

<style lang="scss" scope>
$color: red;

.fileList {
  height: 100%;
  width: 100%;
  overflow: auto;
}
ul {
  // margin-bottom: 80px;
  // margin-top: 10px;
  overflow: auto;
}
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
.file-name {
  overflow: hidden;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.mescroll {
  position: fixed;
  top: 100px;
  bottom: 0;
  height: auto;
}
</style>