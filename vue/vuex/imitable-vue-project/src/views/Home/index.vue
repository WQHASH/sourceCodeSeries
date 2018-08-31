<template>
	<article class="home-wrapper">
		<button @click="response()">Home</button>
	</article>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { mapGetters } from "vuex";
	import axios from 'axios';
	import qs from 'qs';
	export default {
		created(){},
		components: {},
		methods:{
			response(){
				return new Promise((resolve, reject) => {
					// const baseURL = 'https://easy-mock.com/mock/5a83160c948cfd365a524088/apis/';
					// let data = {"intro": "xxx","name": "wqhas"};

					// const urlT = "http://192.168.12.18:8447/api/documentcoop/file/getfilelistaboutme/134217045907607552/b66f00c4-ee67-4cc3-8d36-c9c58968c8a0";
					// let dataT = {
					// 	"appcode": -1,
					// 	"page": 1,
					// 	"number": 10,
					// 	"userid": "134217045907607552",
					// 	"sortField": "updatedate",
					// 	"isAsc": false,
					// };
					//  axios({
					//  	method: "POST",
					//  	// url: baseURL + "headline/add",
					//  	url: urlT,
					//  	data: qs.stringify(dataT),
					//  	// data: data,
					//  }).then((res)=>{
					//  	console.log(res,"res")
					//  }).then((err)=>{

					//  })
				})


				const baseURL = 'https://easy-mock.com/mock/5a83160c948cfd365a524088/apis/';
					let data = {"intro": "xxx","name": "wqhas"};

					const urlT = "http://192.168.12.18:8447/api/documentcoop/file/getfilelistaboutme/134217045907607552/b66f00c4-ee67-4cc3-8d36-c9c58968c8a0";
					let dataT = {
						"appcode": -1,
						"page": 1,
						"number": 10,
						"userid": "134217045907607552",
						"sortField": "updatedate",
						"isAsc": false,
					};
					 axios({
					 	method: "POST",
					 	// url: baseURL + "headline/add",
					 	url: urlT,
					 	data: qs.stringify(dataT),
					 	// data: data,
					 }).then((res)=>{
					 	console.log(res,"res")
					 }).then((err)=>{

					 })
			},
		},
	};

</script>

