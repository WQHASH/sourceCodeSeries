<template>
  <div class="dragtable-container">
    <el-table ref="dragTable" :data="tableData" style="width: 100%" height="250">
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="province" label="省份" width="120"></el-table-column>
      <el-table-column prop="city" label="市区" width="120"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import Sortable from "sortablejs";
export default {
  name: "dragtable",
  data() {
    return {
      sortable: null,
      tableData: [
        {
          date: "2016",
          name: "王虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金",
          zip: 33
        },
        {
          date: "2016-05-02",
          name: "王小long",
          province: "上wd 海",
          city: "普区",
          address: "沙江sddd路 15dedf18 弄",
          zip: 2
        }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      this.setSort();
    });
  },
  methods: {
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost",
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        oneEnd: evt => {}
      });
    }
  }
};
</script>


<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
</style>