<template>
  <transition name="fadeIn">
    <div id="channel">
      <my-header :fixed="fixed" :title="title">
        <a class="back-white" slot="left" @click="$router.go(-1)"></a>
      </my-header>

      <div class="content">
        <div class="container">
          <!-- 原有的栏目 -->
          <section class="column">
            <p class="title">点击删除以下频道</p>
            <ul>
              <li v-for="(item, index) in indexColumn" :key="index" @click="remove(item, index)">
                <a href="javascript:;" :class="item.classpath">{{item.classname}}</a>
              </li>
            </ul>
          </section>

          <!-- 添加的频道 -->
          <section class="column">
            <p class="title">点击添加以下频道</p>
            <!-- 已删除的 -->
            <ul>
              <li
                v-for="(item, index) in removeChannel"
                :key="index"
                @click="add('removeChannel', index)"
              >
                <a href="javascript:;" :class="item.classpath">{{item.classname}}</a>
              </li>
            </ul>

            <!-- 未选择的 -->
            <ul>
              <li v-for="(item, index) in channel" :key="index" @click="add('channel', index)">
                <a href="javascript:;" :class="item.classpath">{{item.classname}}</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { get_local_cache, set_local_cache } from "@/config/cache";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "channel",
  data() {
    return {
      //传递给子组件的数据
      fixed: true,
      //传递给子组件的数据
      title: "频道管理",

      //删除存放的频道
      removeChannel: [],
      //未选择的所有频道
      channel: ""
    };
  },
  computed: {
    ...mapGetters("index", ["indexColumn", "indexPage", "indexLocation"])
  },
  watch: {
    indexColumn() {
      this.set_indexColumn(this.indexColumn);
      //强制设置默认选择项
      this.set_indexActive("news_recommend");
    },
    removeChannel() {
      set_local_cache("removeChannel", this.removeChannel);
    }
  },

  methods: {
    ...mapMutations("index", [
      "set_indexActive",
      "set_indexColumn",
      "set_indexPage",
      "set_indexLocation"
    ]),
    ...mapActions("index", ["get_channel_data"]),
    //获取未选择的频道
    get_channel() {
      this.get_channel_data()
        .then(res => {
          this.channel = res;
        })
        .catch(err => {
          alert(err);
        });
    },

    //删除
    remove(item, index) {
      if (item.classpath != "news_recommend") {
        let removeEle = this.indexColumn.splice(index, 1);
        this.removeChannel.push(...removeEle);
      }
    },
    //获取以删除的频道
    get_removeChannel() {
      let removeChannel = JSON.parse(get_local_cache("removeChannel"));
      if (removeChannel) {
        this.removeChannel = removeChannel;
      }
    },

    //添加
    add(type, index) {
      if (type == "removeChannel") {
        let addEle = this.removeChannel.splice(index, 1);
        this.indexColumn.push(...addEle);
      } else if (type == "channel") {
        let addEle = this.channel.splice(index, 1);
        this.indexColumn.push(...addEle);
      }
    },

    // 增减栏目后需要同步 page, location
    sync() {
      let pageObj = {};
      let locationObj = {};
      for (let i = 0; i < this.indexColumn.length; i++) {
        var className = this.indexColumn[i].classpath;
        if (this.indexPage[className] > 1) {
          pageObj[className] = this.indexPage[className];
        } else {
          pageObj[className] = 1;
        }

        if (this.indexLocation[className] > 0) {
          locationObj[className] = this.indexLocation[className];
        } else {
          locationObj[className] = 0;
        }
      }

      this.set_indexPage(pageObj);
      this.set_indexLocation(locationObj);
    }
  },
  mounted() {
    this.get_removeChannel();
    this.get_channel();
  },
  /**
   * 该钩子函数是 keep-alice 中的,一般有两个
   *    activated：用法一般在请求请前调用
   *    deactivated：请求完成后的处理
   *        类似于图片懒加载的处理
   */
  deactivated() {
    this.sync()
  }
};
</script>
<style lang='less'>
#channel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: hidden;
  z-index: 1000;
  background-color: #f8f8f8;
  .content {
    background-color: #f8f8f8;
    padding-top: 0rem;
    .column {
      margin-top: 0.133rem;
      .title {
        font-size: 12px;
        padding: 0 0.266rem;
        line-height: 2em;
        background-color: #f5f5f5;
        color: #666;
        margin-bottom: 0.266rem;
      }
      ul {
        margin: 0.266rem 0;
        font-size: 0;
        li {
          display: inline-block;
          width: 25%;
          margin-bottom: 0.266rem;
          animation: zoomIn 0.3s ease;
          a {
            display: block;
            font-size: 16px;
            margin: 0 0.213rem;
            border: 1px solid #ccc;
            line-height: 2em;
            color: #131313;
            text-align: center;
            text-decoration: none;
            &.news_recommend {
              background-color: #f0f0f0;
            }
          }
        }
      }
    }
  }
}
</style>
