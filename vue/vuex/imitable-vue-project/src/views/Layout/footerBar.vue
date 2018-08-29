<template>
	<footer class="footer-wrapper df-c border-half-top">
		 <ul class="cf">
		 	<router-link tag="li" :to="item.path" v-for="(item, index) in footerBarList" :key="index" >
		 		<!-- 这里体现vue父子级通过props交互 -->
				<Icon :name="item.icon"></Icon>
		 		<div> {{item.title}} </div>    
		 	</router-link>
		 	<!-- <li v-for="(item) in footerBarList"> {{item.path}} </li> -->
		 </ul>
	</footer>
</template>
<script>

	export default {
		data(){
			return {
				footerBarList: [
		            {title: '首页', icon: 'home', path: '/home'},
		            {title: '西瓜视频', icon: 'video', path: '/video'},
		            {title: '微头条', icon: 'comment', path: '/headline'},
		            {title: "登录", icon: `comment`, path: '/account'}
		        ]
			}
		},

	};
</script>


<style lang="less" scoped>

    .footer-wrapper {
        position: absolute;
        left: 0;bottom: 0;
        width: 100%;
        height: 0.5rem;
        font-size: 0.16rem;
        z-index: 99;
        background-color: #fff;
        ul {
            width: 100%;
        }
        li {
            width: 25%;
            float: left;
            text-align: center;
            color: @theme-black;
            svg {
                width: 0.22rem;
                height: 0.22rem;
            }
            div {
                width: 100%;
                font-size: 0.12rem;
                margin-top: 0.06rem;
            }
        }
        .active {
            color: @theme-red;
        }
    }
</style>