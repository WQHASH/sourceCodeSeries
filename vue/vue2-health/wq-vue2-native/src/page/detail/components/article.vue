<template>
    <div id="article" v-if='json'>
        <div class="article_info">
            <h1 class="title">{{json.title}}</h1>
            <span class="befrom">{{json.befrom}}</span>
            <span class="newstime">{{json.newstime}}</span>
        </div>

        <template v-if="json.playonlineurl">
            <div>
                
            </div>
        </template>
        <template v-else>
            <section class="article_content">
                 <div class="content_html" v-html='json.newstext'></div>
             </section>
        </template>
    </div>
</template>

<script>
export default {
    name:"article",
    props:['json'],
    data(){
        return {
            video: '',              // video元素
            video_poster: true,     // video封面
            video_playing: false,   // video是否播放
            video_ended: false,     // video是否播放结束
            video_loading: false,   // video是否正在缓冲
            video_fixed: false      // video是否悬浮
        }
    },
    mounted(){
        console.log(this.json,"json");
    }
}
</script>
<style lang="less">
    #article{
        width: 100%;
        position: relative;
        .article_info{
            font-size: 12px;
            overflow: hidden;
            background: #fff;
            padding: 0, .4416rem, .471413rem;
            border-bottom: 1px solid #eee;
            background: #fff;
            .title{
                color: #000;
                font-size: 20px;
                font-weight: bold;
                padding: 0.4rem 0;
            }
            .befrom{
                 margin-right: 5px;
            }

        }
        .article_content{
           position: relative;
            color: #333;
            font-size: 18px !important;
            line-height: 30px;
            padding: 0.4rem 0.427rem 0;
            .content_html {
            overflow: hidden;
            text-indent: none !important;
            font-size: inherit;
            img {
                width: 100% !important;
                height: auto !important;
            }
            img[type="icon"]{
                width: initial!important;
            }
            *{
                text-indent: inherit !important;
                font-size: inherit !important;
                font-family: inherit !important;
                line-height: inherit !important;
                text-align: justify !important;
                text-justify: inter-ideograph !important;
            }
            div,p{
                width: 100% !important;
                padding-bottom: 15px;
            }
        }
        }
    }
</style>