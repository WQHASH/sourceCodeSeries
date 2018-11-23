
(function(){
	function wqhash(obj){
		 //如果参数是自己的实例，那就返回参数。 
		 // if (obj instanceof wqhash) { console.log(11); return obj};
		 //如果你调用_，不是用new的，函数内部自动会给你new 
		 //			=> 这里第一次this为window，生成一个新对象后，直接return 但是此时if判断就起到了作用，防止了后边的递归调用
        if (!(this instanceof wqhash)) {console.log(22); return new wqhash(obj)};
        //参数尽量以对象的形式传递，接收一整个obj
        this.wrapped = obj;
	};
	
    // if (typeof exports !== 'undefined') {
    //     if (typeof module !== 'undefined' && module.exports) {
    //         exports = module.exports = wqhash;
    //     }
    //     exports.wqhash = wqhash;
    // } else {
    //     window.wqhash = wqhash;
    // };
	window.wqhash = wqhash;

	wqhash._map = function(){console.log("map")};
	wqhash._reduce = function(){};
	wqhash._filter = function(){};
	wqhash._some = function(){};
	wqhash._ever = function(){};
	wqhash._bind = function(){};


	
})();


//理解 underscore中的一些方法??
//	① underscore中用函数来暴露对象
//	② 由构造函数生成的新函数，指向构造原型（前提的构造原型中设置了方法，不然原型会回指构造，当然还需继续通过__proto__继承）
//	
//	小结： 构造的静态方法  => 给构造自己用
//		   构造原型里的方法 => 给实例用
//		   
(function(){
	function fun(sname){
		this.sname = sname;
		// this.ss = "yyy";
	}
	fun.ss = function(){console.log("sss")};
	//如果构造函数不设置 prototype 那么由构造函数生成的新对象的 __proto__ 
	//			=>   找向的会是 fun.prototype因为这个原型又会回指向fun.constructor（只是指向） 但是这里的方法实例是访问不到的，只能构造直接方法
	//			=>  ,且fun还有个__proto__指向Object.prototype
	fun.prototype = {
		ss:"gg",
	}
	var f = new fun("wq");
	// console.log(f.sname,"构造属性");
	// console.log(f.ss,"静态方法");
	// console.log(fun.ss,"静态方法");
	// console.log(f,"f");
	// console.log(fun.ss)
	// 
	// 问题??
	//  	这个库为什么不直接用对象而用函数？？
	//  		

})();