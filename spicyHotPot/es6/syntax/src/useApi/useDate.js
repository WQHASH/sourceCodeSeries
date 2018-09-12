import {DateFn} from '../api/date';

let dateFn = new DateFn();

{
	// @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
	//注意的是 这里的两个参数是配套使用的，模式一定要统一
	var fromD = dateFn.formatTime("2018-09-16", '{y}/{m}/{d} ')
	// console.log(fromD,"dateFn");
};

export {dateFn};
