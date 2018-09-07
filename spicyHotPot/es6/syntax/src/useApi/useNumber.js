import {NumberFn} from '../api/number';
// console.log(NumberFn,"NumberFn");

let numberFn = new NumberFn()

// 随机数
{
	let createRandom = numberFn.random(5, 10);
	// console.log(createRandom,"createRandom");
}


// 将阿拉伯数字翻译成中文的大写数字
{
	let numTransFormcharAt = numberFn.numberToChinese(58.56);
	// console.log(numTransFormcharAt,"numTransFromChar");

}

export default {"sanem":"ww"};
