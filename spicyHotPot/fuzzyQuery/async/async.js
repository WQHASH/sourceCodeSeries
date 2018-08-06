console.log("==== 对于异步编程的理解 【setTimeout】 ====");
(function() {
    var btn = document.getElementsByClassName("btn")[0];
    btn.onclick = function() {
        // console.log("start");
        setTimeout(function() {
            // console.log("10s");
            setTimeout(function() {
                // console.log("100s");
            }, 1);
            // console.log("内部js机制");
        }, 10);
        // console.log("end");
    };

})();

console.log("==== 对于异步编程的理解 => 【回调】 ====");
(function(){
	function func(callback){
		setTimeout(function(){console.log("func耗时操作")},2000);
		callback();
		// ===== 这里也体现了2个异步之间的关系 [如果callback是Ajax请求亦如此] =====
		// 异步之间不像同步，这里定时器给的时间并不是执行的时间，
		// 而是把事件任务加入队列中，执行还要看响应的大环境。
	};

	function func2(){
		setTimeout(function(){console.log("我是f2的逻辑");},1000);
	};
	func(func2);	
	// 这种回调也体现了异步炒作， 如果func是个很好使的操作，那么会先执行func2的代码
	// 相当于先执行程序的主要逻辑，将耗时的操作推迟执行。
})();