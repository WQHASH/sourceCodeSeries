<template>
    <div id="footer_guide">
       <ul class="router-list">
            <li @click="seleRouter">首页</li>
            <li>排序</li>
            <li>搜索</li>
            <li>个人</li>
        </ul>
    </div>
</template> 

<script>
export default {
    name: 'FooterGuide',
    data(){ return {
        routerData:["首页","排序","搜索","个人"],

    } },
    methods:{},
}
</script>

<style lang="scss" scoped>
#footer_guide{
    position: fixed;
    bottom:0;
    width:100%;
    height:40px;
  .router-list{
      display: flex;
      border-top:1px solid pink;
    }
    .router-list li{
        height: 40px;
        line-height: 40px;
        width:25%;
        text-align: center;
        font-size:12px;
    }
}
  
</style>

