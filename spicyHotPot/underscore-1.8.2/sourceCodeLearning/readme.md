# 关于 undersocre的记录	
	数组的判断 _.isArray
		_.isArray = Array.isArray(obj)	|| function(obj){return toString.call(obj) === '[object Array]'};  //霸道
		