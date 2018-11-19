let functionExtension = "函数扩展";

// ===== 2. 函数的 length 属性 =====
/**
 * 函数的length属性，指的是函数没有默认赋值的参数，那些已经有默认值的将不会计算在length中。
 * **如果默认参数不是为参数，length也不会再计算赋值后面的参数
 */
{
	function fun(a,b,c="c"){};
	function fun1(a="a",b,c){};
	let len = fun.length;
	let len1 = fun1.length;
	// console.log(len,"len")
	// console.log(len1,"len1")

}




// ===== 2. 作用域 =====
{
	var x = 1;
	function foo(x=x){}; 
	// foo();  //这里的参数相当于，let x = x他会形成暂时性死区，报x未定义

}
/**
 * 下面2个例子都体现了，当函数参数有默认值时候，
 * 	参数部分会单独形成一个作用域，方法体又是一个作用域，函数外又是一个全局作用域
 *  还是遵守爬树原则，方法体 -> 参数部分 -> 函数外(全局)
 * 
 */
{
	var x =1;
	function foo(x, y= function(){x=2; console.log(x,"匿名")}){
		var x=3;
		y();
		console.log(x);
	}; 
	// foo();		//3
	// console.log(x,"x") //1
}

{
	var x=1;
	function foo(x, y=function(){x=2; console.log(x,"匿名")}){
		x=3;
		y();
		console.log(x);
	};
	//foo();	// 2
	//console.log(x,"x") //1
}

// 箭头后边部分如果被解析成代码块 注意需要加()处理
{
	let foo = () => { a: 1 };
	// console.log(foo(),"foo()") // undefined
	let foo1 = () => ({a:22});
	// console.log(foo1(), "foo1");
}


// ===== 2. 箭头函数 (使用注意点) =====
{
	/**
	 *  ① 箭头函数内的this(借用的this,) 就是定义时所在的对象，而不是使用时的所在的对象，
	 *  	（配合理解es5中函数作用域，是在定义函数式确定的，而不是在调用函数式确定的）
	 *  ② 不可以当做构造函数使用，因为箭头函数里面根本没有自己的this
	 *  	由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
	 *  	如果用了apply call那么就相当于间接的执行了函数
	 */

	function foo() {
	  return () => {
	    return () => {
	      return () => {
	        // console.log('id:', this.id);
	      };
	    };
	  };
	}

	var f = foo.call({id: 1});
	var t1 = f.call({id: 2})()(); // id: 1
	var t2 = f().call({id: 3})(); // id: 1
	var t3 = f()().call({id: 4}); // id: 1
}

//箭头函数中this指向
{
		//const Person = {
        //	'sayHello': () => {console.log(this)}
        //};
      	//Person.sayHello();
      	//*********上边的代码等同于（包括es5中）***********
      	//函数的this是在定义是决定的，=>es6
      	//函数中的this是在调用时决定的 =>es  所以他们的指向会存在差别
      	const func =() => {
      		// console.log(this)
      	}; 
      	const Person = {
        	'sayHello': func 
        };
      	Person.sayHello();
}

/**
 * 嵌套的箭头函数
 */

{
	function insertES5(value) {
	  return {into: function (array) {
	    return {after: function (afterValue) {
	      array.splice(array.indexOf(afterValue) + 1, 0, value);
	      // console.log(array);
	    }};
	  }};
	}
	
	let insertEs6 = (value)=>({into: (array)=>({after: (afterValue)=>{
		array.splice(array.indexOf(afterValue) + 1, 0, value);
	      // console.log(array)
	}})});
	insertEs6(2).into([1, 3]).after(1); //[1, 2, 3]


}

// ===== 6. 双冒号运算符 ???=====
{
	var obj = {sname:"wq"};
	function func(){
		setTimeout(()=>{console.log(this,"func")})
	};

	// ::func();

	// var f = func.bind({sname:"wq"});
	// f()
}
export {functionExtension};