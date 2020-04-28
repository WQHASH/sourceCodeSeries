/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-04-27 13:39:24
 * @LastEditTime: 2020-04-28 09:17:06
 */
// let obj = require('./a.js');
import { aa as obj  } from './a.js';
console.log(obj, "$$");

let foo = () => 'foo函数';
let str = "字符串测试";
let num = 123;


export default foo;
export { str, num };
