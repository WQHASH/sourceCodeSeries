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
}, (err)=>{
	console.log(err, "失败");
	// return read(8)
})
.then((data)=>{
	console.log(data, "成功1")
}, (err)=>{
console.log(err, "失败1");
})



export {Promise}