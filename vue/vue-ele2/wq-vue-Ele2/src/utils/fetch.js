import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//post 传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  console.error("错误的传参");
  return Promise.reject(error);
});

//code状态码200判断
axios.interceptors.response.use((res) => {
  if (!res.data.hasOwnProperty('status')) {
    return Promise.reject(res.data);
  }
  return res.data;
}, (error) => {
  console.error("网络异常");
  return Promise.reject(error);
});

function fetch(options) {
  options = options || {}
  // let pos = options.url.search(/^http/i)
  // if (pos == -1)
  //   options.url = serviceProtocol() + options.url
  // options.headers = options.headers || {}
  //获取token
  // options.headers['HC-ACCESS-TOKEN'] = Cookies.get('hanmaker_auth') || window.localStorage.getItem('hc_access_token')

  return axios(options)
};

export default fetch;









// export default function ajax(url, data = {}, type = "GET") {
//   let promise;
//   if (type === 'GET') {
//     let dataStr = '';
//     Object.keys(data).forEach((key) => {
//       dataDtr += key + "=" + data[key] + '&';
//     });
//     if (dataDtr != "") {
//       dataDtr = dataDtr.subString(0, dataDtr.lastIndexOf("&"));
//       url = url + "?" + dataDtr;
//     }
//     promise = axios.get(url);
//   } else {
//     promise = axios.post(url, data);
//   }
// };
