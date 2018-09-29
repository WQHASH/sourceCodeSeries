// import {promise} from "../api/promise";

console.dir(Promise)
function read(context){
	return new Promise(function(res, rej){
		setTimeout(()=>{
			if(context>4){
				res(context)
			}else{
				rej("小于4")
			}
		})
	});
}

// console.log(p,"p");

read(1).then((data)=>{
	console.log(data, "成功");
}, (...rest)=>{
	console.log(rest, "rest-失败");

	// return read(8)     // 在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中就可以接收到数据了，
	return 0
})
.then((data)=>{
	console.log(data, "成功1");
}, (err)=>{
console.log(err, "失败1");
})


// 参考： https://blog.csdn.net/shan1991fei/article/details/78966297


function hash(){
	return new Promise(function (resolve, reject) {
	 	get('http://www.google.com', function (err, res) {
		    if (err) reject(err);
		    else resolve(res);
		  });
		})
}

hash();

export {Promise}