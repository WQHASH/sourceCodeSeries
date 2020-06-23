/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-04-27 13:39:37
 * @LastEditTime: 2020-04-27 14:45:14
 */
import foo1, {num} from '../api/23-module'
console.log(foo1(),"foo");
console.log(num, "num");


// export default '' 默认导出原理 Interface值给变量 default,    所以 export default 12 也是可以的
// export default Interface;   // ==>  export { Interface as default }
// import Interface from "";       // ==>  import { default as Interface} from ""


