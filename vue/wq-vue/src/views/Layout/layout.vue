<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文件列表" name="fileList"></el-tab-pane>
      <el-tab-pane label="问题列表" name="problemList"></el-tab-pane>
      <el-tab-pane label="其他待选" name="otherList"></el-tab-pane>
      <el-tab-pane label="后续补充" name="supplementList"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import fileList from "@/components/fileList";
export default {
  name: "layout",
  data() {
    return {
      activeName: "second"
    };
  },
  computed() {
    this.$router.push({ name: "fileList" });
    //通过axion请求数据
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.name) {
		case "fileList":
		  const getfilelistaboutmecount = `http://192.168.12.18:8447/api/documentcoop/file/getfilelistaboutmecount/134217045907607552/62ee0057-92b6-4692-b9dc-f6e20e1265a1`;
          this.$router.push({ name: "fileList" });
          this.axios({
            method: "post",
            url: getfilelistaboutmecount,
            data: {
             "userid":"134217045907607552",
            }
		  })
		  .then((res)=>{console.log(res)})

          //通过axion请求数据
          break;
        case "problemList":
          this.$router.push({ name: "problemList" });
          break;
        case "otherList":
          this.$router.push({ name: "problemList" });
          break;
        case "supplementList":
          this.$router.push({ name: "problemList" });
          break;
        default:
          break;
      }
    }
  }
};
</script>