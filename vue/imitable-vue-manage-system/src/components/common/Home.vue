<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-sidebar></v-sidebar>

		<h2 style="color:pink;">===我是home页面===</h2>
		
		<!-- 这里显示home 中的子级路由 -->
		<div class="content-box" :class="{'content-collapse':collapse}">
			<div class="content">
				<router-view></router-view>
			</div>
		</div>
		
	</div>
</template>

<script>

	import vHead from './Header.vue';
	import vSidebar from './Sidebar.vue';
	import bus from './bus.js';
	export default {
		data(){
			return {
				name:"home-wqahsh",
				collapse: false
			}
		},
		components: {
			vHead, vSidebar
		},
		create(){
			// bus.$on('collapse', (msg) => {
			// 	this.collapse = msg;
			// 	console.log(this.collapse, "home.collapse+")
			// })
			bus.$on('collapse', msg => {
                this.collapse = msg;
            })
		},
	}
</script>