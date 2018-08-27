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
	var hitch = function(socpe, method){
		return function(){
			return method.apply(socpe, arguments || [])
		};
	};


})();
(function(){})();
(function(){})();
(function(){})();
(function(){})();
(function(){})();