(function(win, doc){
 	var docEl = doc.documentElement,
 	//横屏处理，只要用户改变了设备的查看模式，就会触发orientationchange事件
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
 	// 计算html根元素的font-size大小
 	refresh = function(){
 		var htmlW = docEl.clientWidth;
 		docEl.style.fontSize =(htmlW/375)*100 + "px";
 		function setBodyFontSize(){
 			if(doc.body){
 				doc.body.style.fontSize = '14px';
 			}else{
				doc.addEventListener("DOMContentLoaded", refresh);
 			}
 		};
 		setBodyFontSize()
 	};
	refresh()
 	if(!doc.addEventListener){return};
 	win.addEventListener("resize", refresh, false);

})(window, document);

