// (function(root){  
// 	// 这里无论是否接受都会有值
// 	// console.log(arguments,"arguments")
// 	var _wqhash = {"sname":"wq"};

// 	root._wqhash = _wqhash;
// })(this);


(function(this){
	console.log(arguments,"arguments");
	var _wqhash = {"sname":"wq"};
	this._wqhash = _wqhash;

}.call(this,12))