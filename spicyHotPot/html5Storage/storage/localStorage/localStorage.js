(function(){
	var root = this;
	var $wqhash = function(){};
	root.$wqhash = $wqhash;
	
	var local = {
		get: function(key){
			if(key){
				return JSON.parse(localStorage.getItem(key));
			}else{
				return null;
			}
		},
		set: function(key, val){
			// 这里设置了 setz中第一个参数可以是个对象的形式，[默认的是String];
			var setting = arguments[0];
			if(Object.prototype.toString.call(setting).slice(8, -1) === 'Object'){
				for (var i in setting) {
	                localStorage.setItem(i, JSON.stringify(setting[i]))
	            }
			}else{
				localStorage.setItem(key, JSON.stringify(val))
			}
		},
		remove: function(key){
			localStorage.removeItem(key)
		},
		clear: function(){
			localStorage.clear()
		},
	};


	$wqhash.local = local;
})(this);

