// 文件引用 requier 按照文件引用的顺序打包  文件依赖
// require('./style.less')
require('./styles/normalize');  //通用的ressa
require('./styles/index');
import {Local} from 'utils/storage.js';

console.log(Local,"Local++_+++");

const format = require('utils/format')  // utils ?  没有相对路径  回想@  => 别名
const {log} = require('./utils')

log('hello world')
log(format('hello webpack'))

log(_.map([1,2,3], (item) => item * 2))
