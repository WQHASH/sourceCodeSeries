console.log("==js-克隆==");
(function(){
  var deepClone = function(obj){
  	var result;
  	var isType = isClass(obj);
  	if(isType === "Object"){
  		result = {};
  		for(var key in obj){
  			result[key] = deepClone(obj[key]);
  		}

  	}else if(isType === "Array"){
  		result = [];
  		for(var i=0;i<obj.length;i++){
  			result.push(deepClone(obj[i]));

  		}
  	}else {
  		return obj;
  	}

  	return result
  };

  var isClass = function(obj){
  	return  Object.prototype.toString.call(obj).slice(8, -1);	// '[object Array]'
  };


  var arr = ["sname","sage","sjob","scity"];
  var string = "我 只 是 一 个 字 符 串 而已";
  var obj = {"sanme":"wangqi","sage":"12","sex":"man"};
  var newArr =  deepClone(obj);
  obj.sage="110";

  // console.log(obj,"arr");
  // console.log(newArr,"newArr");

})();



(function(){
   var arr = [3,4,5];
	var hitch = function(socpe, method){
		return function(){ // 注意如果希望在这里传递参数，找return 后的调用体 [之前写这注释，目的配合理解偏函数，它和偏函数不同]
      console.log(arr,"传递的参数");
			return method.apply(socpe, arguments||[]);
		};
	};

  window.sname = "wq";
  var obj = {
    sname:"wangqi",
    say: function(){
      return hitch(this, function(s){
        // return this.sname;
        console.log(this.sname);
      })
    }
  };
  var tempSay = obj.say()(arr);

  // console.log(tempSay,"tempSay");


})();

console.log("==js-bing方法理解==");
(function(){
  // 1. 创建绑定函数 [留住this] 
  // 2. 偏函数, 个人对这个的理解是 bind可以使一个函数拥有预设的初始参数，该参数被用在使用bind的函数第一位置
  //            如果在调用的时候任需参数，则其他的参数从第二个开始传入
  // 3. 偏函数[和柯里化]理解 => https://blog.csdn.net/neweastsun/article/details/75947785
  // 理解: 我们创建一个新函数， 让现有的一些参数值固定。作为默认参数使用
  // 好处: 默认参数不用写
  this.x = 9;
  var model = {
    x: 8,
    getX: function(){
      // console.log(this.x);
    },
    getBind: function(){
      return Array.prototype.slice.call(arguments);
    },
    getSetTime: function(){
      // 这里虽然并不能有效的证明 这里的bing是为把this绑定成model,
      // 定时器中的this.getX  和 this.getX()this的指向是不同的，所以这种测试用在构造函数可能更能体现
      return setTimeout(this.getX.bind(this),1000);
    },
  };

  model.getX();
  // 这里的this编程了全局的了
  var retriverX = model.getX;
  var retriverBind = model.getBind;
  retriverX();
  // ===绑定===
  var retriverBindX = retriverX.bind(model);
  retriverBindX();
  // ===偏函数===
  var retriverGetBind = retriverBind.bind(model, "偏函数预设参数1");
  console.log(retriverGetBind("第二个参数","第3个"));
  console.log(retriverBind.bind(model, "偏函数预设参数1")(1,2,3));


  //===配合 setTimeout===
  model.getSetTime();

})();

console.log("===继承===");
(function(){
    var nativeCreate = Object.create;
    var Ctor = function () {
      this.sname ="wq";
      this.sage = "11";
    };
    Ctor.prototype.a = 1111;
    var baseCreate = function(prototype){
      if(nativeCreate){
        return nativeCreate(prototype);
      };
      Ctor.prototype = prototype;
      var result = new Ctor();
      Ctor.prototype = null;
      return result;
    };

    function callBack(){
      this.city="Bj"
    };
    console.log(baseCreate(callBack.prototype))


})();
(function(){})();
(function(){})();
(function(){})();