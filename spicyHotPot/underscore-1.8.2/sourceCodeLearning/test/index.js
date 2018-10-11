// (function(root){  
// 	// 这里无论是否接受都会有值
// 	console.log(arguments,"arguments")
// 	var _wqhash = {"sname":"wq"};

// 	root._wqhash = _wqhash;
// })(this, 12, 13);


// 这里的 参数取的是 this 之后的参数，和上面的传递方式有些不同
(function(arg){
	console.log(arguments,"arguments");
	var _wqhash = {"sname":"wq"};
	this._wqhash = _wqhash;

}.call(this,12,13))