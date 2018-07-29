<template>
	<div class="table">
		<h4 style="color: #000;">我是home页面下的 {{info}}</h4>
	</div>
</template>

<script>
	export default {
		name: "basetable",
		data(){
			return {
				info: "BaseTable.vue",
			}
		},
	};	

</script>