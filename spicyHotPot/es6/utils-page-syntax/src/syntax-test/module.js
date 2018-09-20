import {arr as PromiseObj} from './promise';
PromiseObj.push("-city-");
var obj = {"Module":"test"};
function hash(){};

// export function hash(){};   暴露的是对象接口
export {
  obj as newObj,
  hash as newHash,
  hash as newHash1,
  PromiseObj
};
// function gg(){console.log("lajs")}; 
//在默认到处时 这里同名或匿名在外部 import是函数名都是可以随意修改的



// export小结
// export {oldName as newName} 重命名
// export default :本质上就是输出一个叫做 default 的变量或方法，然后系统允许你为他随意改名
// 		As:  function add(){}  export {add as default};
// 		export default a =>含义是将变量 a的值赋给变量default
//		export default命令用于指定模块的默认输出，显然 一个模块只能有一个默认输出，因此export default只能使用一次，所以import命令后边才可以不加{}，以为只有唯一一个对应default	 		
// import 命令有提升效果，会提升到整个模块的头部，首先执行。
// import 一般来说都是当作只读，轻易不要改变它的属性。
// 