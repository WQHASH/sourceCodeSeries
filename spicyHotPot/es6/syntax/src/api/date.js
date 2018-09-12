
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


};

export {DateFn};