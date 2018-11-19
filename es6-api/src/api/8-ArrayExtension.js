let useExtension = "数组的扩展";
	
/**
 * 1.扩展运算符
 */

{	
	/**
	 * 都是函数的调用，它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列 
	 * 				=>这样就相当于es5中的apply函数调用的功能了
	 * 注意点： ① 扩展运算符后面还可以放置表达式 As: [...(x>0?[1]:[2])]
	 * 		   ② 扩展运算符如果放在括号中，JavaScript 引擎就会认为这是函数调用，否则就会报错。
	 * 		   As:这么写都会报错 (...[1,2]) || console.log((...[1,2]))
	 * 		   ③ 任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。
	 * 		   	 没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
	 * 		   	 As: [...Array(num).keys()]  先处理 Array(num).keys() 返回一个Iterator再用 扩展运算符处理
	 */
	

	// console.log(1, ...[2, 3, 4], 5)
	
}
{
	// 扩展运算符运算符带来的影响
	// ①替代函数的 apply 方法 =>当作为函数参数时，会将数组打散，按个数传参
	// ②复制数组 => 当var copy=[...rest] 这么打散数组同时赋值给一个变量时会复制一份数据，而不是简单的改变指针
	// 
	// ③合并数组 => [...arr1, ...arr2] ==[arr1(s打散后数据), arr2]
	const num = [3,4,5];
	const copyNum = [...num];
	num[0] = "xx";
	// console.log(num,copyNum);
}

{
	// 与解构赋值结合

}
/**
 * Map 和 Set 结构，Generator 函数
 */
{

}

/**
 * Array.from()
 * Array.from方法用于将两类对象转为真正的数组：
 * 		类似数组的对象（array-like object）和可遍历（iterable）的对象
 *
 * Array.of() 
 * 		Array.of方法用于将一组值，转换为数组。
 * 		es5中的Array(arg1，arg2) 数组中如果只有1个参数那么表示数组的长度，如果参数不少于2个则会生成一个数组
 * 		es6中的Array.of(arg1,arg2) 则表现的比较同一，总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
 *
 * 		es5模拟es6的方法：
 * 			function ArrayOf(){ return [].slice.call(arguments); }
 */
{

}
export {useExtension};