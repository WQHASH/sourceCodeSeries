import axios from 'axios';
import qs from 'qs';
//wq: 当我们把此配置项设置成默认配置项并且设置成true的时候，axios就可以设置cookies了。
axios.defaults.withCredentials = true;

// axios拦截器 [在发送请求之前做的事情]
axios.interceptors.request.use((config)=>{
	return config
}, (err)=>{
	return Promise.reject(err);
});

axios.interceptors.response.use((response)=>{
	return response
}, (err)=>{
	return Promise.reject(err.response);
});

//请求成功的回调函数
function success(res){
	if(res.status ==200){
		return res.data
	}
	return {
        code: 0,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    }
};
//请求失败的回调函数
function error(res){
	if(res.code === 0){
		throw new Error(res.msg);
	};
	return res;
};

const baseURL = 'https://easy-mock.com/mock/5a83160c948cfd365a524088/apis/';

export default {
	get(url, params){
		if(!url){ return };
		return axios({
			method: 'get',
			// url: baseURL + url,
			url: url,
			 // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
			baseURL: baseURL,
			 // `params` 是即将与请求一起发送的 URL 参数
			params: params,
			// params,
			timeout: 1000
		}).then(success).then(error);
	},
	post(url, data){
		if(!url){ return };
		return axios({
			method: 'post',
			url: url,
			baseURL: baseURL,
			data: qs.stringify(data),
			// params,
			timeout: 1000,
		}).then(success).then(error);
	},
	postFile(url, data){
		if(!url){ return };
		return axios({
			method: 'post',
			url: baseURL+ url,
			data,
		}).then(success).then(error);
	},
};










/**
 * !!!基于http客户端的promise，面向浏览器和nodejs
 *
 * 1.为了解决post默认使用的是x-www-from-urlencoded 去请求数据，导致请求参数无法传递到后台，所以还需要安装一个插件QS
 * 
 * AS: 
 * 	{

		let wake = (time) => {
		  return new Promise((resolve, reject) => {
		    setTimeout(() => {
		      resolve(`${time / 1000}秒后醒来`)
		    }, time)
		  })
		}
		let p1 = wake(1000)
		let p2 = wake(2000)
		Promise.all([p1, p2]).then((result) => {
		  console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]
		}).catch((error) => {
		  console.log(error)
		})

	};
 */
