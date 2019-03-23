import axios from 'axios';

export default function ajax(url, data = {}, type = "GET") {
  let promise;
  if (type === 'GET') {
    let dataStr = '';
    Object.keys(data).forEach((key) => {
      dataDtr += key + "=" + data[key] + & ;
    });
    if (dataDtr != "") {
      dataDtr = dataDtr.subString(0, dataDtr.lastIndexOf("&"));
      url = url + "?" + dataDtr;
    }
    promise = axios.get(url);
  } else {
    promise = axios.post(url, data);
  }
};
