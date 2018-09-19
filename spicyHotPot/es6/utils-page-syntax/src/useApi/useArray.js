import { ArrayFn } from '../api/array.js';

let useArray = function (){
	return 11
};
let testArray = [12,56,78];


let arrFn = new ArrayFn();
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

// == array => sum, subtraction, average==
{

	let arr1 = [2,3,4];
	let arr2 = [3,4,5,5,6];
	let arrSum = arrFn.average(arr1);
	// console.log(arrSum,"arrSum");
}



export { 
	useArray,
	arrFn,
	testArray as wqhash,
};

/**
 *需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
 *
 * 
 */