var Cookie = {
		setCookie: function(name, value){
			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days*24*60*60*1000);
			// https://www.cnblogs.com/huangshikun/p/6640835.html
			// 在cookie 的名或值中不能使用分号（;）、逗号（,）、等号（=）以及空格
			// 方 法是用escape()函数进行编码，它能将一些特殊符号使用十六进制表示，例如空格将会编码为“20%”，从而可以存储于cookie值中，而且使用此 种方案还可以避免中文乱码的出现。
			// 当使用escape()编码后，在取出值以后需要使用unescape()进行解码才能得到原来的cookie值，
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();  
		},
		getCookie:function(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr = document.cookie.match(reg)){
				return unescape(arr[2]); 
			}else{
				return null;
			}
		},
		delCookie:function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=getCookie(name);
			if(cval!=null)
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();	
		},

	};
