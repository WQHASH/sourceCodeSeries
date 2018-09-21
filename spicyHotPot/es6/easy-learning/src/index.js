import $ from './easy';
import Ajax from './ajax/ajax';

 let setting = {
      type: 'POST',
      url:"http://192.168.12.18:8447/api/documentcoop/file/getfilelistaboutme/134216907222945792/0ee20f9d-6365-4990-99d4-180e2ce63735",
      dataType: 'json',
      data: {
      
      },
      async: true,
      time: 10000,
      success (data) {
      	console.log(data,"successData")
      },
      fail () {},
      timeout () {},
      error (err) {
      	console.log(err,"error")
      }
    };


var ajax = new Ajax(setting);

console.log(ajax,"Ajax");
console.log(ajax.init(),"ajax");


// console.log($, "easy+");
