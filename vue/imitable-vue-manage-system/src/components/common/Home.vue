<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-sidebar></v-sidebar>

		<!-- 这里显示home 中的子级路由 -->
		<div class="content-box" :class="{'content-collapse':collapse}">
			<div class="content">
				<!-- <transition name="move" mode="out-in"> -->
					<!-- <keep-alive :include="tagsList"> -->
						<router-view></router-view>
					<!-- </keep-alive> -->
				 <!-- </transition> -->
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
				tagsList: [],
				collapse: false,
			}
		},
		components: {
			vHead, vSidebar
		},
		create(){
			bus.$on('collapse', msg => {
                this.collapse = msg;
            })
		},
	}
</script>