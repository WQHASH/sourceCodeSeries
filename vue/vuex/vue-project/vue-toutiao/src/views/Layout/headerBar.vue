<template>
    <div class="header-wrapper df-sb">
        <div class="logo df-c">
            <img src="../../assets/images/logo.png" alt="LOGO">
        </div>
        <div class="search">
            <Icon name="2fangdajing" class="search-icon"></Icon>
            <input type="text" placeholder="搜索些啥呢..." @click="skipSearch" readonly>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            skipSearch () {
                this.$router.push('/search')
                //wq: 路由跳转也动态添加参数可以
                // this.$router.push({path: '/search',query:{sname:"wq"}})
            }
        }
    }
    /**
     * 有关vueRouter学习： https://www.jianshu.com/p/ee7ff3d1d93d
     *     声明式：<router-link :to="...">
     *     编程式：router.push(...) 声明式的本质该是编程时
     *     这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
     */

</script>
<style lang="less" scoped>
    .header-wrapper {
        height: 0.5rem;
        background: @theme-bg-red;
        .logo {
            width: 1.3rem;
            height: 100%;
            img {
                width: 1rem;
            }
        }
        .search {
            width: e("calc(100% - 1.3rem)");
            position: relative;
            color: @font-gray;
            .search-icon {
                position: absolute;
                left: 0.06rem;top: 50%;
                transform: translateY(-50%);
            }
            input {
                width: 90%;
                height: 0.3rem;
                border: none;
                outline: none;
                background: @bg-color;
                text-indent: 0.3rem;
                border-radius: 0.04rem;
            }
        }
    }
</style>