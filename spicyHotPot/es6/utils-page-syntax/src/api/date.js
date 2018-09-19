
class DateFn{
	/**
	 * [formatTime 格式化时间]
	 * @author wq
	 * @DateTime 2018-09-12T17:16:45+0800
	 * @param    {[String]}                 time    [时间]
	 * @param    {[String]}                 cFormat [格式]
	 * @return   {[String]}                         [返回 格式化后的时间]
	 */
	formatTime(time, cFormat) { 
        if (arguments.length === 0) return null
        // if ((time + '').length === 10) {
        //     time = +time * 1000
        // }

        var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}', date
        if (typeof time === 'object') {
            date = time
        } else {
            date = new Date(time)
        }

        var formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        // var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function(...rest){
        // Arguments使用规范
        // https://segmentfault.com/q/1010000008720963?_ea=1724154
        // 3.严格模式下不允许使用arguments（规定），并且，普通函数里 arguments 代表了调用时传入的参数，但是箭头函数不是，箭头函数会把 arguments 当成一个普通的变量，顺着作用域链由内而外地查询（词法作用域）
        // ===replace第二个参数是函数=介绍==
        // 传递给函数的第一个参数为正则匹配结果，如果正则表达式有括号第二个参数则是括号内容，接下来开始匹配位置，然后再是整个字符串，若函数还有多余参数则是undefined。
        var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => { //该方法也只是进行补零操作
            var value = formatObj[key]==0?7:formatObj[key];
            if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value-1]
            //这里用 value < 10进行补零操作，这里的数据直接来自date Api获取到的
            if (result.length > 0 && value < 10) {
                value = '0' + value
            }
            return value || 0
        })
        return time_str
    };


    /**
     * 返回指定长度的天数集合
     * 
     * @param  {time} 时间
     * @param  {len} 长度
     * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
     * @return {Array} 数组
     *
     * @example date.getDays('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
     */
    getDays(time, len, diretion) {
    	var tt = new Date(time);
    	//用于设置天数
    	var getDay = function(day){
    		var t = new Date(time);
    		t.setDate(t.getDate() + day);
    		var d = t.getDate();
    		return t.getFullYear() + "-" + (t.getMonth()+1) + "-" + d;
    	};
    	var arr = [];
    	//这里的循环都从1开始是因为 在最后拼接的时候加上了arr
    	if(diretion == -1){    		
    		for(var i=1;i<len;i++){    			
    			arr.unshift(getDay(-i));
    		}
    	}else if(diretion == 1){
			for(var i=1;i<len;i++){    			
    			arr.push(getDay(i));
    		}
    	}else{
			for(var i=1;i<len;i++){    			
    			arr.unshift(getDay(-i));
    		}
    		arr.push(tt.getFullYear() + "-" + (tt.getMonth()+1) + "-" + tt.getDate());
    		for(var i=1;i<len;i++){    			
    			arr.push(getDay(i));
    		}

    	}

    	return diretion ==-1
    			? arr.concat([tt.getFullYear() + "-" + (tt.getMonth()+1) + "-" + tt.getDate()])
    			: (diretion ==1? [tt.getFullYear() + "-" + (tt.getMonth()+1) + "-" + tt.getDate()].concat(arr) : arr)
    };

    getMonthOfDay(time){

    	// https://zhidao.baidu.com/question/201827404873590325.html [计算润平年参考]
    	// 四年一闰，百年不闰，四百年再闰。也就是说，每4年就是一个闰年，但是当年份是整百数时，必须是400的倍数才是闰年；不是400的倍数的年份，即使是4的倍数也不是闰年。
	  	let date = new Date(time);
	  	var y = date.getFullYear();
	  	var mouth = date.getMonth() + 1;
	  	var day;
	  	if(mouth==2){
	  		if((y%4==0 && y%100!=0)||y%400==0){
	  			day = 29
	  		}else{
	  			day = 28
	  		}

	  	}else if(mouth==1 || mouth==3 || mouth==5 || mouth==7 || mouth==8 || mouth==10 || mouth==12){
	  		day = 31
	  	}else{
	  		day = 30;
	  	}
	  	return day
    }

};

export {DateFn};