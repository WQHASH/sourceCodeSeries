// 文件引用 requier 按照文件引用的顺序打包  文件依赖
// require('./style.less')
// https://www.codercto.com/a/18867.html [***模块知识参考***]
// wq: 这种采用require的方式进行模块管理 node.js就是采用这种管理的, 现在除了微信游戏这块可能还在使用这种导模块方式，其他都都采用es6的方式
require('./styles/normalize');  //通用的ressa
require('./styles/index');
import { Local } from 'utils/storage.js';
import { ArrayFn } from './api/class.js';

var arrFn = new ArrayFn();
// == array => contains==
{
	var num = 41;
	let arr = [4,5,6,7];
	
	let isContainer = arrFn.contains(arr,num);
	// console.log(isContainer,"ArrayFn");

}
// == array => each==
{
	let arr = [4,5,6,7];
	arrFn.each(arr, function(...options){
		// console.log(options,"options")
	})
}
// == array => map==
/**
 * 改方法存在返回值，所以用变量承接
 */
{
	let arr = [5,6,7,9];
	let arr2 = [6,7,8];
	let mapFn = arrFn.map(arr, function(...options){
		// console.log(options,"options");
		return arrFn.contains(arr2, options[0])?options[0]:null;
	});
	// console.log(mapFn)

}
// == array => sort==
{
	let arr = [33,4,1,99,67];
	// console.log(arrFn.sort(arr, 3), "sort");
}

// == array => unique==
{
	let arr = [33,33,99,99,67,2,"2","3",3];
	let obj = {"sname":"wq","sname":"wq"};
	// console.log(arrFn.unique(arr), "unique");
}

// == array => union==
{

	let arr1 = [2,3,4];
	let arr2 = [3,4,5,5,6];
	let newArr = arrFn.union(arr1, arr2);
	// console.log(newArr,"newArr");
}

// == array => intersect==
{

	let arr1 = [2,3,4];
	let arr2 = [3,4,5,5,6];
	let newArr = arrFn.intersect(arr1, arr2);
	// console.log(newArr,"newArr");
}
{
	// console.log('%s', Array.from('\u767d\u8272\u7684\u6d77'));
	// console.log(Array.from('\u767d\u8272\u7684\u6d77'));
}


