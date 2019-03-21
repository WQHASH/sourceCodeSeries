<template>
  <div class="problem_list">
    <div calss="food_container">
      <section class="sort_container">
        <div class="sort_item" >
          <div class="choose_type" :class="{choose_type_title:sortBy == 'food'}" @click="chooseType('food')">
            <!-- 这里通过加这层标签来解决 z-index覆盖不上问题 -->
            <div class="choose_type_box">
              分类
            </div>
          </div>
          <transition name="showlist" v-show="category">
            <section class="category_container" v-show="sortBy == 'food'" :class="{choose_type_title111:sortBy == 'food'}">
              <section class="category_left">
                <ul>
                  <li v-for="(item, index) in category" :key="index">{{item}}</li>
                </ul>
              </section>
              <section class="category_right">
                <ul>
                  <li v-for="(item, index) in category" :key="index">{{item}}</li>
                </ul>
              </section>
            </section>
          </transition>
        </div>
        <div class="sort_item">
          <div class="choose_type_box">
              排序
            </div>
          </div>
        <div class="sort_item">
          <div class="choose_type_box">
              筛选
            </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
export default {
  name: "problemList",
  data() {
    return {
      //初始按什么排序
      sortBy: "",
      category: ["蔬菜", "水果", "牛奶","蔬菜1", "水果1", "牛奶1"]
    };
  },
  created() {},
  mounted() {},
  methods: {
    async chooseType(type) {
      if (this.sortBy != type) {
        this.sortBy = type;
      } else {
        this.sortBy = "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.problem_list {
  position: fixed;
  top: 84px;
  width: 100%;
 
}
.sort_container {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  z-index: 13;
  .sort_item {
    flex: 1;
    width: 33.3%;
    height: 30px;
    line-height: 30px;
     z-index: 14;
    text-align: center;
    border-right: 1px solid #e4e4e4;
  }
  .choose_type_title {
    color: $blue;
  }
  
  .choose_type_box{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 14; 
    background-color: #fff;
  }
  // 该类属于 transition 组件的根据他的属性name而定
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100% );
  }

  .category_container {
    width: 100%;
    position: absolute;
    top:31px;
    display: flex;
    background-color: #f1f1f1;
    .category_left,
    .category_right {
      flex: 1;
      width: 50%;
    }
  }

}
</style>