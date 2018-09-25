import Ajax from '../ajax/ajax';

class Util extends Ajax {
	constructor () {
		super();
   	 	this.href = ''
  	}

  	/**
  	 * [formatDate 时间格式化]
  	 * @author wq
  	 * @DateTime 2018-09-25T11:08:09+0800
  	 * @param    {[Object]}                 unix   [时间戳]
  	 * @param    {[String]}                 format [YYYY-MM-DD hh:mm:ss]
  	 * @return   {[String]}                        [ 2017-8-16 22:17:53]
  	 */
	formatDate(unix, cFormat){
		if(arguments.length === 0){ return null};

		var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}', date

		if (typeof unix === 'object') {
            date = unix
        } else {
            date = new Date(unix)
        }

		var formatObj = {
		    y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
		};

		var newFormatObj = format.replace(/{(y|m|d|h|i|s|a)+}/g, (val, key, arr)=>{
			// formatObj[key]<10?("0"+formatObj[key]):formatObj[key];
			var value = formatObj[key];
			if(val.length>0&&value<10){
				value= '0'+value;
			}
			return value || 0;
		})
		return newFormatObj
	}


	// 函数防抖
  debounce (fn, wait, immediate = false) {
    let [time, result, timestamp, args, context] = []
    function later () {
      let late = +new Date() - timestamp
      if (wait > late && late >= 0) {
        time = window.setTimeout(later, wait - late)
      } else {
        time = null
        result = fn.apply(context, args)
        context = args = null
      }
    }
    return function () {
      context = this
      args = arguments
      timestamp = +new Date()
      let callNow = immediate && !time
      if (!time) {
        time = window.setTimeout(later, wait)
      }
      if (callNow) {
        result = fn.apply(context, args)
        context = args = null
      }
      return result
    }
  }

};
export {Util}