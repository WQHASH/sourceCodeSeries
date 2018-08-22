# 关于 undersocre的记录	
	数组的判断 _.isArray
		_.isArray = Array.isArray(obj)	|| function(obj){return toString.call(obj) === '[object Array]'};  //霸道
		

	
	其他类型的判断		//机智
	_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });		