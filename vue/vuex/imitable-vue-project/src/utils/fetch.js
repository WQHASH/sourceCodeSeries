import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;


/**
 * !!!基于http客户端的promise，面向浏览器和nodejs
 *
 * 1.为了解决post默认使用的是x-www-from-urlencoded 去请求数据，导致请求参数无法传递到后台，所以还需要安装一个插件QS
 * 
 */
