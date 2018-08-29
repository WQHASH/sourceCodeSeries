<template>
	<div class="app-wrapper">
		<router-view class="main-container"></router-view>
		<footerBar></footerBar>
	</div>
</template>

<script>
	import 'swiper/dist/css/swiper.css';
	import { footerBar } from './index'
	export default {
		name: "layout",
		components: {
			footerBar	
		},

	};
</script>

<style lang="less" scoped>
	.app-wrapper {
        width: 100%;
        height: 100%;
    }
    .main-container {
        width: 100%;
        height: e("calc(100% - 1rem)");
        position: relative;
    }

</style>