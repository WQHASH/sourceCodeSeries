<template>
  <div id="detail">
    <!-- 头部 -->
    <my-header fixed :title="title">
      <a slot="left" class="back-black" @click.stop="$router.go(-1)"></a>
      <a slot="right" class="menu"></a>
    </my-header>

    <!-- 正文 -->
    <div class="content">
      <div class="container">
        <!-- 正文内容 -->
        <my-article v-if="currentArticle" :json="currentArticle"></my-article>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import myArticle from "./components/article";

export default {
  name: "detail",
  computed:{
    ...mapGetters('index', ['indexColumn']),
    ...mapGetters('detail', ['currentArticle'])
  },
  mounted(){
    this.init();
  },
  data() {
    return {
      title: "健康头条",         // header的title
      id: "",                   // 文章id
      classid: "",              // 文章classid (分类)
      datafrom: "",             // 数据来源
      articleJson: {},          // 文章数据
      enterTime: "",            // 进入页面时间
      loading: true,
      error: false
    };
  },
  components: {
    myArticle
  },
  methods:{
    ...mapActions('index', ['get_indexColumn_data', 'get_Article_data']),
    ...mapActions('detail', ['get_Article_data']),

    ...mapMutations('detail', ['set_currentArticle']),

    //初始化时详情页
    async init(){
      this.classid = this.$route.query.classid;
      this.id = this.$route.query.id;
      this.datafrom = this.$route.query.datafrom;
      this.enterTime = new Date().getTime();
      $('#detail .container').scrollTop(0);
      await this.handleTitle();
      this.get_Article();

    },

    // 获取title分类
    async handleTitle(){
      // 如果 indexColumn栏目数据不存在，则需要重新获取
      if(!(this.indexColumn.length>-1)){
          await this.get_indexColumn_data();
      }
      let index = this.indexColumn.findIndex((n)=>{
        return  n.classid ===  this.classid;
      });

      if(index>-1){
        this.title = `健康头条 · ${this.indexColumn[index].classname}`;
      }
    },

    //获取文章
    get_Article(){
      this.loading = true;
      let params = {
        "id": this.id,
        "datafrom": this.datafrom,
      };
      this.get_Article_data(params).then((res)=>{
        if(res){
          this.set_currentArticle(res);
          this.loading = false;
          this.handleLocaltion('get');
        }
        this.error = false;
      }).catch((err)=>{
        this.error = true;
        this.loading = false;
        throw Error(err)
      });
    },

    handleLocaltion(){}



  },


};
</script>
<style lang="less">
#detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f8f8f8;
  header {
    background: #fff;
    color: #333;
    font-size: 16px;
    .menu {
      background: url(../../assets/img/menu.png) no-repeat center center;
      background-size: 20px;
    }
  }
  .content {
    padding-bottom: 48px;
    padding-top: 0px;
  }
}
</style>
