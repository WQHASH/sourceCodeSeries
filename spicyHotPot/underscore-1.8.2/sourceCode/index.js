(function(){
	var obj = {"sname":"wq","sage":"12","sex":"man"};
	var arr = [22,3,46];

	// _.find(obj, function(val, key, list){console.log(arguments,"find")});


})();


(function(){
	var sum = _.reduce([11, 22, 33], function(memo, num){
		// console.log(arguments);
		return memo + num; 
	});
	// console.log(sum, "reduce")
})();
(function(){
var arr = [22,3,46];
var num = _.findIndex(arr,function(val, index, list){
	if(val == 46){
		return ""
	}
});
console.log(num)

})();