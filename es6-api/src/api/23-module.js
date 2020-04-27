/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-04-27 13:39:24
 * @LastEditTime: 2020-04-27 15:08:27
 */
let obj = require('./a.js');
console.log(obj,"$$");

let foo = () => 'foo函数';
let str = "字符串测试";
let num = 123;


export default foo;
export {str, num};
