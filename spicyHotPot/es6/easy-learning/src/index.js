import $ from './easy';
// import Ajax from './ajax/ajax';
import {Util} from './util/util';


let util = new Util();

// 时间格式化测试
{
      let formatdate = util.formatDate(new Date(), "{y}-{m}-{d} {h}:{i}");
      // console.log(formatdate, "util+");
}



// 防抖动函数测试 [如果只是用做开关这个足以]
{
      function _debounce(fn,wait){
          var timer = null;
          return function(){
              clearTimeout(timer)
              // 定时器的目的在于 限制在一定时间范围内的重复点击会 执行清空timer变量
              timer = setTimeout(()=>{
                  fn()
              },wait)
            }
      }
      function _log(){
          console.log(1)
      }
      document.getElementsByClassName("btn")[0].onclick= _debounce(_log, 500)
      // window.onscroll = _debounce(_log, 500)
}

// 升级版 防抖动函数
{
      function _debounce(fn,wait,time){
            var previous = null;
            var timer = null;

            return function(){
                  //这里的时间是变化的
                  var now = +new Date();
                  //这里对于有值相当于一层开关
                  if(!previous){
                        previous = now;
                  };
                  if(now - previous > time){
                        clearTimeout(timer);
                        fn();
                        previous = now;
                  }else{
                        clearTimeout(timer)
                        timer = setTimeout(()=>{
                              fn()
                        },wait)
                  }
            }
      }
      function _log(){
          console.log(1)
      }
      window.onscroll = _debounce(_log, 500, 2000)

}



//  let setting = {
//       type: 'POST',
//       url:"http://192.168.12.18:8447/api/documentcoop/file/getfilelistaboutme/134216907222945792/0ee20f9d-6365-4990-99d4-180e2ce63735",
//       dataType: 'json',
//       data: {
      
//       },
//       async: true,
//       time: 10000,
//       success (data) {
//       	console.log(data,"successData")
//       },
//       fail () {},
//       timeout () {},
//       error (err) {
//       	console.log(err,"error")
//       }
//     };


// var ajax = new Ajax(setting);

// console.log(ajax,"Ajax");
// console.log(ajax.init(),"ajax");

